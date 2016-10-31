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

$('.checkout-button').on('click', function (e) {
	if (!localStorage.getItem('cart')) {
		e.preventDefault();
		$('.notify').fadeIn(200, function () {
			$('.notify .notify-text').text('Please add at least 1 item to the cart.');
			setTimeout(function () {
				$('.notify').fadeOut(300);
			}, 2000);
		});
	}

});


var isSending = false;
var form = document.getElementById("cart-submit");

$('.submit-button').on('click', function (e) {
	
	var email = $('#email').val();
	var name = $('#name').val();
	var zip = $('#zip').val();
	var city = $('#city').val();
	var surname = $('#surname').val();
	var comment = $('#comment').val();
	var address = $('#address').val();

	/* //work in progress
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
		email: email
		, name: name
		, zip: zip
		, city: city
		, surname: surname
		, comment: comment
		, address: address
		, items: cartArray
			/*,items	: [{
				id	        : cartArray._id,
				title 		: cartArray.title,
				coverImage 	: cartArray.coverImage,
				price 		: cartArray.price,
				quantity	: cartArray.quantity,
				store		: cartArray.store	
		
			}]*/
	};


	if (form.checkValidity()) {

		$('.submit-button').text('Sending...');
		$('.submit-button').css({
			opacity: 0.5
			, pointerEvents: 'none'
		});
				
		if (isSending === false) {

			$.post('/api/order', data)
				.done(function (res, statusString, responseData) {
					$(location).attr('href', '/store/order/' + res._id);
					localStorage.clear('cart');
					isSending = false;
				})
				.fail(function (xhr, status, error) {
					// error handling
					$('.notify').fadeIn(200, function () {
						$('.notify .notify-text').text('There was a problem. Please check your details and try again. Error: ' + error);
						setTimeout(function () {
							$('.notify').fadeOut(300);
						}, 2000);
					});

					$('.submit-button').text('Submit again');
					$('.submit-button').css({
						opacity: 1
						, pointerEvents: 'all'
					});
					isSending = false;
				});
			e.preventDefault();
		}
		isSending = true;
	}
});