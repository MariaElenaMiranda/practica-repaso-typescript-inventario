import { Producto } from "../domain/entities/producto";
import { productosDB } from "../data/productosDb";

//Función para obtener el el producto mediante el ID, a través de una promesa
export function getProductoService(id : number) : Promise<Producto> {
  console.log('----------------------------------------------');
  console.log('Llamando a función getProductoService();');
  console.log('----------------------------------------------');

  const promesa : Promise<Producto> = new Promise((resolve, reject) =>{
    setTimeout(() => {
      const producto : Producto | undefined = productosDB.find(producto => producto.id === Number(id));
      if (producto) {
        resolve(producto);
      }else {
        reject(new Error(`El producto con ID ${id} no existe`))
      }
    },800);
  });
  return promesa;
}