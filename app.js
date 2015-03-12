//js to load when device is ready e.g allow top ios app to be visible
$( document ).on( "deviceready", function(){
	jQuery(document).ready(function($) {
		console.log("ready");
	});

});

// $(document).on('pagecreate', '#login', function(){
//  	// var server_url = 'http://localhost/'  
//         $(document).on('submit', '#login-form', function(e) { // catch the form's submit event
//            e.preventDefault(); 
//            console.log('imefika hapa');
//             if($('#txt-email').val().length > 0 && $('#txt-password').val().length > 0){
//                 // Send data to server through the Ajax call
//                 // action is functionality we want to call and outputJSON is our data
//                     $.ajax({url: 'http://localhost/thserve/login-user',
//                         data: {action : 'login', formData : $('#login-form').serialize()},
//                         type: 'post',                   
//                         async: 'true',
//                         dataType: 'json',
//                         beforeSend: function() {
//                             // This callback function will trigger before data is sent
//                          	$.mobile.loading( 'show' ); // This will show ajax spinner
//                         },
//                         complete: function() {
//                             // This callback function will trigger on data sent/received complete
//                             $.mobile.loading( 'hide' ); // This will hide ajax spinner
//                         },
//                         success: function (result) {
//                             if(result.status) {
//                                 $.mobile.changePage("#second");
//                                  $(':mobile-pagecontainer').pagecontainer('change', '#intro', {
// 								        transition: 'slidefade',
// 								        changeHash: true,
// 								        reverse: true,
// 								        showLoadMsg: true
// 								    });                         
//                             } else {
//                                 alert('Logon unsuccessful!'); 
//                             }
//                         },
//                         error: function (request,error) {
//                             // This callback function will trigger on unsuccessful action                
//                             alert('Network error has occurred please try again!');
//                         }
//                     });                   
//             } else {
//                 alert('Please fill all necessary fields');
//             }    

//             // return false; // cancel original event to prevent form submitting
//         });    
// });
$(document).on('pagecreate', '#login', function(){
	$( "#login-form" ).validate({
		rules: {
			'txt-email': {
				required: true,
				email: true,
			},
			'txt-password': {
				required: true
			}
		},
		'txt-email': {
            required: "Please enter your first name."
        },
        'txt-password': {
            required: "Please enter your last name."
        },
		errorPlacement: function( error, element ) {
			error.insertAfter( element.parent() );
		},
		submitHandler: function (form) {
	        $.ajax({url: 'http://localhost/thserve/login-user',
		            data: {action : 'login', formData : $('#login-form').serialize()},
		            type: 'post',                   
		            async: 'true',
		            dataType: 'json',
		            beforeSend: function() {
		                // This callback function will trigger before data is sent
		             	$.mobile.loading( 'show' ); // This will show ajax spinner
		            },
		            complete: function() {
		                // This callback function will trigger on data sent/received complete
		                $.mobile.loading( 'hide' ); // This will hide ajax spinner
		            },
		            success: function (result) {
		                if(result.status) {
		                    $.mobile.changePage("#second");
		                     $(':mobile-pagecontainer').pagecontainer('change', '#intro', {
							        transition: 'slidefade',
							        changeHash: true,
							        reverse: true,
							        showLoadMsg: true
							    });                         
		                } else {
		                    $('#errors').html(result.message).show();
		                }
		            },
		            error: function (request,error) {
		                // This callback function will trigger on unsuccessful action                
		                alert('Network error has occurred please try again!');
		            }
		        });  
	        return false;
    	},
	});
});