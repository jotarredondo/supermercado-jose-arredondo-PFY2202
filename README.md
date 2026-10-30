# Supermercado La Canasta

Aplicación SPA para registrar y consultar el inventario de un supermercado ficticio. Proyecto académico de la Actividad Formativa 2 de Desarrollo Frontend II (PFY2202), DUOC UC, que integra los requisitos de las semanas 1 y 2.

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

## Funcionalidades

- Inicio, Quiénes somos y Contáctanos, con menú inferior y navegación sin recargas completas.
- Menú independiente para agregar productos y consultar el inventario.
- Formulario con nombre, marca y tipo de producto obligatorios; rechaza campos vacíos o que contengan solo espacios.
- Identificador único por producto, confirmación de registro y limpieza del formulario.
- Tabla que muestra todos los productos registrados y mensaje cuando el inventario está vacío.
- Diseño responsivo con Tailwind CSS y estados de navegación activa, foco y error.

El inventario se mantiene en memoria al navegar entre páginas. Se reinicia al recargar o cerrar la aplicación. No utiliza backend, base de datos ni almacenamiento persistente.

Los datos del supermercado y sus canales de contacto son ficticios.
