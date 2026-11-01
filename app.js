// ============================================================================
// HEALTHY WATER - FRONTEND APPLICATION LOGIC (ACTUALIZADO CON COMENTARIOS EQUIPO 4)
// Proyecto Maestría USAG - Equipo 4
// Teléfono Oficial de Pruebas: 477-877-6369 (+52 477 877 6369)
// ============================================================================

const WHATSAPP_PHONE = '524778776369'; // Número oficial de pruebas del equipo

// 1. DATA STATE: PRODUCTOS & INVENTARIO OFICIAL (LISTA EXACTA REQUERIDA)
const initialProducts = [
  {
    id: 'prod-01',
    sku: 'HW-BOL-HIDRA',
    name: 'Bolis de Hidratación',
    category: 'boli',
    desc: 'Bolis de agua purificada microfiltrada, ideales para escuelas, eventos deportivos y niños.',
    priceHogar: 1.00,
    priceEmpresa: 1.00,
    stock: 500,
    icon: 'fa-ice-cream',
    badge: 'Popular Infantil'
  },
  {
    id: 'prod-02',
    sku: 'HW-BOT-350ML',
    name: 'Botella de 350 ml',
    category: 'botella',
    desc: 'Presentación compacta y práctica para eventos, reuniones y loncheras.',
    priceHogar: 4.50,
    priceEmpresa: 4.00,
    stock: 200,
    icon: 'fa-bottle-water',
    badge: 'Económica'
  },
  {
    id: 'prod-03',
    sku: 'HW-BOT-500ML',
    name: 'Botella de 500 ml',
    category: 'botella',
    desc: 'Botella ergonómica para consumo individual diario en casa o en la oficina.',
    priceHogar: 5.40,
    priceEmpresa: 5.00,
    stock: 250,
    icon: 'fa-bottle-water',
    badge: 'Uso Diario'
  },
  {
    id: 'prod-04',
    sku: 'HW-BOT-1L',
    name: 'Botella de 1 Litro',
    category: 'botella',
    desc: 'Mayor volumen personal con tapa hermética para máxima hidratación.',
    priceHogar: 9.00,
    priceEmpresa: 8.50,
    stock: 180,
    icon: 'fa-bottle-water',
    badge: 'Familiar / Trabajo'
  },
  {
    id: 'prod-05',
    sku: 'HW-GAR-20L',
    name: 'Garrafón 20 Litros',
    category: 'garrafon',
    desc: 'Agua purificada 100% microfiltrada y tratada bajo estrictos estándares de inocuidad. Envase retornable.',
    priceHogar: 30.00,
    priceEmpresa: 28.00,
    stock: 150,
    icon: 'fa-droplet',
    badge: '⭐ El Más Vendido'
  },
  {
    id: 'prod-06',
    sku: 'HW-PIPA-5000L',
    name: 'Media Pipa (5,000 Litros)',
    category: 'pipa',
    desc: 'Suministro en cisterna para negocios, escuelas, constructoras y residencias con alta demanda.',
    priceHogar: 600.00,
    priceEmpresa: 600.00,
    stock: 10,
    icon: 'fa-truck-droplet',
    badge: 'Gran Volumen'
  },
  {
    id: 'prod-07',
    sku: 'HW-PIPA-10000L',
    name: 'Pipa Completa (10,000 Litros)',
    category: 'pipa',
    desc: 'Abastecimiento de agua purificada de grado óptimo para plantas industriales y empresas en León.',
    priceHogar: 900.00,
    priceEmpresa: 900.00,
    stock: 6,
    icon: 'fa-truck-moving',
    badge: 'Industrial / Empresas'
  }
];

// 2. DISPATCH & ROUTE STATE (ZONA LEÓN NORTE & PIPAS)
let dispatchOrders = [
  {
    id: 'HW-2026-101',
    customer: 'Sra. Carmen Villalobos',
    phone: '4772348910',
    type: 'hogar',
    address: 'Col. Valle del Campestre, Calle Manantial #204, León',
    routeZone: 'Ruta 1 (León Norte)',
    driverName: 'Manuel Velázquez',
    itemsDesc: '3x Garrafón 20 Litros',
    garrafonesCount: 3,
    time: '09:00 - 12:00',
    paymentMethod: 'Efectivo ($90.00)',
    total: 90.00,
    status: 'entregado',
    notes: 'Entregado en puerta con cambio'
  },
  {
    id: 'HW-2026-102',
    customer: 'Despacho Contable García & Asoc.',
    phone: '4779871234',
    type: 'empresa',
    address: 'Blvd. Campestre #1120, Piso 3, León',
    routeZone: 'Ruta 1 (León Norte)',
    driverName: 'Manuel Velázquez',
    itemsDesc: '5x Garrafón 20L + 20x Botella 500ml',
    garrafonesCount: 5,
    time: '09:00 - 12:00',
    paymentMethod: 'Crédito 15d (Factura)',
    total: 250.00,
    status: 'entregado',
    notes: 'CFDI emitido a DGA180421XX3'
  },
  {
    id: 'HW-2026-103',
    customer: 'Lic. Roberto Morales',
    phone: '4774567890',
    type: 'hogar',
    address: 'Col. Jardines del Moral, Calle Nubes #412, León',
    routeZone: 'Ruta 1 (León Norte)',
    driverName: 'Manuel Velázquez',
    itemsDesc: '4x Garrafón 20 Litros',
    garrafonesCount: 4,
    time: '12:00 - 15:00',
    paymentMethod: 'Efectivo ($120.00)',
    total: 120.00,
    status: 'en_ruta',
    notes: 'En camino con la unidad #01'
  },
  {
    id: 'HW-2026-104',
    customer: 'Constructora Bajío Norte S.A.',
    phone: '4778776369',
    type: 'empresa',
    address: 'Prolongación Blvd. Hidalgo #4500, León',
    routeZone: 'Ruta Especial Pipas',
    driverName: 'Unidad Pipa Cisterna',
    itemsDesc: '1x Media Pipa (5,000 Litros)',
    garrafonesCount: 0,
    time: '15:00 - 18:00',
    paymentMethod: 'Crédito 30d (Factura)',
    total: 600.00,
    status: 'en_ruta',
    notes: 'Suministro en cisterna industrial'
  }
];

