//cart is stored in LocalStorage, only "id" and "quantity"
var cart = [];
//an array filled from the api
var cartArray = [];

$('.item-add').on('click', function () {

	var qty = $('.item-quantity').val();

	//pushing new items in cart (local) array
	var addItem = {
		id: id
		, quantity: qty
	};

	cart.push(addItem);
	localStorage.setItem("cart", JSON.stringify(cart));


	$.get('/item/' + id, function (res) {

		var item = res;
		$.extend(item, {
			quantity: addItem.quantity
		});

		cartArray.push(item);
		var subTotal = (item.price * addItem.quantity).toFixed(2);

		//rendering the new row
		$(".headerRow").after('<div class="itemRow row-0 odd" id="cartItem_SCI-11"><div class="item-cart-name">' + item.title + '</div><div class="item-cart-price">' + item.price + '€</div><div class="item-cart-quantity">' + addItem.quantity + '</div><div class="item-cart-total">' + subTotal + '€</div><div class="item-cart-remove"><a class="simpleCart_remove" value="' + item._id + '">Remove</a></div></div>');
		recalculate();
	});


});


$('.simpleCart_empty').on('click', function () {
	localStorage.clear('cart');
	cart = [];
	cartArray = [];
	$(".itemRow").html('');
	recalculate();

});

$(document).on("click", '.simpleCart_remove', function (event) {
	console.log(cart);


	$(this).closest('.itemRow').remove();
	
	/*
	var index = $(this).attr('value');
	console.log(index);

	for (var i = 0; i < cart.length; i++) {
		if (cart[i].id == index) {
			console.log(cart[i].id);
			cart.splice(i, 1);
			console.log(cart);
			//break;
		}
	}
	localStorage.setItem("cart", JSON.stringify(cart));
	*/
	recalculate();
});

//check if LocalStorage is present
if (localStorage.getItem('cart')) {
	cart = JSON.parse(localStorage.getItem("cart"));
	populateStorage();
} else {

}

// populate the cartArray and adding the rows
function populateStorage() {
	for (var i = 0; i < cart.length; i++) {
		doCheck(i);
	}

	populateRows();
	recalculate();

}

function populateRows() {
	$.each(cartArray, function (i, array) {
		var item = array[i];
		var subTotal = (array.price * array.quantity).toFixed(2);

		$(".headerRow").after('<div class="itemRow row-0 odd" id="cartItem_SCI-11"><div class="item-cart-name">' + array.title + '</div><div class="item-cart-price">' + array.price + '€</div><div class="item-cart-quantity">' + array.quantity + '</div><div class="item-cart-total">' + subTotal + '€</div><div class="item-cart-remove"><a class="simpleCart_remove" value="' + array._id + '">Remove</a></div></div>');
	});
}

function doCheck(i) {
	var cartItem = cart[i];
	var qty = cartItem.quantity;

	jQuery.ajax({
		url: '/item/' + cartItem.id
		, success: function (item) {

			// check if the article in the cart is active, else erase
			if (item.active) {

				$.extend(item, {
					quantity: qty
				});

				cartArray.push(item);
			} else {
				cart.splice(i, 1);
				console.log(cart);
				localStorage.setItem("cart", JSON.stringify(cart));
			}
		}
		, async: false
	});

}

function recalculate() {

	var cartQuantity = 0;
	var cartTotal = 0;
	$('.itemRow .item-cart-quantity').each(function () {
		cartQuantity += parseFloat($(this).text()); // Or this.innerHTML, this.innerText
	});

	$('.simpleCart_quantity').text(cartQuantity.toFixed(0));

	$(".itemRow .item-cart-total").each(function () {
		var val = $.trim($(this).text());
		if (val) {
			val = parseFloat(val.replace(/^\€/, ""));
			cartTotal += (!isNaN(val) ? val : 0);
		}
	});

	$('.simpleCart_grandTotal').text(cartTotal.toFixed(2));

}

console.log(cartArray);
console.log(cart);

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