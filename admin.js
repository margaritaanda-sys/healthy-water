// ============================================================================
// HEALTHY WATER - PORTAL OPERATIVO & CLERK RBAC (APP 2)
// Maestría USAG - Equipo 4
// Teléfono de Pruebas: +52 477 877 6369
// ============================================================================

const WHATSAPP_PHONE = '524778776369';
const STORAGE_KEY = 'hw_orders_db';

// 1. CLERK USERS & ROLES CONFIGURATION
const CLERK_PROFILES = {
  admin: {
    name: 'Margarita Anda',
    roleLabel: 'Dirección General / Admin',
    roleTag: 'ADMIN',
    email: 'maggie@healthywater.mx',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80',
    title: 'Dirección General y Planificación',
    subtitle: 'Acceso total a finanzas, auditoría de seguridad LFPDPPP y gestión de stock.',
    allowedTabs: ['kpis', 'ventas', 'reparto', 'seguridad'],
    defaultTab: 'kpis'
  },
  vendedora: {
    name: 'Yessica Carmona',
    roleLabel: 'Ventas / Atención & Supervisor IA',
    roleTag: 'VENTAS',
    email: 'yessy@healthywater.mx',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=120&q=80',
    title: 'Atención a Clientes & Filtro Humano (Human-in-the-Loop)',
    subtitle: 'Validación de solicitudes web, confirmación formal de pedidos y reprogramación empática.',
    allowedTabs: ['ventas', 'reparto'],
    defaultTab: 'ventas'
  },
  repartidor: {
    name: 'Manuel Velázquez',
    roleLabel: 'Repartidor / Logística de Campo',
    roleTag: 'REPARTIDOR',
    email: 'manuel@healthywater.mx',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
    title: 'Chofer Unidad #01 (Placas GTO-849-B)',
    subtitle: 'Hoja de ruta exclusiva, cobros en efectivo y entregas seguras de pedidos prepagados.',
    allowedTabs: ['reparto'],
    defaultTab: 'reparto'
  }
};

let currentRole = 'admin';
let currentAdminTab = 'kpis';
let activeFilter = 'all';

// 2. DEFAULT SEED ORDERS WITH VERIFIED DATA
const defaultOrders = [
  {
    id: 'HW-2026-1041',
    customer: 'Lic. Fernando Ortiz',
    phone: '4771234567',
    type: 'hogar',
    address: 'Col. Gran Jardín, Calle Bosques #512, León',
    routeZone: 'Ruta 1 (León Norte)',
    driverName: 'Manuel Velázquez',
    itemsDesc: '2x Garrafón 20 Litros',
    garrafonesCount: 2,
    time: '09:00 - 12:00',
    paymentStatus: 'paid_online',
    paymentGateway: 'Mercado Pago (Tarjeta Débito)',
    paymentMethodText: 'Pagado en Línea ($60.00 MXN)',
    total: 60.00,
    status: 'en_ruta',
    notes: '¡Dejar en caseta de vigilancia con guardia Juan si no responde! Vuelta asegurada.'
  },
  {
    id: 'HW-2026-1042',
    customer: 'Sra. Carmen Villalobos',
    phone: '4772348910',
    type: 'hogar',
    address: 'Col. Valle del Campestre, Calle Manantial #204, León',
    routeZone: 'Ruta 1 (León Norte)',
    driverName: 'Manuel Velázquez',
    itemsDesc: '3x Garrafón 20 Litros',
    garrafonesCount: 3,
    time: '09:00 - 12:00',
    paymentStatus: 'cash_pending',
    paymentGateway: 'Efectivo',
    paymentMethodText: 'Efectivo contra entrega (Llevar cambio de $200)',
    total: 90.00,
    status: 'pendiente',
    notes: 'Cliente solicitó cambio de $200. Pendiente validación de Yessy.'
  },
  {
    id: 'HW-2026-1043',
    customer: 'Despacho Contable García & Asoc.',
    phone: '4779871234',
    type: 'empresa',
    address: 'Blvd. Campestre #1120, Piso 3, León',
    routeZone: 'Ruta 1 (León Norte)',
    driverName: 'Manuel Velázquez',
    itemsDesc: '5x Garrafón 20L + 20x Botella 500ml',
    garrafonesCount: 5,
    time: '12:00 - 15:00',
    paymentStatus: 'paid_online',
    paymentGateway: 'Stripe SPEI Directo',
    paymentMethodText: 'Pagado en Línea (Transferencia SPEI)',
    total: 250.00,
    status: 'en_ruta',
    notes: 'CFDI emitido a DGA180421XX3. Entrega en recepción corporativa.'
  },
  {
    id: 'HW-2026-1044',
    customer: 'Ing. Rodrigo Alcocer',
    phone: '4776543210',
    type: 'hogar',
    address: 'Col. Jardines del Moral, Paseo de los Insurgentes #302, León',
    routeZone: 'Ruta 1 (León Norte)',
    driverName: 'Manuel Velázquez',
    itemsDesc: '4x Garrafón 20 Litros',
    garrafonesCount: 4,
    time: '15:00 - 18:00',
    paymentStatus: 'cash_pending',
    paymentGateway: 'Efectivo',
    paymentMethodText: 'Efectivo contra entrega ($120.00)',
    total: 120.00,
    status: 'entregado',
    notes: 'Entregado a las 11:15 am con firma de recibido.'
  },
  {
    id: 'HW-2026-1045',
    customer: 'Sra. Patricia Mancera',
    phone: '4773456789',
    type: 'hogar',
    address: 'Col. Los Paraísos, Calle Manzana #118, León',
    routeZone: 'Ruta 1 (León Norte)',
    driverName: 'Manuel Velázquez',
    itemsDesc: '2x Garrafón 20 Litros',
    garrafonesCount: 2,
    time: '09:00 - 12:00',
    paymentStatus: 'cash_pending',
    paymentGateway: 'Efectivo',
    paymentMethodText: 'Efectivo contra entrega ($60.00)',
    total: 60.00,
    status: 'ausente',
    notes: 'Repartidor tocó timbre 3 veces sin respuesta. Requiere reprogramación.'
  }
];

