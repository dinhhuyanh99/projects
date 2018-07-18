'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var RoomSchema = new Schema({
	roomId: {
		type: Schema.Types.ObjectId,
		default: new mongoose.Types.ObjectId()
	},
	roomName: {
		type: String,
		required: 'Vui lòng nhập tên phòng!'
	},
	numberOfTenants: {
		type: Number,
		default: 0
	},
	price: {
		type: Number,
		required: 'Vui lòng nhập giá phòng!'
	}
});

module.exports = mongoose.model('Rooms', RoomSchema);