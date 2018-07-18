var mongoose = require('mongoose'),
	Room = mongoose.model('Rooms'),
	Tenant = mongoose.model('Tenants'),
	ElectricBill = mongoose.model('ElectricBills'),
	WaterBill = mongoose.model('WaterBills');

// Tenants controllers
exports.list_all_tenants = function(req, res){
	Tenant.find({}, function(err, results){
		if(err){
			res.json({"response": "Có vẻ như bạn chưa thêm người thuê nào vào hệ thống!"});
		}
		if(results.length == 0){
			res.json({"response": "Chưa có thông tin về bất kì người thuê nào!"});
		} else {
			res.json({"length": results.length, "list": results});
		}
	});
};

exports.add_a_tenant = function(req, res){
	var new_tenant = new Tenant(req.body);
	new_tenant.save(function(err, tenantDetails){
		if(err){
			res.send(err);
		}
		res.json({"response": "Đã thêm người thuê với thông tin đã cho!", "information": tenantDetails});
	});
};

exports.get_tenant_details = function(req, res){
	Tenant.findOne({tenantId: req.params.tenantId}, function(err, tenantDetails){
		if(err){
			res.json({"response": "Xin lỗi nhưng có vẻ không có người thuê nào với thông tin đã được cung cấp!", "log": err});
		}
		res.json(tenantDetails);
	});
};

exports.update_tenant_details = function(req, res){
	Tenant.findOneAndUpdate({tenantId: req.params.tenantId}, req.body, {new: true}, function(err, updatedDetails){
		if(err){
			res.json({"response": "Xin lỗi nhưng có vẻ ID của người thuê không tồn tại trong hệ thống!", "log": err});
		}
		res.json({"response": "Đã cập nhật thông tin của người thuê!", "information": updatedDetails});
	});
};

exports.delete_tenant_details = function(req, res){
	Tenant.findOne({tenantId: req.params.tenantId}, function(error, result){
		if(error){
			res.json({"response": "Xin lỗi nhưng có vẻ ID của người thuê không tồn tại trong hệ thống!"})
		}
		Room.findOne({roomId: result.roomId}, function(errorDeductingNumberOfTenants, resultOfRemoval){
			if(errorDeductingNumberOfTenants){
				res.json({"response": "Xin lỗi nhưng có vẻ hệ thống gặp vấn đề trong việc xóa người thuê!", "log": errorDeductingNumberOfTenants});
			}
			Room.findOneAndUpdate({roomId: result.roomId}, {numberOfTenants: resultOfRemoval.numberOfTenants - 1}, {new: true}, function(errorInUpdating){
				if(errorInUpdating){
					res.json({"response": "Xin lỗi nhưng có vẻ hệ thống gặp vấn đề trong việc xóa người thuê!", "log": errorInUpdating});
				}
			});
			Tenant.remove({tenantId: result.tenantId}, function(err){
				if(err){
					res.json({"response": "Xin lỗi nhưng có vẻ hệ thông gặp vấn đề trong việc xóa người thuê!", "log": err});
				}
				res.json({"response": "Đã xóa thành công người thuê!"});  
			});
		});
		
	});
	
};

exports.get_room_tenants = function(req, res){
	Room.findOne({roomId: req.params.roomId}, function(error, roomDetails){
		if(error){
			res.json({"response": "Xin lỗi nhưng có vẻ thông tin về phòng với ID đã cung cấp không tồn tại trong hệ thống!", "log": error})
		}
		Tenant.find({roomId: req.params.roomId}, function(err, listOfTenants){
			if(err){
				res.json({"response": "Xin lỗi nhưng có vẻ chưa có ai thuê phòng này!", "log": err});
			}
			res.json({"room": roomDetails, "list": listOfTenants});
		});
	});
	
};


// Rooms controllers
exports.get_all_rooms = function(req, res){
	Room.find({}, function(err, roomList){
		if(err){
			res.json({"response": "Xin lỗi nhưng có vẻ nhưng chưa có thông tin về bất kì phòng nào trong hệ thống!"});
		}
		if(roomList.length == 0){
			res.json({"response": "Chưa có thông tin phòng nào!"});
		} else {
			res.json({"length": roomList.length, "list": roomList});
		}
	});
};

exports.add_new_room = function(req, res){
	var new_room = new Room(req.body);
	new_room.save(function(err, result){
		if(err){
			res.json({"response": "Xin lỗi nhưng có vẻ hệ thống đã gặp phải lỗi trong lúc lưu thông tin phòng!", "log": err});
		}
		res.send({"response": "Đã thêm thông tin về phòng mới!", "information": result});
	});
};