// AUDIT LOG SEED ENTRIES
const auditLogs = [
  { time: '11:42:15', user: 'maggie@healthywater.mx', role: 'ADMIN', action: 'SELECT (Finanzas)', resource: 'table: analytics_summary', ip: '189.204.112.44 (León)' },
  { time: '11:38:02', user: 'yessy@healthywater.mx', role: 'VENTAS', action: 'UPDATE (Aprobación)', resource: 'orders: HW-2026-1043 -> en_ruta', ip: '189.204.112.18 (León)' },
  { time: '11:25:40', user: 'manuel@healthywater.mx', role: 'REPARTIDOR', action: 'UPDATE (Entrega)', resource: 'orders: HW-2026-1044 -> entregado', ip: '201.149.88.92 (Móvil GTO)' },
  { time: '11:10:12', user: 'sistema_api', role: 'SERVICE_ROLE', action: 'INSERT (Web 1-Clic)', resource: 'orders: HW-2026-1045', ip: '142.250.190.46 (Cloudflare)' },
  { time: '10:55:00', user: 'sistema_cron', role: 'POSTGRES', action: 'SECURITY_CHECK', resource: 'pg_cron: purge_old_pii (OK)', ip: '127.0.0.1 (Supabase)' }
];

// 3. INITIALIZATION
document.addEventListener('DOMContentLoaded', () => {
  ensureStorageInitialized();
  applyRoleConfig(currentRole);
  renderAllViews();
  initCharts();
});

function ensureStorageInitialized() {
  const existing = localStorage.getItem(STORAGE_KEY);
  if (!existing) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultOrders));
  }
}

function getOrders() {
  ensureStorageInitialized();
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || defaultOrders;
  } catch (e) {
    return defaultOrders;
  }
}

function saveOrders(orders) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
  renderAllViews();
}

function reloadOrdersFromStorage() {
  renderAllViews();
  alert('Base de datos sincronizada con la Tienda Web (App 1).');
}

function resetDefaultMockData() {
  if (confirm('¿Restablecer datos originales de prueba para la exposición?')) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultOrders));
    renderAllViews();
  }
}

// 4. CLERK ROLE SWITCHER LOGIC
function changeRole(roleKey) {
  currentRole = roleKey;
  applyRoleConfig(roleKey);
  
  // Log security event in audit table
  const profile = CLERK_PROFILES[roleKey];
  auditLogs.unshift({
    time: new Date().toLocaleTimeString('es-MX', { hour12: false }),
    user: profile.email,
    role: profile.roleTag,
    action: `AUTH_SWITCH (Token Clerk)`,
    resource: `session: active_role -> ${roleKey}`,
    ip: '189.204.112.44 (León)'
  });
  renderAuditLogs();
}

