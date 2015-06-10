$(function(){
	var $reset = $('.reset'),
		$inputField = $('.input-fields'),
		$input = $inputField.find('input'),
		$select = $inputField.find('select'),
		$submit = $('.submit'),
		$table = $('table');

	$reset.click( function() {
		$input.val('');
		$select.find('option[value="male"]').attr("selected",true);
		$select.find('option[value="programmer"]').attr("selected",true);		
	});

	$(".input-fields input[data-input=2], .input-fields input[data-input=5], .input-fields input[data-input=6]").keypress(function (e) {
     if (e.which < 48 || e.which > 57) {       
            return false;
    	}
   });

	$(".input-fields input[data-input=1], .table input").keypress(function (e) {
    if (e.which < 97 || e.which > 122) {       
            return false;
    	}
   });

	$submit.on( 'click', function(e) {
		var target = $( event.target );
  		if ( target.is( ".submit" ) ){

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
  				var $values = [];
  				window.alert('ready to submit');
	  			for( var i=1; i<7; ++i) {
	  				$values.push($inputField.find('input[data-input='+i+']').val());
	  			}
  			} 			
  		}		
	});

});