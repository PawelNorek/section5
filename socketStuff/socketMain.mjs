//Main entry point for socket.io stuff

import { io, app } from '../servers.mjs'

import Orb from './classes/Orb.mjs'

const orbs = []

initGame()
// console.log(orbs)

io.on('connect', socket => {
	socket.emit('init', { orbs })
})

function initGame() {
	for (let i = 0; i < 500; i++) {
		orbs.push(new Orb())
	}
}