function applyRoleConfig(roleKey) {
  const profile = CLERK_PROFILES[roleKey];
  if (!profile) return;

  // Header UI update
  document.getElementById('current-user-name').innerText = profile.name;
  document.getElementById('current-user-email').innerText = profile.email;
  document.getElementById('current-user-avatar').src = profile.avatar;
  document.getElementById('current-user-role-badge').innerText = profile.roleTag;
  document.getElementById('role-selector').value = roleKey;
  
  document.getElementById('role-desc-title').innerText = profile.title;
  document.getElementById('role-desc-subtitle').innerText = profile.subtitle;

  // Tab permissions
  const tabs = ['kpis', 'ventas', 'reparto', 'seguridad'];
  tabs.forEach(tab => {
    const btn = document.getElementById(`btn-tab-${tab}`);
    if (btn) {
      if (profile.allowedTabs.includes(tab)) {
        btn.classList.remove('hidden');
      } else {
        btn.classList.add('hidden');
      }
    }
  });

  // Switch to allowed tab if current is forbidden
  if (!profile.allowedTabs.includes(currentAdminTab)) {
    switchAdminTab(profile.defaultTab);
  } else {
    switchAdminTab(currentAdminTab);
  }
}

function switchAdminTab(tabKey) {
  const profile = CLERK_PROFILES[currentRole];
  if (!profile.allowedTabs.includes(tabKey)) {
    alert(`Acceso denegado: El rol ${profile.roleLabel} no tiene permisos para ver esta sección.`);
    return;
  }

  currentAdminTab = tabKey;

  // Update tabs buttons UI
  document.querySelectorAll('.admin-tab').forEach(btn => {
    btn.classList.remove('active-tab', 'bg-brand-navy', 'text-white');
    btn.classList.add('text-slate-600', 'hover:bg-slate-100');
  });
  const activeBtn = document.getElementById(`btn-tab-${tabKey}`);
  if (activeBtn) {
    activeBtn.classList.add('active-tab', 'bg-brand-navy', 'text-white');
    activeBtn.classList.remove('text-slate-600', 'hover:bg-slate-100');
  }

  // Update views
  document.querySelectorAll('.admin-view').forEach(view => view.classList.add('hidden'));
  const targetView = document.getElementById(`view-${tabKey}`);
  if (targetView) {
    targetView.classList.remove('hidden');
  }

  // If entering KPIs, resize charts
  if (tabKey === 'kpis') {
    setTimeout(initCharts, 50);
  }
}

// 5. RENDER ALL VIEWS
function renderAllViews() {
  renderVentasInbox();
  renderDriverCards();
  renderAuditLogs();
  updatePendingCounter();
}

