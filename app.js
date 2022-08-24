import { checkAuth, signOutUser, addItem } from './fetch-utils.js';

import { renderItemContainer } from './render-utils.js';
// checking if we have a user! (will redirect to auth if not):
checkAuth();
// can optionally return the user:
// const user = checkAuth();

const signOutLink = document.getElementById('sign-out-link');
signOutLink.addEventListener('click', signOutUser);

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