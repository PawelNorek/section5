const socket = io.connect('http://192.168.1.191:3001')

socket.on('init', initData => {
	// console.log(initData)
	orbs = initData.orbs
})
