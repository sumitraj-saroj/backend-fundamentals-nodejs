//http server
const http = require("node:http");
const port = 3636;


const server = http.createServer(function (req, res) {
    if (req.url === "/getSecretData") {
        res.end("There is no scret data");
    }
    res.end("server Created");
})

server.listen(port, () => {
    console.log("Server running on port " + port);
})
