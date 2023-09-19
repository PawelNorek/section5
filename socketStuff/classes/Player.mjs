class Player {
	/**
	 * Represents a player in a game.
	 * @constructor
	 * @param {string} socketId - The player's socket ID.
	 * @param {Object} playerConfig - The player's configuration data.
	 * @param {Object} playerData - The player's game data.
	 */
	constructor(socketId, playerConfig, playerData) {
		this.socketId = socketId
		this.playerConfig = playerConfig
		this.playerData = playerData
	}
}

export default Player