exports.get_room_details = function(req, res){
	Room.findOne({roomId: req.params.roomId}, function(err, result){
		if(err){
			res.json({"response": "Xin lỗi nhưng có vẻ hệ thống không tìm được phòng nào vói ID đã cung cấp!", "log": err});
		}
		res.json({"response": "Đã tìm thấy thông tin phòng!", "result": result});
	});
};

exports.update_room_details = function(req, res){
	Room.findOneAndUpdate({roomId: req.params.roomId}, req.body, {new: true}, function(err, result){
		if(err){
			res.json({"response": "Xin lỗi nhưng có vẻ hệ thống gặp vấn đề trong việc cập nhật thông tin phòng!", "log": err});
		}
		res.json({"response": "Đã cập nhật thành công thông tin phòng!", "information": result});
	});
};

exports.delete_room_details = function(req, res){
	Room.findOne({roomId: req.params.roomId}, function(errorInFindingRoom, roomResult){
		if(errorInFindingRoom){
			res.json({"response": "Xin lỗi nhưng hệ thống không thể tìm thấy phòng nào có ID như bạn đã cung cấp!", "log": errorInFindingRoom});
		}
		Tenant.remove({roomId: req.params.roomId}, function(errorInDeletingTenants, deleteResult){
			if(errorInDeletingTenants){
				res.json({"response": "Xin lỗi nhưng có vẻ hệ thống đã không thể xóa được thông tin của những người thuê trong phòng!", "log": errorInDeletingTenants});
			}
			Room.remove({roomId: req.params.roomId}, function(err, result){
				if(err){
					res.json({"response": "Xin lỗi nhưng có vẻ hệ thống đã không thể xóa được thông tin phòng!", "log": err});
				}
				res.json({"response": "Đã xóa toàn bộ thông tin phòng và người thuê của phòng đó!"});
			});
		});
		
	});
};


// Electric bills controllers
exports.get_all_electric_bills_from_all_rooms = function(req, res){
	ElectricBill.find({}, function(err, results){
		if(err){
			res.json({"response": "Xin lỗi nhưng có vẻ như chưa có hóa đơn điện nào được thêm!", "log": err});
		}
		if(results.length == 0){
			res.json({"response": "Xin lỗi nhưng có vẻ như chưa có hóa đơn điện nào được thêm!"});	
		} else {
			res.json({"length": results.length, "list": results});
		}
	});
};

exports.add_new_electric_bill = function(req, res){
	var new_bill = new ElectricBill(req.body);
	new_bill.save(function(err, result){
		if(err){
			res.json({"response": "Xin lỗi nhưng có vẻ như hệ thống gặp vấn đề trong việc thêm thông tin về hóa đơn tiền điện!", "log": err});
		}
		res.json({"response": "Đã thêm thành công hóa đơn tiền điện!", "information": result});
	});
};

exports.get_all_electric_bills = function(req, res){
	Room.findOne({roomId: req.params.roomId}, function(error, roomDetails){
		if(error){
			res.json({"response": "Xin lỗi nhưng có vẻ như hệ thống gặp vấn đề trong việc tìm phòng với ID đã cung cấp!", "log": error});
		}
		ElectricBill.find({roomId: roomDetails.roomId}, function(err, results){
			if(err){
				res.json({"response": "Xin lỗi nhưng có vẻ như hệ thống gặp vấn đề trong việc tìm các hóa đơn điện liên quan tới phòng này!", "log": err});
			}
			if(results.length == 0){
				res.json({"response": "Có vẻ như phòng này chưa có hóa đơn tiền điện nào!"});
			} else {
				res.json({"room": roomDetails, "electricBills": results});
			}
		});
	});	
	
};

exports.get_electric_bill_details = function(req, res){
	Room.findOne({roomId: req.params.roomId}, function(error, roomDetails){
		if(error){
			res.json({"response": "Xin lỗi nhưng có vẻ như hệ thống gặp vấn đề trong việc tìm phòng với ID đã cung cấp!", "log": error});
		}
		ElectricBill.findOne({roomId: roomDetails.roomId, billId: req.params.billId}, function(err, result){
			if(err){
				res.json({"response": "Xin lỗi nhưng có vẻ như hệ thống gặp vấn đề trong việc tìm các hóa đơn điện liên quan tới phòng này!", "log": err});
			}
			res.json({"room": roomDetails, "billDetails": result});
		});
	});
	
};

exports.update_electric_bill_details = function(req, res){
	ElectricBill.findOneAndUpdate({roomId: req.params.roomId, billId: req.params.billId}, req.body, {new: true}, function(err, result){
		if(err){
			res.json({"response": "Xin lỗi nhưng có vẻ như hệ thống đã gặp vấn đề trong việc tìm thông tin phòng đã cho!", "log": err});
		}
		res.json({"response": "Đã sửa thành công hóa đơn tiền điện!", "information": result});
	});
};