// STATE VARIABLES
let currentClientType = 'hogar'; // 'hogar' | 'empresa'
let cart = {}; // { 'prod-01': 2, ... }
let currentSelectedOrderForAI = null;
let salesChartInstance = null;
let mixChartInstance = null;

// ============================================================================
// INITIALIZATION ON DOM READY
// ============================================================================
document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  renderCart();
  renderRoutesTable();
  initCharts();
  updateVehicleLoad();
  setupVideoUploader();
});

// ============================================================================
// TAB NAVIGATION
// ============================================================================
function switchTab(tabId) {
  const tabs = ['pedidos', 'repartidores', 'dashboard', 'marketing', 'bot-whatsapp'];
  
  tabs.forEach(t => {
    const section = document.getElementById(`tab-${t}`);
    const navBtn = document.getElementById(`tab-btn-${t}`);
    const mobBtn = document.getElementById(`mob-tab-${t}`);
    
    if (t === tabId) {
      if (section) {
        section.classList.remove('hidden');
        section.classList.add('block');
      }
      if (navBtn) navBtn.classList.add('active-tab');
      if (mobBtn) {
        mobBtn.classList.add('bg-brand-cyan', 'text-white');
        mobBtn.classList.remove('text-slate-600');
      }
    } else {
      if (section) {
        section.classList.add('hidden');
        section.classList.remove('block');
      }
      if (navBtn) navBtn.classList.remove('active-tab');
      if (mobBtn) {
        mobBtn.classList.remove('bg-brand-cyan', 'text-white');
        mobBtn.classList.add('text-slate-600');
      }
    }
  });

  if (tabId === 'dashboard') {
    setTimeout(updateChartsData, 100);
  }
}

// ============================================================================
// CLIENT TYPE TOGGLE: HOGAR VS EMPRESA
// ============================================================================
function setClientType(type) {
  currentClientType = type;
  
  const btnHogar = document.getElementById('type-btn-hogar');
  const btnEmpresa = document.getElementById('type-btn-empresa');
  const orderTypeBadge = document.getElementById('order-type-badge');
  const b2bBanner = document.getElementById('b2b-corporate-banner');
  const paymentHogar = document.getElementById('payment-hogar');
  const paymentEmpresa = document.getElementById('payment-empresa');

  if (type === 'hogar') {
    btnHogar.className = "px-5 py-2.5 rounded-xl font-bold text-sm transition flex items-center bg-white text-brand-navy shadow-md";
    btnEmpresa.className = "px-5 py-2.5 rounded-xl font-bold text-sm transition flex items-center text-white hover:text-slate-200";
    orderTypeBadge.innerText = "Modalidad Hogar & Amas de Casa";
    orderTypeBadge.className = "px-2.5 py-1 text-xs font-bold rounded-lg bg-blue-100 text-brand-blue";
    b2bBanner.classList.add('hidden');
    paymentHogar.classList.remove('hidden');
    paymentEmpresa.classList.add('hidden');
  } else {
    btnEmpresa.className = "px-5 py-2.5 rounded-xl font-bold text-sm transition flex items-center bg-white text-brand-navy shadow-md";
    btnHogar.className = "px-5 py-2.5 rounded-xl font-bold text-sm transition flex items-center text-white hover:text-slate-200";
    orderTypeBadge.innerText = "Modalidad Empresa / Facturación & Crédito";
    orderTypeBadge.className = "px-2.5 py-1 text-xs font-bold rounded-lg bg-yellow-100 text-amber-800";
    b2bBanner.classList.remove('hidden');
    paymentHogar.classList.add('hidden');
    paymentEmpresa.classList.remove('hidden');
  }

  renderProducts();
  renderCart();
}

