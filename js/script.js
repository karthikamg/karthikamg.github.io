$(function(){
	var $reset 			= 		$('.reset'),
		$inputField 	= 		$('.input-fields'),
		$input 			= 		$inputField.find('input'),
		$select 		= 		$inputField.find('select'),
		$submit 		= 		$('.submit'),
		$table 			=		$('table'),
		$searchBtn		=		$('.search'),
		$refresh 		= 		$('.refresh'),
		$search 		=		$('.input-search-style');

	var $tableContent = [];

	function resetting() {		
		$input.val('');
		$select.find('option[value="male"]').attr("selected",true);
		$select.find('option[value="programmer"]').attr("selected",true);	
	}

	$table.find('tbody tr').data('order','unordered');

	$reset.click( function() {
		resetting();
	});

	$(".input-fields input[data-input=2], .input-fields input[data-input=5], .input-fields input[data-input=6]").keypress(function (e) {
     if (e.which < 48 || e.which > 57) {       
            return false;
    	}
   });

	$('.input-fields input[data-input=1]').keydown(function (e) {
		var key = e.keyCode;
		if (!((key == 8) || (key == 32) || (key == 46) || (key >= 35 && key <= 40) || (key >= 65 && key <= 90))) {
			e.preventDefault();
		}
	});

	$submit.on( 'click', function(e) {
  			if( $inputField.find('input[data-input=1]').val() == '' ){
  				window.alert('Enter name');
  				return;
  			}
  			else if( $inputField.find('input[data-input=2]').val() == '' || $inputField.find('input[data-input=2]').val().length == 1 || $inputField.find('input[data-input=2]').val() == '00'){
  				window.alert('Enter valid age');
  				return;
  			}
  			else if( $inputField.find('input[data-input=5]').val() == '' ){
  				window.alert('Enter experiance');
  				return;
  			}
  			else if( $inputField.find('input[data-input=6]').val() == '' ){
  				window.alert('Enter salary');
  				return;
  			}
  			else{

  				var $num	=	$table.find('tr:last td:first').text(),
  					num = 1;

  				if($table.find('tr').length > 1 ) {
  					var num = parseInt($num)+1;
  				}
  				else {
  					num = 1;
  				}

  				var $values = [];
  				window.alert('ready to submit');
	  			for( var i=1; i<7; ++i) {
	  				$values.push($inputField.find('input[data-input='+i+']').val());
	  			}

	  			if( $( "select[data-input=3] option:selected" ).text().toLowerCase() == 'male' ){
	  				$values.push('M');
	  			}
	  			else{
	  				$values.push('F');
	  			}
	  			$values.push($( "select[data-input=4] option:selected" ).text());

	  			$table.find('tr:last').after('<tr><td>'+num+'</td><td>'+$values[0]+'</td><td>'+$values[1]+'</td><td>'+$values[6]+'</td><td>'+$values[7]+'</td><td>'+$values[4]+'</td><td>'+$values[5]+'K</td></tr>');
  				
  				resetting();
  			}	
	});

	$search.keyup( function() {
		var searchName = this.value,
			found = false;

		$table.find('tr').each( function() { 
			
			var allCells = $(this).find('td:nth-child(2)');
			if(allCells.length > 0) { 

				var srowIndex = 0, hrowIndex = 0; found = false;

				allCells.each( function() { 
					
					var regExp = new RegExp(searchName,'i');
					if(regExp.test(allCells.text())) {  
						found    = true;
						srowIndex = allCells.closest('tr').index();
					} 
					else{
						found = false;
						hrowIndex = allCells.closest('tr').index();
					}
					return false;
				} ); 

				if(found == true) {
					$table.find('tr:eq('+srowIndex+')').show();	
				}
				else{
					$table.find('tr:first-child').show();
					$table.find('tr:eq('+hrowIndex+')').hide();	
				}
			}

		} );
	});

	$refresh.click( function() {
		$search.val('');
		$table.find('tr').show();
	});

	$('table tr').on( 'click', function(event) {
		var target = $( event.target );

		if ( target.is( "th:nth-child(2)" ) ) {
			sort(2);
		}
		else if ( target.is( "th:nth-child(3)" ) ) {
			sort(3);
		}
		else if ( target.is( "th:nth-child(4)" ) ) {
			sort(4);
		}
		else if ( target.is( "th:nth-child(5)" ) ) {
			sort(5);
		}
		else if ( target.is( "th:nth-child(6)" ) ) {
			sort(6);
		}
		else if ( target.is( "th:nth-child(7)" ) ) {
			sort(7);
		}
	} );


	var sort = function( index ) { 
		var i=0,
			colValues = [];

		$table.find('tr').each( function() {
			var	allCells = $(this).find('td:nth-child('+index+')');

			allCells.each( function() {
				colValues.push(allCells.text());
			});
		});	

		// $colValues.sort();

		colValues.sort(function (a, b) {
		    return a.toLowerCase().localeCompare(b.toLowerCase());
		}); 

		if( $table.find('tbody tr').data( 'order' ) == 'asc' ) {
			$table.find('tbody tr').data( 'order','desc' );
			colValues = colValues.reverse();
		}
		else if( $table.find('tbody tr').data( 'order' ) == 'desc' || $table.find('tbody tr').data( 'order' ) == 'unordered' ) {
			$table.find('tbody tr').data( 'order','asc' );
		}
	
		$table.find('tr td:nth-child('+index+')').each( function(){
			$(this).html(colValues[i]);
			i++;
		} );
	}

});