exports.delete_electric_bill_details = function(req, res){
	Room.findOne({roomId: req.params.roomId}, function(error, roomDetails){
		if(error){
			res.json({"response": "Xin lỗi nhưng có vẻ như hệ thống gặp vấn đề trong việc tìm phòng với ID đã cung cấp!", "log": error});
		}
		ElectricBill.remove({roomId: req.params.roomId, billId: req.params.billId}, function(err, result){
			if(err){
				res.json({"response": "Xin lỗi nhưng có vẻ hệ thống gặp vấn đề trong việc xóa thông tin hóa đơn điện!", "log": err});
			}
			res.json({"response": "Đã xóa thành công hóa đơn điện với ID: " + req.params.billId + " của " + roomDetails.roomName});
		});
	});
	
};

// Water bills controllers
exports.get_all_water_bills_from_all_rooms = function(req, res){
	WaterBill.find({}, function(err, results){
		if(err){
			res.json({"response": "Xin lỗi nhưng có vẻ như chưa có hóa đơn nước nào được thêm!", "log": err});
		}
		if(results.length == 0){
			res.json({"response": "Xin lỗi nhưng có vẻ như chưa có hóa đơn nước nào được thêm!"});	
		} else {
			res.json({"length": results.length, "list": results});
		}
	});
};

exports.add_new_water_bill = function(req, res){
	var new_bill = new WaterBill(req.body);
	new_bill.save(function(err, result){
		if(err){
			res.json({"response": "Xin lỗi nhưng có vẻ như hệ thống gặp vấn đề trong việc thêm thông tin về hóa đơn tiền nước!", "log": err});
		}
		res.json({"response": "Đã thêm thành công hóa đơn tiền nước!", "information": result});
	});
};

exports.get_all_water_bills = function(req, res){
	Room.findOne({roomId: req.params.roomId}, function(error, roomDetails){
		if(error){
			res.json({"response": "Xin lỗi nhưng có vẻ như hệ thống gặp vấn đề trong việc tìm phòng với ID đã cung cấp!", "log": error});
		}
		WaterBill.find({roomId: roomDetails.roomId}, function(err, results){
			if(err){
				res.json({"response": "Xin lỗi nhưng có vẻ như hệ thống gặp vấn đề trong việc tìm các hóa đơn nước liên quan tới phòng này!", "log": err});
			}

			if(results.length == 0){
				res.json({"response": "Có vẻ như phòng này chưa có hóa đơn tiền điện nào!"});
			} else {
				res.json({"room": roomDetails, "waterBills": results});
			}
		});
	});	
	
};

exports.get_water_bill_details = function(req, res){
	Room.findOne({roomId: req.params.roomId}, function(error, roomDetails){
		if(error){
			res.json({"response": "Xin lỗi nhưng có vẻ như hệ thống gặp vấn đề trong việc tìm phòng với ID đã cung cấp!", "log": error});
		}
		WaterBill.findOne({roomId: roomDetails.roomId, billId: req.params.billId}, function(err, result){
			if(err){
				res.json({"response": "Xin lỗi nhưng có vẻ như hệ thống gặp vấn đề trong việc tìm các hóa đơn nước liên quan tới phòng này!", "log": err});
			}
			res.json({"room": roomDetails, "billDetails": result});
		});
	});
	
};

exports.update_water_bill_details = function(req, res){
	WaterBill.findOneAndUpdate({roomId: req.params.roomId, billId: req.params.billId}, req.body, {new: true}, function(err, result){
		if(err){
			res.json({"response": "Xin lỗi nhưng có vẻ như hệ thống đã gặp vấn đề trong việc tìm thông tin phòng đã cho!", "log": err});
		}
		res.json({"response": "Đã sửa thành công hóa đơn tiền nước!", "information": result});
	});
};

exports.delete_water_bill_details = function(req, res){
	Room.findOne({roomId: req.params.roomId}, function(error, roomDetails){
		if(error){
			res.json({"response": "Xin lỗi nhưng có vẻ như hệ thống gặp vấn đề trong việc tìm phòng với ID đã cung cấp!", "log": error});
		}
		WaterBill.remove({roomId: req.params.roomId, billId: req.params.billId}, function(err, result){
			if(err){
				res.json({"response": "Xin lỗi nhưng có vẻ hệ thống gặp vấn đề trong việc xóa thông tin hóa đơn nước!", "log": err});
			}
			res.json({"response": "Đã xóa thành công hóa đơn nước với ID: " + req.params.billId + " của " + roomDetails.roomName});
		});
	});
	
};