import { Producto } from "../domain/entities/producto";
import { productosDB } from "../data/productosDb";

//Función para obtener un array de productos de la misma categoria a través de una promesa
export async function getProductosPorCategoria(categoria : string) : Promise<Producto[]> {
  console.log('----------------------------------------------');
  console.log('Llamando a función getProductosPorCategoria();');
  console.log('----------------------------------------------');
  const promesa : Promise <Producto[]> = new Promise((resolve, reject) =>{
    setTimeout(() => {
      const productos : Producto[] = productosDB.filter(producto => producto.categoria.toLowerCase() === categoria.toLowerCase());
      if(productos.length > 0) {
        resolve(productos);
      }else {
        reject(new Error(`Los productos con categoría ${categoria} no existen`))
      }
    },1000);
  });
  return promesa;
}