// 6. VIEW 2: VENTAS & HUMAN-IN-THE-LOOP (YESSY)
function renderVentasInbox() {
  const tbody = document.getElementById('orders-inbox-body');
  if (!tbody) return;

  const orders = getOrders();
  const filtered = activeFilter === 'all' 
    ? orders 
    : orders.filter(o => o.status === activeFilter);

  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" class="text-center py-8 text-slate-400 italic">No hay pedidos registrados con el filtro "${activeFilter}".</td></tr>`;
    return;
  }

  tbody.innerHTML = filtered.map(order => {
    // Mask phone for general staff
    const maskedPhone = order.phone && order.phone.length >= 10 
      ? `${order.phone.substring(0, 3)}-***-${order.phone.substring(7)}`
      : order.phone;

    let statusPill = '';
    if (order.status === 'pendiente') {
      statusPill = '<span class="bg-amber-100 text-amber-800 font-bold px-2.5 py-1 rounded-lg text-[11px] inline-flex items-center"><i class="fa-solid fa-clock mr-1"></i> Por Validar</span>';
    } else if (order.status === 'en_ruta') {
      statusPill = '<span class="bg-cyan-100 text-brand-blue font-bold px-2.5 py-1 rounded-lg text-[11px] inline-flex items-center"><i class="fa-solid fa-truck mr-1"></i> En Ruta</span>';
    } else if (order.status === 'entregado') {
      statusPill = '<span class="bg-emerald-100 text-emerald-800 font-bold px-2.5 py-1 rounded-lg text-[11px] inline-flex items-center"><i class="fa-solid fa-circle-check mr-1"></i> Entregado</span>';
    } else if (order.status === 'ausente') {
      statusPill = '<span class="bg-red-100 text-red-800 font-bold px-2.5 py-1 rounded-lg text-[11px] inline-flex items-center"><i class="fa-solid fa-user-xmark mr-1"></i> Ausente</span>';
    }

    // Payment badge
    let paymentBadge = '';
    if (order.paymentStatus === 'paid_online') {
      paymentBadge = `<span class="bg-emerald-100 text-emerald-800 border border-emerald-300 font-extrabold px-2 py-0.5 rounded text-[10px] block w-max"><i class="fa-solid fa-credit-card mr-1"></i> PAGADO EN LÍNEA</span>
      <span class="text-[10px] text-slate-500">${order.paymentGateway}</span>`;
    } else {
      paymentBadge = `<span class="bg-amber-100 text-amber-900 border border-amber-300 font-bold px-2 py-0.5 rounded text-[10px] block w-max"><i class="fa-solid fa-money-bill-wave mr-1"></i> EFECTIVO</span>
      <span class="text-[10px] text-slate-500">${order.paymentMethodText}</span>`;
    }

    return `
      <tr class="hover:bg-slate-50 transition border-b border-slate-100">
        <td class="py-3 px-4 font-mono font-bold text-slate-800">
          ${order.id}
          <span class="block text-[10px] text-slate-400 font-sans">${order.time}</span>
        </td>
        <td class="py-3 px-4">
          <strong class="text-slate-800 block">${order.customer}</strong>
          <span class="text-[11px] text-slate-500 flex items-center space-x-1">
            <i class="fa-solid fa-lock text-[9px] text-brand-cyan"></i>
            <span>${maskedPhone}</span>
            <span class="capitalize text-brand-navy font-bold">(${order.type})</span>
          </span>
        </td>
        <td class="py-3 px-4 max-w-[220px] truncate text-slate-600" title="${order.address}">
          ${order.address}
          <span class="block text-[10px] text-brand-blue font-bold">${order.routeZone || 'León Norte'}</span>
        </td>
        <td class="py-3 px-4 font-medium text-slate-700">
          ${order.itemsDesc}
          <strong class="block text-brand-navy mt-0.5">$${order.total.toFixed(2)} MXN</strong>
        </td>
        <td class="py-3 px-4">${paymentBadge}</td>
        <td class="py-3 px-4">${statusPill}</td>
        <td class="py-3 px-4 text-center">
          <div class="flex items-center justify-center space-x-1.5">
            ${order.status === 'pendiente' ? `
              <button onclick="approveOrder('${order.id}')" title="Aprobar y Mandar a Ruta (Filtro Humano)" class="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold text-xs shadow-xs flex items-center space-x-1">
                <i class="fa-solid fa-check"></i>
                <span>Aprobar</span>
              </button>
            ` : ''}

            <button onclick="sendFormalCustomerWhatsApp('${order.id}')" title="Enviar Confirmación Formal al Cliente vía WhatsApp" class="p-1.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-xs transition">
              <i class="fa-brands fa-whatsapp"></i>
            </button>

            ${order.status === 'ausente' ? `
              <button onclick="selectOrderForReschedule('${order.id}')" title="Activar Asistente de Reprogramación IA" class="px-2 py-1 bg-purple-100 hover:bg-purple-200 text-purple-700 rounded-lg text-xs font-bold transition flex items-center space-x-1">
                <i class="fa-solid fa-wand-magic-sparkles"></i>
                <span>Reprogramar</span>
              </button>
            ` : ''}
          </div>
        </td>
      </tr>
    `;
  }).join('');

  populateRescheduleSelect();
}

function filterOrdersByStatus(status) {
  activeFilter = status;
  document.querySelectorAll('.status-filter-btn').forEach(btn => {
    btn.classList.remove('bg-brand-navy', 'text-white', 'font-bold');
    btn.classList.add('bg-slate-100', 'text-slate-700', 'font-semibold');
  });
  event.target.classList.add('bg-brand-navy', 'text-white', 'font-bold');
  event.target.classList.remove('bg-slate-100', 'text-slate-700', 'font-semibold');
  renderVentasInbox();
}

function approveOrder(orderId) {
  const orders = getOrders();
  const order = orders.find(o => o.id === orderId);
  if (!order) return;

  order.status = 'en_ruta';
  saveOrders(orders);

  // Audit Log
  auditLogs.unshift({
    time: new Date().toLocaleTimeString('es-MX', { hour12: false }),
    user: 'yessy@healthywater.mx',
    role: 'VENTAS',
    action: `HUMAN_APPROVAL (Filtro Humano)`,
    resource: `orders: ${order.id} aprobado para despacho`,
    ip: '189.204.112.18 (León)'
  });
  renderAuditLogs();

  alert(`✅ Pedido ${order.id} validado por Yessy Carmona y asignado a la Unidad #01 de Manuel Velázquez.`);
}

