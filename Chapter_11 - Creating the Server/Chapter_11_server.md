# Creating a Server

---

# 🖥️ 1. What is a Server?

A **server** can mean:

## **1. Hardware Server**

A physical computer that stores data and provides services to other computers (clients).

## **2. Software Server**

A program that:

- Listens for incoming client requests
- Processes them
- Sends back responses

Examples:

- Node.js HTTP server
- Apache
- Nginx

---

# ☁️ 2. Deploying Applications on a Server

When someone says **"deploy your app on a server"**, they mean:

### ✔ 1. Hardware

A machine with:

- CPU
- RAM
- Disk

### ✔ 2. Operating System

Linux / Windows

### ✔ 3. Server Software

The program that serves requests—Node.js, Express, Apache, etc.

### ✔ AWS Example

AWS EC2 = Renting a virtual server from Amazon.

---

# 👩‍💻 3. Client–Server Architecture

### How it works:

1. A client (browser, app) wants data → opens **a socket connection**
2. Every client & server has an **IP address**
3. Server software listens for requests
4. Server responds → socket is closed

```
Client (browser)
    |
    | open TCP socket
    ▼
Server (HTTP app)
    |
    | send response
    ▼
Close connection
```

Each request uses a **new socket** unless using WebSockets.

---

# 🌐 4. Understanding Protocols

Protocols = Rules for communication.

Examples:

- **FTP** → file transfer
- **SMTP** → email
- **HTTP** → web communication

---

# 📦 5. How Is Data Sent During Requests?

Data is **broken into packets** by TCP/IP.

Node.js uses:

- **Streams** → for continuous data flow
- **Buffers** → for binary data

---

# 🌍 6. Domains, DNS & IP Mapping

Humans use domains → DNS resolves to IP addresses.

Example:

```
youtube.com  → DNS → 142.250.xxx.xxx
```

Then browser connects to that IP using TCP.

---

# 🖥️ 7. Creating Multiple Servers in Node.js

You _can_ create multiple servers — each one must use a **unique port**.

Example:

```
102.209.1.3:3000 → React App
102.209.1.3:3001 → Node API
```

A single machine can run _many servers_, each identified by a **port number**.

### Visual mapping:

```
Domain → IP → Port → Application
```

---

# 🕸️ 8. Sockets vs WebSockets

### 🔌 Sockets (HTTP)

- Open connection
- Send request
- Receive response
- Close connection
- New request → new connection

### 🔁 WebSockets (Real-time)

Persistent connection:

```
Client <=====> Server
```

Ideal for:

- Chats
- Games
- Live dashboards

---

# 🛠️ 9. Creating a Simple Node.js Server

Basic server:

```js
const http = require('node:http');
const port = 3947;

const server = http.createServer((req, res) => {
  res.end('Server Created');
});

server.listen(port, () => {
  console.log('Server running on port ' + port);
});
```

---

# 🎯 10. Handling Routes Manually

```js
const server = http.createServer((req, res) => {
  if (req.url === '/getSecretData') {
    return res.end('Hi');
  }

  res.end('server Created');
});
```

### ❗ Problem:

Manual routing becomes messy.  
**Express** solves this.

---

# ⚡ 11. Why Use Express?

Express simplifies:

- Routing
- Middleware
- JSON handling
- Error handling

Example:

```js
const express = require('express');
const app = express();

app.get('/getSecretData', (req, res) => {
  res.send('Secret data accessed');
});

app.listen(3000, () => console.log('Server running'));
```

---

# 📘 Final Summary

| Topic                 | Key Points                               |
| --------------------- | ---------------------------------------- |
| Server                | Hardware or software handling requests   |
| Deployment            | Needs machine + OS + server software     |
| Client–Server         | Communication via TCP/IP sockets         |
| Data Transfer         | Packets, streams, buffers                |
| DNS                   | Maps domain → IP                         |
| Multiple Servers      | Handled using ports                      |
| Sockets vs WebSockets | Single request vs persistent connection  |
| Node Server           | `http.createServer`                      |
| Express               | Framework to simplify server development |

---

