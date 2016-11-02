//cart is stored in LocalStorage, only "id" and "quantity"
var cart = [];

//an array filled from the api
var cartArray = [];

$('.item-add').on('click', function () {

	$('.notify').fadeIn(200, function () {
		$('.notify .notify-text').text('Item added to cart');
		setTimeout(function () {
			$('.notify').fadeOut(300);
		}, 1000);
	});

	var qty = parseFloat($('.item-quantity').val());

	//check if localStorage is not present
	if (!localStorage.getItem('cart')) {

		pushItem();

		//if present, loop the array for items	
	} else {
		var found = false;
		var rowsId = $(".itemRow").filter(function () {
			return $(this).attr('value') === id;
		});
		for (var i = 0; i < cart.length; i++) {

			if (cart[i].id === id) {
				var oldQty = cart[i].quantity;
				var newQty = parseFloat(oldQty + qty);
				cart[i].quantity = newQty;
				var price = rowsId.find('.item-cart-price').text().replace("€", "");
				var subTotal = (price * newQty).toFixed(2);
				rowsId.find('.item-cart-total').text(subTotal + '€')
				rowsId.find('.item-cart-quantity').text(newQty);
				localStorage.setItem("cart", JSON.stringify(cart));
				found = true;
				break;
			}
		}

		//if no item in the loop, push it
		if (!found) {
			pushItem();
			//break;
		}
	}
	recalculate();

});

function pushItem() {
	var qty = parseFloat($('.item-quantity').val());
	var addItem = {
		id: id
		, quantity: qty
	};
	//pushing new items in (local) cart array
	cart.push(addItem);
	localStorage.setItem("cart", JSON.stringify(cart));


	$.ajax({
		url: '/api/item/' + id
		, success: function (item) {

			$.extend(item, {
				quantity: addItem.quantity
			});

			//pushing new items in cartArray array
			cartArray.push(item);
			var subTotal = (item.price * addItem.quantity).toFixed(2);

			//rendering the new row
			$(".headerRow").after('<div class="itemRow" value="' + item._id + '"><div class="item-cart-name">' + item.title + '</div><div class="item-cart-price">' + item.price + '€</div><div class="item-cart-quantity">' + addItem.quantity + '</div><div class="item-cart-total">' + subTotal + '€</div><div class="item-cart-remove"><a class="simpleCart_remove" ><i class="fa fa-times"></i></a></div></div>');
		}
		, async: false
	});
}

$('.simpleCart_empty').on('click', function () {
	localStorage.clear('cart');
	cart = [];
	cartArray = [];
	$(".itemRow").html('');
	recalculate();

});

$(document).on("click", '.simpleCart_remove', function (event) {

	$(this).closest('.itemRow').remove();

	var attrItem = $(this).parents('.itemRow').attr('value');

	for (var i = 0; i < cart.length; i++) {
		if (cart[i].id == attrItem) {
			cart.splice(i, 1);
			break;
		}
	}
	
	if(cart.length > 0){  
		localStorage.setItem("cart", JSON.stringify(cart));
	}else{
		localStorage.clear('cart');
	}	 
	recalculate();
});

//check if LocalStorage is present
if (localStorage.getItem('cart')) {
	cart = JSON.parse(localStorage.getItem("cart"));
	populateStorage();
}

// populate the cartArray and adding the rows
function populateStorage() {
	for (var i = 0; i < cart.length; i++) {
		doCheck(i);
	}

	populateRows();
	recalculate();

}

function doCheck(i) {
	var cartItem = cart[i];
	var qty = cartItem.quantity;

	$.ajax({
		url: '/api/item/' + cartItem.id
		, success: function (item) {

			// check if the article in the cart is active, else erase
			if (item.active) {

				$.extend(item, {
					quantity: qty
				});

				cartArray.push(item);
			} else {
				cart.splice(i, 1);
				localStorage.setItem("cart", JSON.stringify(cart));
			}
		}
		, async: false
	});

}

function populateRows() {
	$.each(cartArray, function (i, array) {
		var item = array[i];
		var subTotal = (array.price * array.quantity).toFixed(2);

		$(".headerRow").after('<div class="itemRow" value="' + array._id + '"><div class="item-cart-name">' + array.title + '</div><div class="item-cart-price">' + array.price + '€</div><div class="item-cart-quantity">' + array.quantity + '</div><div class="item-cart-total">' + subTotal + '€</div><div class="item-cart-remove"><a class="simpleCart_remove" value="' + array._id + '"><i class="fa fa-times"></i></a></div></div>');
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
	if (cartTotal) {
		$('.simpleCart_total').removeClass('hidden').text(cartTotal.toFixed(2) + ' €');
	} else {
		$('.simpleCart_total').addClass('hidden');
	}
}