function approveAllPendingOrders() {
  const orders = getOrders();
  let count = 0;
  orders.forEach(o => {
    if (o.status === 'pendiente') {
      o.status = 'en_ruta';
      count++;
    }
  });

  if (count === 0) {
    alert('No hay pedidos pendientes de validación en este momento.');
    return;
  }

  saveOrders(orders);
  alert(`✅ Se validaron ${count} pedidos pendientes y fueron despachados a la ruta.`);
}

function updatePendingCounter() {
  const orders = getOrders();
  const pendingCount = orders.filter(o => o.status === 'pendiente').length;
  const badge = document.getElementById('pending-badge-count');
  if (badge) {
    badge.innerText = pendingCount;
    if (pendingCount === 0) {
      badge.classList.add('bg-slate-400');
      badge.classList.remove('bg-brand-cyan');
    } else {
      badge.classList.remove('bg-slate-400');
      badge.classList.add('bg-brand-cyan');
    }
  }
}

// 7. VIEW 3: REPARTIDOR & RUTAS DE CHOFER (MANUEL VELÁZQUEZ)
function renderDriverCards() {
  const container = document.getElementById('driver-cards-container');
  if (!container) return;

  const orders = getOrders();
  // Filter for Driver: Manuel Velázquez
  const driverOrders = orders.filter(o => o.driverName === 'Manuel Velázquez');

  // Counters
  const paidCount = driverOrders.filter(o => o.paymentStatus === 'paid_online').length;
  const cashCount = driverOrders.filter(o => o.paymentStatus !== 'paid_online').length;
  const deliveredCount = driverOrders.filter(o => o.status === 'entregado').length;
  
  // Total garrafones
  let totalGarrafones = 0;
  driverOrders.forEach(o => {
    if (o.status !== 'entregado') {
      totalGarrafones += (o.garrafonesCount || 2);
    }
  });

  const loadBadge = document.getElementById('driver-load-badge');
  const loadBar = document.getElementById('driver-load-bar');
  const freeSlots = document.getElementById('driver-free-slots');
  const paidElem = document.getElementById('driver-count-paid');
  const cashElem = document.getElementById('driver-count-cash');

  if (loadBadge) loadBadge.innerText = `${totalGarrafones} / 60 Garrafones`;
  if (loadBar) {
    const pct = Math.min(100, Math.round((totalGarrafones / 60) * 100));
    loadBar.style.width = `${pct}%`;
    if (pct > 85) {
      loadBar.classList.replace('from-brand-cyan', 'from-amber-500');
      loadBar.classList.replace('to-brand-blue', 'to-red-600');
    }
  }
  if (freeSlots) freeSlots.innerText = `${Math.max(0, 60 - totalGarrafones)} garrafones disponibles`;
  if (paidElem) paidElem.innerText = paidCount;
  if (cashElem) cashElem.innerText = cashCount;

  // Render cards
  container.innerHTML = driverOrders.map((order, index) => {
    const isPaid = order.paymentStatus === 'paid_online';
    const isDelivered = order.status === 'entregado';
    const isAbsent = order.status === 'ausente';

    // Masked phone for delivery driver privacy compliance
    const safePhone = order.phone || '4778776369';
    const maskedPhone = safePhone.length >= 10 
      ? `${safePhone.substring(0, 3)}-***-${safePhone.substring(7)}`
      : safePhone;

    // Google Maps link
    const mapsQuery = encodeURIComponent(`${order.address}, León, Gto.`);
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`;

    return `
      <div class="bg-white rounded-3xl p-5 border ${isDelivered ? 'border-emerald-200 bg-emerald-50/30' : isPaid ? 'border-brand-cyan/60 shadow-md' : 'border-slate-200 shadow-sm'} flex flex-col justify-between space-y-4">
        
        <!-- CARD TOP: NUMBER & PAYMENT BADGE -->
        <div>
          <div class="flex items-center justify-between mb-2">
            <span class="text-xs font-black text-slate-400">#Parada ${index + 1} · ${order.id}</span>
            <span class="text-xs font-bold px-2.5 py-0.5 rounded-full ${
              isDelivered ? 'bg-emerald-100 text-emerald-800' :
              isAbsent ? 'bg-red-100 text-red-800' :
              order.status === 'pendiente' ? 'bg-amber-100 text-amber-800' :
              'bg-blue-100 text-brand-blue'
            }">
              ${isDelivered ? '✅ Entregado' : isAbsent ? '⚠️ Cliente Ausente' : order.status === 'pendiente' ? '⏳ Por Validar' : '🚚 En Ruta'}
            </span>
          </div>

          <!-- PAYMENT BADGE PROMINENT DISPLAY -->
          ${isPaid ? `
            <div class="bg-emerald-50 border-2 border-emerald-500 text-emerald-900 rounded-2xl p-3 text-xs mb-3 flex items-start space-x-2">
              <i class="fa-solid fa-circle-check text-emerald-600 text-base mt-0.5"></i>
              <div>
                <strong class="block font-black text-sm text-emerald-800">💳 PAGADO EN LÍNEA ($${order.total.toFixed(2)})</strong>
                <p class="text-[11px] text-emerald-700 leading-tight mt-0.5">
                  ¡Vuelta asegurada! Si el cliente no se encuentra, <strong>dejar el pedido en caseta de vigilancia, recepción o en puerta</strong>.
                </p>
              </div>
            </div>
          ` : `
            <div class="bg-amber-50 border-2 border-amber-400 text-amber-950 rounded-2xl p-3 text-xs mb-3 flex items-start space-x-2">
              <i class="fa-solid fa-money-bill-wave text-amber-600 text-base mt-0.5"></i>
              <div>
                <strong class="block font-black text-sm text-amber-900">💵 COBRO CONTRA ENTREGA: $${order.total.toFixed(2)} MXN</strong>
                <p class="text-[11px] text-amber-800 leading-tight mt-0.5">
                  ${order.paymentMethodText}
                </p>
              </div>
            </div>
          `}

          <!-- CUSTOMER & ADDRESS -->
          <div class="space-y-1">
            <h4 class="font-extrabold text-base text-slate-800">${order.customer}</h4>
            <p class="text-xs text-slate-600 flex items-start space-x-1.5">
              <i class="fa-solid fa-location-dot text-brand-cyan text-sm mt-0.5"></i>
              <span>${order.address}</span>
            </p>
            <p class="text-xs text-brand-navy font-bold">
              <i class="fa-solid fa-box-open mr-1 text-slate-400"></i> ${order.itemsDesc}
            </p>
          </div>
        </div>

        <!-- ACTIONS ROW -->
        <div class="pt-3 border-t border-slate-100 space-y-2">
          
          <div class="grid grid-cols-2 gap-2">
            <!-- 1-CLICK GOOGLE MAPS NAVIGATION -->
            <a href="${mapsUrl}" target="_blank" class="py-2.5 px-3 bg-brand-navy hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center justify-center transition shadow-xs">
              <i class="fa-solid fa-diamond-turn-right text-brand-cyan mr-1.5"></i> Navegar Maps
            </a>

            <!-- SECURE CALL (MASKED PRIVACY) -->
            <a href="tel:${safePhone}" class="py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold flex items-center justify-center transition">
              <i class="fa-solid fa-phone text-emerald-600 mr-1.5"></i> Llamar Seguro
            </a>
          </div>

          <!-- STATUS BUTTONS -->
          <div class="flex items-center space-x-2">
            ${!isDelivered ? `
              <button onclick="markDriverOrderDelivered('${order.id}')" class="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-black transition flex items-center justify-center shadow-xs">
                <i class="fa-solid fa-check mr-1.5"></i> Marcar Entregado
              </button>
            ` : `
              <button disabled class="flex-1 py-2.5 bg-slate-100 text-emerald-700 font-extrabold rounded-xl text-xs flex items-center justify-center cursor-default">
                <i class="fa-solid fa-circle-check mr-1.5"></i> Entrega Completada
              </button>
            `}

            ${!isDelivered && !isAbsent ? `
              <button onclick="reportClientAbsent('${order.id}')" class="py-2.5 px-3 bg-red-50 hover:bg-red-100 text-red-700 rounded-xl text-xs font-bold transition flex items-center justify-center" title="Reportar que el cliente no estaba en casa">
                <i class="fa-solid fa-user-xmark mr-1"></i> Ausente
              </button>
            ` : ''}
          </div>

        </div>

      </div>
    `;
  }).join('');
}

function markDriverOrderDelivered(orderId) {
  const orders = getOrders();
  const order = orders.find(o => o.id === orderId);
  if (!order) return;

  order.status = 'entregado';
  saveOrders(orders);

  // Audit entry
  auditLogs.unshift({
    time: new Date().toLocaleTimeString('es-MX', { hour12: false }),
    user: 'manuel@healthywater.mx',
    role: 'REPARTIDOR',
    action: `DELIVERY_CONFIRM`,
    resource: `orders: ${order.id} entregado con éxito`,
    ip: '201.149.88.92 (Móvil Chofer)'
  });
  renderAuditLogs();

  alert(`🎉 ¡Entrega del pedido ${order.id} registrada con éxito! La carga del vehículo se actualizó.`);
}

function reportClientAbsent(orderId) {
  const orders = getOrders();
  const order = orders.find(o => o.id === orderId);
  if (!order) return;

  order.status = 'ausente';
  saveOrders(orders);

  // Audit entry
  auditLogs.unshift({
    time: new Date().toLocaleTimeString('es-MX', { hour12: false }),
    user: 'manuel@healthywater.mx',
    role: 'REPARTIDOR',
    action: `INCIDENCE_REPORT (Ausente)`,
    resource: `orders: ${order.id} cliente no respondió`,
    ip: '201.149.88.92 (Móvil Chofer)'
  });
  renderAuditLogs();

  alert(`⚠️ Incidencia registrada: Cliente ausente en ${order.id}. La vendedora Yessy fue notificada con el asistente IA de reprogramación.`);
}

// 8. ASISTENTE IA DE REPROGRAMACIÓN ÉTICA & WHATSAPP FORMAL
function populateRescheduleSelect() {
  const select = document.getElementById('reschedule-order-select');
  if (!select) return;

  const orders = getOrders();
  const absentOrders = orders.filter(o => o.status === 'ausente' || o.status === 'pendiente');

  if (absentOrders.length === 0) {
    select.innerHTML = '<option value="">No hay incidencias pendientes</option>';
    document.getElementById('ai-reschedule-draft').value = 'Excelente noticia: Todos los pedidos están en ruta o entregados puntualmente.';
    return;
  }

  select.innerHTML = absentOrders.map(o => `
    <option value="${o.id}">
      ${o.id} - ${o.customer} (${o.address.substring(0, 30)}...)
    </option>
  `).join('');

  generateAiRescheduleDraft();
}

function generateAiRescheduleDraft() {
  const select = document.getElementById('reschedule-order-select');
  const textarea = document.getElementById('ai-reschedule-draft');
  if (!select || !textarea) return;

  const orderId = select.value;
  const orders = getOrders();
  const order = orders.find(o => o.id === orderId);

  if (!order) return;

  const draft = `Hola ${order.customer}, te saludamos de Purificadora Healthy Water. Nuestro repartidor Manuel pasó a tu domicilio (${order.address}) pero no tuvimos respuesta. ¿A qué hora te acomodaría que regresemos hoy, o prefieres que lo agendemos para mañana a primera hora? ¡Queremos asegurarnos de que no te quedes sin agua pura!`;
  textarea.value = draft;
}

function selectOrderForReschedule(orderId) {
  switchAdminTab('ventas');
  const select = document.getElementById('reschedule-order-select');
  if (select) {
    select.value = orderId;
    generateAiRescheduleDraft();
  }
}

function sendAiRescheduleWhatsApp() {
  const select = document.getElementById('reschedule-order-select');
  const textarea = document.getElementById('ai-reschedule-draft');
  if (!select || !textarea) return;

  const orderId = select.value;
  const orders = getOrders();
  const order = orders.find(o => o.id === orderId);
  if (!order) return;

  const msg = encodeURIComponent(textarea.value);
  const url = `https://wa.me/${WHATSAPP_PHONE}?text=${msg}`;
  window.open(url, '_blank');
}

function sendFormalCustomerWhatsApp(orderId) {
  const orders = getOrders();
  const order = orders.find(o => o.id === orderId);
  if (!order) return;

  const text = encodeURIComponent(
    `💧 *CONFIRMACIÓN FORMAL HEALTHY WATER* 💧\n` +
    `----------------------------------------\n` +
    `Estimado/a ${order.customer},\n` +
    `Recibimos tu solicitud con folio *${order.id}*. Nuestro equipo en planta ya validó tu entrega:\n\n` +
    `📦 *Pedido:* ${order.itemsDesc}\n` +
    `🚚 *Ruta:* ${order.routeZone} (Chofer: ${order.driverName})\n` +
    `⏰ *Horario Programado:* ${order.time}\n` +
    `💳 *Estatus de Pago:* ${order.paymentStatus === 'paid_online' ? 'PAGADO EN LÍNEA (¡Entrega garantizada!)' : 'A pagar en efectivo contra entrega'}\n\n` +
    `Cualquier duda estamos a tus órdenes en este WhatsApp. ¡Gracias por confiar en Healthy Water!`
  );

  const url = `https://wa.me/${WHATSAPP_PHONE}?text=${text}`;
  window.open(url, '_blank');
}

// 9. AUDIT LOGS
function renderAuditLogs() {
  const tbody = document.getElementById('audit-log-body');
  if (!tbody) return;

  tbody.innerHTML = auditLogs.map(log => `
    <tr class="hover:bg-slate-50 transition border-b border-slate-100">
      <td class="py-2.5 px-4 font-mono text-slate-500 text-[11px]">${log.time}</td>
      <td class="py-2.5 px-4 font-bold text-slate-700">${log.user}</td>
      <td class="py-2.5 px-4">
        <span class="px-2 py-0.5 rounded text-[10px] font-black ${
          log.role === 'ADMIN' ? 'bg-purple-100 text-purple-800' :
          log.role === 'VENTAS' ? 'bg-emerald-100 text-emerald-800' :
          log.role === 'REPARTIDOR' ? 'bg-blue-100 text-brand-blue' :
          'bg-slate-100 text-slate-700'
        }">${log.role}</span>
      </td>
      <td class="py-2.5 px-4 font-mono text-slate-800 text-[11px]">${log.action}</td>
      <td class="py-2.5 px-4 text-slate-600 text-[11px] max-w-[200px] truncate">${log.resource}</td>
      <td class="py-2.5 px-4 text-slate-400 text-[11px]">${log.ip}</td>
    </tr>
  `).join('');
}

// 10. CHARTS INITIALIZATION (COSTS, MARGINS & PAYMENTS MIX)
let costMarginChartInstance = null;
let paymentsMixChartInstance = null;

function initCharts() {
  if (typeof Chart === 'undefined') return;

  // Chart 1: Desglose de Costo Directo ($6.54) vs Margen Bruto ($23.46)
  const ctx1 = document.getElementById('costMarginChart');
  if (ctx1) {
    if (costMarginChartInstance) costMarginChartInstance.destroy();

    costMarginChartInstance = new Chart(ctx1, {
      type: 'doughnut',
      data: {
        labels: [
          'Agua Purificada (20L) - $3.30',
          'Etiqueta - $1.70',
          'Desinfección - $1.00',
          'Tapa / Linner - $0.37',
          'Sello de Calor - $0.17',
          'Margen Bruto de Ganancia (78.2%) - $23.46'
        ],
        datasets: [{
          data: [3.30, 1.70, 1.00, 0.37, 0.17, 23.46],
          backgroundColor: [
            '#0B4F8A',
            '#00A0E3',
            '#38BDF8',
            '#7DD3FC',
            '#BAE6FD',
            '#10B981' // Green for gross profit
          ],
          borderWidth: 2,
          borderColor: '#ffffff'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'right',
            labels: {
              boxWidth: 12,
              font: { size: 11, family: 'Poppins' }
            }
          },
          tooltip: {
            callbacks: {
              label: function(ctx) {
                return ` ${ctx.label}: $${ctx.raw.toFixed(2)} MXN`;
              }
            }
          }
        }
      }
    });
  }

  // Chart 2: Pagos en Línea vs Efectivo (Ahorro en Vueltas Perdidas)
  const ctx2 = document.getElementById('paymentsMixChart');
  if (ctx2) {
    if (paymentsMixChartInstance) paymentsMixChartInstance.destroy();

    paymentsMixChartInstance = new Chart(ctx2, {
      type: 'bar',
      data: {
        labels: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4 (Actual)'],
        datasets: [
          {
            label: 'Pagado en Línea (Entrega Garantizada)',
            data: [120, 240, 390, 520],
            backgroundColor: '#10B981',
            borderRadius: 8
          },
          {
            label: 'Cobro en Efectivo contra Entrega',
            data: [750, 710, 640, 580],
            backgroundColor: '#00A0E3',
            borderRadius: 8
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: { stacked: true, grid: { display: false } },
          y: { stacked: true, grid: { color: '#F1F5F9' } }
        },
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
