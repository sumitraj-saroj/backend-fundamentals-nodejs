# Namaste Node.js – Episode 2 (Combined Notes)

## 1. JavaScript on the Server (From PDF + Provided Content)

### What is a Server?
- A server provides data, resources, or services to clients over a network.
- In Node.js, servers primarily handle and respond to **HTTP requests**.
- Due to its **event-driven, non-blocking I/O model**, Node.js:
  - Handles many client requests efficiently.
  - Avoids thread creation per request.
  - Improves performance and scalability.

---

## 2. Node.js as JS on the Server (PDF Notes) fileciteturn0file0
- Node.js is essentially a **C++ application** with the **V8 engine embedded** inside it.
- V8 (Google’s JS & WebAssembly engine) is written in **C++**, making it embeddable in any C++ program.
- Node.js extends V8 by providing:
  - **Server-side APIs**
  - **System-level access**
  - **Superpowers not available in browsers**

### Diagram Explanation 
```
NodeJS (C++)
 ├── V8 (C++)
 └── Super Powers (APIs on Server)
```

---

## 3. The V8 JavaScript Engine (From Summary + PDF)
- V8 is Google's **high-performance JS engine**, used in Chrome and Node.js.
- Performs:
  - **Parsing → AST creation**
  - **IR (Intermediate Representation) generation**
  - **JIT compilation → Machine code**
- Includes garbage collection for efficient memory management.

---

## 4. Code Execution: High-Level to Machine Code
### JavaScript (high‑level)
Needs to be converted into:
- **Assembly code**
- **Machine code (binary)**

V8 handles this conversion internally.

---

## 5. ECMA Script Standards (From PDF Page 2) fileciteturn0file0
JavaScript engines follow **ECMAScript** standards.

Examples:
- **V8** – Chrome, Node.js
- **SpiderMonkey** – Firefox
- **Chakra** – Microsoft
- **JavaScriptCore** – Safari

---

## 6. Summary
- Node.js = C++ program with V8 embedded.
- V8 executes JavaScript by converting it to machine code.
- Node.js adds APIs to allow JS to run on servers.
- Follows ECMAScript standards to maintain consistency across engines.

---



