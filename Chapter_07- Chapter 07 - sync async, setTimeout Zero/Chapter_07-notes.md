# Node.js Episode 07 –V8, libuv, Sync vs Async, Event Loop.

---

# 1. High-Level Architecture of Node.js

## How Node.js Executes Code

```
            ┌─────────────────────────┐
            │       Your JS Code      │
            └─────────────┬───────────┘
                          │
                          ▼
                    ┌───────────┐
                    │    V8     │  Executes JS synchronously
                    └─────┬─────┘
                          │
          Sync Code       │        Async Code
       (cannot offload)   │     (can offload to libuv)
                          │
          ┌───────────────┴───────────────┐
          ▼                               ▼
 ┌─────────────────┐              ┌──────────────────┐
 │   Call Stack    │              │      libuv        │
 └───────┬─────────┘              └─────────┬────────┘
         │                                    │
         ▼                                    ▼
  Executes line                       Handles async tasks:
  by line synchronously               - Timers
                                      - I/O (readFile)
                                      - Crypto (pbkdf2)
                                      - Network (HTTP)
```

---

# 2. Synchronous vs Asynchronous Operations

## Synchronous Execution (Blocking)

```
JS Code
   │
   ▼
Call Stack
   │ (blocked until completion)
   ▼
Result returned
```

### Example: `readFileSync`

```
readFileSync → blocks execution
while file is being read
```

No other operation can run during this time.

---

## Asynchronous Execution (Non-blocking)

```
JS Code
   │
   ▼
libuv threadpool / kernel APIs
   │
   ▼
Event Loop queues callback
   │
(callback executed when call stack is empty)
```

---

# 3. Event Loop Diagram

```
         ┌─────────────────────────────┐
         │        CALL STACK           │
         └──────────────┬──────────────┘
                        │ is empty?
                        ▼
        ┌─────────────────────────────────┐
        │           EVENT LOOP            │
        └────────────────┬────────────────┘
                         │
     ┌───────────────────┴──────────────────────────────┐
     ▼                ▼                  ▼              ▼
Timers Queue     I/O Queue     Check Queue        Close Queue
(setTimeout)     (readFile)    (setImmediate)     (socket close)
```

---

# 4. Why `setTimeout(0)` is NOT immediate

### Visual Explanation

```
console.log("A");
setTimeout(fn, 0);
console.log("B");

Execution Order:
────────────────────────
1. "A" logged
2. "B" logged
3. Call stack becomes empty
4. Event loop picks setTimeout callback
5. fn executes
```

Because even with a delay of 0ms, the callback goes through **event loop queues**.

---

# 5. V8 vs libuv Responsibilities

```
    ┌─────────┐                    ┌────────────┐
    │   V8    │                    │   libuv     │
    └────┬────┘                    └──────┬──────┘
         │                              │
         │ Handles:                     │ Handles:
         │  - JS execution              │  - async I/O
         │  - sync functions            │  - network
         │                              │  - timers
         │                              │  - crypto threadpool
```

---

# 6. Crypto Module Diagram

### Difference: `pbkdf2Sync` vs `pbkdf2`

```
 pbkdf2Sync
──────────────
 JS → V8 → BLOCK → result

 pbkdf2 (async)
──────────────────────────────
 JS → libuv threadpool → event loop → callback → result
```

---

# 7. File System Operations Diagram

```
 readFileSync
────────────────
 App → V8 → file read → result (blocking)

 readFile (async)
──────────────────────────
 App → libuv → OS reads file → callback → event loop → result
```

---

# 8. Common Interview Output Traps

### Example

```js
console.log('Hello world');

setTimeout(() => {
  console.log('call me ASAP');
}, 0);

console.log('Multiplication:', 10 * 20);
```

### Output:

```
Hello world
Multiplication: 200
call me ASAP
```

Because synchronous work **completes first**, even if the timer is `0ms`.

---

# 9. Summary Table

| Feature             | Sync (Blocking)          | Async (Non-blocking)         |
| ------------------- | ------------------------ | ---------------------------- |
| V8 Execution        | Yes                      | Yes                          |
| Uses libuv?         | No                       | Yes                          |
| Blocks main thread? | Yes                      | No                           |
| Recommended?        | No                       | Yes                          |
| Examples            | readFileSync, pbkdf2Sync | readFile, pbkdf2, setTimeout |

---
