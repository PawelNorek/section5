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
const playersForUsers = []
let tickTockInterval

initGame()

io.on('connect', socket => {
	let player = {}
	socket.on('init', (playerObj, ackCallback) => {
		if (players.length === 0) {
			tickTockInterval = setInterval(() => {
				io.to('game').emit('tick', playersForUsers)
			}, 33)
		}
		socket.join('game')
		const playerName = playerObj.playerName
		const playerConfig = new PlayerConfig(settings)
		const playerData = new PlayerData(playerName, settings)
		player = new Player(socket.id, playerConfig, playerData)
		// console.log(player)
		players.push(player)
		playersForUsers.push({ playerData })
		ackCallback({ orbs, indexInPlayers: playersForUsers.length - 1 })
	})

	socket.on('tock', data => {
		if (!player.playerConfig) {
			return
		}
		const speed = player.playerConfig.speed
		const xV = (player.playerConfig.xVector = data.xVector)
		const yV = (player.playerConfig.yVector = data.yVector)

		if ((player.playerData.locX < 5 && xV < 0) || (player.playerData.locX > 500 && xV > 0)) {
			player.playerData.locY -= speed * yV
		} else if ((player.playerData.locY < 5 && yV > 0) || (player.playerData.locY > 500 && yV < 0)) {
			player.playerData.locX += speed * xV
		} else {
			player.playerData.locX += speed * xV
			player.playerData.locY -= speed * yV
		}
	})

	socket.on('disconnect', () => {
		//Check to see if players is empty. If so, stop ticking.
		if (players.length === 0) {
			clearInterval(tickTockInterval)
		}
	})
})

function initGame() {
	for (let i = 0; i < settings.defaultNumberOfOrbs; i++) {
		orbs.push(new Orb(settings))
	}
}
