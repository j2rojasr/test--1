function validateEmail($email) {
  var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
  return emailReg.test( $email );
}

$(document).ready(function() {
	$( "#form-data-user" ).submit(function( event ) {
	  event.preventDefault();

		var username = $("input:text[name='username']").val();    
    var password = document.getElementById("password").value;
    var email = $("input[name='email']").val()
    var large_text = $("textarea[name='large-text']").val()
    // this can be fulled by PHP if this file its movec to scritp tag
    var badwords = ["fuck", "bullshit", "asshole", "bitch"];
    
    var valid_count = 0;
    
    //require min 4 char. and non empty
    if (username.length < 4 || username.trim() == ""){
    	valid_count++;
    	$('.valid-username').fadeIn( "fast", "linear" );
    }else{
    	$('.valid-username').fadeOut( "fast", "linear" );
    }

    //require min 4 char. and non empty
    if (password.length < 4 || password.trim() == ""){
    	valid_count++;
    	$('.valid-password').fadeIn( "fast", "linear" );
    }else{
    	$('.valid-password').fadeOut( "fast", "linear" );
    }

    //require min 4 char. and non empty
		if (!validateEmail(email) || email.length < 4 || email.trim() == ""){
			valid_count++;
			$('.valid-email').fadeIn( "fast", "linear" );
    }else{
    	$('.valid-email').fadeOut( "fast", "linear" );
    }

    //detect badwords and non empty
    if (large_text.length < 4 || email.trim() == ""){
    	valid_count++;
    	$('.valid-large-text').fadeIn( "fast", "linear" );

    	if ($.inArray(large_text, badwords) !==-1) {
    		valid_count++;				
				$('.valid-large-text-badwords').fadeIn( "fast", "linear" );
			}else{
				$('.valid-large-text-badwords').fadeOut( "fast", "linear" );
			}
    }else{
    	$('.valid-large-text').fadeOut( "fast", "linear" );
    }
    
	  if (valid_count == 0){
	  	var form = new FormData();
			form.append("email", email); //luis@email.com
			form.append("username", username); //email
			form.append("password", password); //123456
			form.append("message", large_text); //adsadasdasdasd

			var settings = {
			  "async": true,
			  "crossDomain": true,
			  "url": "http://test.masuno.pe/form.php",
			  "method": "POST",	  
			  "processData": false,
			  "contentType": false,
			  "mimeType": "multipart/form-data",
			  "data": form
			}

			$.ajax(settings).done(function (response) {
				json = JSON.parse(response);

				if (json.msg == "SUCCESS"){
					alert("SUCCESS");
				}else{
					alert("FAIL");					
				}
			});
	  }	  
	});

	$.get( "http://test.masuno.pe/images.php", function( data ) {
		// paint Images in Owl-carousel
		$( ".owl-carousel" ).empty();
		var html = "";
		data.forEach(function(data){			
			html = html + "<div class=\"item item-slider\"> <img src=\""+ data +"\" alt=\"\"> </div>";
		})
		$('.owl-carousel').append(html);

	  $('.owl-carousel').owlCarousel({    
	    loop:true,
	    margin:10,
	    autoHeight:true,    
	    items:1,
	    autoplay:true,
	    autoplayTimeout:2000,
	    autoplayHoverPause:true
		})

		$('.wrap-spinner').fadeOut( "fast", "linear" );
	});	
});