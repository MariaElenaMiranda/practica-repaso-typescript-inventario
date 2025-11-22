import { productosDB } from "../data/productosDb.js";
//Función para obtener el el producto mediante el ID, a través de una promesa
export function getProductoService(id) {
    console.log('----------------------------------------------');
    console.log('Llamando a función getProductoService();');
    console.log('----------------------------------------------');
    const promesa = new Promise((resolve, reject) => {
        setTimeout(() => {
            const producto = productosDB.find(producto => producto.id === Number(id));
            if (producto) {
                resolve(producto);
            }
            else {
                reject(new Error(`El producto con ID ${id} no existe`));
            }
        }, 800);
    });
    return promesa;
}
