/***
 *
 * characteristics of pizza
 *  - topping
 *  - size
 *  - crust
 *
 *
 */

const toppings = [
  "Roasted Tomatoes",
  "Onions",
  "Cheese",
  "Meat",
  "Olives",
  "peppers",
];

const crustCost = {
  crispy: 10,
  stuffed: 20,
  "gluten-free": 30,
};

const pizzaSizeCost = {
  medium: 100,
  small: 50,
  large: 150,
};

const pizzaSize = ["Medium", "Small", "Large"];

const pizzaPrizeBasedOnSize = {
  small: 100,
  medium: 200,
  large: 200,
};

const pizzaCrust = ["Crispy", "Stuffed", "Gluten-free"];

function Pizza(size, toppings, crust, quantity) {
  // https://stackoverflow.com/questions/221294/how-do-you-get-a-timestamp-in-javascript
  this.key = +new Date();
  this.size = size;
  this.toppings = toppings;
  this.crust = crust;
  this.quantity = quantity;
}

Pizza.prototype.price = function calculatePizzaPrice(size, crust) {
  return pizzaSizeCost[size] + crustCost[crust];
};

localStorage.setItem("cart", JSON.stringify([]));

let cart = JSON.parse(localStorage.getItem("cart"));

function placeCustomerOrder() {
  let pizzaSize = $("select#size").val().toLowerCase();
  let pizzaCrust = $("select#crust").val().toLowerCase();
  let pizzaToppings = $("select#toppings").val();
  let numberOfPizza = $("input#numberOfPizza").val();

  let pizza = new Pizza(pizzaSize, pizzaToppings, pizzaCrust, numberOfPizza);

  pizza.unitCost = pizza.price(pizzaSize, pizzaCrust);

  pizza.totalCost = parseInt(numberOfPizza) * pizza.unitCost;

  let currentCart = JSON.parse(localStorage.getItem("cart"));

  currentCart.push(pizza);

  localStorage.setItem("cart", JSON.stringify(currentCart));

  console.log(currentCart);
  populateCart(currentCart);

  $("form#customer-order-form")[0].reset();
  $("select#toppings").val([]);
}

function populateCart(cart) {
  console.log(cart.length);
  var data = "";
  if (cart.length > 0) {
    let charges = 0;

    data = cart.map(function (item, index) {
      charges += item.totalCost;
      return `<tr>
            <td>${(index = index + 1)}</td>
            <td>${item.size}</td>
            <td>${item.crust}</td>
            <td>${item.toppings.join(",")}</td>
            <td>${item.quantity}</td>
            <td>${item.unitCost}</td>
            <td>${item.totalCost}</td>
            <td><span class="btn btn-sm btn-outline-danger" 
            onclick="removeItemFromCart(${item.key})">X</span></td>
          </tr>`;
    });

    $("span#total-charges").html(charges);
    $("span#checkout-total-charges").html(charges);

    $("div#checkout-section").show()

  } else {
    data = ` <tr>
      <td colspan="8" class="text-center tex-info">No items in cart</td>
    </tr>`;
    $("span#total-charges").html(0);
    $("div#checkout-section").hide()
  }

  $("tbody#tbody-cart-items").html(data);
  $("span#total-cart-items").html(cart.length);
}

function removeItemFromCart(key) {
  let currentCart = JSON.parse(localStorage.getItem("cart"));

  // high order array methods javascript
  // freecodecamp.org/news/higher-order-functions-in-javascript-d9101f9cf528/
  let updateCart = currentCart.filter((item) => item.key != key);
  console.log(updateCart);

  localStorage.setItem("cart", JSON.stringify(updateCart));

  populateCart(updateCart);
}

function toggleDeliveryTextField(value) {
    let currentCart = JSON.parse(localStorage.getItem("cart"));
    let charges = 0 

    currentCart.forEach(function(item){
        charges+=item.totalCost
    })
    
  if (value == "YES") {
    $("div#div-delivery-location").show();
    $("p#deliver-charges").html("You have been charged an extra 200 for delivery.")
    charges+=200
    
  } else {
    $("div#div-delivery-location").hide();
    $("p#deliver-charges").html("")
  }
  $("span#checkout-total-charges").html(charges);
}


function checkout(){
    let delivery= $("select#delivery").val()
    let delivery_location= $("textarea#delivery-location").val()
    if(delivery=="YES"){
        if(delivery_location.trim()==""){
            return alert("Kindly provide delivery location details")
        }
    }


    alert("Your order has been successfully placed!")

    window.location.reload()
    

}
