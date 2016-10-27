$('.cart-button').on('click', function () {

	$('.shelf-item').fadeOut(200);
	$('#cart').delay(200).fadeIn(200);

});

$('.close').on('click', function () {

	$('.shelf-item').delay(200).fadeIn(200);
	$('#cart').fadeOut(200);

});

$('.summary-details').hide();

$('.summary').on('click', function () {

	$('.summary-details').slideToggle();

});


var isSending = false;
var form = document.getElementById("cart-submit");

$('.submit-button').on('click', function (e) {
	console.log(cartArray);

	var email 	= $('#email').val();
	var name 	= $('#name').val();
	var zip 	= $('#zip').val();
	var city	= $('#city').val();
	var surname = $('#surname').val();
	var comment = $('#comment').val();
	var address = $('#address').val();
	
	/*
	var newCartArray = {
			id	        : cartArray._id,
			title 		: cartArray.title,
			coverImage 	: cartArray.coverImage,
			price 		: cartArray.price,
			quantity	: cartArray.quantity,
			store		: cartArray.store	
	};
	
	console.log(newCartArray);
	*/

	var data = {
		email	: email,
		name	: name,
		zip		: zip,
		city	: city,
		surname	: surname,
		comment	: comment,
		address	: address,
		items	: cartArray,
		itesms	: [{
			id	        : cartArray._id,
			title 		: cartArray.title,
			coverImage 	: cartArray.coverImage,
			price 		: cartArray.price,
			quantity	: cartArray.quantity,
			store		: cartArray.store		
		}]
	};

	
	if (form.checkValidity()) {
		
		$('.submit-button').text('Sending...');
		$('.submit-button').css({
			opacity: 0.5
			, pointerEvents: 'none'
		});

		if (isSending === false) {
			
				$.post('/api/order', data, function (res, statusString, responseData) {
					
					console.log(data);
					console.log(res);
					console.log(responseData);

				console.log(status, responseData.status);

				if (responseData.status === 200) {

					$(location).attr('href','/store/order/'+res._id);

				}

				$('.submit-button').text('Submit');
				$('.submit-button').css({
					opacity: 1
					, pointerEvents: 'all'
				});
					
				isSending = false;

			});
			e.preventDefault();
		}
		
	}
	isSending = true;
	

});