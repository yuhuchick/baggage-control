const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const fs = require('fs');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

wss.on('connection', function connection(ws) {
  console.log('WebSocket connected');

  const videoStream = fs.createReadStream(__dirname + '/video.mp4');

  videoStream.on('data', function(data) {
    // 将视频流数据发送到WebSocket客户端
    ws.send(data, { binary: true, mask: false });
  });

  ws.on('close', function close() {
    console.log('WebSocket disconnected');
    videoStream.destroy();
  });
});

server.listen(3001, function () {
  console.log('WebSocket server listening on port 3001');
});
