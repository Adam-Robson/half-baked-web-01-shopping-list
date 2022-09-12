export function renderItemContainer(grocery, handleDone, handleDelete) {
    const container = document.createElement('div');
    container.classList.add('list-item-container');
   
    const listItem = document.createElement('p');
    listItem.classList.add('list-item');
    listItem.textContent = grocery.item;

    const quantityItem = document.createElement('p');
    quantityItem.classList.add('quantity');
    quantityItem.textContent = grocery.quantity;

    //const boughtItem = document.createElement('p');
    //boughtItem.classList.add('bought-item');
    const doneButton = document.createElement('button');
    if (grocery.bought === false) {
        doneButton.textContent = 'done';
        doneButton.classList.add('done-button');
        doneButton.addEventListener('click', () => {
            handleDone(grocery);
        });} else {
        doneButton.textContent = 'done';
        listItem.classList.remove('list-item');
        listItem.classList.add('done-item');
        doneButton.disabled = true;
    }
    
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-button');
    deleteButton.textContent = 'x';

    deleteButton.addEventListener('click', () => {
        handleDelete(grocery);
    });

    container.append(listItem, quantityItem, doneButton, deleteButton);

    return container;
}