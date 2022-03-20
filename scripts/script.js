/***
 * 
 * characteristics of pizza
 *  - topping
 *  - size
 *  - crust
 * 
 * 
 */

const toppings  = [
    "Roasted Tomatoes",
    "Onions",
    "Cheese",
    "Meat",
    "Olives",
    "peppers"
]

const pizzaSize = [
    "Medium",
    "Small",
    "Large"
]

// let selectTag = pizzaSize.map((item)=>(`<option value="${item}">${item}</option>`))

// $("select#size").html(`<option value="">Select size</option>${selectTag}`)

const pizzaCrust = [
    "Crispy",
    "Stuffed",
    "Gluten-free"
]

class Pizza{
    // global class variables 
    size; 
    price;
    topping;
    pizzaCrust;

    constructor(size, price, topping, pizzaCrust){
        // Assigning values to global variables provided when initializing the class
        this.size = size
        this.price = price
        this.topping = topping
        this.pizzaCrust = pizzaCrust
    }
}

function placeCustomerOrder(){
    let pizzaSize = $("select#size").val()
    let pizzaCrust = $("select#crust").val()
    let pizzaToppings = $("select#toppings").val()
    let numberOfPizza = $("input#numberOfPizza").val()

    console.log({numberOfPizza});

}


// initializing the class , an object will be created automatically
let customerPizza = new Pizza("Medium",23, ["Onions","Cheese"],["Crispy"])

console.log(customerPizza)





