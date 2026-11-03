# Portfolio Comercial — Nahuel Vega

Sitio web comercial y portfolio profesional de desarrollo web orientado a la captación de clientes: comercios, pymes, restaurantes, locales de indumentaria y emprendimientos independientes.

Desarrollado con estándares web modernos, arquitectura modular vanilla (sin dependencias ni frameworks innecesarios), diseño responsive mobile-first, optimizaciones SEO y canal directo de conversión a WhatsApp.

---

## 🚀 Tecnologías Utilizadas

- **HTML5 Semántico**: Estructura accesible, meta etiquetas completas de SEO, Open Graph y Twitter Cards.
- **CSS3 Moderno**: Variables personalizadas (CSS Custom Properties), CSS Grid, Flexbox, media queries mobile-first, animaciones sutiles y soporte para `prefers-reduced-motion`.
- **JavaScript Vanilla (ES6+)**:
  - `config.js`: Archivo centralizado de configuración (datos de contacto, links, proyectos y redes).
  - `navigation.js`: Menú de navegación responsive para móviles y scroll suave.
  - `projects.js`: Renderizado dinámico y modular de tarjetas de proyectos.
  - `contact.js`: Validación en tiempo real del formulario y generación de mensajes estructurados para WhatsApp.
  - `main.js`: Scroll reveal con Intersection Observer, botón flotante y utilidades.
- **Tipografías**: Google Fonts (*Sora* para títulos de impacto y *Inter* para lectura clara).
- **Vectores SVG**: Favicon, iconografía y mockups de alta fidelidad.

---

## 📁 Estructura del Proyecto

```text
portfolio-nahuel-vega/
├── index.html                  # Página principal estructurada y semántica
├── README.md                   # Documentación técnica y guía de uso
├── assets/
│   ├── icons/
│   │   └── favicon.svg         # Isotipo NV en vector
│   ├── images/
│   │   └── og-image.svg        # Portada para compartir en redes sociales (1200x630)
│   └── projects/
│       ├── vegna-preview.svg   # Mockup UI Tienda VEGNA
│       ├── fortunato-preview.svg # Mockup UI Sistema Pedidos Heladería Fortunato
│       ├── parrilla-preview.svg  # Mockup UI Web Gastronómica Parrilla José Luis
│       └── vegna/              # Recursos de marca originales de VEGNA
├── css/
│   ├── style.css               # Estilos globales, paleta, componentes y animaciones
│   └── responsive.css          # Media queries (480px, 640px, 768px, 1024px, 1200px)
└── js/
    ├── config.js               # CONFIGURACIÓN CENTRALIZADA (Edición rápida)
    ├── navigation.js           # Menú hamburguesa, backdrop y smooth scroll
    ├── projects.js             # Generador de tarjetas de portfolio
    ├── contact.js              # Validación de formulario y enlace a WhatsApp
    └── main.js                 # Inicializador general y animaciones
```

---

## 💻 Cómo Ejecutar el Proyecto Localmente

No se requiere instalar Node.js ni compilar ningún paquete. Podés abrirlo directamente:

### Opción 1: Directamente en el navegador
Hacé doble clic en el archivo `index.html` para abrirlo en cualquier navegador (Chrome, Edge, Firefox, Safari).

### Opción 2: Con Live Server (VS Code / Antigravity)
1. Abrí la carpeta `portfolio-nahuel-vega` en tu editor.
2. Hacé clic derecho en `index.html` y seleccioná **"Open with Live Server"**.
3. Se abrirá automáticamente en `http://127.0.0.1:5500`.

### Opción 3: Con Python o Node (Terminal)
Si querés levantarlo mediante un servidor local rápido:

**Con Python 3:**
```bash
python -m http.server 8080
```
Y abrís `http://localhost:8080` en tu navegador.

**Con npx (Node.js):**
```bash
npx serve .
```

---

## ⚙️ Cómo Configurar tus Datos Personales

Todo el contenido sensible y de contacto está centralizado en el archivo:
👉 `js/config.js`

### 1. Cambiar número de WhatsApp
Buscá el bloque `whatsapp`:
```javascript
whatsapp: {
  number: '5491158708358',         // Código de país + código de área + número (sin +, espacios ni guiones)
  display: '+54 11 5870-8358',     // Formato legible que se muestra al usuario
  message: 'Hola Nahuel, vi tu portfolio y me gustaría consultar sobre un proyecto.'
}
```

### 2. Cambiar Correo Electrónico
```javascript
email: 'anahuuelvega@gmail.com',
```

### 3. Agregar Redes Sociales (Instagram, GitHub, LinkedIn)
Solo tenés que pegar las URLs dentro de las comillas:
```javascript
social: {
  instagram: 'https://instagram.com/tu_usuario',
  github: 'https://github.com/tu_usuario',
  linkedin: 'https://linkedin.com/in/tu_usuario',
}
```

---

## 🎬 Visualización de Video en Primer Plano (Lightbox Modal)

