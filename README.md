# Supermercado La Canasta

Aplicación SPA para registrar y consultar el inventario de Supermercado La Canasta, un supermercado ficticio, y gestionar un carrito de compras. Proyecto académico de la Actividad Sumativa de la Semana 3 de Desarrollo Frontend II (PFY2202), DUOC UC, que continúa el trabajo de las semanas 1 y 2.

## Tecnologías

- React con JavaScript y JSX.
- Vite y su plugin oficial de React.
- React Router para la navegación.
- Context API y useReducer para el estado global.
- Tailwind CSS mediante su integración con Vite.

## Requisitos

- Node.js 24 LTS y npm. El proyecto fue validado con Node.js 24.19.0 y npm 11.17.0.
- Un navegador moderno.

## Ejecución local

Desde la carpeta raíz del proyecto, instala las dependencias:

```bash
npm install
```

Inicia el servidor de desarrollo:

```bash
npm run dev
```

Abre la dirección indicada por Vite en la terminal, normalmente http://localhost:5173. Para detener el servidor, utiliza Ctrl+C.

Para generar la versión de producción:

```bash
npm run build
```

Los archivos compilados se generan en `dist/`.

## Pruebas automatizadas

Ejecuta las pruebas con el runner integrado de Node.js, sin instalar dependencias adicionales:

```bash
node --test src/context/inventoryReducer.test.js src/utils/inventoryFilter.test.js src/utils/parseStock.test.js
```

Las pruebas cubren el reducer, los selectores, la sincronización entre carrito e inventario, el filtro y la normalización de categorías, y la validación del stock, incluidos límites de precisión numérica.

## Funcionalidades

Desarrolladas durante las tres semanas:

- Inicio, Quiénes somos y Contáctanos, con menú inferior y navegación sin recargas completas.
- Menú independiente para agregar productos y consultar el inventario.
- Formulario con nombre, marca, tipo de producto y stock obligatorios; rechaza campos vacíos o que contengan solo espacios. El stock admite únicamente texto formado por dígitos que represente un entero no negativo hasta `Number.MAX_SAFE_INTEGER`, incluido cero; rechaza negativos, decimales y entradas no numéricas antes de convertir el texto a número.
- Identificador único por producto, confirmación de registro y limpieza del formulario.
- Tabla que muestra todos los productos registrados y mensaje cuando el inventario está vacío.
- Filtro dinámico por categoría (tipo de producto), sin alterar el inventario original. Las categorías se normalizan para unificar variantes de mayúsculas, acentos y espacios, reutilizando el nombre de la categoría existente.
- Detalle individual mediante rutas dinámicas por identificador, con nombre, marca, categoría, stock total, unidades reservadas y disponibilidad; incluye la opción de agregar al carrito y un estado para productos no encontrados.
- Carrito con aumento y disminución de cantidades, eliminación de la línea al llegar a cero y estado vacío. La disponibilidad se calcula como stock total menos unidades reservadas: agregar unidades reduce la disponibilidad y retirarlas la devuelve, sin superar el stock.
- Diseño responsivo con Tailwind CSS y estados de navegación activa, foco y error.

El inventario y el carrito se mantienen en memoria al navegar entre páginas. Se reinician al recargar o cerrar la aplicación; una URL de detalle no recupera productos de una sesión anterior. No utiliza backend, base de datos ni almacenamiento persistente.

Los datos del supermercado y sus canales de contacto son ficticios.
