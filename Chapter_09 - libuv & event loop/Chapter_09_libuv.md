# **libuv & The Node.js Event Loop — Complete Textbook-Style Notes**

---

# **Chapter 1 — Introduction to libuv**

libuv is a high‑performance, cross-platform C library that provides:

- The **Event Loop**
- A **Thread Pool** (default size = 4)
- Cross-platform **asynchronous I/O**
- **Timers**, **Network operations**, **Filesystem operations**, and more

libuv sits **underneath Node.js**, acting as the engine that makes JavaScript _non‑blocking_.

Node.js architecture overview:

```
   +---------------------- Node.js ----------------------+
   | +---------+      +-------------------------------+ |
   | |  V8 JS  |      |            libuv              | |
   | | Engine  |      | - Event Loop                  | |
   | |(stack)  |      | - Callback Queues             | |
   | +---------+      | - Thread Pool (4 threads)     | |
   |                  | - OS interaction layer        | |
   |                  +-------------------------------+ |
   +-----------------------------------------------------+
```

---

# **Chapter 2 — Why Node.js Needs libuv**

JavaScript itself is **single-threaded**, but modern applications must perform:

- File reads / writes
- Network requests
- Timers
- DNS queries
- Cryptographic operations

If JavaScript executed these synchronously, it would **block the main thread**, freezing the application.

libuv solves this by:

1. Offloading heavy operations to **OS kernels** or its **internal thread pool**
2. Returning results asynchronously via **callback queues**
3. Coordinating everything through the **event loop**

This gives Node.js its hallmark feature:

### **Non‑Blocking I/O with a Single JavaScript Thread**

---

# **Chapter 3 — Callback Queues & Thread Pool**

### **Callback Queues**

libuv maintains **multiple queues**, such as:

- **Timers Queue** — setTimeout / setInterval
- **Poll Queue** — I/O callbacks
- **Check Queue** — setImmediate
- **Close Callback Queue** — socket/stream closures
- **Microtask Queues** — nextTick & Promises

These queues feed tasks into V8’s **call stack** when it becomes empty.

### **Thread Pool**

Used for CPU-heavy or blocking operations such as:

- fs.readFile
- Crypto operations
- DNS (non-UDP) lookups
- Compression/uncompression

Thread pool size defaults to **4**, but can be increased via:

```
process.env.UV_THREADPOOL_SIZE = 8;
```

---

# **Chapter 4 — The Event Loop (The Heart of Node.js)**

```
                     EVENT LOOP
 ┌────────────────────────────────────────────────┐
 │ 1. Timers Phase      — setTimeout, setInterval │
 │ 2. Poll Phase        — I/O callbacks, fs, HTTP │
 │ 3. Check Phase       — setImmediate callbacks  │
 │ 4. Close Callbacks   — 'close' events          │
 └────────────────────────────────────────────────┘
```

---

# **Chapter 5 — Phase 1: Timers Phase**

Runs callbacks scheduled using:

- `setTimeout()`
- `setInterval()`

Timers are checked for eligibility — **not exact time guarantees**, due to event loop load.

Example:

```
setTimeout(() => console.log("timer"), 0);
```

Will run in the **timer phase**, but only after:

- all microtasks
- final synchronous execution

---

# **Chapter 6 — Phase 2: Poll Phase (The Most Important Phase)**

Poll phase performs:

- Processing of **I/O callbacks**
- Handling **incoming connections**
- Handling **data events** (HTTP, TCP, UDP)
- Returning results of `fs.readFile`, crypto operations, etc.

### **Poll Phase Waiting Conditions**

Poll is the **only phase where Node.js may pause**:

Poll waits when BOTH are true:

1. **No timers are scheduled**
2. **Poll queue is empty**

```
if (no timers && poll queue empty)
      → event loop waits for OS events
```

This explains why Node.js doesn’t consume CPU unnecessarily.

---

# **Chapter 7 — Phase 3: Check Phase (setImmediate)**

Callbacks registered with:

```
setImmediate(() => ...)
```

are executed **after the poll phase**, making them predictable.

Use `setImmediate()` when:

- You want a callback to run _after_ I/O events
- You need to break long tasks into cycles

---

# **Chapter 8 — Phase 4: Close Callbacks**

Handles events such as:

```
socket.on("close", ...)
stream.on("close", ...)
```

Used for cleanup operations.

---

# **Chapter 9 — Microtasks: process.nextTick() & Promises**

### **Microtasks are always executed before the next loop phase.**

Order of microtasks:

1. `process.nextTick()`
2. Promises (`.then()`, `.catch()`, `.finally()`)

```
For EACH phase:
    run all process.nextTick()
    run all Promise microtasks
    THEN proceed to next phase
```

This means `process.nextTick()` can **starve the event loop** if used excessively.

---

# **Chapter 10 — Full Event Loop Cycle**

```
START
 │
 ├─► Run Synchronous Code
 │
 ├─► Run microtasks:
 │     ├─ process.nextTick()
 │     └─ Promise callbacks
 │
 ├─► Phase 1: Timers
 │     └─ Run eligible timer callbacks
 │
 ├─► Phase 2: Poll
 │     ├─ Handle I/O callbacks
 │     ├─ If empty & no timers → WAIT here
 │     └─ Else → continue
 │
 ├─► Phase 3: Check
 │     └─ Run setImmediate callbacks
 │
 ├─► Phase 4: Close Callbacks
 │     └─ socket.on("close"), stream cleanup
 │
 └─► LOOP BACK
```

---

# **Chapter 11 — Example: Combined Execution Order**

```
a = 100
Last line of file
process.nextTick
promise
Timer expired
setImmediate
File Reading CB
```

General guaranteed order:

```
1. Synchronous code
2. process.nextTick()
3. Promise microtasks
4. setTimeout / setInterval
5. I/O Poll callbacks
6. setImmediate()
7. Close callbacks
```

---

# **Chapter 12 — Why libuv Makes Node.js Powerful**

libuv gives JavaScript:

- **Concurrency with a single thread**
- **Non-blocking file & network I/O**
- **Thread pool for heavy work**
- **Efficient event loop scheduling**
- **Cross-platform compatibility**

Without libuv, Node.js would not be asynchronous or scalable.

---

