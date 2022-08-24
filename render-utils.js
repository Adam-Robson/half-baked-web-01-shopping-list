export function renderItemContainer(item, handleDone, handleDelete) {
    const container = document.createElement('div');
    container.classList.add('list-item');
   
    const listItem = document.createElement('p');
    listItem.classList.add('list-item');
    listItem.textContent = item.item;

    const quantityItem = document.createElement('p');
    quantityItem.classList.add('quantity');
    quantityItem.textContent = item.quantity;

    //const boughtItem = document.createElement('p');
    //boughtItem.classList.add('bought-item');


    const doneButton = document.createElement('button');
    if (item.bought === true) {
        doneButton.classList.add('done-item');
    } else {
        doneButton.classList.add('done-button');
    }
    doneButton.textContent = 'done';
    doneButton.addEventListener('click', () => {
        handleDone(item);
    });

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-button');
    deleteButton.textContent = 'x';

    deleteButton.addEventListener('click', () => {
        handleDelete(item);
    });

    container.append(listItem, quantityItem, doneButton, deleteButton);

    return container;
}