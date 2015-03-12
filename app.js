//js to load when device is ready e.g allow top ios app to be visible
$(function(){
	var api_url = 'http://localhost/thserve/'
	var auth_token;

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
		//auto login
		if(window.localStorage){
			if(localStorage.auth_token){
				login = {
					auth_token: localStorage.auth_token,
					// email: sessionStorage.email,
					// mobile: sessionStorage.mobile,
					// customer: sessionStorage.customer,
					// person_sets_count: sessionStorage.person_sets_count,
					// person_id: sessionStorage.person_id
				};
				onLogin(login);
				// console.log('f run');
			}
		}
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
		        $.ajax({url: api_url+'login-user',
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
			                	login = result;
			                    // store login detail
			                    if(window.localStorage){
									localStorage.setItem('auth_token', result.auth_token);
									// localStorage.setItem('email', response.email);
									// localStorage.setItem('mobile', response.mobile);
									// localStorage.setItem('customer', response.customer);
									// localStorage.setItem('person_sets_count', response.person_sets_count);
									// localStorage.setItem('person_id', response.person_id);
								}
								//go to next page
								onLogin(login)
			                                           
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
	// initiate intro page
	$(document).on('pagecreate', '#intro', function(){
		autologin();
		// console.log('intro');
	});
	//recovery page
	$(document).on('pagecreate', '#recovery', function(){
		$( "#recovery-form" ).validate({
			rules: {
				'txt-rst-email': {
					required: true,
					email: true,
				},
			},
			'txt-email': {
	            required: "Please format your email correctly."
	        },
	        errorPlacement: function( error, element ) {
				error.insertAfter( element.parent() );
			},
			submitHandler: function (form) {
				 $.ajax({
				 		url: api_url+'reset-user',
			            data: {action : 'login', formData : $('#recovery-form').serialize()},
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
			                	$('#recovery-form .errors').html(result.message).show().css('color', 'green');
			                                           
			                } else {
			                    $('#recovery-form .errors').html(result.message).show();
			                }
			            },
			            error: function (request,error) {
			                // This callback function will trigger on unsuccessful action                
			                $('#errors').html("System error, we have notified the admin and the problem is being addressed").show();
			            }
				 });
				return false;
			},
		});
	});

	// initiate listing page
	// initiate individual page
	// initiate credit card detail
	function onLogin (login) {
		if (login.auth_token) {
			$(':mobile-pagecontainer').pagecontainer('change', '#intro', {
		        transition: 'slide',
		        changeHash: true,
		        reverse: true,
		        showLoadMsg: true
		    }); 
		} else{
			$(':mobile-pagecontainer').pagecontainer('change', '#login', {
		        transition: 'slide',
		        changeHash: true,
		        reverse: true,
		        showLoadMsg: true
		    });

		}
			
		console.log(login.auth_token);		
		  
	}
	//logout
	$('#logout').click(function(e) {
		e.preventDefault();
		if (window.localStorage) {
			localStorage.removeItem('auth_token');
		};
		login = {
					auth_token: localStorage.auth_token,
					// email: sessionStorage.email,
					// mobile: sessionStorage.mobile,
					// customer: sessionStorage.customer,
					// person_sets_count: sessionStorage.person_sets_count,
					// person_id: sessionStorage.person_id
				};
		onLogin(login);

	});
	function autologin () {
		if(window.localStorage){
			if(localStorage.auth_token){
				login = {
					auth_token: localStorage.auth_token,
					// email: sessionStorage.email,
					// mobile: sessionStorage.mobile,
					// customer: sessionStorage.customer,
					// person_sets_count: sessionStorage.person_sets_count,
					// person_id: sessionStorage.person_id
				};
				// console.log('f run');
			}
			onLogin(login);
		}
	}
	 
	// close anonymous function
});