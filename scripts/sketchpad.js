$(document).ready(function() { //wait until doc is ready

	//create original grid
	function createGrid(num) {
		for(var i = 0; i < num; i++) {
			var $row = $('<div class="row"></div>');
			$('#container').append($row);
		}

		for(var j = 0; j < num; j++) {
			var $col = $('<div class="col"></div>');
			$('.row').append($col);
		}
	}

	var gridSize = 16; //default grid size
	createGrid(gridSize);
	var pixel = $('.col').outerHeight();

	function createNewGrid(num){
		resetGrid();
		$('.row').remove(); //clear rows
		createGrid(num);
		$('.col').outerHeight(gridSize*pixel/num);
        $('.col').outerWidth(gridSize*pixel/num);
	}

	//reset grid
	function resetGrid() {
		$('.col').removeClass('selected');
		$('.col').css('background-color', '#f2f2f2');

	}

	//drawing effect for sketching
	$('div').on('mouseenter', '.col', function(){
		$(this).addClass('selected');
	});

	//clear grid and ask for new size
	$('#grid-size').on('click', function() {
		var newSize = prompt('Enter new grid size');
		if(newSize === null || newSize ===""){
			return; //don't do anything
		}
		else {
		createNewGrid(newSize);
		}


	});

	$('#solid').on('click', function() {
		resetGrid();
		$('div').on('mouseenter', '.col', function() {
			$(this).css('background-color', 'black');

		});


	});

	$('#rainbow').on('click', function() {
		resetGrid();
		$('div').on('mouseenter', '.col', function() {

		var color1 = Math.floor(Math.random() * 256);
		var color2 = Math.floor(Math.random() * 256);
		var color3 = Math.floor(Math.random() * 256);
		$(this).css('background-color', 'rgb('+color1+','+color2+ ','+color3+')');
	});

	});

	$('#grayscale').on('click', function() {
		resetGrid();
		var opacity = 0.1; //start at 10%
		$('div').on('mouseenter', '.col', function(event) {
			event.stopPropagation();
			var scale = 'rgba(0,0,0,' + opacity + ')';
			$(this).css('background-color', scale);
			console.log(opacity);

			if(opacity < 1) { //increase by 10%
				opacity = parseFloat((opacity + 0.1).toFixed(1));
			}
			else { //reset to lowest opacity
				opacity = 0.1;
			}

		});

	});

});