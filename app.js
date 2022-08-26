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
const addButton = document.getElementById('add-button');
const list = document.querySelector('#list');

addButton.addEventListener('click', async () => {
    list.textContent = '';
    const input = listItemInput.value;
    const quantity = quantityInput.value;
    const item = {
        title: input,
        quantity: quantity,
        bought: false,
    };

    await addItem(item.id);
 
    const newContainer = renderItemContainer(item);
    list.append(newContainer);
    listItemInput.value = '';
    quantityInput.value = '';
});

async function loadPage() {
    await displayItems();
}
loadPage();

async function handleDone(item) {
    item.bought === true;
    const doneButton = document.querySelector('.done-button');
    doneButton.classList.add('done-item');
    doneButton.classList.remove('done-button');
    doneButton.disabled = true;  
    await updateItem(item.bought);

    displayItems();
}

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