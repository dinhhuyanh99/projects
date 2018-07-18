'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	Rooms = mongoose.model('Rooms');

var ElectricBillSchema = new Schema({
	billId: {
		type: Schema.Types.ObjectId,
		default: new mongoose.Types.ObjectId()
	},
	roomId: {
		type: Schema.Types.ObjectId,
		ref: 'Rooms'
	},
	month: {
		type: String,
		enum: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
		required: 'Vui lòng cung cấp thông tin về tháng cho hóa đơn điện!'
	},
	year: {
		type: Number,
		required: 'Vui lòng cung cấp năm của hóa đơn điện!'
	},
	prevNumber: {
		type: Number,
		required: 'Vui lòng cung cấp số điện tháng trước!'
	},
	currentNumber: {
		type: Number,
		required: 'Vui lòng cung cấp số điện tháng này!'
	},
	contigentNumber: {
		type: Number,
		default: 0
	},
	overallElectricFee: {
		type: Number,
		required: 'Vui lòng nhập giá tiền trên 1 số điện!'
	},
	totalBill: {
		type: Number,
		default: 0
	}
});


ElectricBillSchema.pre('save', function(next){
	this.contigentNumber = this.get('currentNumber') - this.get('prevNumber');
	this.totalBill = this.get('contigentNumber') * this.get('overallElectricFee');
	next();
});

module.exports = mongoose.model('ElectricBills', ElectricBillSchema);