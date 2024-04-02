import { Server } from "socket.io"
import http from 'http'
import express from "express"
import env from 'dotenv'
import cors from 'cors'
import api from './routes/web.js'
import connectMongoDB from './config/db.js'


env.config()
const app = express();
const port = process.env.PORT
const server = http.createServer(app)
const io = new Server(server, { cors: '*' })

connectMongoDB()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('uploads'))
app.use('/api', api)

io.on('connection', socket => {
  console.log(socket.id, 'connected');
  socket.on('disconnect', () => {
    console.log(socket.id, 'disconnected');
  });
})



server.listen(port, () => {
  console.log(`http://localhost:${port}`);
});

export { io }
