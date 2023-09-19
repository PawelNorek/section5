const socket = io.connect('http://192.168.1.191:3001')

const init = async () => {
	/**
	 * Initializes the game by sending an initialization request to the server and setting up a periodic update of the player's movement vector.
	 *
	 * @returns {void}
	 */
	const initData = await socket.emitWithAck('init', {
		playerName: player.name,
	})
	setInterval(() => {
		socket.emit('tock', {
			xVector: player.xVector ? player.xVector : 0.1,
			yVector: player.yVector ? player.yVector : 0.1,
		})
	})
	orbs = initData.orbs
	player.indexInPlayers = initData.indexInPlayers
	draw()
}

socket.on('tick', playersArray => {
	// console.log(players)
	players = playersArray
	player.locX = players[player.indexInPlayers].playerData.locX
	player.locY = players[player.indexInPlayers].playerData.locY
})
