//Main entry point for socket.io stuff

import { io, app } from '../servers.mjs'

import Player from './classes/Player.mjs'
import PlayerConfig from './classes/PlayerConfig.mjs'
import PlayerData from './classes/PlayerData.mjs'

import Orb from './classes/Orb.mjs'

const orbs = []
const settings = {
	defaultNumberOfOrbs: 500,
	defaultSpeed: 6,
	defaultSize: 6,
	defaultZoom: 1.5,
	worldWidth: 500,
	worldHeight: 500,
	defaultGenericOrbSize: 5,
}

const players = []

initGame()
// console.log(orbs)

io.on('connect', socket => {
	socket.on('init', (playerObj, ackCallback) => {
		const playerName = playerObj.playerName
		const playerConfig = new PlayerConfig(settings)
		const playerData = new PlayerData(playerName, settings)
		const player = new Player(socket.id, playerConfig, playerData)
		players.push(player)
		ackCallback(orbs)
	})
})

function initGame() {
	for (let i = 0; i < settings.defaultNumberOfOrbs; i++) {
		orbs.push(new Orb(settings))
	}
}
