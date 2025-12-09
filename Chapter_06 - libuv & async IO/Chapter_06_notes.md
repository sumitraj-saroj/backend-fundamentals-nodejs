# Chapter 06 – Libuv & Async IO 

## 1. JavaScript: A Synchronous, Single‑Threaded Language
- JavaScript runs on **one thread** → executes **one line at a time**.
- Uses:
  - **Call Stack** → where code executes.
  - **Memory Heap** → stores variables, objects, functions.
  - **Garbage Collector** → automatically frees unused memory.
- JavaScript engine (e.g., V8) **does NOT have timers**. It cannot wait.
-  “Time, tide & JavaScript waits for none.”

---

## 2. Synchronous vs Asynchronous Systems
### **Synchronous System**
- Tasks execute **one after another** (blocking).

### **Asynchronous System**
- Tasks run **independently** without blocking.

---

## 3. How JS Executes Code Internally
### **Execution Stages**
1. **Global Execution Context (GEC) creation**
2. **Memory phase** → variables assigned `undefined`
3. **Code execution phase**
4. **Function Execution Context (FEC)**
   - Created when function called
   - Pushed/popped on call stack
   - Parameters + local memory created
5. After completion → GEC removed → program ends

---

## 4. The Problem: JS Cannot Perform Asynchronous IO Alone
- The V8 engine **cannot**:
  - Access OS files
  - Talk to databases
  - Handle timers
  - Make network requests



**Solution → Node.js + Libuv**

---

## 5. What is Libuv?
> **Libuv is a C library that provides asynchronous I/O using an event loop.**


### Libuv provides:
- Thread pool for heavy tasks
- Handles:
  - File system operations
  - Network requests
  - Timers (setTimeout, setInterval)
  - DNS resolution
- Non-blocking I/O
- Event loop → manages async callbacks

It is the "superhero" bridging JS and the Operating System.

---

## 6. How Asynchronous Code Actually Runs
### Example from notes:
```js
https.get("https://api.fbi.com", (res) => {
  console.log("Secret data", res.secret);
});

setTimeout(() => {
  console.log("Wait 5 seconds");
}, 5000);

fs.readFile("./gossip.txt", "utf8", (data) => {
  console.log("File data", data);
});

let c = multiplyFn(a, b);
console.log(c);
```

### Execution Flow
1. JS engine executes synchronous lines (`a`, `b`, function calls).
2. When encountering async tasks:
   - **V8 hands task to Libuv.**
   - Libuv registers callback into the **event loop**.
   - JS continues executing next lines.
3. Once async operations finish:
   - Libuv pushes callbacks into the **callback queue**.
   - Event loop checks if call stack is empty.
   - If empty → pushes callback onto the stack → executes.

---

## 7. Event Loop in Node.js 
Libuv event loop phases:

1. **Timers phase** → executes callbacks from `setTimeout`, `setInterval`
2. **Pending callbacks**
3. **Idle / prepare**
4. **Poll phase** → gets new I/O events
5. **Check phase** → `setImmediate`
6. **Close callbacks**

Node.js repeatedly cycles through these phases until no work remains.

---

## 8. Summary
- JavaScript = single-threaded & synchronous by default.
- Node.js = adds superpowers via **Libuv** for async, non-blocking I/O.
- Libuv handles:
  - File system  
  - Network  
  - Timers  
  - Thread pool  
- Event loop ensures async callbacks run efficiently.
- This makes Node.js extremely fast for I/O-heavy applications.

---

## 9. Why Non-blocking I/O Is Important
- Server can handle thousands of requests without waiting.
- Perfect for real-time apps:  
  Chat apps, streaming, servers, APIs, databases.

---


