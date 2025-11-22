import { getProductosPorCategoria } from "./services/getProductoPorCategorias.js";
import { getProductoService } from "./services/getProductoService.js";
//Elementos del DOM:
const input = document.getElementById('input-producto');
const btnId = document.getElementById('btn-id');
const btnCategoria = document.getElementById('btn-categoria');
const contenedorRespuesta = document.getElementById('contenedor-resultados');
//Función que consume la promesa con .then() y .catch() y muestra los detalles del producto por su id
function mostrarProducto(id) {
    console.log('----------------------------------------------');
    console.log('Llamando a función mostrarProducto();');
    console.log('----------------------------------------------');
    contenedorRespuesta.textContent = '';
    contenedorRespuesta.className = '';
    //En el caso de estos tres elementos no es necesario tipar, debido a la inferencia de tipos (HTMLParagraphElement)
    let nombreProducto = document.createElement('p');
    let nombreCategoria = document.createElement('p');
    let stockProducto = document.createElement('p');
    getProductoService(id)
        .then((producto) => {
        nombreProducto.textContent = `Producto: ${producto.nombre}`;
        nombreProducto.className = 'text-success-emphasis';
        nombreCategoria.textContent = `Categoría: ${producto.categoria}`;
        nombreCategoria.className = 'text-success-emphasis';
        stockProducto.textContent = `Stock: ${producto.stock}`;
        stockProducto.className = 'text-success-emphasis';
        contenedorRespuesta.appendChild(nombreProducto);
        contenedorRespuesta.appendChild(nombreCategoria);
        contenedorRespuesta.appendChild(stockProducto);
        console.log('Promise resolve: La promesa está resulta y pasa por el then()');
        console.log(nombreProducto);
        console.log(nombreCategoria);
        console.log(stockProducto);
    })
        .catch((error) => {
        let mensajeError = document.createElement('p');
        mensajeError.textContent = error instanceof Error ? error.message : "Error, vuelva a intentarlo";
        mensajeError.className = 'text-danger-emphasis';
        contenedorRespuesta.appendChild(mensajeError);
        console.log('Promise reject: La promesa está rechazada y pasa por el catch()');
        console.log(mensajeError);
    });
}
//Función async / await que consume la promesa y muestra el listado de productos por su categoria
async function mostrarProductosCategoria(categoria) {
    console.log('-----------------------------------------------');
    console.log('Llamando a función mostrarProductosCategoria();');
    console.log('-----------------------------------------------');
    contenedorRespuesta.textContent = '';
    contenedorRespuesta.className = '';
    try {
        const categoriaSeleccionada = await getProductosPorCategoria(categoria);
        for (let producto of categoriaSeleccionada) {
            let mensajeProductos = document.createElement('p');
            mensajeProductos.textContent = `ID: ${producto.id} | Producto: ${producto.nombre} | Stock: ${producto.stock}`;
            mensajeProductos.classList = 'text-success-emphasis';
            contenedorRespuesta.appendChild(mensajeProductos);
        }
    }
    catch (error) {
        let mensajeError = document.createElement('p');
        mensajeError.textContent = error instanceof Error ? error.message : "Error, vuelva a intentarlo";
        mensajeError.className = 'text-danger-emphasis';
        contenedorRespuesta.appendChild(mensajeError);
        console.log(mensajeError);
    }
}
//Botón "Buscar productos por ID". Llama a la función "mostrarProducto"
btnId.addEventListener('click', () => {
    console.log('--------------------------------------------------------------');
    console.log('Click en el botón "Buscar productos por ID" (addEventListener)');
    console.log('--------------------------------------------------------------');
    const inputId = parseInt(input.value);
    //Aqui no es necesario tipar, ya que hay inferencia de tipos (HTMLParagraphElement)
    let mensaje = document.createElement('p');
    if (Number.isNaN(inputId)) {
        contenedorRespuesta.textContent = '';
        contenedorRespuesta.className = '';
        mensaje.textContent = 'Ingresaste un texto o una categoría. Ingresa un ID válido para buscar el producto';
        mensaje.className = 'text-warning-emphasis';
        contenedorRespuesta.appendChild(mensaje);
        console.log(mensaje);
    }
    else {
        mostrarProducto(inputId);
    }
});
//Botón "Buscar productos por categoría". Llama a la función "mostrarProductosCategoria"
btnCategoria.addEventListener('click', () => {
    console.log('--------------------------------------------------------------');
    console.log('Click en el botón "Buscar productos por categoría" (addEventListener)');
    console.log('--------------------------------------------------------------');
    const inputCategoria = input.value;
    //Aqui no es necesario tipar, ya que hay inferencia de tipos (HTMLParagraphElement)
    let mensaje = document.createElement('p');
    if (!Number.isNaN(parseInt(inputCategoria))) {
        contenedorRespuesta.textContent = '';
        contenedorRespuesta.className = '';
        mensaje.textContent = 'Ingresaste un número. Debes ingresar una categoría válida para buscar los productos';
        mensaje.className = 'text-warning-emphasis';
        contenedorRespuesta.appendChild(mensaje);
        console.log(mensaje);
    }
    else {
        mostrarProductosCategoria(inputCategoria);
    }
});
