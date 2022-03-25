const express = require("express")
const app = express();
const http=require("http")
const {Server}=require("socket.io")
const cors = require("cors")

app.use(cors())
app.use(express.json())

const server = http.createServer(app);

const io = new Server(server, {
	cors: {
		origin: "http://localhost:3000",
		methods:["GET","POST"],
	}
})

io.on("connection", (socket) => {
	console.log(`User connected:${socket.id}`)
	socket.on("send_message", (data) => {
		console.log(data.message);
		socket.broadcast.emit("receive_message", {
      backendData: `this is from backend${data.message}`,
    });
		
	})
	
})

server.listen(3001, () => {
	console.log("server is running")
})






