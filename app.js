import { checkAuth, signOutUser, addItem, deleteItem, getAllItems } from './fetch-utils.js';

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
const addButton = document.getElementById('add-button');
const list = document.querySelector('#list');

addButton.addEventListener('click', async () => {
    list.textContent = '';
    const input = listItemInput.value;
    const quantity = quantityInput.value;
    const item = {
        item: input,
        quantity: quantity,
    };

    addItem(item.item, item.quantity);
 
    const newContainer = renderItemContainer(item, quantity);
    list.append(newContainer);
    listItemInput.value = '';
    quantityInput.value = '';
});

async function loadPage() {
    await getAllItems();
    displayItems();
}

loadPage();


async function handleDelete(item) {
    const message = `Delete this item?`;
    if (!confirm(message)) return;

    const response = await deleteItem(item.id);
    if (!response.error) {
        const items = await getAllItems();
        const index = items.indexOf(item);
        if (index !== -1) {
            items.splice(index, 1);
        }
        getAllItems();
        displayItems();
    }
} 

async function displayItems() {
    shoppingListContainer.innerHTML = '';

    const items = await getAllItems();

    for (let item of items) {
        const renderedItem = renderItemContainer(item, handleDelete);
        shoppingListContainer.append(renderedItem);
    }
}