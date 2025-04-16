// piscinas.js - Script específico para la web de piscinas

document.addEventListener('DOMContentLoaded', () => {
    // Inicializar filtros de proyectos
    initProjectFilters();
    
    // Inicializar slider antes/después
    initBeforeAfterSliders();
    
    // Inicializar FAQ
    initFAQ();
    
    // Inicializar modal de planes detallados
    createModal('planesDetalles', 'Detalles de Planes de Mantenimiento', generatePlanesDetails());
    
    // Inicializar modal de galería completa
    createModal('galeriaCompleta', 'Galería de Proyectos', generateGaleriaCompleta());
    
    // Inicializar modales de proyectos
    createProyectModals();
    
    // Mostrar notificación de bienvenida
    setTimeout(() => {
        showNotification('success', '¡Bienvenido!', 'Descubre nuestros servicios exclusivos en diseño y construcción de piscinas.');
    }, 2000);
});

// Función para inicializar filtros de proyectos
function initProjectFilters() {
    const filters = document.querySelectorAll('.proyecto-filter');
    const proyectoCards = document.querySelectorAll('.proyecto-card');
    
    filters.forEach(filter => {
        filter.addEventListener('click', () => {
            // Eliminar clase active de todos los filtros
            filters.forEach(f => f.classList.remove('active'));
            
            // Añadir clase active al filtro seleccionado
            filter.classList.add('active');
            
            const filterValue = filter.getAttribute('data-filter');
            
            proyectoCards.forEach(card => {
                if (filterValue === 'todos') {
                    card.style.display = 'block';
                } else if (card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// Función para inicializar sliders antes/después
function initBeforeAfterSliders() {
    const sliders = document.querySelectorAll('.proyecto-antes-despues');
    
    sliders.forEach(slider => {
        const handle = slider.querySelector('.proyecto-slider-handle');
        const antes = slider.querySelector('.proyecto-antes');
        
        let isDragging = false;
        
        // Funciones para manejar el drag del slider
        const startDrag = (e) => {
            isDragging = true;
            e.preventDefault();
        };
        
        const stopDrag = () => {
            isDragging = false;
        };
        
        const drag = (e) => {
            if (!isDragging) return;
            
            let position;
            
            if (e.type === 'mousemove') {
                position = e.clientX - slider.getBoundingClientRect().left;
            } else if (e.type === 'touchmove') {
                position = e.touches[0].clientX - slider.getBoundingClientRect().left;
            }
            
            const sliderWidth = slider.offsetWidth;
            
            // Limitar posición entre 0% y 100%
            const percentage = Math.max(0, Math.min(100, (position / sliderWidth) * 100));
            
            // Actualizar posición del handle y clip-path del antes
            handle.style.left = `${percentage}%`;
            antes.style.clipPath = `polygon(0 0, ${percentage}% 0, ${percentage}% 100%, 0 100%)`;
        };
        
        // Event listeners para mouse
        handle.addEventListener('mousedown', startDrag);
        document.addEventListener('mouseup', stopDrag);
        document.addEventListener('mousemove', drag);
        
        // Event listeners para touch
        handle.addEventListener('touchstart', startDrag);
        document.addEventListener('touchend', stopDrag);
        document.addEventListener('touchmove', drag);
    });
}

// Función para inicializar el acordeón de FAQ
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const toggle = item.querySelector('.faq-toggle');
        
        // Ocultar todas las respuestas al inicio
        answer.style.display = 'none';
        
        question.addEventListener('click', () => {
            // Comprobar si este item está activo
            const isActive = item.classList.contains('active');
            
            // Cerrar todos los items
            faqItems.forEach(faq => {
                faq.classList.remove('active');
                faq.querySelector('.faq-answer').style.display = 'none';
                faq.querySelector('.faq-toggle i').className = 'fas fa-plus';
            });
            
            // Si este item no estaba activo, abrirlo
            if (!isActive) {
                item.classList.add('active');
                answer.style.display = 'block';
                toggle.querySelector('i').className = 'fas fa-minus';
            }
        });
    });
}

// Generar contenido para el modal de planes detallados
function generatePlanesDetails() {
    return `
    <div class="planes-detalle-tabla">
        <table class="tabla-planes">
            <thead>
                <tr>
                    <th>Características</th>
                    <th>Plan Básico</th>
                    <th>Plan Estándar</th>
                    <th>Plan Premium</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Frecuencia de visitas</td>
                    <td>1 vez al mes</td>
                    <td>2 veces al mes</td>
                    <td>Semanal</td>
                </tr>
                <tr>
                    <td>Análisis químico del agua</td>
                    <td><i class="fas fa-check"></i></td>
                    <td><i class="fas fa-check"></i></td>
                    <td><i class="fas fa-check"></i></td>
                </tr>
                <tr>
                    <td>Ajuste de niveles de pH y cloro</td>
                    <td><i class="fas fa-check"></i></td>
                    <td><i class="fas fa-check"></i></td>
                    <td><i class="fas fa-check"></i></td>
                </tr>
                <tr>
                    <td>Limpieza de skimmers y filtros</td>
                    <td><i class="fas fa-check"></i></td>
                    <td><i class="fas fa-check"></i></td>
                    <td><i class="fas fa-check"></i></td>
                </tr>
                <tr>
                    <td>Aspirado de piscina</td>
                    <td><i class="fas fa-check"></i></td>
                    <td><i class="fas fa-check"></i></td>
                    <td><i class="fas fa-check"></i></td>
                </tr>
                <tr>
                    <td>Limpieza de equipos de bombeo</td>
                    <td><i class="fas fa-times"></i></td>
                    <td><i class="fas fa-check"></i></td>
                    <td><i class="fas fa-check"></i></td>
                </tr>
                <tr>
                    <td>Tratamiento contra algas</td>
                    <td><i class="fas fa-times"></i></td>
                    <td>Básico</td>
                    <td>Completo</td>
                </tr>
                <tr>
                    <td>Revisión de instalaciones</td>
                    <td>Trimestral</td>
                    <td>Bimestral</td>
                    <td>Mensual</td>
                </tr>
                <tr>
                    <td>Atención de emergencias</td>
                    <td><i class="fas fa-times"></i></td>
                    <td><i class="fas fa-times"></i></td>
                    <td>24/7</td>
                </tr>
                <tr>
                    <td>Reposición de productos químicos</td>
                    <td>No incluido</td>
                    <td>Básicos</td>
                    <td>Completo</td>
                </tr>
                <tr>
                    <td>Informe de mantenimiento</td>
                    <td>No incluido</td>
                    <td>Mensual</td>
                    <td>Semanal</td>
                </tr>
                <tr>
                    <td>Precio mensual</td>
                    <td>$99</td>
                    <td>$179</td>
                    <td>$299</td>
                </tr>
                <tr>
                    <td>Descuento contrato anual</td>
                    <td>5%</td>
                    <td>10%</td>
                    <td>15%</td>
                </tr>
            </tbody>
        </table>
    </div>
    <div class="planes-notas">
        <h4>Notas importantes:</h4>
        <ul>
            <li>Los precios no incluyen IGV.</li>
            <li>Las visitas adicionales tienen un costo de $50 por visita.</li>
            <li>Los productos químicos especiales se cobran por separado en los planes Básico y Estándar.</li>
            <li>Se puede personalizar cualquier plan según tus necesidades específicas.</li>
        </ul>
    </div>
    <div class="text-center mt-8">
        <a href="#cotizacion" class="btn btn-primary" onclick="closeModal('planesDetalles')">Solicitar plan</a>
    </div>
    `;
}

// Generar contenido para la galería completa
function generateGaleriaCompleta() {
    // Aquí puedes generar un grid más completo de proyectos
    return `
    <div class="gallery-filter-container mb-8">
        <button class="btn btn-sm btn-secondary gallery-filter active" data-filter="todos">Todos</button>
        <button class="btn btn-sm btn-secondary gallery-filter" data-filter="residencial">Residencial</button>
        <button class="btn btn-sm btn-secondary gallery-filter" data-filter="comercial">Comercial</button>
        <button class="btn btn-sm btn-secondary gallery-filter" data-filter="hoteles">Hoteles</button>
    </div>
    
    <div class="gallery-grid">
        <!-- Aquí irían más imágenes de proyectos -->
        <div class="gallery-item" data-category="residencial">
            <img src="/api/placeholder/400/320" alt="Proyecto Residencial 1">
        </div>
        <div class="gallery-item" data-category="hoteles">
            <img src="/api/placeholder/400/320" alt="Proyecto Hotel 1">
        </div>
        <div class="gallery-item" data-category="comercial">
            <img src="/api/placeholder/400/320" alt="Proyecto Comercial 1">
        </div>
        <div class="gallery-item" data-category="residencial">
            <img src="/api/placeholder/400/320" alt="Proyecto Residencial 2">
        </div>
        <div class="gallery-item" data-category="hoteles">
            <img src="/api/placeholder/400/320" alt="Proyecto Hotel 2">
        </div>
        <div class="gallery-item" data-category="comercial">
            <img src="/api/placeholder/400/320" alt="Proyecto Comercial 2">
        </div>
        <div class="gallery-item" data-category="residencial">
            <img src="/api/placeholder/400/320" alt="Proyecto Residencial 3">
        </div>
        <div class="gallery-item" data-category="hoteles">
            <img src="/api/placeholder/400/320" alt="Proyecto Hotel 3">
        </div>
    </div>
    `;
}

// Función para crear modales de proyectos
function createProyectModals() {
    // Modal Proyecto 1
    createModal('proyecto1Modal', 'Piscina Familiar Moderna', `
        <div class="proyecto-modal-container">
            <div class="proyecto-modal-gallery">
                <img src="/api/placeholder/800/600" alt="Piscina Familiar Moderna" class="proyecto-modal-img-main">
                <div class="proyecto-modal-thumbs">
                    <img src="/api/placeholder/200/150" alt="Thumbnail 1" class="proyecto-modal-thumb">
                    <img src="/api/placeholder/200/150" alt="Thumbnail 2" class="proyecto-modal-thumb">
                    <img src="/api/placeholder/200/150" alt="Thumbnail 3" class="proyecto-modal-thumb">
                </div>
            </div>
            <div class="proyecto-modal-info">
                <div class="proyecto-modal-meta">
                    <span class="proyecto-modal-tag">Residencial</span>
                    <span class="proyecto-modal-location"><i class="fas fa-map-marker-alt"></i> La Molina, Lima</span>
                </div>
                <h3>Sobre este proyecto</h3>
                <p>Diseñamos y construimos esta piscina familiar de 32m² con un diseño moderno que se integra perfectamente al jardín de la residencia.</p>
                <h4>Características del proyecto:</h4>
                <ul>
                    <li>Tamaño: 8m x 4m</li>
                    <li>Profundidad: 1.20m - 1.80m</li>
                    <li>Revestimiento: Cerámica antideslizante</li>
                    <li>Sistema de filtración: Equipo de última generación</li>
                    <li>Iluminación: LED RGB controlada por app</li>
                    <li>Tiempo de ejecución: 5 semanas</li>
                </ul>
                <a href="#cotizacion" class="btn btn-primary mt-6" onclick="closeModal('proyecto1Modal')">Quiero un proyecto similar</a>
            </div>
        </div>
    `);
    
    // Modal Proyecto 2
    createModal('proyecto2Modal', 'Piscina Infinity Resort', `
        <div class="proyecto-modal-container">
            <div class="proyecto-modal-gallery">
                <img src="/api/placeholder/800/600" alt="Piscina Infinity Resort" class="proyecto-modal-img-main">
                <div class="proyecto-modal-thumbs">
                    <img src="/api/placeholder/200/150" alt="Thumbnail 1" class="proyecto-modal-thumb">
                    <img src="/api/placeholder/200/150" alt="Thumbnail 2" class="proyecto-modal-thumb">
                    <img src="/api/placeholder/200/150" alt="Thumbnail 3" class="proyecto-modal-thumb">
                </div>
            </div>
            <div class="proyecto-modal-info">
                <div class="proyecto-modal-meta">
                    <span class="proyecto-modal-tag">Hotel</span>
                    <span class="proyecto-modal-location"><i class="fas fa-map-marker-alt"></i> Miraflores, Lima</span>
                </div>
                <h3>Sobre este proyecto</h3>
                <p>Diseñamos esta espectacular piscina infinity para el Resort Marina Bay, ofreciendo una vista panorámica al océano Pacífico desde la terraza del hotel.</p>
                <h4>Características del proyecto:</h4>
                <ul>
                    <li>Tamaño: 15m x 6m</li>
                    <li>Tipo: Infinity (borde infinito)</li>
                    <li>Revestimiento: Porcelanato importado</li>
                    <li>Sistema de filtración: Equipo industrial automatizado</li>
                    <li>Características adicionales: Hidromasaje para 8 personas</li>
                    <li>Tiempo de ejecución: 10 semanas</li>
                </ul>
                <a href="#cotizacion" class="btn btn-primary mt-6" onclick="closeModal('proyecto2Modal')">Quiero un proyecto similar</a>
            </div>
        </div>
    `);
    
    // Modal Proyecto 3
    createModal('proyecto3Modal', 'Club Deportivo Acuático', `
        <div class="proyecto-modal-container">
            <div class="proyecto-modal-gallery">
                <img src="/api/placeholder/800/600" alt="Club Deportivo Acuático" class="proyecto-modal-img-main">
                <div class="proyecto-modal-thumbs">
                    <img src="/api/placeholder/200/150" alt="Thumbnail 1" class="proyecto-modal-thumb">
                    <img src="/api/placeholder/200/150" alt="Thumbnail 2" class="proyecto-modal-thumb">
                    <img src="/api/placeholder/200/150" alt="Thumbnail 3" class="proyecto-modal-thumb">
                </div>
            </div>
            <div class="proyecto-modal-info">
                <div class="proyecto-modal-meta">
                    <span class="proyecto-modal-tag">Comercial</span>
                    <span class="proyecto-modal-location"><i class="fas fa-map-marker-alt"></i> San Isidro, Lima</span>
                </div>
                <h3>Sobre este proyecto</h3>
                <p>Construimos este complejo de piscinas para el Club Deportivo Acuático, incluyendo una piscina semiolímpica para competiciones y una piscina recreativa.</p>
                <h4>Características del proyecto:</h4>
                <ul>
                    <li>Piscina semiolímpica: 25m x 12.5m</li>
                    <li>Piscina recreativa: 15m x 10m</li>
                    <li>Profundidad: Variable según normativa deportiva</li>
                    <li>Sistema de filtración: Industrial de alto rendimiento</li>
                    <li>Características adicionales: Carriles reglamentarios, bloques de salida</li>
                    <li>Tiempo de ejecución: 16 semanas</li>
                </ul>
                <a href="#cotizacion" class="btn btn-primary mt-6" onclick="closeModal('proyecto3Modal')">Quiero un proyecto similar</a>
            </div>
        </div>
    `);
    
    // Modal Proyecto 4
    createModal('proyecto4Modal', 'Renovación Piscina Villa', `
        <div class="proyecto-modal-container">
            <div class="proyecto-modal-gallery">
                <img src="/api/placeholder/800/600" alt="Renovación Piscina Villa" class="proyecto-modal-img-main">
                <div class="proyecto-modal-thumbs">
                    <img src="/api/placeholder/200/150" alt="Thumbnail 1" class="proyecto-modal-thumb">
                    <img src="/api/placeholder/200/150" alt="Thumbnail 2" class="proyecto-modal-thumb">
                    <img src="/api/placeholder/200/150" alt="Thumbnail 3" class="proyecto-modal-thumb">
                </div>
            </div>
            <div class="proyecto-modal-info">
                <div class="proyecto-modal-meta">
                    <span class="proyecto-modal-tag">Residencial</span>
                    <span class="proyecto-modal-location"><i class="fas fa-map-marker-alt"></i> Surco, Lima</span>
                </div>
                <h3>Sobre este proyecto</h3>
                <p>Renovamos completamente esta piscina antigua de una villa familiar, actualizando todos sus sistemas y mejorando su estética para darle un aspecto moderno.</p>
                <h4>Antes vs Después:</h4>
                <ul>
                    <li>Revestimiento: Cambio de azulejos deteriorados por porcelanato</li>
                    <li>Sistema de filtración: Actualización completa</li>
                    <li>Iluminación: Instalación de sistema LED</li>
                    <li>Áreas circundantes: Deck de madera sintética</li>
                    <li>Características adicionales: Nueva escalera de acero inoxidable</li>
                    <li>Tiempo de ejecución: 3 semanas</li>
                </ul>
                <a href="#cotizacion" class="btn btn-primary mt-6" onclick="closeModal('proyecto4Modal')">Quiero un proyecto similar</a>
            </div>
        </div>
    `);
}