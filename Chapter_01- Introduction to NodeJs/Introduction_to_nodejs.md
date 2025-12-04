# Node.js
## What is Node.js?
- Node.js is a **JavaScript runtime environment** built on Chrome’s **V8 engine**.
- Allows JavaScript to run **outside the browser**.
- Maintained by the **OpenJS Foundation**.
- Originally designed to **“Run JS everywhere.”**

# Key Features of Node.js

## 1. Event-Driven Architecture
- Uses an **event-driven** design.
- Execution happens through **event loops** and **callbacks**.
- Ideal for apps handling **multiple concurrent operations**.

## 2. Asynchronous / Non-Blocking I/O
- Performs operations **asynchronously**.
- **Non-blocking:** Node doesn’t wait for tasks such as:
  - File reading
  - Database queries
  - Network requests
- Greatly improves **performance and scalability**.

## 3. Built on the V8 Engine
- Uses Google Chrome’s high-speed **V8 engine**.
- Early prototypes used **SpiderMonkey**, but V8 became final choice due to performance.

# Why Node.js?
### Before Node:
- Servers like **Apache** used **blocking I/O**.
- Each request consumed a thread → inefficient for scalability.

### With Node.js:
- **Non-blocking I/O**
- **Single-threaded** event loop system
- Can handle **thousands of concurrent requests** using fewer system resources.

# History & Evolution of Node.js

## 2009 – Creation
- Created by **Ryan Dahl**.
- First supported on **macOS** and **Linux**.
- Financial support from **Joyent**.

## 2010 – Introduction of NPM
- Created by **Isaac Schlueter**.
- Became default package manager for Node.js.
- Simplified dependency management and library sharing.

## 2011 – Windows Support
- Collaboration with **Microsoft** enabled Node.js + npm on Windows.

## 2012–2014 – Leadership Change
- Ryan Dahl stepped down in **2012**.
- Joyent took leadership.
- Development slowed due to internal management issues.

## 2014 – io.js Fork
- Forked due to disagreements & slow progress.
- Created by **Fedor Indutny**.
- io.js focused on:
  - Faster releases
  - Community-driven development
  - Latest V8 versions

## 2015 – Reunification
- Node.js and io.js communities merged.
- Resulted in **Node.js v4.0**.
- Formation of the **Node.js Foundation** under The Linux Foundation.

## 2019 – OpenJS Foundation
- Node.js Foundation merged with JS Foundation.
- Formed the **OpenJS Foundation**.
- Maintains:
  - Node.js
  - npm
  - Electron
  - jQuery
  - and more.

# Node.js Architecture Overview
- Originally named **web.js** for building web servers.
- Renamed to **Node.js** to highlight:
  - Modular design
  - Event-driven architecture

# Blocking vs Non-Blocking I/O

## Traditional Servers (Example: Apache)
- **Blocking I/O**
- Threads are blocked until tasks complete.
- Not efficient for large-scale, concurrent apps.

## Node.js
- **Non-blocking I/O**
- Uses a single **event loop thread**
- Efficiently handles **many simultaneous connections**

# Node.js Ecosystem

## NPM – Node Package Manager
- World’s largest package registry.
- Used for:
  - Installing libraries
  - Dependency management
  - Publishing JavaScript packages

