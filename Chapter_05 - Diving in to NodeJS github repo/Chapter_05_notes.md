
# Diving into the Node.js GitHub Repo  

---

## 1. Why Node.js Wraps Your Module Code  
Node.js wraps every module inside a function before executing it.  
This wrapper function creates **module privacy**.

```js
(function (exports, require, module, __filename, __dirname) {
    // your module code
});
```

Because of this:

- You **cannot access** another module’s variables/functions unless exported.  
- Each file runs in its own sandboxed environment.

---

## 2. IIFE (Immediately Invoked Function Expression)

### What is an IIFE?
A function that executes immediately after creation:

```js
(function () {
    console.log("runs immediately");
})();
```

### Why Node.js uses an IIFE:
- Creates a **private scope**  
- Avoids polluting global space  
- Keeps variables/functions protected  
- Enables module encapsulation

---

## 3. Module Privacy in Node.js  
Variables & functions are private because:

- They live **inside the wrapper function**  
- Only what you put inside **module.exports** becomes public

Example:

```js
const a = 10; // private

module.exports = {
  value: a
};
```

---

## 4. How `module.exports` Works  
Node injects special parameters into your module:

```
(exports, require, module, __filename, __dirname)
```

Your file runs inside this:

```js
(function(exports, require, module){
    // your code here
})();
```

Anything assigned to `module.exports` is returned when the module is required.

---

## 5. The `require()` Mechanism (5 Step Process)

### 1. Resolve  
Node figures out which file you meant:

- direct path  
- search in `node_modules`  
- supports `.js`, `.json`, `.node`

### 2. Load  
Loads the file from disk based on type.

### 3. Wrap  
Adds the wrapper function (IIFE)(Compliation step).

### 4. Evaluate  
Executes the file → sets `module.exports`.

### 5. Cache  
Stores the module in `require.cache`.

---

## 6. Module Caching  
Once a module is required:

- It executes **only once**  
- Future requires return the cached `module.exports`  
- Boosts performance & avoids duplicate execution

To clear cache manually:

```js
delete require.cache[require.resolve("./counter")];
```

---

## 7. Summary Table

| Concept | Description |
|--------|-------------|
| **IIFE** | Wraps code, provides privacy |
| **Module Privacy** | Achieved by wrapper + exports |
| **module.exports** | Controls what is public |
| **require() steps** | Resolve → Load → Wrap → Run → Cache |
| **Caching** | Ensures modules run only once |

---



