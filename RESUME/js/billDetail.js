document.addEventListener('DOMContentLoaded', function(){
	M.Sidenav.init(document.querySelectorAll('.sidenav'));
	M.Modal.init(document.querySelectorAll('.modal'));

	var currentUrl = window.location.href;
	var typeOfBill = currentUrl.split("?")[1].split(/[?&]type\s*=/g)[0].split("=")[1];
	if(typeOfBill == "electric"){
		document.getElementById('type-of-bill').innerHTML = "tiền điện";
	} else if(typeOfBill == "water"){
		document.getElementById('type-of-bill').innerHTML = "tiền nước";
	} else {
		document.getElementById('type-of-bill').innerHTML = "tiền điện và nước";
	}
});