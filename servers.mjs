//Agar.io clone

import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'

const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer)

import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.use(express.static(__dirname + '/public'))

io.on('connection', socket => {
	socket.on('event', () => {})
})

httpServer.listen(3001)

//App organization
//servers.mjs is not the entry point. It creates servers and exports them.

export { app, io, httpServer }
