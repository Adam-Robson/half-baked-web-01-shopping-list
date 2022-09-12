import { checkAuth, signOutUser, addItem, deleteItem, getAllItems, updateItem } from './fetch-utils.js';

import { renderItemContainer } from './render-utils.js';
// checking if we have a user! (will redirect to auth if not):
checkAuth();
// can optionally return the user:
// const user = checkAuth();

const signOutLink = document.getElementById('sign-out-link');
signOutLink.addEventListener('click', signOutUser);

const shoppingListContainer = document.getElementById('shopping-list-container');
const listItemInput = document.getElementById('list-item-input'); 
const quantityInput = document.getElementById('quantity-input');   
const priceInput = document.getElementById('price-input');
const locationInput = document.getElementById('location-input');
const addButton = document.getElementById('add-button');
const list = document.querySelector('#list');


addButton.addEventListener('click', async () => {
    list.textContent = '';

    const quantity = quantityInput.value;
    const location = locationInput.value;
    const price = priceInput.value;
    const input = listItemInput.value;
    
    const grocery = [{
        quantity: quantity,
        location: location,
        price: price,
        item: input,
        bought: false,
    }];
    
    await addItem(grocery);
 
    const newContainer = renderItemContainer(grocery, handleDone, handleDelete);

    list.append(newContainer);
    listItemInput.value = '';
    quantityInput.value = '';
    locationInput.value = '';
    priceInput.value = '';
});

displayItems();

async function handleDone(grocery) {
    grocery.bought === true;
    const doneButton = document.querySelector('.done-button');
    const listItem = document.querySelector('.list-item');
    listItem.classList.add('done-item');
    listItem.classList.remove('done-button');
    doneButton.disabled = true;  
    await updateItem(grocery.id);

    displayItems();
}

async function handleDelete(grocery) {
    const message = `Delete this grocery item?`;
    if (!confirm(message)) return;

    const response = await deleteItem(grocery.id);
    if (!response.error) {
        const items = await getAllItems();
        const index = items.indexOf(grocery);
        if (index !== -1) {
            items.splice(index, 1);
        }
        displayItems();
    }
} 


async function displayItems() {
    shoppingListContainer.innerHTML = '';

    const items = await getAllItems();

    for (let item of items) {
        const renderedItem = renderItemContainer(item, handleDone, handleDelete);
        shoppingListContainer.append(renderedItem);
    }
}