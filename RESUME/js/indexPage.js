$(document).ready(function(){
	$('.sidenav').sidenav();
	$('select').formSelect();
});

document.addEventListener('DOMContentLoaded', function(){
	var collectionItemDescClass = document.getElementsByClassName('collection-item-description');
	for(var i = 0; i < collectionItemDescClass.length; i++){
		collectionItemDescClass[i].style.display = 'none';
	}
});

function collectionItemShowMoreInfo(targetID){
	var selectedItem = document.getElementById(targetID);
	if(selectedItem.getElementsByClassName('collection-item-description')[0].style.display == 'none'){
		selectedItem.getElementsByClassName('collection-item-description')[0].style.display = '';
		selectedItem.getElementsByClassName('material-icons')[0].innerHTML = "expand_less";
	} else {
		selectedItem.getElementsByClassName('collection-item-description')[0].style.display = 'none';
		selectedItem.getElementsByClassName('material-icons')[0].innerHTML = "expand_more";
	}
}