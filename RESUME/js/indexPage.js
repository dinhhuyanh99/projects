document.addEventListener('DOMContentLoaded', function(){
	M.Sidenav.init(document.querySelectorAll('.sidenav'));
	M.Modal.init(document.querySelectorAll('.modal'));
});

function accessRoomDetails(roomNumber){
	var accessedDate = new Date();
	var sortString = '';
	if(accessedDate.getMonth() == 0){
		sortString += 'Dec' + (accessedDate.getFullYear() - 1);
	} else if(accessedDate.getMonth() == 1){
		sortString += 'Jan' + accessedDate.getFullYear();
	} else if(accessedDate.getMonth() == 2){
		sortString += 'Feb' + accessedDate.getFullYear();
	} else if(accessedDate.getMonth() == 3){
		sortString += 'Mar' + accessedDate.getFullYear();
	} else if(accessedDate.getMonth() == 4){
		sortString += 'Apr' + accessedDate.getFullYear();
	} else if(accessedDate.getMonth() == 5){
		sortString += 'May' + accessedDate.getFullYear();
	} else if(accessedDate.getMonth() == 6){
		sortString += 'Jun' + accessedDate.getFullYear();
	} else if(accessedDate.getMonth() == 7){
		sortString += 'Jul' + accessedDate.getFullYear();
	} else if(accessedDate.getMonth() == 8){
		sortString += 'Aug' + accessedDate.getFullYear();
	} else if(accessedDate.getMonth() == 9){
		sortString += 'Sep' + accessedDate.getFullYear();
	} else if(accessedDate.getMonth() == 10){
		sortString += 'Oct' + accessedDate.getFullYear();
	} else if(accessedDate.getMonth() == 11){
		sortString += 'Nov' + accessedDate.getFullYear();
	}
	var newUrl = "room-detail.html?room=" + roomNumber + '&sort=' + sortString;
	window.location.href = newUrl;
}