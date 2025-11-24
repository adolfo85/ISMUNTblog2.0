# ISMUNT Blog - Aplicación React Moderna

Aplicación web moderna construida con React y Vite para la cartelera informativa del ISMUNT (Instituto Superior de Música).

## 🚀 Inicio Rápido

### Instalación

1. **Instalar dependencias**:
   ```bash
   npm install
   ```
   ⏱️ Esto puede tardar algunos minutos. Si tarda más de 3 minutos, presiona Ctrl+C e intenta de nuevo.

2. **Iniciar el servidor de desarrollo**:
   ```bash
   npm run dev
   ```

3. **Abrir el navegador**:
   - El servidor debería abrir automáticamente en `http://localhost:3000`
   - Si no se abre, accede manualmente a esa URL

## 📁 Estructura del Proyecto

```
BlogISMUNT-V2.0/
├── src/
│   ├── components/         # Componentes reutilizables
│   │   ├── Layout/        # Layout, Navbar, Footer
│   │   └── admin/         # Componentes del admin
│   ├── pages/             # Páginas de la aplicación
│   │   ├── Home.jsx       # Página principal
│   │   ├── Agenda.jsx     # Agenda musical
│   │   ├── Materia.jsx    # Página de materias
│   │   └── admin/         # Páginas de administración
│   ├── services/          # Servicios (auth, content)
│   ├── App.jsx            # Componente principal
│   ├── main.jsx           # Punto de entrada
│   └── index.css          # Estilos globales
├── index-new.html         # HTML principal
├── package.json           # Dependencias
└── vite.config.js         # Configuración de Vite
```

## 🔐 Panel de Administrador

### Acceso
- URL: `http://localhost:3000/admin/login`
- Usuario: `admin`
- Contraseña: `ismunt2024`

### Funcionalidades
- ✏️ Editar contenido de todas las páginas
- 📝 Editor JSON con vista previa
- 💾 Guardado automático en localStorage
- 🔒 Autenticación protegida

## 🎨 Características

### Diseño Moderno
- ✨ Gradientes vibrantes y animaciones suaves
- 📱 Diseño 100% responsive
- 🎯 Tipografía moderna (Google Fonts - Inter)
- 💫 Efectos glassmorphism

### Páginas Públicas
- **Home**: Página principal con información general
- **Agenda Musical**: Eventos organizados por mes
- **Materias**: 5 páginas de materias individuales

### Tecnologías
- ⚛️ React 18
- ⚡ Vite 5
- 🎨 CSS Variables
- 🔄 React Router DOM
- 🎭 Lucide Icons
- 🌊 Framer Motion

## 📝 Editar Contenido

### Desde el Panel Admin

1. **Login**: Accede a `/admin/login` con las credenciales
2. **Dashboard**: Selecciona qué sección editar
3. **Editor**: Modifica el contenido JSON
4. **Guardar**: Los cambios se aplican inmediatamente
5. **Vista Previa**: Verifica el formato antes de guardar

### Estructura de Datos

El contenido se guarda en `localStorage` con la siguiente estructura:

```json
{
  "home": {
    "title": "CARTELERA ISMUNT",
    "subtitle": "...",
    "generalInfo": "..."
  },
  "agenda": {
    "events": [...]
  },
  "materias": {
    "tecnicas": {...},
    "lectura": {...}
  }
}
```

## 🛠️ Comandos Disponibles

```bash
# Desarrollo
npm run dev          # Inicia servidor de desarrollo

# Producción
npm run build        # Construye para producción
npm run preview      # Preview del build de producción
```

## ⚠️ Importante

### Almacenamiento Local
- Los datos se guardan en `localStorage` del navegador
- Los cambios solo se ven en el mismo navegador donde se editaron
- No se sincronizan entre dispositivos
- Recomendado para uso local o desarrollo

### Respaldo de Datos
- Los archivos HTML originales están respaldados
- Puedes exportar el contenido desde DevTools > Application > Local Storage

## 🐛 Solución de Problemas

### npm install se cuelga
```bash
# Limpiar cache de npm
npm cache clean --force
npm install
```

### El puerto 3000 está ocupado
Vite elegirá automáticamente otro puerto disponible (3001, 3002, etc.)

### Cambios no se reflejan
- Verifica que guardaste en el editor
- Refresca la página (F5)
- Revisa la consola del navegador (F12)

## 📞 Contacto

Desarrollado por **Adolfo C. De Boeck**  
Email: adolfodeboeck@gmail.com

---

## 🎯 Próximos Pasos Recomendados

1. **Testing**: Prueba todas las páginas y funcionalidades
2. **Contenido**: Migra el contenido de los HTMLs antiguos al nuevo sistema
3. **Imágenes**: Sube las imágenes necesarias
4. **Deploy**: Considera Netlify o Vercel para deployment gratuito
