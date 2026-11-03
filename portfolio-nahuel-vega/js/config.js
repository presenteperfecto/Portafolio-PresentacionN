/**
 * =============================================
 * CONFIGURACIÓN CENTRALIZADA DEL PORTFOLIO
 * =============================================
 * 
 * Modificá los valores de este archivo para
 * personalizar tu portfolio sin tocar el resto
 * del código.
 */

const CONFIG = {

  /* ── Datos personales ── */
  name: 'Nahuel Vega',
  role: 'Desarrollo Web',
  description: 'Desarrollo sitios web, tiendas online y sistemas de pedidos personalizados para comercios que quieren crecer y mejorar su presencia digital.',

  /* ── Contacto ── */
  whatsapp: {
    number: '5491158708358',         // Número con código de país, sin + ni espacios
    display: '+54 11 5870-8358',     // Formato visible en la web
    message: 'Hola Nahuel, vi tu portfolio y me gustaría consultar sobre un proyecto.'
  },
  email: 'anahuuelvega@gmail.com',

  /* ── Redes sociales ── */
  social: {
    instagram: '',    // Ejemplo: 'https://instagram.com/tu_usuario'
    github: '',       // Ejemplo: 'https://github.com/tu_usuario'
    linkedin: '',     // Ejemplo: 'https://linkedin.com/in/tu_usuario'
  },

  /* ── Proyectos ── */
  projects: {
    vegna: {
      name: 'VEGNA',
      category: 'Tienda Online',
      url: 'https://vegna.tech/',
      video: 'assets/videos/vegna-preview.mp4',
      duration: '0:45',
      image: 'assets/projects/vegna-preview.svg',
      description: 'Tienda online de indumentaria masculina con catálogo de productos, gestión por categorías, panel de administración y diseño responsive.',
      technologies: ['HTML5', 'CSS3', 'JavaScript', 'Node.js', 'Express', 'MySQL'],
      features: [
        'Catálogo de productos organizado por categorías',
        'Gestión de imágenes y productos',
        'Panel de administración',
        'Diseño adaptable a dispositivos móviles',
        'Despliegue en servidor VPS',
        'Configuración de dominio y alojamiento'
      ]
    },
    fortunato: {
      name: 'Heladería Fortunato',
      category: 'Sistema de Pedidos',
      url: 'https://presenteperfecto.github.io/Fortunato2.0/',
      video: 'assets/videos/fortunato-preview.mp4',
      duration: '2:18',
      image: 'assets/projects/fortunato-preview.svg',
      description: 'Sistema de pedidos online para una heladería con catálogo interactivo, selección de sabores y tamaños, carrito de compras e integración con WhatsApp.',
      technologies: ['HTML5', 'CSS3', 'JavaScript', 'Node.js', 'Express'],
      features: [
        'Catálogo interactivo de helados',
        'Selección de tamaños y sabores',
        'Carrito de compras',
        'Selección de sucursal',
        'Modalidad de delivery o retiro',
        'Integración con WhatsApp para gestionar pedidos'
      ]
    },
    parrillaJoseLuis: {
      name: 'Parrilla José Luis',
      category: 'Sitio Web Comercial',
      url: 'https://presenteperfecto.github.io/ParrillaCostanera/',
      video: 'assets/videos/parrilla-preview.mp4',
      duration: '0:49',
      image: 'assets/projects/parrilla-preview.svg',
      description: 'Sitio web comercial para un establecimiento gastronómico con menú digital, información del negocio, ubicación mediante Google Maps y acceso directo a WhatsApp.',
      technologies: ['HTML5', 'CSS3', 'JavaScript'],
      features: [
        'Diseño responsive',
        'Menú digital organizado por categorías',
        'Productos y precios',
        'Horarios y ubicación mediante Google Maps',
        'Acceso directo a WhatsApp',
        'Animaciones y recursos visuales'
      ]
    }
  },

  /* ── Imágenes ── */
  images: {
    // Podés reemplazar estas rutas por capturas (.webp, .png o .jpg) de tus proyectos.
    // Tamaño sugerido para capturas: 800x500px
    vegnaPreview: 'assets/projects/vegna-preview.svg',
    fortunatoPreview: 'assets/projects/fortunato-preview.svg',
    parrillaPreview: 'assets/projects/parrilla-preview.svg',
    profilePhoto: 'assets/images/profile.webp',       // Foto de perfil (opcional)
    ogImage: 'assets/images/og-image.svg',            // Imagen para redes sociales (1200x630px)
  },

  /* ── SEO ── */
  seo: {
    title: 'Nahuel Vega — Desarrollo Web para Comercios y Negocios',
    description: 'Desarrollo sitios web, tiendas online y sistemas de pedidos personalizados para comercios. Soluciones digitales profesionales en Argentina.',
    keywords: 'desarrollo web, diseño web, tienda online, sistema de pedidos, páginas web para comercios, desarrollo web freelance, Argentina',
    url: '',  // URL final del portfolio cuando esté publicado
    locale: 'es_AR',
  }
};
