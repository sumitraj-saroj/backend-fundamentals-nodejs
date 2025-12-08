# Chapter 04 Notes

### Importing & Exporting in Node.js

---

## 1. What Are Modules?

- A **module** is a separate file whose variables and functions are _private by default_.
- Only what you export using `module.exports` (CJS) or `export` (ESM) becomes public.
- Helps prevent variable/function leakage.

---

## 2. Importing in CommonJS (CJS)

### Basic Import

```js
const greet = require('./greet');
greet('World');
```

### How `require` Works

- Loads & executes the required file.
- Only returns what is inside **module.exports**.
- Anything not exported remains private.

Example:

```js
// data.js
const secret = 'hidden';
module.exports = 'visible';
```

`secret` cannot be accessed from outside.

---

## 3. Exporting in CommonJS

### Single Export

```js
module.exports = calculateSum;
```

### Multiple Exports

Two ways:

1. **Object Export**

```js
module.exports = {
  x,
  calculateSum,
};
```

2. **Named Export via Assignment**

````js
module.exports.x = x;
module.exports.calculateSum = calculateSum;


---

## 4. Importing Multiple Exports
### Without Destructuring
```js
const obj = require("./utils");
obj.calculateSum(5, 3);
````

### With Destructuring

```js
const { x, calculateSum } = require('./utils');
```

(Page 1)

---

## 5. Making a Folder a Module

Folder structure:

```
/calculate
   ├── multiply.js
   └── index.js
```

Example:

```js
// multiply.js
const multiply = (a, b) => a * b;
module.exports = { multiply };

// index.js
module.exports = { multiply };
```

Importing:

```js
const { calculateSum } = require('./calculate');
```

---

## 6. CommonJS vs ES Modules (From page 2 handwritten table)

### **CommonJS (CJS)**

- Uses: `require`, `module.exports`
- Default in Node.js
- Synchronous
- Older way
- Non-strict mode by default

### **ES Modules (ESM / .mjs)**

- Uses: `import`, `export`
- Default in React/Angular
- Asynchronous options available
- Newer way
- Strict mode enabled
- To use inside Node.js:

```json
{
  "type": "module"
}
```

---

## 7. Importing/Exporting in ES Modules

### Exporting

```js
export function greet(name) {
  return `Hello, ${name}`;
}
```

### Importing

```js
import { greet } from './module.mjs';
```

---

## 8. Strict Mode Notes (Page 3)

- In strict mode, direct assignment without declaration like:  
  `z = 10` ❌ not allowed.  
  Must use:  
  `let z = 10` ✔️
- ES Modules run in strict mode automatically.
- CommonJS modules are **not strict by default**, but can be strict if specified.

---

## 9. Summary

- `module.exports` exposes data from a file in CJS.
- `require()` imports that data.
- ESM uses `export` and `import`.
- `.cjs` vs `.mjs` is simply a difference in module system.
- Use ESM (`import/export`) for new projects and CJS for older/Node-specific codebases.

---
