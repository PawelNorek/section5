const socket = io.connect('http://192.168.1.191:3001')

const init = async () => {
	const initOrbs = await socket.emitWithAck('init', {
		playerName: player.name,
	})
	orbs = initOrbs
	draw()
}

socket.on('initReturn', initData => {
	// console.log(initData)
})
