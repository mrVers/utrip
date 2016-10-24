$('.form-container').hide();

$('.cta-button').on('click', function () {

	$('.form-container').slideToggle();

});

var isSending = false;

$('.submit-button').on('click', function () {

	var email = $('#email').val();
	var name = $('#name').val();
	var surname = $('#surname').val();
	var comment = $('#comment').val();
	var address = $('#address').val();

	var data = {
		email: email
		, name: name
		, surname: surname
		, comment: comment
		, address: address
	};

	$('.submit-button').text('Sending...');
	$('.submit-button').css({
		opacity: 0.5
		, pointerEvents: 'none'
	});

	if (isSending === false) {

		$.post('/api/hire', data, function (res, statusString, responseData) {

			console.log(status, responseData.status);

			if (responseData.status === 200) {

				$('.form-container').slideToggle();

			}

			$('.submit-button').text('Submit');
			$('.submit-button').css({
				opacity: 1
				, pointerEvents: 'all'
			});

			isSending = false;

		});

	}

	isSending = true;

});