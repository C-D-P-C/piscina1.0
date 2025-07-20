
//2  Bloquear combinaciones de teclas comunes y avanzadas
document.addEventListener('keydown', (event) => {
    // Combinaciones comunes para guardar, imprimir y ver código fuente
    const blockedKeys = [
        { ctrlKey: true, key: 's', message: 'Guardar está deshabilitado.' }, // Ctrl+S
        { ctrlKey: true, key: 'p', message: 'Imprimir está deshabilitado.' }, // Ctrl+P
        { ctrlKey: true, key: 'u', message: 'Ver código fuente está deshabilitado.' }, // Ctrl+U
        { ctrlKey: true, shiftKey: true, key: 'i', message: 'Herramientas de desarrollo están deshabilitadas.' }, // Ctrl+Shift+I
        { ctrlKey: true, shiftKey: true, key: 'j', message: 'Consola está deshabilitada.' }, // Ctrl+Shift+J
        { ctrlKey: true, shiftKey: true, key: 'c', message: 'Inspeccionar elemento está deshabilitado.' }, // Ctrl+Shift+C
        { ctrlKey: true, key: 'j', message: 'Consola está deshabilitada.' }, // Ctrl+J
        { ctrlKey: true, key: 'e', message: 'Edición está deshabilitada.' }, // Ctrl+E
        { ctrlKey: true, key: 'f', message: 'Buscar está deshabilitado.' }, // Ctrl+F
        { ctrlKey: true, key: 'h', message: 'Reemplazar está deshabilitado.' }, // Ctrl+H
        { ctrlKey: true, key: 'a', message: 'Seleccionar todo está deshabilitado.' }, // Ctrl+A
    ];

    // Iterar sobre las combinaciones bloqueadas
    blockedKeys.forEach(({ ctrlKey, shiftKey, key, message }) => {
        if (
            event.ctrlKey === !!ctrlKey &&
            event.shiftKey === !!shiftKey &&
            event.key.toLowerCase() === key.toLowerCase()
        ) {
            event.preventDefault();
            alert(message);
        }
    });

    // Bloquear tecla PrintScreen
    if (event.key === 'PrintScreen') {
        // Limpia el portapapeles para evitar capturas de pantalla
        navigator.clipboard.writeText('').then(() => {
            alert('La captura de pantalla está deshabilitada.');
        }).catch((err) => {
            console.error('Error al bloquear PrintScreen:', err);
        });
    }

    // Bloquear F12 (Herramientas de desarrollo)
    if (event.key === 'F12') {
        event.preventDefault();
        alert('El acceso a herramientas de desarrollo está deshabilitado.');
    }
});

// Deshabilitar clic derecho para evitar menú contextual
document.addEventListener('contextmenu', (event) => {
    event.preventDefault();
    alert('El clic derecho está deshabilitado.');
});

// Detectar y bloquear arrastre de imágenes y otros elementos
document.addEventListener('dragstart', (event) => {
    event.preventDefault();
    alert('El arrastre de contenido está deshabilitado.');
});

// Detectar intentos de inspección con clics combinados (Shift+clic derecho)
document.addEventListener('mousedown', (event) => {
    if (event.button === 2 && event.shiftKey) { // Botón derecho + Shift
        event.preventDefault();
        alert('Esta acción está deshabilitada.');
    }
});

// Evitar copiar contenido al portapapeles
document.addEventListener('copy', (event) => {
    event.preventDefault();
    alert('Copiar está deshabilitado.');
});

// Evitar cortar contenido
document.addEventListener('cut', (event) => {
    event.preventDefault();
    alert('Cortar está deshabilitado.');
});

// Evitar pegar contenido
document.addEventListener('paste', (event) => {
    event.preventDefault();
    alert('Pegar está deshabilitado.');
});


// 3. Bloquear descargas explícitas
// Intercepta clics en enlaces que intenten descargar contenido (como imágenes o archivos).
document.addEventListener('click', (event) => {
    const target = event.target;

    // Si el elemento clickeado es un enlace con el atributo download
    if (target.tagName === 'A' && target.hasAttribute('download')) {
        event.preventDefault();
        alert('La descarga está deshabilitada.');
    }
});

// 6. Prevenir descargas de PDFs
// Bloquea cualquier intento de descargar archivos PDF al interceptar clics en enlaces.
document.addEventListener('click', (event) => {
    const target = event.target;

    // Si el enlace apunta a un archivo PDF
    if (target.tagName === 'A' && target.href.endsWith('.pdf')) {
        event.preventDefault();
        alert('La descarga de PDFs está deshabilitada.');
    }
});

// 7. Bloquear herramientas de desarrollo
// Evita que los usuarios accedan a las herramientas de desarrollo (como F12 o Ctrl+Shift+I).
document.addEventListener('keydown', (event) => {
    // Bloquear F12
    if (event.key === 'F12') {
        event.preventDefault();
        alert('Las herramientas de desarrollo están deshabilitadas.');
    }

    // Bloquear Ctrl+Shift+I
    if (event.ctrlKey && event.shiftKey && event.key === 'I') {
        event.preventDefault();
        alert('Las herramientas de desarrollo están deshabilitadas.');
    }
});
