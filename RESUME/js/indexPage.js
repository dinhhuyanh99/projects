
document.addEventListener('DOMContentLoaded', function(){
	var currentUrl = window.location.href;
	var selectFields = document.querySelectorAll('select');
	var instanceSelectFields = M.FormSelect.init(selectFields);

	// Split url into partitions for adding attribute to select element
	var splittedCurrentUrl = currentUrl.split('/');
	var queryPartUrl = splittedCurrentUrl[splittedCurrentUrl.length - 1].split('?');
	var selectedMonth = queryPartUrl[queryPartUrl.length - 1].substring(5, 8);
	var selectedYear = queryPartUrl[queryPartUrl.length - 1].substring(8, 12);
	
	var monthInput = document.getElementById('monthInputField');
	var yearInput = document.getElementById('yearInputField');

	var monthSelectWrapper = document.getElementsByClassName('select-wrapper')[0];
	console.log(monthSelectWrapper.children[1]);

	for(var i = 0; i < monthInput.options.length; i++){
		if(monthInput.options[i].value == selectedMonth){
			
		}
	}

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

function sortByMonthAndYear(monthInput, yearInput){
	var monthInput = document.getElementById(monthInput);
	var month = monthInput.options[monthInput.selectedIndex].value;
	var yearInput = document.getElementById(yearInput);
	var year = yearInput.options[yearInput.selectedIndex].value;
	var currentUrl = window.location.href;
	if(currentUrl.indexOf('?') > -1){
		currentUrl += ('&sort=' + month + year);
	} else {
		currentUrl += ('?sort=' + month + year);
	}
	window.location.href = currentUrl;
}