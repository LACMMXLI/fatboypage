// Array para almacenar los productos agregados al carrito
let carrito = [];

/**
 * Agrega un producto al carrito cuando se da clic en el botón "Agregar"
 */
function agregarAlCarrito(elemento) {
  const producto = elemento.parentElement;
  const nombre = producto.getAttribute('data-nombre');
  const precio = parseFloat(producto.getAttribute('data-precio'));

  // Agregar producto al array del carrito
  carrito.push({ nombre, precio });
  actualizarCarrito();
}

/**
 * Actualiza la lista de productos y el total en el carrito
 */
function actualizarCarrito() {
  const listaCarrito = document.getElementById('lista-carrito');
  const totalElement = document.getElementById('total');
  listaCarrito.innerHTML = '';
  let total = 0;

  carrito.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.nombre} - $${item.precio}`;
    listaCarrito.appendChild(li);
    total += item.precio;
  });

  totalElement.textContent = `$${total}`;
  actualizarWhatsApp();
}

/**
 * Genera el link de WhatsApp con el resumen del pedido
 */
function actualizarWhatsApp() {
  const whatsappLink = document.getElementById('whatsapp');
  let mensaje = 'Pedido:%0A';

  carrito.forEach(item => {
    mensaje += `${item.nombre} - $${item.precio}%0A`;
  });
  const total = carrito.reduce((sum, item) => sum + item.precio, 0);
  mensaje += `Total: $${total}`;

  // Reemplaza 123456789 con el número real (incluye código de país si aplica)
  whatsappLink.href = `https://wa.me/123456789?text=${mensaje}`;
}

/**
 * Muestra la categoría solicitada y oculta las demás
 */
function mostrarCategoria(categoriaId) {
  // Obtenemos todas las categorías
  const categorias = document.querySelectorAll('.categoria');

  // Las ocultamos
  categorias.forEach(cat => {
    cat.classList.remove('active');
  });

  // Mostramos la categoría seleccionada
  const categoriaSeleccionada = document.getElementById(categoriaId);
  if (categoriaSeleccionada) {
    categoriaSeleccionada.classList.add('active');
  }
}
