# Deep Dive into the V8 JavaScript Engine

---

# **1. Introduction to V8 JavaScript Engine**

V8 is Google’s open-source, high-performance JavaScript engine written in C++.  
It powers:

- **Google Chrome**
- **Node.js**
- **Deno**
- **Electron apps**

Its job is to **parse**, **interpret**, **optimize**, and **execute** JavaScript efficiently.

Two major internal components (as shown in handwritten notes):

- **V8 JavaScript Engine**
- **libuv** (event loop, thread pool)

---

# **2. Full Execution Pipeline of V8**

Here is the complete high-level architecture:

```
 JavaScript Source Code
          │
          ▼
     [Parsing Stage]
  (Tokenization + AST)
          │
          ▼
 [Ignition Interpreter]
 (Produces Bytecode)
          │
          ▼
   Runtime Profiling
 (Finds Hot Code Paths)
          │
          ▼
   [TurboFan Compiler]
 (Optimizes Hot Bytecode
 into Machine Code)
          │
          ▼
   Speculation Check
 (If assumptions break →
   deopt → Ignition)
          │
          ▼
      Execution
```

This pipeline matches both the handwritten notes and the PDF.

---

# **3. Parsing Stage — Tokenization + AST Generation**

### **3.1 Lexical Analysis (Tokenization)**

Purpose: break code into **tokens**.

Example:

```
var a = 10;
```

Tokens:

- `var` (keyword)
- `a` (identifier)
- `=` (operator)
- `10` (literal)
- `;` (punctuation)

Both documents emphasize tokenization as the first step.

---

### **3.2 Syntax Analysis → AST**

Token stream is converted into an **Abstract Syntax Tree**.

ASCII example:

```
VariableDeclaration
 ├─ Identifier (a)
 └─ Literal (10)
```

AST diagrams appear in both PDF and handwritten notes.

---

### **3.3 Why Syntax Errors Happen**

If V8 sees a token that doesn’t fit the grammar, it **cannot build the AST**, so it throws a syntax error.

---

# **4. Interpreted vs Compiled vs JIT — Where JavaScript Fits**

### **4.1 Interpreted Languages**

- Run line-by-line (slower overall)
- Fast to start execution  
  Example: Python

### **4.2 Compiled Languages**

- Transformed to machine code before running
- Slow startup, fast execution  
  Example: C++

### **4.3 JavaScript — A Hybrid Language**

JavaScript uses **both interpretation and compilation**:

| Stage             | Engine Component | Purpose                              |
| ----------------- | ---------------- | ------------------------------------ |
| Initial execution | **Ignition**     | Fast startup (interpreting bytecode) |
| Repeated code     | **TurboFan**     | JIT optimization to machine code     |

This hybrid model is why JS feels dynamic yet fast.

---

# **5. Ignition Interpreter — Bytecode Engine**

Ignition converts AST → Bytecode.

ASCII illustration:

```
AST
 │
 ▼
[Ignition Interpreter]
 │
 ▼
Bytecode
```

Reasons for bytecode:

- Faster than parsing raw JavaScript
- Less memory-heavy than older engines (like Chrome’s earlier full compiler)

Ignition executes bytecode **while collecting feedback** about:

- frequently used functions
- variable types
- shapes of objects (monomorphic, polymorphic)

This layer is essential for the JIT (TurboFan).

---

# **6. Runtime Profiling — Finding Hot Code**

Ignition watches execution and records:

- Which functions run often
- Which property shapes are used
- Which parameter types appear consistently

This is called **runtime feedback** or **type feedback**.

When a function becomes "hot," it is sent to TurboFan.

---

# **7. TurboFan — The Optimizing Compiler**

TurboFan compiles hot bytecode → optimized machine code.

### **7.1 What TurboFan Does**

- Performs **speculative optimization**
- Removes unnecessary checks
- Specializes code based on observed types

Example assumption:

```
sum(10, 5)
sum(2, 5)
sum(7, 6)
```

