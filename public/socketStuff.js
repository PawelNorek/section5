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
	if (players[player.indexInPlayers].playerData) {
		player.locX = players[player.indexInPlayers].playerData.locX
		player.locY = players[player.indexInPlayers].playerData.locY
	}
})

socket.on('orbSwitch', orbData => {
	orbs.splice(orbData.capturedOrbI, 1, orbData.newOrb)
})

socket.on('playerAbsorbed', absorbedData => {
	document.querySelector(
		'#game-message'
	).innerHTML = `${absorbedData.absorbed} was absorbed by ${absorbedData.absorbedby}`
	document.querySelector('#game-message').style.opacity = 1
	window.setTimeout(() => {
		document.querySelector('#game-message').style.opacity = 0
	}, 2000)
})

socket.on('updateLeaderBoard', leaderBoardArray => {
	// console.log(leaderBoardArray)
	leaderBoardArray.sort((a, b) => {
		return b.score - a.score
	})
	document.querySelector('.leader-board').innerHTML = ''
	leaderBoardArray.forEach(p => {
		if (!p.name) {
			return
		}
		document.querySelector('.leader-board').innerHTML += `
		<li class="leaderboard-player">${p.name} - ${p.score}</li>
		`
	})
})