// ============================================================================
// PRODUCTS RENDERING & CART ACTIONS
// ============================================================================
function renderProducts() {
  const container = document.getElementById('product-cards-container');
  if (!container) return;

  container.innerHTML = initialProducts.map(p => {
    const price = currentClientType === 'hogar' ? p.priceHogar : p.priceEmpresa;
    const qty = cart[p.id] || 0;

    let catBadgeColor = 'bg-slate-100 text-slate-700';
    if (p.category === 'garrafon') catBadgeColor = 'bg-cyan-100 text-brand-blue font-bold';
    if (p.category === 'pipa') catBadgeColor = 'bg-blue-100 text-brand-navy font-bold';
    if (p.category === 'boli') catBadgeColor = 'bg-amber-100 text-amber-800 font-bold';

    return `
      <div class="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition flex flex-col justify-between">
        <div>
          <div class="flex items-start justify-between mb-2">
            <span class="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${catBadgeColor}">
              ${p.badge}
            </span>
            <span class="text-xs text-slate-400 font-medium">Stock: <strong class="text-slate-700">${p.stock}</strong></span>
          </div>

          <div class="flex items-center space-x-3 mb-3">
            <div class="w-12 h-12 rounded-2xl bg-brand-light text-brand-cyan flex items-center justify-center text-2xl flex-shrink-0">
              <i class="fa-solid ${p.icon}"></i>
            </div>
            <div>
              <h4 class="font-bold text-sm sm:text-base text-slate-800 leading-snug">${p.name}</h4>
              <span class="text-xs text-slate-400 font-mono">${p.sku}</span>
            </div>
          </div>

          <p class="text-xs text-slate-500 mb-4 leading-relaxed">${p.desc}</p>
        </div>

        <div class="pt-3 border-t border-slate-100 flex items-center justify-between">
          <div>
            <span class="text-[11px] text-slate-400 block">${currentClientType === 'hogar' ? 'Precio Menudeo' : 'Precio Especial Empresa'}</span>
            <span class="text-xl font-extrabold text-brand-navy">$${price.toFixed(2)} <span class="text-xs font-normal text-slate-500">MXN</span></span>
          </div>

          <!-- QUANTITY CONTROLS (1 CLIC ADD) -->
          <div class="flex items-center space-x-2 bg-slate-100 p-1.5 rounded-xl">
            <button type="button" onclick="updateQty('${p.id}', -1)" class="w-8 h-8 rounded-lg bg-white text-slate-700 font-bold hover:bg-slate-200 text-sm flex items-center justify-center transition shadow-xs active:scale-95">
              <i class="fa-solid fa-minus"></i>
            </button>
            <span class="w-7 text-center font-bold text-sm text-slate-800">${qty}</span>
            <button type="button" onclick="updateQty('${p.id}', 1)" class="w-8 h-8 rounded-lg bg-brand-cyan text-white font-bold hover:bg-brand-blue text-sm flex items-center justify-center transition shadow-xs active:scale-95">
              <i class="fa-solid fa-plus"></i>
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function updateQty(productId, delta) {
  const product = initialProducts.find(p => p.id === productId);
  if (!product) return;

  const current = cart[productId] || 0;
  const next = current + delta;

  if (next < 0) return;
  if (next > product.stock) {
    alert(`Capacidad máxima en stock disponible para este producto: ${product.stock} unidades.`);
    return;
  }

  if (next === 0) {
    delete cart[productId];
  } else {
    cart[productId] = next;
  }

  renderProducts();
  renderCart();
}

function renderCart() {
  const listContainer = document.getElementById('cart-items-list');
  const subtotalElem = document.getElementById('cart-subtotal');
  const totalElem = document.getElementById('cart-total');

  const items = Object.keys(cart);
  if (items.length === 0) {
    listContainer.innerHTML = `<p class="text-center text-slate-400 text-xs py-6 italic">No has seleccionado productos aún. Usa los botones (+) del catálogo.</p>`;
    subtotalElem.innerText = '$0.00 MXN';
    totalElem.innerText = '$0.00 MXN';
    return;
  }

  let total = 0;
  listContainer.innerHTML = items.map(id => {
    const prod = initialProducts.find(p => p.id === id);
    const qty = cart[id];
    const price = currentClientType === 'hogar' ? prod.priceHogar : prod.priceEmpresa;
    const sub = price * qty;
    total += sub;

    return `
      <div class="flex items-center justify-between text-xs py-1.5 border-b border-slate-50">
        <div class="flex-1 pr-2">
          <span class="font-bold text-slate-700 block">${prod.name}</span>
          <span class="text-slate-400 text-[11px]">${qty} x $${price.toFixed(2)}</span>
        </div>
        <div class="flex items-center space-x-2">
          <span class="font-extrabold text-slate-800">$${sub.toFixed(2)}</span>
          <button type="button" onclick="updateQty('${id}', -${qty})" class="text-slate-400 hover:text-red-500 text-xs">
            <i class="fa-solid fa-trash-can"></i>
          </button>
        </div>
      </div>
    `;
  }).join('');

  subtotalElem.innerText = `$${total.toFixed(2)} MXN`;
  totalElem.innerText = `$${total.toFixed(2)} MXN`;
}

// ============================================================================
// GPS GEOLOCATION
// ============================================================================
let capturedGPS = null;

function getGPSLocation() {
  const display = document.getElementById('gps-coords-display');
  const addressInput = document.getElementById('cust-address');

  if (!navigator.geolocation) {
    alert('Tu navegador no soporta geolocalización.');
    return;
  }

  display.classList.remove('hidden');
  display.innerText = "Buscando coordenadas satelitales en León, Gto...";

  navigator.geolocation.getCurrentPosition(
    (pos) => {
      const lat = pos.coords.latitude.toFixed(5);
      const lon = pos.coords.longitude.toFixed(5);
      capturedGPS = { lat, lon };
      display.innerText = `📍 Coordenadas capturadas: Lat ${lat}, Lon ${lon} (Asignado a Ruta León Norte)`;
      if (!addressInput.value) {
        addressInput.value = `Ubicación GPS en León Norte (Coords: ${lat}, ${lon})`;
      }
    },
    (err) => {
      display.innerText = "No fue posible acceder al GPS satelital. Por favor escribe tu dirección.";
    }
  );
}

// ============================================================================
// ASIGNACIÓN INTELIGENTE DE RUTA POR ZONA / TIPO DE PEDIDO
// ============================================================================
function assignZoneRoute(address, hasPipa) {
  if (hasPipa) {
    return {
      zone: 'Ruta Especial Pipas Cisterna',
      driver: 'Operador de Pipa Especial',
      vehicle: 'Pipa GTO-5000'
    };
  }

  const addrLower = (address || '').toLowerCase();
  if (addrLower.includes('campestre') || addrLower.includes('moral') || addrLower.includes('norte') || addrLower.includes('hidalgo') || addrLower.includes('gran jardin')) {
    return {
      zone: 'Ruta 1 (León Norte)',
      driver: 'Manuel Velázquez',
      vehicle: 'Unidad #01 (GTO-849-B)'
    };
  } else {
    return {
      zone: 'Ruta 2 (León Centro / Poniente)',
      driver: 'Manuel Velázquez',
      vehicle: 'Unidad #01 (GTO-849-B)'
    };
  }
}

// ============================================================================
// 1-CLICK ORDER SUBMISSION (CAPTACIÓN REAL A WHATSAPP: 477-877-6369)
// ============================================================================
function handlePlaceOrder(e) {
  e.preventDefault();

  const items = Object.keys(cart);
  if (items.length === 0) {
    alert('Por favor selecciona al menos un producto para aperturar tu pedido.');
    return;
  }

  const name = document.getElementById('cust-name').value.trim();
  const phone = document.getElementById('cust-phone').value.trim();
  const address = document.getElementById('cust-address').value.trim();
  const horario = document.querySelector('input[name="horario"]:checked').value;

  // Calculate items and total
  let total = 0;
  let garrafonesCount = 0;
  let hasPipa = false;
  let itemsSummary = [];

  items.forEach(id => {
    const prod = initialProducts.find(p => p.id === id);
    const qty = cart[id];
    const price = currentClientType === 'hogar' ? prod.priceHogar : prod.priceEmpresa;
    total += price * qty;
    itemsSummary.push(`${qty}x ${prod.name}`);
    
    if (prod.category === 'garrafon') {
      garrafonesCount += qty;
    }
    if (prod.category === 'pipa') {
      hasPipa = true;
    }
    // Deduct stock in real-time
    prod.stock -= qty;
  });

  // Payment info
  let paymentText = '';
  if (currentClientType === 'hogar') {
    const changeWith = document.getElementById('cust-change').value.trim();
    paymentText = changeWith ? `Efectivo contra entrega (Paga con $${changeWith})` : 'Efectivo contra entrega';
  } else {
    const terms = document.getElementById('cust-b2b-terms').value;
    const rfc = document.getElementById('cust-rfc').value.trim() || 'Pendiente CFDI';
    const razon = document.getElementById('cust-razon').value.trim();
    paymentText = `${terms.replace('_', ' ').toUpperCase()} · RFC: ${rfc} ${razon ? '(' + razon + ')' : ''}`;
  }

  // Route assignment
  const routeAllocation = assignZoneRoute(address, hasPipa);

  // Generate Folio
  const folioNum = Math.floor(1000 + Math.random() * 9000);
  const folio = `HW-2026-${folioNum}`;

  const newOrder = {
    id: folio,
    customer: name,
    phone: phone,
    type: currentClientType,
    address: address,
    routeZone: routeAllocation.zone,
    driverName: routeAllocation.driver,
    itemsDesc: itemsSummary.join(', '),
    garrafonesCount: garrafonesCount,
    time: horario,
    paymentMethod: paymentText,
    total: total,
    status: 'en_ruta',
    notes: 'Aperturado vía Web 1-Clic'
  };

  // Add to dispatch list
  dispatchOrders.unshift(newOrder);

  // Update UI & Modals
  document.getElementById('modal-folio').innerText = folio;
  document.getElementById('modal-name').innerText = name;
  document.getElementById('modal-horario').innerText = horario;
  document.getElementById('modal-total').innerText = `$${total.toFixed(2)} MXN`;
  document.getElementById('modal-route').innerText = routeAllocation.zone;
  document.getElementById('modal-driver').innerText = routeAllocation.driver;

  // Format WhatsApp Message to send directly to 477-877-6369
  let gpsLink = '';
  if (capturedGPS) {
    gpsLink = `\n📍 *Ubicación GPS:* https://maps.google.com/?q=${capturedGPS.lat},${capturedGPS.lon}`;
  }

  const waMsg = encodeURIComponent(
    `💧 *¡NUEVO PEDIDO HEALTHY WATER!* 💧\n` +
    `--------------------------------------\n` +
    `📋 *Folio:* ${folio}\n` +
    `👤 *Cliente:* ${name}\n` +
    `🏷️ *Tipo:* ${currentClientType === 'hogar' ? 'HOGAR / FAMILIA' : 'EMPRESA / FACTURACIÓN'}\n` +
    `📱 *WhatsApp Cliente:* ${phone}\n` +
    `🏠 *Dirección:* ${address}\n` +
    `🚚 *Ruta Asignada:* ${routeAllocation.zone} (${routeAllocation.driver})\n` +
    `📦 *Pedido Solicitado:*\n• ${itemsSummary.join('\n• ')}\n` +
    `⏰ *Horario Preferido:* ${horario}\n` +
    `💵 *Forma de Pago:* ${paymentText}\n` +
    `💰 *TOTAL A COBRAR:* $${total.toFixed(2)} MXN` +
    gpsLink + `\n--------------------------------------\n` +
    `✅ _Enviado automáticamente desde la plataforma Healthy Water en 1 clic._`
  );

  // Direct WhatsApp Link to 477-877-6369
  const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${waMsg}`;
  document.getElementById('modal-whatsapp-link').href = whatsappUrl;

  // Automatically trigger WhatsApp window so it falls into the team's phone!
  window.open(whatsappUrl, '_blank');

  // Trigger simulated bot message for demonstration
  triggerBotSimulator(newOrder);

  // Reset cart
  cart = {};
  renderProducts();
  renderCart();
  renderRoutesTable();
  updateVehicleLoad();
  updateDashboardMetrics();

  // Show Success Modal
  document.getElementById('order-success-modal').classList.remove('hidden');
}

function closeSuccessModal() {
  document.getElementById('order-success-modal').classList.add('hidden');
  switchTab('repartidores');
}

// ============================================================================
// ROUTES & DISPATCH TABLE WITH DRIVER NOTIFICATION
// ============================================================================
function renderRoutesTable() {
  const tbody = document.getElementById('routes-table-body');
  if (!tbody) return;

  tbody.innerHTML = dispatchOrders.map(order => {
    let statusBadge = '';
    if (order.status === 'entregado') {
      statusBadge = '<span class="px-2.5 py-1 text-xs font-bold rounded-lg bg-emerald-100 text-emerald-800"><i class="fa-solid fa-circle-check mr-1"></i> Entregado</span>';
    } else if (order.status === 'en_ruta') {
      statusBadge = '<span class="px-2.5 py-1 text-xs font-bold rounded-lg bg-cyan-100 text-brand-blue"><i class="fa-solid fa-truck-fast mr-1"></i> En Ruta</span>';
    } else if (order.status === 'no_visitado') {
      statusBadge = '<span class="px-2.5 py-1 text-xs font-bold rounded-lg bg-amber-100 text-amber-800"><i class="fa-solid fa-triangle-exclamation mr-1"></i> No Visitado</span>';
    } else if (order.status === 'reprogramado') {
      statusBadge = '<span class="px-2.5 py-1 text-xs font-bold rounded-lg bg-indigo-100 text-indigo-800"><i class="fa-solid fa-robot mr-1"></i> Reprogramado IA</span>';
    }

    return `
      <tr class="hover:bg-slate-50 transition">
        <td class="py-3 px-4 font-mono font-bold text-slate-800 text-xs">
          ${order.id}
          <span class="block text-[10px] text-brand-blue font-bold">${order.routeZone || 'León Norte'}</span>
        </td>
        <td class="py-3 px-4">
          <strong class="text-slate-800 block text-xs">${order.customer}</strong>
          <span class="text-[11px] text-slate-400 capitalize">${order.type} · ${order.phone}</span>
        </td>
        <td class="py-3 px-4 text-xs text-slate-600 max-w-[200px] truncate" title="${order.address}">${order.address}</td>
        <td class="py-3 px-4 text-xs font-medium text-slate-700">${order.itemsDesc}</td>
        <td class="py-3 px-4 text-xs text-slate-600 font-semibold">${order.time}</td>
        <td class="py-3 px-4 text-xs">
          <strong class="text-brand-navy block">$${order.total.toFixed(2)}</strong>
          <span class="text-[10px] text-slate-500">${order.paymentMethod}</span>
        </td>
        <td class="py-3 px-4 text-xs">${statusBadge}</td>
        <td class="py-3 px-4 text-center">
          <div class="flex items-center justify-center space-x-1.5">
            <!-- AVISAR AL REPARTIDOR DIRECTO A SU WHATSAPP -->
            <button onclick="notifyDriverByWhatsApp('${order.id}')" title="Avisar al Repartidor por WhatsApp con Ruta y Maps" class="p-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold transition shadow-xs flex items-center space-x-1">
              <i class="fa-brands fa-whatsapp text-sm"></i>
              <span class="text-[11px] hidden sm:inline">Avisar</span>
            </button>
            
            ${order.status !== 'entregado' ? `
              <button onclick="markDelivered('${order.id}')" title="Marcar como Entregado" class="p-2 rounded-xl bg-emerald-100 hover:bg-emerald-200 text-emerald-700 text-xs font-bold transition">
                <i class="fa-solid fa-check"></i>
              </button>
            ` : ''}
            
            ${order.status === 'en_ruta' || order.status === 'no_visitado' ? `
              <button onclick="openRescheduleModal('${order.id}')" title="Activar Asistente IA de Reprogramación" class="p-2 rounded-xl bg-blue-100 hover:bg-blue-200 text-blue-700 text-xs font-bold transition">
                <i class="fa-solid fa-wand-magic-sparkles"></i>
              </button>
            ` : ''}
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

// ============================================================================
// AVISAR AL REPARTIDOR VÍA WHATSAPP (CON GOOGLE MAPS DIRECTO)
// ============================================================================
function notifyDriverByWhatsApp(orderId) {
  const order = dispatchOrders.find(o => o.id === orderId);
  if (!order) return;

  const mapsQuery = encodeURIComponent(order.address);
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`;

  const driverMsg = encodeURIComponent(
    `🚚 *ASIGNACIÓN DE ENTREGA - HEALTHY WATER*\n` +
    `--------------------------------------\n` +
    `🚨 *Atención Repartidor:* ${order.driverName || 'Manuel Velázquez'}\n` +
    `📍 *Zona:* ${order.routeZone || 'León Norte'}\n` +
    `📦 *Folio:* ${order.id}\n` +
    `👤 *Cliente:* ${order.customer} (Tel: ${order.phone})\n` +
    `🏠 *Dirección:* ${order.address}\n` +
    `🗺️ *Navegar con Google Maps:* ${mapsUrl}\n` +
    `🛍️ *Carga requerida:* ${order.itemsDesc}\n` +
    `⏰ *Horario de entrega:* ${order.time}\n` +
    `💵 *Cobro al cliente:* $${order.total.toFixed(2)} (${order.paymentMethod})\n` +
    `--------------------------------------\n` +
    `Por favor confirma de recibido y envía foto de entrega al terminar.`
  );

  window.open(`https://wa.me/${WHATSAPP_PHONE}?text=${driverMsg}`, '_blank');
}

function markDelivered(orderId) {
  const order = dispatchOrders.find(o => o.id === orderId);
  if (!order) return;

  order.status = 'entregado';
  order.notes = 'Entrega confirmada en punto';
  renderRoutesTable();
  updateVehicleLoad();
  updateDashboardMetrics();
}

function updateVehicleLoad() {
  const totalGarrafones = dispatchOrders
    .filter(o => o.status === 'en_ruta' || o.status === 'entregado')
    .reduce((acc, o) => acc + (o.garrafonesCount || 0), 0);

  const maxCapacity = 60; // Physical limit established in the project
  const pct = Math.min(Math.round((totalGarrafones / maxCapacity) * 100), 100);

  const countElem = document.getElementById('load-count');
  const barElem = document.getElementById('load-bar');

  if (countElem) countElem.innerText = `${totalGarrafones} / ${maxCapacity} Garrafones`;
  if (barElem) {
    barElem.style.width = `${pct}%`;
    if (pct > 90) {
      barElem.className = "bg-amber-500 h-full rounded-full transition-all duration-500";
    } else {
      barElem.className = "bg-brand-cyan h-full rounded-full transition-all duration-500";
    }
  }
}

// ============================================================================
// AI RESCHEDULING ENGINE ("QUE NADIE SE QUEDE SIN AGUA")
// ============================================================================
function openRescheduleModal(orderId) {
  const order = dispatchOrders.find(o => o.id === orderId);
  if (!order) return;

  currentSelectedOrderForAI = order;

  document.getElementById('modal-client-info').innerText = 
    `Cliente: ${order.customer} · Dirección: ${order.address} · Pedido: ${order.itemsDesc}`;

  // Smart proactive message generated by IA
  const aiMsg = 
    `Hola ${order.customer}, te saludamos de Purificadora Healthy Water 💧.\n\n` +
    `Lamentamos no haberte encontrado en nuestro horario matutino en León Norte. Como tu hidratación es nuestra prioridad, ¡ya tenemos tus garrafones reservados!\n\n` +
    `Te proponemos estas 2 opciones para hoy o mañana:\n` +
    `1️⃣ Hoy en nuestro turno vespertino (16:30 - 18:00 hrs)\n` +
    `2️⃣ Mañana a primera hora (09:00 - 10:30 hrs)\n\n` +
    `Por favor responde con 1 o 2 para confirmar tu visita. ¡Gracias por confiar en Healthy Water!`;

  document.getElementById('ai-generated-message').value = aiMsg;
  document.getElementById('ai-reschedule-modal').classList.remove('hidden');
}

function closeRescheduleModal() {
  document.getElementById('ai-reschedule-modal').classList.add('hidden');
  currentSelectedOrderForAI = null;
}

function confirmAiReschedule() {
  if (!currentSelectedOrderForAI) return;

  currentSelectedOrderForAI.status = 'reprogramado';
  currentSelectedOrderForAI.time = 'Turno Reprogramado (Vespertino)';
  currentSelectedOrderForAI.notes = 'Reprogramado con éxito por Asistente IA';

  const msg = encodeURIComponent(document.getElementById('ai-generated-message').value);
  window.open(`https://wa.me/${WHATSAPP_PHONE}?text=${msg}`, '_blank');

  closeRescheduleModal();
  renderRoutesTable();
  updateDashboardMetrics();
}

// ============================================================================
// BOT DE WHATSAPP: SIMULADOR DE AUTOMENSAJES EN TIEMPO REAL
// ============================================================================
function triggerBotSimulator(order) {
  const container = document.getElementById('bot-chat-container');
  if (!container) return;

  const now = new Date();
  const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  // Add customer message
  const userBubble = `
    <div class="flex justify-end mb-3">
      <div class="bg-emerald-100 text-slate-800 rounded-2xl rounded-tr-none p-3 max-w-[85%] text-xs shadow-xs border border-emerald-200">
        <p class="font-bold text-emerald-800 mb-1">Cliente (${order.customer}):</p>
        <p>Hola Healthy Water, aperturé mi pedido con Folio <strong>${order.id}</strong> para entregar en ${order.address}.</p>
        <span class="text-[10px] text-slate-400 block text-right mt-1">${timeStr}</span>
      </div>
    </div>
  `;
  container.innerHTML += userBubble;

  // Bot auto-response simulation after 1 second
  setTimeout(() => {
    const botBubble = `
      <div class="flex justify-start mb-3 animate-fade-in">
        <div class="bg-white text-slate-800 rounded-2xl rounded-tl-none p-3.5 max-w-[85%] text-xs shadow-md border border-slate-200">
          <div class="flex items-center space-x-1.5 text-brand-navy font-bold mb-1">
            <i class="fa-solid fa-robot text-brand-cyan"></i>
            <span>Bot Oficial Healthy Water</span>
          </div>
          <p class="leading-relaxed">
            💧 ¡Hola <strong>${order.customer}</strong>! Gracias por tu pedido en <strong>Healthy Water León</strong>.<br><br>
            ✅ Tu pedido <strong>#${order.id}</strong> ha sido confirmado y vinculado a la <strong>${order.routeZone}</strong>.<br>
            🚚 El repartidor asignado es <strong>${order.driverName}</strong>.<br>
            ⏰ Pasaremos en tu turno elegido: <strong>${order.time}</strong>.<br>
            💰 Total a pagar: <strong>$${order.total.toFixed(2)}</strong> (${order.paymentMethod}).<br><br>
            ¿Requieres factura CFDI o tienes alguna indicación sobre tu timbre? Escríbela aquí y con gusto te atenderemos.
          </p>
          <span class="text-[10px] text-slate-400 block text-right mt-1.5">${timeStr} · Entregado</span>
        </div>
      </div>
    `;
    container.innerHTML += botBubble;
    container.scrollTop = container.scrollHeight;
  }, 1000);
}

function sendInteractiveBotTest() {
  const input = document.getElementById('bot-test-input');
  if (!input || !input.value.trim()) return;

  const msg = input.value.trim();
  input.value = '';

  const container = document.getElementById('bot-chat-container');
  const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  container.innerHTML += `
    <div class="flex justify-end mb-3">
      <div class="bg-emerald-100 text-slate-800 rounded-2xl rounded-tr-none p-3 max-w-[85%] text-xs shadow-xs border border-emerald-200">
        <p class="font-bold text-emerald-800 mb-1">Tú:</p>
        <p>${msg}</p>
        <span class="text-[10px] text-slate-400 block text-right mt-1">${timeStr}</span>
      </div>
    </div>
  `;
  container.scrollTop = container.scrollHeight;

  // Bot logic
  setTimeout(() => {
    let reply = '';
    const m = msg.toLowerCase();
    if (m.includes('precio') || m.includes('cuanto') || m.includes('garrafon')) {
      reply = `💧 El garrafón de 20 Litros retornable cuesta <strong>$30.00</strong>. Las botellas van desde $4.50 (350ml), $5.40 (500ml), $9.00 (1L), y los bolis a $1.00. ¿Cuántos deseas para programar tu visita?`;
    } else if (m.includes('factura') || m.includes('rfc') || m.includes('empresa')) {
      reply = `🏢 ¡Con gusto! Para empresas otorgamos crédito a 15 o 30 días y facturación inmediata al entregar. Por favor compártenos tu RFC y Razón Social.`;
    } else if (m.includes('pipa')) {
      reply = `🚛 Manejamos Media Pipa (5,000L) a <strong>$600.00</strong> y Pipa Completa (10,000L) a <strong>$900.00</strong> para cisternas en León. ¿En qué colonia requieres la pipa?`;
    } else {
      reply = `💧 Tu mensaje ha sido registrado. Un agente humano de nuestro equipo (Yessica Carmona) te atenderá en unos momentos para apoyarte con tu solicitud.`;
    }

    container.innerHTML += `
      <div class="flex justify-start mb-3">
        <div class="bg-white text-slate-800 rounded-2xl rounded-tl-none p-3.5 max-w-[85%] text-xs shadow-md border border-slate-200">
          <div class="flex items-center space-x-1.5 text-brand-navy font-bold mb-1">
            <i class="fa-solid fa-robot text-brand-cyan"></i>
            <span>Bot Oficial Healthy Water</span>
          </div>
          <p class="leading-relaxed">${reply}</p>
          <span class="text-[10px] text-slate-400 block text-right mt-1.5">${timeStr} · Entregado</span>
        </div>
      </div>
    `;
    container.scrollTop = container.scrollHeight;
  }, 900);
}

// ============================================================================
// DASHBOARD METRICS & CHART.JS
// ============================================================================
function updateDashboardMetrics() {
  const totalSales = dispatchOrders.reduce((sum, o) => sum + (o.status === 'entregado' ? o.total : 0), 0);
  const totalGarrafones = dispatchOrders
    .filter(o => o.status === 'entregado')
    .reduce((sum, o) => sum + (o.garrafonesCount || 0), 0);

  const ventasHoyElem = document.getElementById('stat-ventas-hoy');
  const garrafonesHoyElem = document.getElementById('stat-garrafones-hoy');

  if (ventasHoyElem) ventasHoyElem.innerText = `$${totalSales.toFixed(2)} MXN`;
  if (garrafonesHoyElem) garrafonesHoyElem.innerText = `${totalGarrafones} Unidades`;
}

function initCharts() {
  // Sales Trend Chart
  const ctxSales = document.getElementById('salesChart');
  if (ctxSales) {
    salesChartInstance = new Chart(ctxSales, {
      type: 'line',
      data: {
        labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb (Hoy)', 'Dom'],
        datasets: [{
          label: 'Ventas Diarias ($ MXN)',
          data: [1850, 2100, 1950, 2400, 2800, 2475, 1600],
          borderColor: '#00A0E3',
          backgroundColor: 'rgba(0, 160, 227, 0.1)',
          fill: true,
          tension: 0.35,
          pointBackgroundColor: '#0B4F8A',
          pointRadius: 5
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: val => `$${val}`
            }
          }
        }
      }
    });
  }

  // Revenue Mix Chart (Hogar vs Empresa)
  const ctxMix = document.getElementById('mixChart');
  if (ctxMix) {
    mixChartInstance = new Chart(ctxMix, {
      type: 'doughnut',
      data: {
        labels: ['Hogares (Efectivo)', 'Empresas & Pipas (Crédito/Factura)'],
        datasets: [{
          data: [60, 40],
          backgroundColor: ['#00A0E3', '#F59E0B'],
          hoverOffset: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: { font: { size: 11, family: 'Poppins' } }
          }
        }
      }
    });
  }
}

function updateChartsData() {
  if (salesChartInstance) salesChartInstance.update();
  if (mixChartInstance) mixChartInstance.update();
}

// ============================================================================
// LUMA AI VIDEO PLAYER (CARGA NATIVA PERMANENTE)
// ============================================================================
function setupVideoUploader() {
  const videoPlayer = document.getElementById('luma-video-player');
  if (videoPlayer) {
    videoPlayer.load();
  }
}

// ============================================================================
// AUDIO VOICE-OVER MOCKUP FOR MARKETING VIDEO
// ============================================================================
function playMockVoiceover() {
  const text = "Verlos crecer sanos, activos y felices es lo que más nos importa. Por eso en casa exiges la máxima pureza. Healthy Water: microfiltrada y tratada bajo los más altos estándares para cuidar a quienes más amas. Pide en un clic desde tu celular con entrega puntual en León Norte. Healthy Water, agua de confianza a un clic de tu puerta.";
  
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'es-MX';
    utterance.rate = 1.0;
    utterance.pitch = 1.05;
    window.speechSynthesis.speak(utterance);
    
    const btn = document.getElementById('play-audio-btn');
    btn.innerHTML = `<i class="fa-solid fa-waveform-lines animate-pulse mr-1.5"></i> Reproduciendo...`;
    utterance.onend = () => {
      btn.innerHTML = `<i class="fa-solid fa-volume-high mr-1.5"></i> Escuchar Locución`;
    };
  } else {
    alert("Tu navegador no soporta síntesis de voz. El texto está disponible en el guion de abajo.");
  }
}
