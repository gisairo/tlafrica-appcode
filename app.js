//js to load when device is ready e.g allow top ios app to be visible
$(function(){
	var api_url = 'http://sites.local/thserve/'
	var auth_token;

	// $( document ).on( "deviceready", function(){
	// 	 console.log(window.stripe);

	// });

	$(function() {
	    FastClick.attach(document.body);
	});
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
									localStorage.setItem('person_id', result.userid);
								}
								//go to next page
								onLogin(login)
			                                           
			                } else {
			                    $('#errors').html(result.message).show();
			                }
			            },
			            error: function (request,error) {
			                // This callback function will trigger on unsuccessful action
			                $('#errors').html('Network error has occurred please try again!').show();                
			                
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
	//initiate registration page
		//recovery page
	$(document).on('pagecreate', '#registration', function(){
		$(document).ready(function(){
			$( "#register-form" ).validate({
				rules: {
					'txt-rg-email': {
						required: true,
						email: true,
					},
					txt_rg_password: {
						minlength: 6,
						required: true,	
						
						},
					txt_rg_password_copy: {
						minlength: 6,
						required: true,
						equalTo: "#txt_rg_password",
					},
					
				},
				messages:{
					txt_rg_password: {
		            	equalTo: "Please ensure your passwords match"
		        	}
		    	},
		        errorPlacement: function( error, element ) {
					error.insertAfter( element.parent() );
				},
				submitHandler: function (form) {
					 $.ajax({
					 		url: api_url+'register-donor',
				            data: {action : 'login', formData : $('#register-form').serialize()},
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
				                	$('#register-form .errors').html(result.message).show().css('color', 'green');
				                     
				                    function gotologin() {
										  setTimeout(
										    function() {
										      autologin(); 
										    }, 1000);
									}
				                     gotologin();                    
				                } else {
				                    $('#register-form .errors').html(result.message).show();
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
	});
	// initiate listing page
	$(document).on('pagecreate', '#listing', function(){
		
		// //
		// $(document).ready(function (e) {
		// 	// $('.hlist > li> a.ui-btn').each(function(index, el) {
		// 	// 	console.log(el);
		// 	// });
		// var lis = $( ".hlist li" );
		// console.log(lis);
 
			
		// }); 
		//
		if (localStorage.auth_token) {
			$.getJSON(api_url+'all-app-hills/1', function(hillsets){
				// $.each(sets, function(){ addItem('myset', this); 
				// console.log(hillsets);
				$('#one ul').html(hillsets);

			});
			$('#twos').click(function (e) {
				$.getJSON(api_url+'all-app-hills/101', function(hillsets){
				// $.each(sets, function(){ addItem('myset', this); 
					// console.log(hillsets);
					$('#two ul').html(hillsets);

				});
			});
			$('#threes').click(function (e) {
				$.getJSON(api_url+'all-app-hills/201', function(hillsets){
				// $.each(sets, function(){ addItem('myset', this); 
					// console.log(hillsets);
					$('#three ul').html(hillsets);

				});
			});
			$('#fours').click(function (e) {
				$.getJSON(api_url+'all-app-hills/301', function(hillsets){
				// $.each(sets, function(){ addItem('myset', this); 
					// console.log(hillsets);
					$('#four ul').html(hillsets);

				});
			});
			$('#fives').click(function (e) {
				$.getJSON(api_url+'all-app-hills/401', function(hillsets){
				// $.each(sets, function(){ addItem('myset', this); 
					// console.log(hillsets);
					$('#five ul').html(hillsets);

				});
			});
			$('#sixes').click(function (e) {
				$.getJSON(api_url+'all-app-hills/501', function(hillsets){
				// $.each(sets, function(){ addItem('myset', this); 
					// console.log(hillsets);
					$('#six ul').html(hillsets);

				});
			});
			$('#sevens').click(function (e) {
				$.getJSON(api_url+'all-app-hills/601', function(hillsets){
				// $.each(sets, function(){ addItem('myset', this); 
					// console.log(hillsets);
					$('#seven ul').html(hillsets);

				});
			});
			$('#eights').click(function (e) {
				$.getJSON(api_url+'all-app-hills/701', function(hillsets){
				// $.each(sets, function(){ addItem('myset', this); 
					// console.log(hillsets);
					$('#eight ul').html(hillsets);

				});
			});
			$('#nines').click(function (e) {
				$.getJSON(api_url+'all-app-hills/801', function(hillsets){
				// $.each(sets, function(){ addItem('myset', this); 
					// console.log(hillsets);
					$('#nine ul').html(hillsets);

				});
			});
			$('#tens').click(function (e) {
				$.getJSON(api_url+'all-app-hills/901', function(hillsets){
				// $.each(sets, function(){ addItem('myset', this); 
					// console.log(hillsets);
					$('#ten ul').html(hillsets);

				});
			});
			$('#set2').click(function (e) {
				e.preventDefault();
				$('#tabs').hide(); $('#tabs2').slideDown();
				$.getJSON(api_url+'all-app-hills/501', function(hillsets){
				// $.each(sets, function(){ addItem('myset', this); 
					// console.log(hillsets);
					$('#six ul').html(hillsets);

				});

			});
			$('#prevset').click(function (e) {
				e.preventDefault();
				$('#tabs2').hide(); $('#tabs').slideDown();
				

			});
			$(document).on("click", ".hlist ul li a" ,function (event) {
			    var mtid= $(this).attr("data-id");
			    localStorage.setItem('mountain_id', mtid);
			    $(':mobile-pagecontainer').pagecontainer('change', '#individual', {
			        transition: 'slide',
			        changeHash: true,
			        reverse: false,
			        showLoadMsg: true
			    }); 
			});
			 
		}else{
			
			$(':mobile-pagecontainer').pagecontainer('change', '#login', {
		        transition: 'slide',
		        changeHash: true,
		        reverse: true,
		        showLoadMsg: true
		    });
		}
	});
	// initiate individual page
	$(document).on('pagecreate', '#individual', function(){
		if (localStorage.auth_token) {
			mtid=localStorage.mountain_id;
			person_id = localStorage.person_id;
			$.getJSON(api_url+'one-app-hill/'+mtid, function(hilldata){
				// $.each(sets, function(){ addItem('myset', this); 
				// console.log(hillsets);
				$('#individual .middle-content p').html(hilldata.content);
				$('#google').html(hilldata.google);

			});
		}else{
			$(':mobile-pagecontainer').pagecontainer('change', '#login', {
		        transition: 'slide',
		        changeHash: true,
		        reverse: true,
		        showLoadMsg: true
		    });
		}
	});
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
			
		// console.log(login.auth_token);		
		  
	}
	//logout
	$('.logout').click(function(e) {
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
	 // console.log(window);
	// close anonymous function
	// console.log(Stripe);
	Stripe.setPublishableKey('pk_test_J66POIERnyrTbnKStD9AnA8v');
    jQuery(function($) {
      $('#credit-form').submit(function(event) {
        var $form = $(this);
        // Disable the submit button to prevent repeated clicks
        $form.find('button').prop('disabled', true);
        Stripe.card.createToken($form, stripeResponseHandler);
        // Prevent the form from submitting with the default action
        return false;
      });
      var stripeResponseHandler = function(status, response) {
          var $form = $('#credit-form');
          // console.log(status, JSON.stringify(response));

          if (response.error) {
            // Show the errors on the form
           	 // console.log($form);
            $form.find('.payment-errors').text(response.error.message).show();
            $form.find('button').prop('disabled', false);
          } else {

            // token contains id, last4, and card type
            var token = response.id;
            // console.log(token)
            // Insert the token into the form so it gets submitted to the server
            $form.append($('<input type="hidden" name="stripeToken" />').val(token));
            $form.append($('<input type="hidden" name="userid" />').val(localStorage.person_id));
            $form.append($('<input type="hidden" name="mtid" />').val(localStorage.mountain_id));
            // and submit
            // $form.get(0).submit();
            var cform=$form;
            // console.log(cform.serialize());
            //ajax submit to server
            $.ajax({url: api_url+'save-donations',
			            data: {action : 'charge', formData : cform.serialize()},
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
			                	$('.payment-errors').html(result.message).css('color', 'green').show();
			                    $(':mobile-pagecontainer').pagecontainer('change', '#thanks', {
							        transition: 'none',
							        changeHash: true,
							        reverse: true,
							        showLoadMsg: true
							    });                       
			                } else {
			                    $('.payment-errors').html(result.message).show();
			                }
			            },
			            error: function (request,error) {
			                // This callback function will trigger on unsuccessful action
			                $('.payment-errors').html('Network error has occurred please try again!').show();                
			                
			            }
			        });  

            //end ajax submit
          }
        };
    });

});


// document.addEventListener("deviceready", onDeviceReady, false);
   
	