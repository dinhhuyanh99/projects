module.exports = function(app){
	var houseManagement = require('../controllers/controllers');

	app.route('/tenants')
		.get(houseManagement.list_all_tenants)
		.post(houseManagement.add_a_tenant);
	app.route('/tenants/:tenantId')
		.get(houseManagement.get_tenant_details)
		.put(houseManagement.update_tenant_details)
		.delete(houseManagement.delete_tenant_details);
	app.route('/tenants/room/:roomId')
		.get(houseManagement.get_room_tenants);


	app.route('/rooms')
		.get(houseManagement.get_all_rooms)
		.post(houseManagement.add_new_room);
	app.route('/rooms/:roomId')
		.get(houseManagement.get_room_details)
		.put(houseManagement.update_room_details)
		.delete(houseManagement.delete_room_details);


	app.route('/electricBill')
		.get(houseManagement.get_all_electric_bills_from_all_rooms)
		.post(houseManagement.add_new_electric_bill);
	app.route('/rooms/electricBill/:roomId')
		.get(houseManagement.get_all_electric_bills);
	app.route('/rooms/:roomId/electricBill/:billId')
		.get(houseManagement.get_electric_bill_details)
		.put(houseManagement.update_electric_bill_details)
		.delete(houseManagement.delete_electric_bill_details);


	app.route('/waterBill')
		.get(houseManagement.get_all_water_bills_from_all_rooms)
		.post(houseManagement.add_new_water_bill);
	app.route('/rooms/waterBill/:roomId')
		.get(houseManagement.get_all_water_bills);
	app.route('/rooms/:roomId/waterBill/:billId')
		.get(houseManagement.get_water_bill_details)
		.put(houseManagement.update_water_bill_details)
		.delete(houseManagement.delete_water_bill_details);
}