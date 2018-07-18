'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	Rooms = mongoose.model('Rooms');

var TenantSchema = new Schema({
	tenantId: {
		type: Schema.Types.ObjectId,
		default: new mongoose.Types.ObjectId()
	},
	roomId: {
		type: Schema.Types.ObjectId,
		ref: 'Rooms'
	},
	name: {
		type: String,
		required: 'Vui lòng nhập tên của người thuê!'
	},
	dateOfBirth: {
		type: Date,
		required: 'Vui lòng nhập ngày tháng năm sinh của người thuê!'
	},
	phoneNumber: {
		type: String,
		required: 'Vui lòng nhập số điện thoại của người thuê!'
	},
	personalId: {
		type: String,
		unique: true,
		required: 'Vui lòng nhập số chứng minh thư nhân dân của người thuê!'
	},
	homeAddress: {
		type: String,
		default: 'Không có thông tin!'
	},
	startOfContractDate: {
		type: Date,
		required: 'Vui lòng nhập ngày bắt đầu hợp đồng thuê nhà!'
	},
	lengthOfContract: {
		type: Number,
		required: 'Vui lòng nhập thời hạn của hợp đồng!'
	},
	endOfContract: {
		type: Date
	}
});

TenantSchema.pre('save', function(next){
	this.endOfContract = new Date();
	this.endOfContract.setMonth(this.startOfContractDate.getMonth() + this.lengthOfContract);
	next();
});

TenantSchema.post('save', function(){
	Rooms.findOne({roomId: this.roomId}, function(err, result){
		if(err){
			return err;
		}
		Rooms.findOneAndUpdate({roomId: result.roomId}, {numberOfTenants: result.numberOfTenants + 1}, {new: true}, function(err){
			if(err){
				return err;
			}
		});
	});
});

module.exports = mongoose.model('Tenants', TenantSchema);