Cada proyecto cuenta con una demostración en video interactiva en **primer plano** con máxima definición:
- **Reproducción en Lightbox Modal:** Al hacer clic en la tarjeta o en el botón "Ver demo en video", el video se despliega centrado por encima de toda la página (`z-index: 2500`) con un fondo oscuro difuminado (`backdrop-filter: blur(20px)`).
- **Calidad y proporción nativa 100%:** Se utiliza `object-fit: contain` con dimensiones de hasta `1200px` de ancho y `88vh` de alto, evitando cualquier deformación, recorte o pérdida de nitidez de la interfaz del sitio web.
- **Sin sonido garantizado:** Configurado estrictamente en modo silenciado (`muted` y volumen 0).
- **Controles de reproducción completos:**
  - Botón central de Play/Pausa.
  - Barra inferior con Play/Pausa, línea de tiempo interactiva (clic para saltar), visualización de tiempo transcurrido y duración total.
  - Botón de pantalla completa nativa.
  - Atajos de teclado: `Espacio` o `k` (Play/Pausa), `←` / `→` (adelantar/retroceder 5s), `f` (pantalla completa) y `Esc` (cerrar modal).
  - Cierre haciendo clic en el botón de cerrar `(X)`, la tecla `Esc` o haciendo clic fuera del modal en el fondo.

### Cómo actualizar o cambiar las grabaciones de video:
1. Guardá el archivo de video en formato `.mp4` o `.webm` en la carpeta `assets/videos/`.
2. En `js/config.js`, especificá la ruta en la propiedad `video`:
   ```javascript
   vegna: {
     name: 'VEGNA',
     video: 'assets/videos/tu-nuevo-video.mp4',
     image: 'assets/projects/poster-del-video.svg', // Imagen de portada antes de reproducir
     ...
   ```

---

## 🖼️ Cómo Reemplazar las Portadas de los Proyectos

El sitio ya incluye mockups vectoriales en SVG de alta resolución para cada proyecto (`vegna-preview.svg`, `fortunato-preview.svg`, `parrilla-preview.svg`).

Si querés reemplazarlos por **capturas de pantalla reales** de los sitios web:

1. Tomá una captura de pantalla de tu proyecto (resolución recomendada: **800x500 píxeles** o formato 16:9).
2. Guardá la imagen en formato `.webp`, `.png` o `.jpg` dentro de la carpeta:
   `assets/projects/` (por ejemplo: `mi-captura-vegna.webp`).
3. Abrí `js/config.js` y actualizá la propiedad `image` del proyecto correspondiente:
   ```javascript
   vegna: {
     name: 'VEGNA',
     category: 'Tienda Online',
     url: 'https://vegna.tech/',
     image: 'assets/projects/mi-captura-vegna.webp',
     ...
   ```
4. ¡Listo! La tarjeta actualizará automáticamente su imagen con hover zoom y fallback de seguridad.

---

## ➕ Cómo Agregar un Nuevo Proyecto

Para incorporar un 4to o 5to proyecto al portfolio sin tocar el HTML:

1. Abrí `js/config.js`.
2. Dentro de `projects`, agregá un nuevo bloque con la información del trabajo:
   ```javascript
   nuevoProyecto: {
     name: 'Nombre del Comercio',
     category: 'Página Web Comercial', // o 'Tienda Online', 'Sistema de Pedidos', etc.
     url: 'https://urldelcomercio.com/', // Si aún no está publicado, dejalo como ''
     image: 'assets/projects/imagen-del-proyecto.webp',
     description: 'Breve explicación de la solución implementada para el cliente.',
     technologies: ['HTML5', 'CSS3', 'JavaScript'],
     features: [
       'Diseño adaptable a móviles',
       'Menú interactivo',
       'Integración con WhatsApp'
     ]
   }
   ```
3. En `js/projects.js`, agregá la clave `'nuevoProyecto'` a la lista `order`:
   ```javascript
   const order = ['vegna', 'fortunato', 'parrillaJoseLuis', 'nuevoProyecto'];
   ```
El sistema lo maquetará y animará automáticamente en la grilla.

---

## 🌐 Cómo Publicar el Portfolio en Internet

Al ser un sitio web estático optimizado, podés alojarlo de forma gratuita y con HTTPS en cualquiera de las siguientes plataformas:

### Opción A: GitHub Pages (Recomendado y Gratuito)
1. Creá un repositorio público en GitHub (por ejemplo: `portfolio` o `<tu-usuario>.github.io`).
2. Subí los archivos de la carpeta `portfolio-nahuel-vega`.
3. Andá a **Settings > Pages**.
4. En **Branch**, seleccioná `main` (o `master`) y carpeta `/(root)`.
5. Hacé clic en **Save**. En 1 minuto tu portfolio estará online con certificado SSL gratuito.

### Opción B: Vercel / Netlify
1. Conectá tu repositorio de GitHub a [Vercel](https://vercel.com) o [Netlify](https://netlify.com).
2. Seleccioná el repositorio y hacé clic en **Deploy**.
3. Te asignará una URL instantánea y podrás configurar un dominio propio (`.com`, `.com.ar`, `.tech`, etc.).

### Opción C: Servidor VPS propio (Hostinger / Ubuntu con Nginx)
Si preferís desplegarlo en tu propio servidor VPS:
1. Copiá la carpeta al directorio web del servidor:
   ```bash
   scp -r portfolio-nahuel-vega/* usuario@tu-vps:/var/www/portfolio/
   ```
2. Configurá un bloque de Nginx:
   ```nginx
   server {
       listen 80;
       server_name nahuelvega.com;
       root /var/www/portfolio;
       index index.html;

       location / {
           try_files $uri $uri/ =404;
       }
   }
   ```
3. Instalá SSL gratuito con Certbot:
   ```bash
   sudo certbot --nginx -d nahuelvega.com
   ```

---

## 📄 Licencia y Créditos

Desarrollado por **Nahuel Vega** — Estudiante de Analista en Sistemas Informáticos & Desarrollador Web.
Todos los derechos reservados.
