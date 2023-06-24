import { menuArray } from "./data.js"

const checkout = document.getElementById('checkout')
const completeBtn = document.getElementById('complete')
const modal = document.getElementById('modal')

let orderArray = []

document.addEventListener('click', function(e){
    if(e.target.id){
        orderList(e.target.id)
        renderCheckout(orderArray)
    }
    
    if(e.target.dataset.index){
        removeItem(e.target.dataset.index)
    }
})

completeBtn.addEventListener('click', function(){
    modal.style.display = 'block'
})

function orderList(item){
    orderArray.push(item)
    renderCheckout(orderArray)
}

function renderMenu(){
    let listHTML = ''
    let ingredientsList = ''
    
    menuArray.forEach(function(item){
        
        for(let i = 0; i < item.ingredients.length; i++){
            ingredientsList += item.ingredients[i] + ', '
        }
        
        listHTML += `
            <div class="menu-item">
                <p class="image">${item.emoji}</p>
                <div class="specs">
                    <h3 class="name">${item.name}</h3>
                    <p class="ingredients">${ingredientsList}</p>
                    <p class="price">$${item.price}</p>
                </div>
                <button class="add-btn "id="${item.id}">+<buttons>
            </div>
        `
        ingredientsList = ''
    })
    document.getElementById('item-list').innerHTML = listHTML
}

renderMenu()

function renderCheckout(arr){
    let totalPrice  = 0
    let checkoutHTML = ''
    
        if(arr.length > 0){
            checkout.style.display = 'block'
        }else{
            checkout.style.display = 'none'
        }
    
    for(let i = 0; i < arr.length; i++){
        checkoutHTML += `
            <div class="order-item">
                <span class="checkout-txt">${menuArray[arr[i]].name}</span>
                <button class="remove" data-index="${i}">remove</button>
                <span class="price">$${menuArray[arr[i]].price}</span>
            </div>
        `
        
        totalPrice += menuArray[arr[i]].price
    }
        
    document.getElementById('total-price').textContent = `$${totalPrice}`
    document.getElementById('checkout-items').innerHTML = checkoutHTML
}

function removeItem(num){
    orderArray.pop(num)
    renderCheckout(orderArray)
}