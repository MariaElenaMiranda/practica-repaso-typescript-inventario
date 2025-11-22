# Guía de ayuda

## Estructura de un proyecto

```txt
.
├── README.md
├── ayuda.md
├── package-lock.json
├── package.json
├── public
│   └── index.html
├── src
│   ├── data
│   │   └── info.ts
│   ├── domain
│   │   └── entities
│   │       └── producto..ts
│   ├── main.ts
│   └── services
│       ├── getProductoService.ts
│       └── getProductosPorCategoria.ts
└── tsconfig.json
```

## Comandos de git

* Iniciar un repo: `git init`
* configuracion global o local: `git config --global/local user.name/user.email "datos"`
* agregar archivos: `git add .` o `git add file`
* Hacer commit: `git commit -m "comentario"` o la flag `-am` para archivos nuevos y modificados
* Crear ramas: `git switch -c nombre-rama`
* Cambiar de rama: `git switch nombre-rama`
* Vincular el repo a github: `git remote add origin link-http-ssh`
* Cambiar el repo de github: `git remote set-url origin link-http-ssh`
* Consultar origen: `git remote -v`
* Hacer push de local de github: `git push` o para nuevas ramas `git push -u nombre-rama`
* merge: `git merge` desde la rama que quiero que tenga los cambios.

### Configuracion basica de `.gitignore`

```.gitignore
# Dependencies
/node_modules

# Build output
/dist
/build

# Log files
npm-debug.log*
yarn-debug.log*
yarn-error.log*
*.log

# IDE configuration
.vscode/
.idea/

# Operating system files
.DS_Store
Thumbs.db
```

## TypeScript

* Instalacion local de ts con `npm i -D typescript`

Configuracion basica del `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ES2020",
    "strict": true,
    "outDir": "public/dist",
    "rootDir": "src"
  }
}
```

* Transpilar proyecto: `npx tsc`

### Servicios

La mejor manera de tener apuntes es mediante un bloque de codigo que permita interpretar

#### Traer un objeto

```ts
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
```

#### Traer un array de objetos

```ts
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
```

### Implementaciones

#### then/catch

```ts
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
  .catch((error : Error) => {
    let mensajeError = document.createElement('p');
    mensajeError.textContent = error instanceof Error ? error.message : "Error, vuelva a intentarlo";
    mensajeError.className = 'text-danger-emphasis';
    contenedorRespuesta.appendChild(mensajeError);
    console.log('Promise reject: La promesa está rechazada y pasa por el catch()');
    console.log(mensajeError);
  })
```

#### async/await

```ts
  try {
    const categoriaSeleccionada : Producto[] = await getProductosPorCategoria(categoria);
    for(let producto of categoriaSeleccionada) {
      let mensajeProductos = document.createElement('p');
      mensajeProductos.textContent = `ID: ${producto.id} | Producto: ${producto.nombre} | Stock: ${producto.stock}`;
      mensajeProductos.classList = 'text-success-emphasis';
      contenedorRespuesta.appendChild(mensajeProductos);
    }
  } catch(error) {
    let mensajeError = document.createElement('p');
    mensajeError.textContent = error instanceof Error ? error.message : "Error, vuelva a intentarlo";
    mensajeError.className = 'text-danger-emphasis';
    contenedorRespuesta.appendChild(mensajeError);
    console.log(mensajeError);
  }
```
