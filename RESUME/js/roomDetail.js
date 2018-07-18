
document.addEventListener('DOMContentLoaded', function(){
	var currentUrl = window.location.href;
	var selectFields = document.querySelectorAll('select');
	M.FormSelect.init(selectFields);
	M.Sidenav.init(document.querySelectorAll('.sidenav'));
	M.Modal.init(document.querySelectorAll('.modal'));
	// Split url into partitions for adding attribute to select element

	var splittedSortQuery = currentUrl.split(/[?&]sort\s*=/g);
	var selectedMonth = splittedSortQuery[splittedSortQuery.length - 1].substring(0, 3);
	var selectedYear = splittedSortQuery[splittedSortQuery.length - 1].substring(3, 7);
	var splittedRoomNumber = currentUrl.split(/[?&]room\s*=/g)[1].split('&')[0];
	var monthSelectWrapper = document.getElementsByClassName('select-wrapper')[0];

	document.getElementById('room-number-detail').innerHTML = splittedRoomNumber;
	for(var i = 0; i < monthSelectWrapper.children[3].children.length; i++){
		if(monthSelectWrapper.children[3][i].value == selectedMonth){
			monthSelectWrapper.children[3][i].setAttribute("selected", "");
			document.getElementById('month-electro-bill').innerHTML = monthSelectWrapper.children[3][i].innerText;
			document.getElementById('month-water-bill').innerHTML = monthSelectWrapper.children[3][i].innerText;
			break;
		}
	}

	var yearSelectWrapper = document.getElementsByClassName('select-wrapper')[1];
	for(var i = 0; i < yearSelectWrapper.children[3].children.length; i++){
		if(yearSelectWrapper.children[3][i].value == selectedYear){
			yearSelectWrapper.children[3][i].setAttribute("selected", "");
			document.getElementById('year-electro-bill').innerHTML = yearSelectWrapper.children[3][i].innerText;
			document.getElementById('year-water-bill').innerHTML = yearSelectWrapper.children[3][i].innerText;
			break;
		}
	}

	M.FormSelect.init(selectFields);

	var collectionItemDescClass = document.getElementsByClassName('collection-item-description');
	for(var i = 0; i < collectionItemDescClass.length; i++){
		collectionItemDescClass[i].style.display = 'none';
	}


	generateChart({
		type: 'line',
		data: {
			labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
			datasets: [{
				label: 'Tiền điện',
				data: [12000, 19000, 30000, 50000, 20000, 30000],
				backgroundColor: 'rgba(255, 99, 132, 0.2)',
				borderColor: 'rgba(255,99,132,1)',
				borderWidth: 1.5,
				borderCapStyle: 'square',
				pointBackgroundColor: 'rgba(255, 99, 132, 0.55)',
				pointBorderColor: 'rgba(255, 99, 132, 1)',
				pointBorderWidth: 2,
				pointHoverBackgroundColor: 'rgba(255, 255, 255, 1)',
				pointHoverBorderColor: 'rgba(255, 99, 132, 1)',
				pointHoverBorderWidth: 2,
				fill: false
			}, {
				label: 'Tiền nước',
				data: [30000, 15000, 40000, 70000, 24000, 140000],
				backgroundColor: 'rgba(100, 155, 245, 0.2)',
				borderColor: 'rgba(100, 155, 245,1)',
				borderWidth: 1.5,
				borderCapStyle: 'square',
				pointBackgroundColor: 'rgba(100, 155, 245, 0.55)',
				pointBorderColor: 'rgba(100, 155, 245, 1)',
				pointBorderWidth: 2,
				pointHoverBackgroundColor: 'rgba(255, 255, 255, 1)',
				pointHoverBorderColor: 'rgba(100, 155, 245,1)',
				pointHoverBorderWidth: 2,
				fill: false
			}]
		},
		options: {
			responsive: true,
			tooltips:{
				mode: 'index',
				intersect: false
			},
			hover:{
				mode: 'nearest',
				intersect: true
			},
			scales:{
				xAxes:[{
					display: true,
					scaleLabel:{
						display: true,
						labelString: 'Tháng'
					}
				}],
				yAxes:[{
					display: true,
					scaleLabel:{
						display: true,
						labelString: 'Tiền (VNĐ)'
					}
				}]
			}
		}
	});
});


function collectionItemShowMoreInfo(targetID){
	var selectedItem = document.getElementById(targetID);
	if(selectedItem.getElementsByClassName('collection-item-description')[0].style.display == 'none'){
		selectedItem.getElementsByClassName('collection-item-description')[0].style.display = '';
		selectedItem.getElementsByClassName('material-icons')[1].innerHTML = "expand_less";
	} else {
		selectedItem.getElementsByClassName('collection-item-description')[0].style.display = 'none';
		selectedItem.getElementsByClassName('material-icons')[1].innerHTML = "expand_more";
	}
}

function sortByMonthAndYear(monthInput, yearInput){
	var monthInput = document.getElementById(monthInput);
	var month = monthInput.options[monthInput.selectedIndex].value;
	var yearInput = document.getElementById(yearInput);
	var year = yearInput.options[yearInput.selectedIndex].value;
	var currentUrl = window.location.href;
	var newUrl = '';
	if(currentUrl.split('?').length == 1){
		newUrl += currentUrl.split(/[?&]sort\s*=/g)[0] + '?sort=' + month + year; //Have no query at all
	} else {
		if(currentUrl.split('?')[1].split('&').length == 1 && currentUrl.split(/[?&]sort\s*=/g).length == 2){
			newUrl += currentUrl.split(/[?&]sort\s*=/g)[0] + '?sort=' + month + year; //Have only sort
		} else if(currentUrl.split('?')[1].split(/[?&]sort\s*=/g) != 1){
			newUrl += currentUrl.split(/[?&]sort\s*=/g)[0] + '&sort=' + month + year; //Have queries including sort
		}
	}
	window.location.href = newUrl;
}

function editTenantDetails(tenantId){
	var updateUrl = 'tenant.html?updateId=' + tenantId;
	window.location.href = updateUrl;
}
function generateChart(details){
	var billChart = document.getElementById('bill-chart').getContext('2d');
	var myChart = new Chart(billChart, details);
}