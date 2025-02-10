"use strict";

//opretter en indkøbskruv  med et array af objekter 
// cart er en global variabel som kan tilgåes alle steder i koden
let cart =[
    {type: "coffee", quantity:0, price: 10, total: 0},
    {type: "Americano", quantity:0, price: 12, total: 0},
    {type: "Espresso", quantity:0, price: 15, total: 0}
];

//gemmer kurvens indhold i browseren localStorage
function saveCartToLocalStorage(){
    localStorage.setItem('cart', JSON.stringify(cart ));
}


//funktionen henter kurvens indhold fra localstorage ved sideindlæsning
function loadCartFromLocalStorage(){
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
        cart = JSON.parse(storedCart); //konverter jason-strengen tilbage til et array
        updateUIFromCart(); //opdaterer UI(user interface) med de hentede data
    }
}

function updateUIFromCart(){
    cart.forEach(item =>{
        let quantitField =document.getElementById(item.type);
        let totalField =document.getElementById(item.type +"-total");

        if (quantitField && totalField){
            quantitField.value = item.quantity;
            totalField.value = item.total;
        }
    });

    totalPrice();
}

function addToCart(product){
    let product = cart.find( item => item.type === product);

    if (product){
        product.quantity++;
        updateTotalPrice(product);
        saveCartToLocalStorage();
    }
}

function removeFromCart(product){
    let product = cart.find( item => item.type === product);

    if (product && product.quantity > 0){
        product.quantity--;
        updateTotalPrice(product);
        saveCartToLocalStorage();
    }
}

function resetCart(product){
    let product = cart.find( item => item.type === product);
   
    if (product){
        product.quantity = 0;
        updateTotalPrice(product);
        saveCartToLocalStorage();
    }
}

function updateTotalPrice(product){
    let product = cart.find( item => item.type === product);
    if (product){
        product.total = product.quantity * product.price;
    document.getElementById(product).value = product.quantity
    document.getElementById(product + "-total").value = product.total;
    }
    totalPrice();
}

function totalPrice(){
    const totalSum = cart.reduce((SubmitEvent, item) => sum + item.total, 0);
    document.getElementById("totalSum".value).value = totalSum;
}

function restEntirecart(){
    cart.forEach(item => {
        item.quantity = 0;
        item.total = 0;
        
    });

    updateUIFromCart();
    saveCartToLocalStorage();
}

window.onload = function(){
    loadCartFromLocalStorage();
}