TurboFan may optimize assuming parameters are **numbers**.

---

# **8. Deoptimization — When Assumptions Break**

If a function later receives unexpected types:

```
sum("a", "b")
```

TurboFan must **discard** the optimized version and fall back to Ignition.

ASCII model:

```
TurboFan optimized code
       │
assumption breaks
       ▼
Deoptimization
       ▼
Back to Ignition
```

This ensures correctness.

---

# **9. Inline Cache (IC) — Speeding Up Property Access**

One of the most important optimizations in V8.

### **9.1 What is Property Access?**

Examples:

```
user.name
obj.value
```

### **9.2 How Inline Cache Works**

If the engine repeatedly accesses the same property shape:

```
user.name
```

IC stores the lookup result → future lookups become faster.

Types of inline caches:

- Monomorphic (1 shape)
- Polymorphic (2–4 shapes)
- Megamorphic (many shapes)

---

# **10. Copy Elision — Removing Temporary Copies**

Copy elision eliminates unnecessary temporary objects.

### **10.1 Without Copy Elision**

```
temp object allocation
copy → final object
extra GC load
```

### **10.2 With Copy Elision**

```
directly construct object in final location
```

Reduces:

- memory usage
- allocations
- GC pressure

---

# **11. Garbage Collection — V8 Memory Management**

V8 uses generational garbage collection.

Handwritten notes list:

- **Scavenger (Minor GC)**
- **Mark-Sweep / Mark-Compact (Major GC)**
- **Orinoco GC System**

---

## **11.1 Minor GC — Scavenger**

Works on **young generation** objects.

Characteristics:

- very fast
- uses **semi-space copying algorithm**
- ideal for short-lived objects

---

## **11.2 Major GC — Mark-Sweep & Mark-Compact**

Works on **old generation** (long-lived objects).

### Mark-Sweep

- marks reachable objects
- sweeps unreferenced ones

### Mark-Compact

- compacts memory
- prevents fragmentation

---

## **11.3 Orinoco — Modern GC System**

Improves:

- concurrency
- parallelism
- pause time
- latency

Includes:

- **concurrent marking**
- **parallel compaction**
- **incremental marking**
- **idle-time GC**

---

# **12. V8 Architecture**

```
              ┌──────────────────────────┐
              │     JavaScript Code       │
              └─────────────┬────────────┘
                            ▼
                    ┌───────────────┐
                    │   Parsing      │
                    │ (Tokens + AST) │
                    └───────────────┘
                            │
                            ▼
              ┌─────────────────────────────┐
              │     Ignition Interpreter     │
              │  - Converts AST → Bytecode   │
              │  - Executes bytecode         │
              │  - Collects type feedback    │
              └─────────────────────────────┘
                            │
                            ▼
           ┌────────────────────────────────────┐
           │      Runtime Profiling              │
           │  - Identifies hot functions         │
           └────────────────────────────────────┘
                            │ hot
                            ▼
              ┌──────────────────────────────┐
              │        TurboFan JIT           │
              │ - Optimizes bytecode          │
              │ - Generates machine code      │
              └──────────────────────────────┘
                            │
             assumptions ok │   │ broken
                            ▼   ▼
                       Fast Execution
                               │
                               ▼
                         Deoptimization
                               │
                               ▼
                          Ignition
```

---

# **13. Short Summary**

| Component                   | Purpose                                      |
| --------------------------- | -------------------------------------------- |
| **Parser**                  | converts JS → tokens → AST                   |
| **Ignition**                | converts AST → bytecode; executes; profiles  |
| **TurboFan**                | optimizes hot code into machine code         |
| **Inline Cache**            | speeds up repeated property access           |
| **Copy Elision**            | prevents temporary object creation           |
| **Scavenger GC**            | cleans young objects                         |
| **Mark-Sweep / Compact GC** | cleans long-lived objects                    |
| **Orinoco**                 | parallel + incremental GC for low pause time |

---

