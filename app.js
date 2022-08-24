// importing other stuff, utility functions for:
// working with supabase:
import { checkAuth, signOutUser, addItem } from './fetch-utils.js';
// pure rendering (data --> DOM):
import { renderItemContainer } from './render-utils.js';
/*  "boiler plate" auth code */
// checking if we have a user! (will redirect to auth if not):
checkAuth();
// can optionally return the user:
// const user = checkAuth();

// sign out link:
const signOutLink = document.getElementById('sign-out-link');
signOutLink.addEventListener('click', signOutUser);
/* end "boiler plate auth code" */

// grab needed DOM elements on page:
    // section - inputs
    // label - for - list item input
    // id - list item input
    // button - add button
    // section - shopping list container
    // div - list
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






// local state:

// display functions:

// events:
