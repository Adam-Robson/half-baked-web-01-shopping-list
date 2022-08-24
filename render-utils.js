export function renderItemContainer(item, quantity) {
    const container = document.createElement('div');
    
    const listItem = document.createElement('p');
    listItem.classList.add('list-item');
    listItem.textContent = item.item;

    const quantityItem = document.createElement('p');
    quantityItem.classList.add('quantity');
    quantityItem.textContent = item.quantity;

    container.append(listItem, quantity);

    return container;
}