const menuItems = [
    { id: 1, name: 'Pizza', price: 500 },
    { id: 2, name: 'Hamburguesa', price: 350 },
    { id: 3, name: 'Sushi', price: 600 }
];

function renderMenu() {
    const menuContainer = document.getElementById('menu');
    menuItems.forEach(item => {
        const menuItem = document.createElement('div');
        menuItem.innerHTML = `
            <input type="checkbox" id="item-${item.id}" data-price="${item.price}">
            <label for="item-${item.id}">${item.name} - $${item.price}</label>
        `;
        menuContainer.appendChild(menuItem);
    });
}

function calculateTotal() {
    let total = 0;
    menuItems.forEach(item => {
        const checkbox = document.getElementById(`item-${item.id}`);
        if (checkbox.checked) {
            total += item.price;
        }
    });
    document.getElementById('total').textContent = total.toFixed(2);
}

function confirmarPedido() {
    const nombre = document.getElementById('nombre').value;
    const direccion = document.getElementById('direccion').value;
    const telefono = document.getElementById('telefono').value;
    const email = document.getElementById('email').value;

    if (!nombre || !direccion || !telefono || !email) {
        alert('Por favor, completa todos los campos.');
        return;
    }

    const detallesPedido = [];
    menuItems.forEach(item => {
        const checkbox = document.getElementById(`item-${item.id}`);
        if (checkbox.checked) {
            detallesPedido.push(`${item.name} - $${item.price}`);
        }
    });

    const total = document.getElementById('total').textContent;
    const numeroPedido = Math.floor(Math.random() * 100000);

    document.getElementById('numeroPedido').textContent = numeroPedido;
    document.getElementById('detallesPedido').innerHTML = detallesPedido.map(item => `<li>${item}</li>`).join('');
    document.getElementById('totalConfirmacion').textContent = total;

    document.getElementById('pedidoForm').style.display = 'none';
    document.getElementById('confirmacion').style.display = 'block';
}

document.getElementById('pedidoForm').addEventListener('submit', function(event) {
    event.preventDefault();
    confirmarPedido();
});

document.getElementById('menu').addEventListener('change', calculateTotal);

window.onload = renderMenu;
