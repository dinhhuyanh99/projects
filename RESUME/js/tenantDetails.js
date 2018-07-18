document.addEventListener('DOMContentLoaded', function(){
	M.Sidenav.init(document.querySelectorAll('.sidenav'));
	M.Modal.init(document.querySelectorAll('.modal'));
	M.Datepicker.init(document.querySelectorAll('.datepicker'), {
		format: 'dd/mmm/yyyy',
		yearRange: 100
	});

	var currentUrl = window.location.href;
	var splittedCurrentUrl = currentUrl.split(/[?&]updateId\s*=/g);
	if(splittedCurrentUrl.length == 1){
		document.getElementById('update-tenant').style.display = 'none';
	} else {
		document.getElementById('add-tenant').style.display = 'none';
	}
	

	// var xhr = new XMLHttpRequest();
	// xhr.onreadystatechange = function(){
	// 	console.log(xhr);
	// }
	// xhr.open('GET', 'http://localhost:8000', true);
	// xhr.setRequestHeader('Access-Control-Allow-Origin', 'http://localhost:8000');
	// xhr.setRequestHeader('Access-Control-Allow-Credentials', 'true');
	// xhr.setRequestHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
	// xhr.setRequestHeader('Access-Control-Max-Age', '604800');
	// xhr.setRequestHeader('Access-Control-Allow-Headers', 'x-requested-with');
	// xhr.send();
	
});




function addRoomDetail(){

}

function gatherTenantDetails(){
	var roomSelector = M.Modal.getInstance(document.getElementById('room-selector'));
	roomSelector.open();
	var name = document.getElementById('name-of-tenant');
	var dateOfBirth = document.getElementById('date-of-birth');
	var phoneNumber = document.getElementById('phone-number');
	var personalId = document.getElementById('personal-id');
	var address = document.getElementById('address');
	var startOfContract = document.getElementById('start-of-contract');
	var lengthOfContract = document.getElementById('length-of-contract');
	var personalDetails = {
		name: name.value,
		dateOfBirth: dateOfBirth.value,
		phoneNumber: phoneNumber.value,
		personalId: personalId.value,
		homeAddress: address.value,
		startOfContractDate: startOfContract.value,
		lengthOfContract: lengthOfContract.value
	}

	if(personalDetails.nameOfTenant == '' || personalDetails.nameOfTenant == undefined ||
		personalDetails.dateOfBirth == '' || personalDetails.dateOfBirth == undefined ||
		personalDetails.phoneNumber == '' || personalDetails.phoneNumber == undefined ||
		personalDetails.personalId == '' || personalDetails.personalId == undefined ||
		personalDetails.startOfContract == '' || personalDetails.startOfContract == undefined||
		personalDetails.lengthOfContract == '' || personalDetails.lengthOfContract == undefined){
		var infoMissingToast = '<span>Vui lòng điền đầy đủ thông tin!</span>'
		M.toast({html: infoMissingToast});
	} else {
		return personalDetails;
	}
	
}

function sendFormDetails(){
	console.log(gatherTenantDetails());
}