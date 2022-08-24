export function renderItemContainer(item, handleDelete) {
    const container = document.createElement('div');
    container.classList.add('list-item');
   
    const listItem = document.createElement('p');
    listItem.classList.add('list-item');
    listItem.textContent = item.item;

    const quantityItem = document.createElement('p');
    quantityItem.classList.add('quantity');
    quantityItem.textContent = item.quantity;

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-button');
    deleteButton.textContent = 'x';

    deleteButton.addEventListener('click', () => {
        handleDelete(item);
    });

    container.append(listItem, quantityItem, deleteButton);

    return container;
}