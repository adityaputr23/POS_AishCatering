// ==========================================================================
// Aish Catering POS - Core Operational & Transaction Engine
// ==========================================================================

const AishPOS = (() => {
  // Master Catalog Data (Sync with AishStorage)
  let catalogData = (typeof AishStorage !== 'undefined') ? AishStorage.getCatalog() : [
    {
      id: 'prasmanan-royal',
      name: 'Paket Prasmanan Royal Nusantara',
      category: 'Paket Prasmanan',
      categoryTag: 'Prasmanan',
      price: 65000,
      unit: '/pax',
      minPax: 50,
      badge1: 'Prasmanan',
      badge2: 'Bisa Custom Lauk',
      minBadge: 'Min. 50 Pax',
      isStar: true,
      isAvailable: true,
      description: 'Nasi Liwet Wangi, Rendang Daging Sapi Pilihan, Ayam Goreng Lengkuas, Sambal Goreng Ati Kentang, Sup Kimlo, Puding Pandan.',
      image: 'assets/images/prasmanan.jpg',
      defaultLauk: ['Nasi Liwet', 'Rendang Daging Sapi', 'Ayam Goreng Lengkuas', 'Sambal Grg Ati', 'Sup Kimlo', 'Puding Pandan'],
      notes: 'Sambal dipisah, tanpa MSG, sediakan 2 meja buffet',
      complementary: 'FREE COMPLEMENTARY: Peralatan Pemanas & 3 Waiter'
    },
    {
      id: 'nasi-box-rendang',
      name: 'Nasi Box Premium Rendang Padang',
      category: 'Nasi Kotak / Bento',
      categoryTag: 'Nasi Kotak',
      price: 42000,
      unit: '/pax',
      minPax: 25,
      badge1: 'Nasi Kotak',
      badge2: 'Best Seller',
      minBadge: 'Min. 25 Pax',
      isStar: true,
      isAvailable: true,
      description: 'Rendang Daging Sapi Otentik, Telur Balado Pedas Manis, Tumis Buncis Jagung Pipil, Sambal Ijo, Kerupuk Udang, Sendok Kayu.',
      image: 'assets/images/nasi_box.jpg',
      defaultLauk: ['Nasi Putih Pandan Wangi', 'Rendang Daging Sapi', 'Telur Balado', 'Tumis Buncis Jagung', 'Sambal Ijo'],
      notes: 'Sendok dan tisu dibungkus rapi, label nama acara',
      complementary: 'FREE LABELING: Custom stiker logo acara pada box'
    },
    {
      id: 'tumpeng-megah',
      name: 'Tumpeng Megah Syukuran 30 Pax',
      category: 'Tumpeng',
      categoryTag: 'Tumpeng',
      price: 1350000,
      unit: '/set',
      minPax: 30,
      badge1: 'Tumpeng',
      badge2: 'Porsi Tetap (30 Pax)',
      minBadge: 'Paket Utuh',
      isStar: false,
      isAvailable: true,
      description: 'Tumpeng Kuning Gurih 30 Pax, Ayam Bakar Bumbu Madu, Sambal Goreng Kentang Kering Tempe, Perkedel, Urap Sayur, Telur Balado.',
      image: 'assets/images/tumpeng.jpg',
      defaultLauk: ['Tumpeng Kuning Gurih', 'Ayam Bakar Madu', 'Kering Tempe Teri', 'Perkedel Kentang', 'Urap Sayur Segar'],
      notes: 'Pisau pemotong hias tumpeng & ucapan akrilik',
      complementary: 'FREE TOPPER: Topper Akrilik Ucapan Syukuran'
    },
    {
      id: 'snack-box-tradisional',
      name: 'Snack Box Tradisional 4 Macam',
      category: 'Snack Box',
      categoryTag: 'Snack Box',
      price: 18500,
      unit: '/pax',
      minPax: 30,
      badge1: 'Snack Box',
      badge2: '4 Macam Kue',
      minBadge: 'Min. 30 Pax',
      isStar: false,
      isThumb: true,
      isAvailable: true,
      description: 'Lemper Ayam Bakar Daun, Risoles Smoked Beef Mayo, Kue Lapis Pandan Cokelat, Brownies Mini Fudgy, Air Mineral Cup.',
      image: 'assets/images/snack_box.jpg',
      defaultLauk: ['Lemper Ayam Bakar', 'Risoles Beef Mayo', 'Kue Lapis Pandan', 'Brownies Fudgy'],
      notes: 'Box motif batik eksklusif + alas doily paper',
      complementary: 'FREE AIR MINERAL: 1 Cup Air Mineral per box'
    },
    {
      id: 'wedding-elegance',
      name: 'Paket Wedding Elegance 500 Pax',
      category: 'Paket Prasmanan',
      categoryTag: 'Wedding Grand',
      price: 115000,
      unit: '/pax',
      minPax: 400,
      badge1: 'Wedding Grand',
      badge2: 'Free 4 Gubukan',
      minBadge: 'Min. 400 Pax',
      isStar: false,
      isAvailable: true,
      description: 'Buffet Utama 500 Pax lengkap + 4 Gubukan Favorit (Kambing Guling, Zuppa Soup, Siomay Bandung, Es Doger), Dekorasi Meja VIP.',
      image: 'assets/images/wedding.jpg',
      defaultLauk: ['Nasi Putih & Nasi Goreng', 'Dendeng Balado Basah', 'Ayam Suwir Rica', 'Sup Pengantin', 'Salad Buah', 'Gubukan 4 Pilihan'],
      notes: 'Termasuk meja VIP pengantin & keluarga inti 2 set',
      complementary: 'FREE DESSERT CORNER: Chocolate fountain & Mini Pastry'
    },
    {
      id: 'kambing-guling',
      name: 'Gubukan Kambing Guling Muda',
      category: 'Gubukan / Stall',
      categoryTag: 'Gubukan / Stall',
      price: 2950000,
      unit: '/stall',
      minPax: 70,
      badge1: 'Gubukan / Stall',
      badge2: 'Live Carving Chef',
      minBadge: '1 Ekor (~70 Porsi)',
      isStar: false,
      isFire: true,
      isAvailable: true,
      description: '1 Ekor Kambing Muda Utuh empuk tanpa bau prengus, saus kecap pedas manis bawang merah cabe rawit, acar segar, lontong daun.',
      image: 'assets/images/kambing_guling.jpg',
      defaultLauk: ['Kambing Guling Utuh', 'Saus Kecap Rawit Tomat', 'Lontong Daun', 'Acar Segar Timun Nanas'],
      notes: 'Stand panggangan tradisional & chef carving profesional standby',
      complementary: 'FREE CHEF ATTENDANT: 1 Chef & 1 Server khusus stall'
    }
  ];

  // Storage & State helpers
  let eventsData = (typeof AishStorage !== 'undefined') ? AishStorage.getEvents() : [];
  let kitchenOrders = (typeof AishStorage !== 'undefined') ? AishStorage.getKitchenOrders() : [];

  function refreshStorageState() {
    if (typeof AishStorage !== 'undefined') {
      eventsData = AishStorage.getEvents();
      kitchenOrders = AishStorage.getKitchenOrders();
      catalogData = AishStorage.getCatalog();
    }
  }

  // Active Transaction State (Default Bersih Saat Fresh Launch)
  const generateNewInvoice = () => {
    const today = new Date();
    const year = today.getFullYear();
    const rand = Math.floor(100 + Math.random() * 900);
    return `INV-${year}/V/${rand}`;
  };

  const getTodayDateStr = () => {
    return new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  };

  let state = {
    activeView: 'pos',
    currentCategory: 'Semua Menu',
    searchQuery: '',
    masterCatalogCategory: 'Semua Menu',
    masterCatalogSearch: '',
    customer: {
      name: 'Pelanggan Baru',
      phone: '-',
      date: getTodayDateStr(),
      time: '12:00 WIB',
      venue: 'Dapur / Takeaway / Pengiriman',
      eventType: 'Pesanan Baru'
    },
    invoiceNumber: generateNewInvoice(),
    cart: [], // Bersih saat fresh login, menu baru masuk saat kasir mengklik menu
    get cartItem() {
      return this.cart && this.cart.length > 0 ? this.cart[0] : null;
    },
    set cartItem(val) {
      if (!val) {
        this.cart = [];
      } else {
        this.cart = [val];
      }
    },
    deliveryType: 'pickup',
    deliveryFee: 0,
    pb1TaxRate: 0.10, // 10%
    discount: 0,
    selectedPaymentTerm: 'pelunasan', // 'dp30', 'dp50', 'pelunasan'
    tenderPaidInput: 0,
    selectedPaymentMethod: 'Transfer QRIS',
    editingCustomLaukIndex: 0
  };

  // Helper formatting currency
  const formatIDR = (num) => {
    return 'Rp ' + Number(num || 0).toLocaleString('id-ID');
  };

  // Calculate financials
  const getFinancials = () => {
    if (typeof AishCart !== 'undefined') {
      const calc = AishCart.calculateFinancials(state.cart, state.deliveryType, state.deliveryFee, state.selectedPaymentTerm);
      return {
        itemSubtotal: calc.itemSubtotal,
        totalPax: calc.totalPax,
        deliveryFee: calc.deliveryFee,
        taxPB1: calc.taxPB1,
        discount: state.discount,
        totalBill: calc.totalBill,
        amountDueNow: calc.amountDueNow,
        dp30Amount: Math.round(calc.totalBill * 0.30),
        dp50Amount: Math.round(calc.totalBill * 0.50),
        pelunasanAmount: calc.totalBill,
        itemCount: calc.itemCount
      };
    }

    const hasItems = state.cart && state.cart.length > 0;
    if (!hasItems) {
      return {
        itemSubtotal: 0,
        totalPax: 0,
        deliveryFee: 0,
        taxPB1: 0,
        discount: 0,
        totalBill: 0,
        amountDueNow: 0,
        dp30Amount: 0,
        dp50Amount: 0,
        pelunasanAmount: 0,
        itemCount: 0
      };
    }

    const itemSubtotal = state.cart.reduce((sum, it) => sum + ((Number(it.price) || 0) * (Number(it.pax) || 0)), 0);
    const totalPax = state.cart.reduce((sum, it) => sum + (Number(it.pax) || 0), 0);
    const deliveryFee = Number(state.deliveryFee) || 0;
    const taxPB1 = Math.round(itemSubtotal * state.pb1TaxRate);
    const totalBill = Math.max(0, itemSubtotal + deliveryFee + taxPB1 - state.discount);

    let termRate = 0.50;
    if (state.selectedPaymentTerm === 'dp30') termRate = 0.30;
    if (state.selectedPaymentTerm === 'dp50') termRate = 0.50;
    if (state.selectedPaymentTerm === 'pelunasan' || state.selectedPaymentTerm === 'full') termRate = 1.00;

    const amountDueNow = Math.round(totalBill * termRate);

    return {
      itemSubtotal,
      totalPax,
      deliveryFee,
      taxPB1,
      discount: state.discount,
      totalBill,
      amountDueNow,
      dp30Amount: Math.round(totalBill * 0.30),
      dp50Amount: Math.round(totalBill * 0.50),
      pelunasanAmount: totalBill,
      itemCount: state.cart.length
    };
  };

  // Render the Right Rail Cart
  const renderCart = () => {
    const fin = getFinancials();

    // Customer info card
    const custNameEl = document.getElementById('cartCustomerName');
    if (custNameEl) custNameEl.textContent = state.customer.name;
    const custPhoneEl = document.getElementById('cartCustomerPhone');
    if (custPhoneEl) custPhoneEl.textContent = state.customer.phone;
    const eventTimeEl = document.getElementById('cartEventTime');
    if (eventTimeEl) eventTimeEl.textContent = `${state.customer.date} • ${state.customer.time}`;
    const eventVenueEl = document.getElementById('cartEventVenue');
    if (eventVenueEl) eventVenueEl.textContent = state.customer.venue;

    const emptyCard = document.getElementById('cartEmptyCard');
    const itemsContainer = document.getElementById('cartItemsContainer');
    const compBanner = document.getElementById('cartCompBanner');

    const cartList = state.cart || [];
    if (cartList.length === 0) {
      if (emptyCard) emptyCard.style.display = 'block';
      if (itemsContainer) itemsContainer.innerHTML = '';
      if (compBanner) compBanner.style.display = 'none';

      const invoiceTag = document.getElementById('cartInvoiceTag');
      if (invoiceTag) invoiceTag.textContent = state.invoiceNumber;
      const delSelect = document.getElementById('deliveryOptionSelect');
      if (delSelect) delSelect.value = state.deliveryType || 'pickup';

      document.getElementById('billSubtotalLabel').textContent = 'Subtotal Menu (0 Item)';
      document.getElementById('billSubtotalVal').textContent = formatIDR(0);
      document.getElementById('billDeliveryVal').textContent = formatIDR(0);
      document.getElementById('billTaxVal').textContent = formatIDR(0);
      document.getElementById('billDiscountVal').textContent = `- ${formatIDR(0)}`;
      document.getElementById('billTotalDueVal').textContent = formatIDR(0);
      document.getElementById('dp30Amount').textContent = formatIDR(0);
      document.getElementById('dp50Amount').textContent = formatIDR(0);
      document.getElementById('pelunasanAmount').textContent = formatIDR(0);
      document.getElementById('chargeNowAmount').textContent = formatIDR(0);
      return;
    }

    if (emptyCard) emptyCard.style.display = 'none';

    // Render multi-item cards
    if (itemsContainer) {
      itemsContainer.innerHTML = cartList.map((item, idx) => {
        const itemSubtotal = (Number(item.price) || 0) * (Number(item.pax) || 0);
        const isSatuan = item.pax < (item.minPax || 25);
        const dishes = item.customLauk || item.defaultLauk || [];

        return `
          <div class="cart-item-card" data-cart-index="${idx}">
            <div class="cart-item-top">
              <div>
                <span class="cart-item-cat">${item.categoryTag || item.category || 'MENU'}</span>
                <h4 class="cart-item-name">${item.name}</h4>
                <span class="cart-item-unit-price">${formatIDR(item.price)} ${item.unit || '/pax'}</span>
              </div>
              <button class="btn-remove-item" title="Hapus menu dari keranjang" onclick="AishPOS.removeCartItem(${idx})">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                </svg>
              </button>
            </div>

            <div class="stepper-control-row">
              <div class="pax-stepper">
                <button type="button" class="stepper-btn" onclick="AishPOS.adjustPax(-1, ${idx})" title="Kurangi 1 Porsi">−</button>
                <div class="stepper-input-wrap">
                  <input type="number" class="stepper-input" min="1" step="1" value="${item.pax}" onchange="AishPOS.setPaxDirect(this.value, ${idx})" title="Ketik jumlah porsi langsung">
                  <span class="stepper-unit-label">Pax</span>
                </div>
                <button type="button" class="stepper-btn" onclick="AishPOS.adjustPax(1, ${idx})" title="Tambah 1 Porsi">+</button>
              </div>
              <div class="stepper-shortcuts">
                <button type="button" class="chip-stepper chip-satuan" onclick="AishPOS.setPaxDirect(1, ${idx})" title="Pesan Satuan (1 Porsi)">1</button>
                <button type="button" class="chip-stepper" onclick="AishPOS.addPaxShortcut(10, ${idx})" title="Tambah 10 porsi">+10</button>
                <button type="button" class="chip-stepper" onclick="AishPOS.addPaxShortcut(25, ${idx})" title="Tambah 25 porsi">+25</button>
                <button type="button" class="chip-stepper" onclick="AishPOS.addPaxShortcut(50, ${idx})" title="Tambah 50 porsi">+50</button>
              </div>
            </div>

            ${isSatuan ? `
              <div class="satuan-notice-badge" style="margin-bottom: 0.35rem;">
                <span>⚡</span>
                <span><strong>Eceran:</strong> ${item.pax} Porsi (Bebas tanpa minimal order).</span>
              </div>
            ` : ''}

            ${dishes.length > 0 ? `
              <div class="selected-dishes-box" style="margin-top: 0.25rem;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 3px;">
                  <span class="selected-dishes-label" style="font-size: 10.5px;">Lauk & Sajian:</span>
                  <button type="button" class="btn-edit-link" style="font-size: 10.5px; padding: 0 4px;" onclick="AishPOS.openCustomLaukModal(${idx})">
                    ✏️ Kustom Lauk
                  </button>
                </div>
                <div class="dishes-chips-list">
                  ${dishes.map(d => `<span class="dish-chip">${d}</span>`).join('')}
                </div>
              </div>
            ` : ''}

            ${item.notes ? `
              <div class="cart-item-notes" style="margin-top: 0.35rem;">
                <span>🌾</span>
                <span>${item.notes}</span>
              </div>
            ` : ''}

            <div class="cart-item-subtotal-row" style="margin-top: 0.35rem; padding-top: 0.35rem; border-top: 1px dashed var(--border-light);">
              <span style="color: #64748b; font-size: 11px;">Subtotal:</span>
              <span class="cart-item-subtotal-val font-mono" style="font-weight: 700; color: #166534; font-size: 13px;">${formatIDR(itemSubtotal)}</span>
            </div>
          </div>
        `;
      }).join('');
    }

    // Complementary banner
    if (compBanner) {
      const compItems = cartList.filter(it => it.complementary).map(it => it.complementary);
      if (compItems.length > 0) {
        compBanner.style.display = 'flex';
        document.getElementById('cartCompText').textContent = compItems[0];
      } else {
        compBanner.style.display = 'none';
      }
    }

    // Subtotal Menu (N Pax • M Menu)
    document.getElementById('billSubtotalLabel').textContent = `Subtotal Menu (${fin.totalPax} Pax • ${cartList.length} Menu)`;
    document.getElementById('billSubtotalVal').textContent = formatIDR(fin.itemSubtotal);
    document.getElementById('billDeliveryVal').textContent = formatIDR(fin.deliveryFee);
    document.getElementById('billTaxVal').textContent = formatIDR(fin.taxPB1);
    document.getElementById('billDiscountVal').textContent = `- ${formatIDR(fin.discount)}`;
    document.getElementById('billTotalDueVal').textContent = formatIDR(fin.totalBill);

    // Delivery select sync
    const delSelect = document.getElementById('deliveryOptionSelect');
    if (delSelect && delSelect.value !== state.deliveryType) {
      delSelect.value = state.deliveryType;
    }

    // DP term tabs
    document.getElementById('dp30Amount').textContent = formatIDR(fin.dp30Amount);
    document.getElementById('dp50Amount').textContent = formatIDR(fin.dp50Amount);
    document.getElementById('pelunasanAmount').textContent = formatIDR(fin.pelunasanAmount);

    // Highlight active DP option
    document.querySelectorAll('.dp-option-btn').forEach(btn => {
      const term = btn.dataset.term;
      if (term === state.selectedPaymentTerm) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // Nominal Ditagih Kasir Saat Ini
    document.getElementById('chargeNowAmount').textContent = formatIDR(fin.amountDueNow);
  };

  // Render Catalog Grid in Center Canvas
  const renderCatalog = () => {
    const grid = document.getElementById('catalogMenuGrid');
    if (!grid) return;

    const filtered = catalogData.filter(item => {
      const matchCat = (state.currentCategory === 'Semua Menu') || (item.category === state.currentCategory);
      const matchSearch = item.name.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
                          item.description.toLowerCase().includes(state.searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });

    grid.innerHTML = filtered.map(item => {
      const inCart = (state.cart || []).find(c => c.id === item.id);
      const isCurrentInCart = !!inCart;
      const isOutOfStock = item.isAvailable === false;
      return `
        <div class="menu-card ${isOutOfStock ? 'out-of-stock' : ''}" data-id="${item.id}">
          <div class="menu-card-image-wrap">
            <img src="${item.image}" alt="${item.name}" loading="lazy" />
            <div class="menu-badge-overlay-left">
              <span class="badge-tag badge-gold">${item.badge1}</span>
              ${item.badge2 ? `<span class="badge-tag badge-dark">${item.badge2}</span>` : ''}
            </div>
            <div class="menu-badge-overlay-right">
              ${isOutOfStock ? '<span class="badge-min-pax" style="background:#fecaca; color:#991b1b;">Stok Habis</span>' : `<span class="badge-min-pax">${item.minBadge}</span>`}
            </div>
          </div>
          <div class="menu-card-body">
            <div>
              <div class="menu-title-row">
                <h3 class="menu-title">${item.name}</h3>
                ${item.isStar ? '<span class="menu-star-icon">★</span>' : ''}
                ${item.isThumb ? '<span class="menu-star-icon">👍</span>' : ''}
                ${item.isFire ? '<span class="menu-star-icon">🔥</span>' : ''}
              </div>
              <p class="menu-desc">${item.description}</p>
            </div>
            <div class="menu-footer-row">
              <div class="menu-price-block">
                <span class="price-label">Harga per ${item.category === 'Tumpeng' ? 'Tampah' : (item.category === 'Gubukan / Stall' ? 'Ekor' : 'Porsi')}</span>
                <div>
                  <span class="price-value">${formatIDR(item.price)}</span>
                  <span class="price-unit">${item.unit}</span>
                </div>
              </div>
              <button class="btn-select-menu ${isOutOfStock ? 'disabled-stock' : (isCurrentInCart ? 'added' : '')}" ${isOutOfStock ? 'disabled' : ''} onclick="AishPOS.selectCatalogItem('${item.id}')">
                ${isOutOfStock ? '🚫 Stok Habis' : (isCurrentInCart ? `✓ ${inCart.pax} ${item.unit ? item.unit.replace('/', '') : 'pax'}` : '+ Pilih')}
              </button>
            </div>
          </div>
        </div>
      `;
    }).join('');
  };

  // Render Schedule & Events Table
  const renderEventsTable = () => {
    const tbody = document.getElementById('eventsTableBody');
    if (!tbody) return;

    tbody.innerHTML = eventsData.map(ev => {
      return `
        <tr>
          <td><strong class="font-mono">${ev.inv}</strong></td>
          <td>
            <strong>${ev.customer}</strong>
            <div class="font-mono" style="font-size: 11px; color: #64748b;">${ev.phone}</div>
          </td>
          <td>
            <div>${ev.date}</div>
            <div style="font-size: 11px; color: #64748b;">${ev.time}</div>
          </td>
          <td style="max-width: 200px;">
            <div style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${ev.venue}</div>
          </td>
          <td>${ev.package}</td>
          <td class="font-mono"><strong>${ev.pax} Pax</strong></td>
          <td class="font-mono"><strong>${formatIDR(ev.total)}</strong></td>
          <td>
            <span class="status-pill ${ev.status}">
              <span class="status-dot"></span>
              ${ev.statusText}
            </span>
          </td>
          <td>
            <button class="btn-action-outline" style="height: 28px; padding: 0 8px;" onclick="AishPOS.loadEventToCart('${ev.inv}')">
              Kelola
            </button>
          </td>
        </tr>
      `;
    }).join('');
  };

  // Render Invoices & DP Tracker
  const renderInvoicesTable = () => {
    const tbody = document.getElementById('invoicesTableBody');
    if (!tbody) return;

    tbody.innerHTML = eventsData.map(ev => {
      const remaining = ev.total - ev.paid;
      return `
        <tr>
          <td><strong class="font-mono">${ev.inv}</strong></td>
          <td><strong>${ev.customer}</strong></td>
          <td>${ev.package} (${ev.pax} Pax)</td>
          <td class="font-mono">${formatIDR(ev.total)}</td>
          <td class="font-mono" style="color: #166534; font-weight: 700;">${formatIDR(ev.paid)}</td>
          <td class="font-mono" style="color: ${remaining > 0 ? '#b91c1c' : '#64748b'}; font-weight: 700;">
            ${remaining > 0 ? formatIDR(remaining) : 'Lunas (Rp 0)'}
          </td>
          <td>
            <span class="status-pill ${ev.status}">
              <span class="status-dot"></span>
              ${ev.statusText}
            </span>
          </td>
          <td>
            <button class="btn-action-outline" style="height: 28px; padding: 0 8px;" onclick="AishPOS.openInvoiceSlip('${ev.inv}')">
              Lihat Nota
            </button>
          </td>
        </tr>
      `;
    }).join('');
  };

  // Render Kitchen Display System (KDS)
  const renderKitchenDisplay = () => {
    const antreanCol = document.getElementById('kdsColAntrean');
    const masakCol = document.getElementById('kdsColMasak');
    const kirimCol = document.getElementById('kdsColKirim');

    if (!antreanCol || !masakCol || !kirimCol) return;

    const renderCard = (ord) => `
      <div class="kds-order-card">
        <div class="kds-card-top">
          <span class="font-mono" style="font-weight: 700; color: var(--primary);">${ord.id} • ${ord.inv}</span>
          <span class="badge-min-pax" style="background-color: ${ord.urgency === 'ready' ? '#166534' : (ord.urgency === 'high' ? '#b45309' : '#334155')}">
            ${ord.badge}
          </span>
        </div>
        <strong style="font-size: 13px; color: #0f172a;">${ord.client}</strong>
        <div style="font-size: 11px; color: #64748b; margin-bottom: 0.35rem;">⏰ ${ord.time}</div>
        <div style="font-size: 12px; font-weight: 600; color: #166534; border-top: 1px dashed var(--border-light); padding-top: 4px;">
          ${ord.menu}
        </div>
        <ul class="kds-card-items-list">
          ${ord.subItems.map(it => `<li>${it}</li>`).join('')}
        </ul>
        <div style="display: flex; gap: 0.4rem; margin-top: 0.5rem;">
          <button class="btn-action-outline" style="flex: 1; height: 30px; font-size: 11px;" onclick="AishPOS.advanceKds('${ord.id}')">
            Update Progres ➔
          </button>
        </div>
      </div>
    `;

    antreanCol.innerHTML = kitchenOrders.filter(o => o.stage === 'antrean').map(renderCard).join('') || '<div style="color: #94a3b8; font-size: 12px; padding: 1rem; text-align: center;">Tidak ada antrean</div>';
    masakCol.innerHTML = kitchenOrders.filter(o => o.stage === 'masak').map(renderCard).join('') || '<div style="color: #94a3b8; font-size: 12px; padding: 1rem; text-align: center;">Tidak ada proses memasak</div>';
    kirimCol.innerHTML = kitchenOrders.filter(o => o.stage === 'kirim').map(renderCard).join('') || '<div style="color: #94a3b8; font-size: 12px; padding: 1rem; text-align: center;">Tidak ada jadwal kirim langsung</div>';
  };

  // Modern Floating Toast Notification Engine Integration
  const showToast = (message, type = 'success') => {
    if (typeof AishToast !== 'undefined') {
      return AishToast.show(message, type);
    }
    const toast = document.getElementById('toastContainer') || document.getElementById('posToast');
    if (toast) {
      toast.textContent = typeof message === 'string' ? message : (message.message || '');
      toast.className = `toast-notification ${type} show`;
      setTimeout(() => {
        toast.classList.remove('show');
      }, 3000);
    }
  };

  // =========================================================
  // Master Catalog Table Renderer (Admin Panel)
  // =========================================================
  const renderMasterCatalog = () => {
    const tbody = document.getElementById('masterCatalogTableBody');
    if (!tbody) return;

    const user = (typeof AishAuth !== 'undefined') ? AishAuth.getCurrentUser() : null;
    const isAdmin = user && user.role === 'admin';

    // Hide/show add button based on role
    const btnAdd = document.getElementById('btnAddNewMenu');
    if (btnAdd) btnAdd.style.display = isAdmin ? 'flex' : 'none';

    // Filter by category and search
    const filtered = catalogData.filter(item => {
      const matchCat = (state.masterCatalogCategory === 'Semua Menu') || (item.category === state.masterCatalogCategory);
      const q = state.masterCatalogSearch.toLowerCase();
      const matchSearch = !q || item.name.toLowerCase().includes(q) ||
                          (item.description || '').toLowerCase().includes(q) ||
                          (item.defaultLauk || []).join(' ').toLowerCase().includes(q);
      return matchCat && matchSearch;
    });

    if (filtered.length === 0) {
      tbody.innerHTML = `<tr><td colspan="7" style="text-align:center; color:#94a3b8; padding:2rem;">Tidak ada menu ditemukan.</td></tr>`;
      return;
    }

    tbody.innerHTML = filtered.map(item => {
      const statusClass = item.isAvailable !== false ? 'tersedia' : 'habis';
      const statusText = item.isAvailable !== false ? 'Tersedia' : 'Stok Habis';
      const laukList = (item.defaultLauk || []).join(', ') || '-';
      const complementary = item.complementary ? `<div style="font-size:10.5px; color:#6366f1; margin-top:2px;">${item.complementary}</div>` : '';

      const actionsHtml = isAdmin
        ? `<div style="display:flex; gap:4px; flex-wrap:wrap;">
            <button class="btn-action-outline" style="height:26px; padding:0 6px; font-size:11px;" onclick="AishPOS.openEditMenuModal('${item.id}')">✏️ Edit</button>
            <button class="btn-action-outline" style="height:26px; padding:0 6px; font-size:11px;" onclick="AishPOS.toggleMenuAvailability('${item.id}')">${item.isAvailable !== false ? '🔴 Nonaktif' : '🟢 Aktifkan'}</button>
            <button class="btn-action-outline" style="height:26px; padding:0 6px; font-size:11px; color:#b91c1c;" onclick="AishPOS.deleteCatalogMenu('${item.id}')">🗑️ Hapus</button>
          </div>`
        : `<span style="font-size:11px; color:#94a3b8;">Hanya Admin</span>`;

      return `
        <tr>
          <td>
            <strong style="font-size:13px;">${item.name}</strong>
            ${item.categoryTag ? `<div style="font-size:10.5px; color:#64748b;">${item.categoryTag}</div>` : ''}
          </td>
          <td>${item.category}</td>
          <td class="font-mono" style="font-weight:600;">${formatIDR(item.price)} <span style="font-size:11px; color:#64748b;">${item.unit || ''}</span></td>
          <td class="font-mono">${item.minPax || '-'} Pax</td>
          <td style="max-width:220px; font-size:12px;">
            ${laukList}
            ${complementary}
          </td>
          <td>
            <span class="status-pill ${statusClass}">
              <span class="status-dot"></span>
              ${statusText}
            </span>
          </td>
          <td>${actionsHtml}</td>
        </tr>
      `;
    }).join('');
  };

  // Public Actions
  return {
    init: () => {
      renderCatalog();
      renderCart();
      renderEventsTable();
      renderInvoicesTable();
      renderKitchenDisplay();

      // Inisialisasi Storage Engine & Sesi
      if (typeof AishStorage !== 'undefined') {
        AishStorage.init();
        refreshStorageState();
      }

      if (typeof AishAuth !== 'undefined') {
        AishAuth.init();
        AishPOS.syncAuthUI();
      }

      // Tutup menu dropdown akun jika klik di luar
      document.addEventListener('click', (e) => {
        const wrapper = document.querySelector('.user-profile-wrapper');
        if (wrapper && !wrapper.contains(e.target)) {
          wrapper.classList.remove('active');
        }
      });

      // Category tab click listeners
      document.querySelectorAll('.category-tab').forEach(tab => {
        tab.addEventListener('click', (e) => {
          document.querySelectorAll('.category-tab').forEach(t => t.classList.remove('active'));
          e.currentTarget.classList.add('active');
          state.currentCategory = e.currentTarget.dataset.category;
          renderCatalog();
        });
      });

      // Quick search in catalog
      const searchInput = document.getElementById('catalogSearchInput');
      if (searchInput) {
        searchInput.addEventListener('input', (e) => {
          state.searchQuery = e.target.value;
          renderCatalog();
        });
      }

      // Global invoice search bar
      const globalSearch = document.getElementById('globalSearchInvoice');
      if (globalSearch) {
        globalSearch.addEventListener('keydown', (e) => {
          if (e.key === 'Enter') {
            const query = e.target.value.trim().toUpperCase();
            const found = eventsData.find(ev => ev.inv.includes(query) || ev.customer.toUpperCase().includes(query));
            if (found) {
              AishPOS.loadEventToCart(found.inv);
              showToast(`Invoice ${found.inv} dimuat ke sistem kasir`, 'info');
            } else {
              showToast(`Invoice / Acara "${query}" tidak ditemukan`, 'info');
            }
          }
        });
      }
    },

    // Navigation View Switcher
    switchView: (viewName) => {
      state.activeView = viewName;
      document.querySelectorAll('.nav-item').forEach(el => {
        if (el.dataset.view === viewName) {
          el.classList.add('active');
        } else {
          el.classList.remove('active');
        }
      });

      document.querySelectorAll('.view-panel').forEach(panel => {
        if (panel.id === `view-${viewName}`) {
          panel.classList.add('active');
        } else {
          panel.classList.remove('active');
        }
      });

      if (viewName === 'schedule') renderEventsTable();
      if (viewName === 'invoices') renderInvoicesTable();
      if (viewName === 'kitchen') renderKitchenDisplay();
      if (viewName === 'catalog') renderMasterCatalog();
      if (viewName === 'staff') {
        const user = (typeof AishAuth !== 'undefined') ? AishAuth.getCurrentUser() : null;
        if (!user || user.role !== 'admin') {
          showToast('Menu Kelola Staf hanya dapat diakses oleh Administrator!', 'warning');
          AishPOS.switchView('pos');
          return;
        }
        AishPOS.renderStaffView();
        AishPOS.updateBackupStats();
      }
    },

    // Select Item from Catalog into Cart
    selectCatalogItem: (itemId) => {
      const item = catalogData.find(i => i.id === itemId);
      if (!item) return;

      // Out-of-stock guard
      if (item.isAvailable === false) {
        showToast(`Menu "${item.name}" sedang tidak tersedia (Stok Habis). Hubungi admin untuk mengaktifkan kembali.`, 'warning');
        return;
      }

      const addPax = item.minPax && item.minPax > 1 ? item.minPax : 25;
      if (typeof AishCart !== 'undefined') {
        const existing = (state.cart || []).find(c => c.id === item.id);
        state.cart = AishCart.addItem(state.cart, item, addPax);
        if (existing) {
          showToast(`Porsi "${item.name}" bertambah +${addPax} ${item.unit ? item.unit.replace('/', '') : 'pax'}!`);
        } else {
          showToast(`Menu "${item.name}" dimasukkan ke keranjang!`);
        }
      } else {
        const existing = (state.cart || []).find(c => c.id === item.id);
        if (existing) {
          existing.pax += addPax;
        } else {
          state.cart.push({
            ...item,
            pax: addPax,
            defaultLauk: [...(item.defaultLauk || [])],
            customLauk: [...(item.defaultLauk || [])]
          });
        }
      }

      renderCatalog();
      renderCart();
    },

    // Stepper control (Supports Satuan / Any Porsi per item)
    adjustPax: (delta, itemIndex = 0) => {
      if (!state.cart || !state.cart[itemIndex]) return;
      const current = Number(state.cart[itemIndex].pax) || 1;
      const newPax = current + delta;
      if (newPax <= 0) {
        AishPOS.removeCartItem(itemIndex);
        return;
      }
      state.cart[itemIndex].pax = newPax;
      renderCart();
    },

    // Direct input number of pax
    setPaxDirect: (val, itemIndex = 0) => {
      if (!state.cart || !state.cart[itemIndex]) return;
      const parsed = parseInt(val, 10);
      state.cart[itemIndex].pax = (isNaN(parsed) || parsed <= 0) ? 1 : parsed;
      renderCart();
    },

    // Quick chips (+5, +10, +25, +50, etc.)
    addPaxShortcut: (amount, itemIndex = 0) => {
      if (!state.cart || !state.cart[itemIndex]) return;
      state.cart[itemIndex].pax = (Number(state.cart[itemIndex].pax) || 0) + amount;
      renderCart();
      showToast(`Porsi "${state.cart[itemIndex].name}" bertambah +${amount} Pax (${state.cart[itemIndex].pax} Pax)`);
    },

    // Hapus Item / Kosongkan Keranjang
    removeCartItem: (itemIndex = 0) => {
      if (!state.cart || !state.cart[itemIndex]) return;
      const itemName = state.cart[itemIndex].name;
      state.cart.splice(itemIndex, 1);
      renderCatalog();
      renderCart();
      showToast(`"${itemName}" berhasil dihapus dari keranjang.`, 'info');
    },

    // Set Tipe Pengiriman (Buffet, Kurir, Ambil Sendiri)
    setDeliveryType: (type) => {
      state.deliveryType = type;
      if (type === 'buffet') state.deliveryFee = 350000;
      else if (type === 'kurir') state.deliveryFee = 20000;
      else if (type === 'pickup') state.deliveryFee = 0;
      renderCart();
    },

    // Set Payment Term (DP 30%, DP 50%, Pelunasan)
    setPaymentTerm: (term) => {
      state.selectedPaymentTerm = term;
      renderCart();
    },

    // Modals Handlers
    openCustomerModal: () => {
      document.getElementById('editCustName').value = state.customer.name;
      document.getElementById('editCustPhone').value = state.customer.phone;
      document.getElementById('editCustDate').value = state.customer.date;
      document.getElementById('editCustTime').value = state.customer.time;
      document.getElementById('editCustVenue').value = state.customer.venue;
      document.getElementById('editCustEventType').value = state.customer.eventType;
      document.getElementById('modalEditCustomer').classList.add('active');
    },

    saveCustomerData: (e) => {
      e.preventDefault();
      state.customer.name = document.getElementById('editCustName').value;
      state.customer.phone = document.getElementById('editCustPhone').value;
      state.customer.date = document.getElementById('editCustDate').value;
      state.customer.time = document.getElementById('editCustTime').value;
      state.customer.venue = document.getElementById('editCustVenue').value;
      state.customer.eventType = document.getElementById('editCustEventType').value;

      document.getElementById('modalEditCustomer').classList.remove('active');
      renderCart();
      showToast('Data pemesan & lokasi acara diperbarui!');
    },

    // Custom Lauk / Extra Items Modal
    openCustomLaukModal: (itemIndex = 0) => {
      if (!state.cart || state.cart.length === 0 || !state.cart[itemIndex]) {
        showToast('Pilih menu di katalog terlebih dahulu!', 'warning');
        return;
      }

      state.editingCustomLaukIndex = itemIndex;
      const currentItem = state.cart[itemIndex];

      const listContainer = document.getElementById('customDishesChecklist');
      const allAvailableOptions = [
        'Nasi Liwet Wangi Daun Jeruk',
        'Nasi Putih Pandan Wangi',
        'Nasi Kebuli Rempah',
        'Rendang Daging Sapi Balado',
        'Empal Gentong Daging',
        'Ayam Goreng Lengkuas',
        'Ayam Bakar Madu Pedas Manis',
        'Sambal Goreng Ati Kentang Kapri',
        'Dendeng Batokok Sambal Ijo',
        'Sup Kimlo Jamur Kuping',
        'Sup Rolade Ayam Sayur',
        'Puding Pandan Srikaya',
        'Asinan Buah Bogor'
      ];

      const currentLauk = currentItem.customLauk || currentItem.defaultLauk || [];

      listContainer.innerHTML = allAvailableOptions.map(dish => {
        const isChecked = currentLauk.some(l => dish.toLowerCase().includes(l.toLowerCase()));
        return `
          <label style="display: flex; align-items: center; gap: 0.5rem; font-size: 12.5px; padding: 0.4rem; background: #f8fafc; border-radius: 4px; border: 1px solid var(--border-light);">
            <input type="checkbox" value="${dish}" ${isChecked ? 'checked' : ''} style="width: 16px; height: 16px; accent-color: var(--primary);">
            <span>${dish}</span>
          </label>
        `;
      }).join('');

      document.getElementById('customNotesInput').value = currentItem.notes || '';
      document.getElementById('modalCustomLauk').classList.add('active');
    },

    saveCustomLauk: () => {
      const idx = state.editingCustomLaukIndex || 0;
      if (!state.cart || !state.cart[idx]) return;

      const checked = [];
      document.querySelectorAll('#customDishesChecklist input[type="checkbox"]:checked').forEach(cb => {
        checked.push(cb.value);
      });

      if (checked.length > 0) {
        state.cart[idx].customLauk = checked;
      }
      state.cart[idx].notes = document.getElementById('customNotesInput').value;

      document.getElementById('modalCustomLauk').classList.remove('active');
      renderCart();
      showToast(`Kustomisasi lauk untuk "${state.cart[idx].name}" berhasil disimpan!`);
    },

    // Food Tasting Scheduler Modal
    openFoodTastingModal: () => {
      document.getElementById('tastingClientName').value = state.customer.name;
      document.getElementById('modalFoodTasting').classList.add('active');
    },

    saveFoodTasting: (e) => {
      e.preventDefault();
      document.getElementById('modalFoodTasting').classList.remove('active');
      showToast('Sesi Food Tasting berhasil dijadwalkan bersama Tim Chef!');
    },

    // Checkout / Payment Modal
    openPaymentModal: () => {
      if (!state.cart || state.cart.length === 0) {
        showToast('Keranjang masih kosong, silakan pilih menu terlebih dahulu!', 'warning');
        return;
      }

      const fin = getFinancials();
      state.tenderPaidInput = fin.amountDueNow;

      const summaryText = typeof AishCart !== 'undefined'
        ? AishCart.formatSummaryText(state.cart)
        : state.cart.map(i => `${i.name} (${i.pax} pax)`).join(' + ');

      document.getElementById('payInvoiceCode').textContent = state.invoiceNumber;
      document.getElementById('payCustomerSummary').textContent = `${state.customer.name} • ${fin.totalPax} Pax • ${summaryText}`;
      document.getElementById('payTotalDue').textContent = formatIDR(fin.totalBill);
      document.getElementById('payChargeNow').textContent = formatIDR(fin.amountDueNow);
      document.getElementById('tenderAmountDisplay').textContent = formatIDR(state.tenderPaidInput);

      document.getElementById('modalPayment').classList.add('active');
    },

    // Payment Numpad Input
    numpadInput: (char) => {
      let str = String(state.tenderPaidInput);
      if (char === 'C') {
        state.tenderPaidInput = 0;
      } else if (char === 'DEL') {
        str = str.slice(0, -1);
        state.tenderPaidInput = str.length > 0 ? Number(str) : 0;
      } else if (char === '000') {
        state.tenderPaidInput = Number(str + '000');
      } else {
        if (state.tenderPaidInput === 0) {
          state.tenderPaidInput = Number(char);
        } else {
          state.tenderPaidInput = Number(str + char);
        }
      }
      document.getElementById('tenderAmountDisplay').textContent = formatIDR(state.tenderPaidInput);
    },

    quickCash: (amount) => {
      if (amount === 'pas') {
        const fin = getFinancials();
        state.tenderPaidInput = fin.amountDueNow;
      } else {
        state.tenderPaidInput = (state.tenderPaidInput || 0) + amount;
      }
      document.getElementById('tenderAmountDisplay').textContent = formatIDR(state.tenderPaidInput);
    },

    selectPaymentMethod: (methodName, el) => {
      state.selectedPaymentMethod = methodName;
      document.querySelectorAll('.payment-method-card').forEach(c => c.classList.remove('active'));
      el.classList.add('active');
    },

    confirmPayment: () => {
      const fin = getFinancials();
      document.getElementById('modalPayment').classList.remove('active');

      const packageSummary = typeof AishCart !== 'undefined'
        ? AishCart.formatSummaryText(state.cart)
        : state.cart.map(i => `${i.name} (${i.pax} pax)`).join(' + ');

      // Add to events history or update
      const existing = eventsData.find(e => e.inv === state.invoiceNumber);
      let targetEvent;

      if (existing) {
        existing.paid = (existing.paid || 0) + state.tenderPaidInput;
        if (existing.paid >= existing.total) {
          existing.status = 'lunas';
          existing.statusText = 'Lunas';
        }
        existing.items = JSON.parse(JSON.stringify(state.cart || []));
        targetEvent = existing;
      } else {
        targetEvent = {
          inv: state.invoiceNumber,
          customer: state.customer.name,
          phone: state.customer.phone,
          date: state.customer.date,
          time: state.customer.time,
          venue: state.customer.venue,
          package: packageSummary,
          pax: fin.totalPax,
          total: fin.totalBill,
          paid: state.tenderPaidInput,
          status: state.tenderPaidInput >= fin.totalBill ? 'lunas' : 'dp',
          statusText: state.tenderPaidInput >= fin.totalBill ? 'Lunas' : 'DP Masuk',
          items: JSON.parse(JSON.stringify(state.cart || [])),
          deliveryType: state.deliveryType,
          financials: { ...fin }
        };
      }

      // Simpan permanen transaksi & otomatisasi tiket dapur KDS
      if (typeof AishStorage !== 'undefined') {
        AishStorage.saveEvent(targetEvent);
        if (!existing) {
          AishStorage.createKitchenTicketFromOrder(targetEvent, state.cart);
        }
        refreshStorageState();
      }

      renderEventsTable();
      renderInvoicesTable();
      renderKitchenDisplay();
      showToast(`Transaksi ${state.invoiceNumber} Berhasil Disimpan & Dicatat!`);

      // Automatically open receipt preview
      AishPOS.openInvoiceSlip(state.invoiceNumber);
    },

    // Invoice & Receipt Slip Preview (Supports multi-item and historical view)
    openInvoiceSlip: (invCode = state.invoiceNumber) => {
      const currentInv = invCode || state.invoiceNumber;
      const historyEvent = eventsData.find(e => e.inv === currentInv);

      let orderCustomer = state.customer;
      let orderItems = state.cart || [];
      let fin = getFinancials();

      if (historyEvent) {
        orderCustomer = {
          name: historyEvent.customer,
          phone: historyEvent.phone,
          date: historyEvent.date,
          time: historyEvent.time,
          venue: historyEvent.venue
        };

        if (Array.isArray(historyEvent.items) && historyEvent.items.length > 0) {
          orderItems = historyEvent.items;
        } else {
          orderItems = [{
            name: historyEvent.package,
            pax: historyEvent.pax,
            price: Math.round(historyEvent.total / (historyEvent.pax || 1)),
            unit: '/pax',
            defaultLauk: ['Menu Catering Standar'],
            notes: ''
          }];
        }

        if (historyEvent.financials) {
          fin = {
            ...historyEvent.financials,
            amountDueNow: historyEvent.paid
          };
        } else {
          fin = {
            itemSubtotal: historyEvent.total,
            deliveryFee: 0,
            taxPB1: 0,
            totalBill: historyEvent.total,
            amountDueNow: historyEvent.paid
          };
        }
      }

      if (!orderItems || orderItems.length === 0) {
        showToast('Tidak ada item dalam pesanan ini untuk dicetak!', 'warning');
        return;
      }

      document.getElementById('printInvNumber').textContent = currentInv;
      document.getElementById('printInvDate').textContent = new Date().toLocaleDateString('id-ID', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
      });
      document.getElementById('printCustName').textContent = orderCustomer.name;
      document.getElementById('printCustPhone').textContent = orderCustomer.phone;
      document.getElementById('printCustEvent').textContent = `${orderCustomer.date} • ${orderCustomer.time}`;
      document.getElementById('printCustVenue').textContent = orderCustomer.venue;

      // Render multi-row item table
      document.getElementById('printItemRow').innerHTML = orderItems.map(item => {
        const itemTotal = (Number(item.price) || 0) * (Number(item.pax) || 0);
        const dishes = item.customLauk || item.defaultLauk || [];
        return `
          <tr>
            <td>
              <strong>${item.name}</strong>
              ${dishes.length > 0 ? `<div style="font-size: 10.5px; color: #64748b;">${dishes.join(', ')}</div>` : ''}
              ${item.notes ? `<div style="font-size: 10px; color: #94a3b8; font-style: italic;">${item.notes}</div>` : ''}
            </td>
            <td class="font-mono" style="text-align: center;">${item.pax} ${item.unit ? item.unit.replace('/', '') : 'pax'}</td>
            <td class="font-mono" style="text-align: right;">${formatIDR(item.price)}</td>
            <td class="font-mono" style="text-align: right; font-weight: 700;">${formatIDR(itemTotal)}</td>
          </tr>
        `;
      }).join('');

      document.getElementById('printSubtotalVal').textContent = formatIDR(fin.itemSubtotal);
      document.getElementById('printDeliveryVal').textContent = formatIDR(fin.deliveryFee);
      document.getElementById('printTaxVal').textContent = formatIDR(fin.taxPB1);
      document.getElementById('printTotalVal').textContent = formatIDR(fin.totalBill);
      document.getElementById('printPaidVal').textContent = formatIDR(fin.amountDueNow);
      document.getElementById('printRemainingVal').textContent = formatIDR(Math.max(0, fin.totalBill - fin.amountDueNow));

      // Dynamic Operator Kasir Attribution
      const currentUser = (typeof AishAuth !== 'undefined') ? AishAuth.getCurrentUser() : null;
      const staffLabel = currentUser ? `${currentUser.name} (${currentUser.role.toUpperCase()})` : 'Kasir Operasional';
      const attrEl = document.getElementById('printStaffAttribution');
      if (attrEl) attrEl.textContent = staffLabel;
      const timeEl = document.getElementById('printTimestamp');
      if (timeEl) timeEl.textContent = new Date().toLocaleTimeString('id-ID') + ' WIB';

      document.getElementById('modalInvoice').classList.add('active');
    },

    // Kitchen Slip Printer (Multi-Item)
    printKitchenSlip: () => {
      const items = state.cart || [];
      if (items.length === 0) {
        showToast('Keranjang masih kosong, tidak ada pesanan untuk dicetak!', 'warning');
        return;
      }
      const slipWindow = window.open('', '_blank', 'width=420,height=600');
      const currentUser = (typeof AishAuth !== 'undefined') ? AishAuth.getCurrentUser() : null;
      const staffLabel = currentUser ? `${currentUser.name} (${currentUser.role.toUpperCase()})` : 'Kasir Operasional';

      const itemsHtml = items.map((item, idx) => `
        <div style="margin-bottom: 10px; border-bottom: 1px dotted #888; padding-bottom: 6px;">
          <div class="bold" style="font-size: 13px;">
            ${idx + 1}. [ ${item.pax} ${item.unit ? item.unit.replace('/', '').toUpperCase() : 'PAX'} ] ${item.name}
          </div>
          ${item.customLauk || item.defaultLauk ? `
            <div style="font-size: 11px; margin-top: 3px;">
              <strong>Lauk:</strong> ${(item.customLauk || item.defaultLauk).join(', ')}
            </div>
          ` : ''}
          ${item.notes ? `<div style="font-size: 10.5px; font-style: italic;">Catatan: ${item.notes}</div>` : ''}
        </div>
      `).join('');

      const html = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>SLIP ORDER DAPUR - ${state.invoiceNumber}</title>
          <style>
            body { font-family: 'JetBrains Mono', monospace; font-size: 12px; padding: 15px; color: #000; }
            h2, h3 { margin: 2px 0; text-align: center; }
            hr { border: none; border-top: 1px dashed #000; margin: 8px 0; }
            .row { display: flex; justify-content: space-between; margin-bottom: 2px; }
            .bold { font-weight: bold; }
          </style>
        </head>
        <body>
          <h2>*** TIKET DAPUR CATERING ***</h2>
          <h3>AISH CATERING - SINGKAWANG</h3>
          <hr/>
          <div class="row"><span>NO PESANAN:</span><span class="bold">${state.invoiceNumber}</span></div>
          <div class="row"><span>WAKTU ACARA:</span><span>${state.customer.date} • ${state.customer.time}</span></div>
          <div class="row"><span>PELANGGAN:</span><span class="bold">${state.customer.name}</span></div>
          <div class="row"><span>LOKASI:</span><span>${state.customer.venue}</span></div>
          <hr/>
          <div class="bold" style="margin-bottom: 6px;">DAFTAR MENU PRODUKSI:</div>
          ${itemsHtml}
          <hr/>
          <div class="bold">COMPLEMENTARY / LOGISTIK:</div>
          <div>Armada Pengiriman: Box 02 (KB 8192 SK)</div>
          <hr/>
          <div style="text-align: center; font-size: 10px; margin-top: 12px;">
            Dicetak: ${new Date().toLocaleTimeString('id-ID')} WIB oleh ${staffLabel}
          </div>
        </body>
        </html>
      `;
      slipWindow.document.write(html);
      slipWindow.document.close();
      slipWindow.focus();
      setTimeout(() => { slipWindow.print(); }, 400);
      showToast('Slip Dapur berhasil dicetak!');
    },

    // Share Invoice via WhatsApp (Multi-Item Formatting)
    shareWhatsappInvoice: () => {
      const items = state.cart || [];
      if (items.length === 0) {
        showToast('Keranjang masih kosong, pilih menu terlebih dahulu!', 'warning');
        return;
      }
      const fin = getFinancials();

      const itemsText = items.map((it, idx) => {
        const lineTotal = (Number(it.price) || 0) * (Number(it.pax) || 0);
        return `   ${idx + 1}. *${it.name}* (${it.pax} ${it.unit ? it.unit.replace('/', '') : 'pax'}) = ${formatIDR(lineTotal)}`;
      }).join('\n');

      const text = `*Yth. Bapak/Ibu ${state.customer.name}*,\n\nBerikut ringkasan pesanan & invoice resmi dari *AISH CATERING*:\n\n` +
        `🧾 *No. Invoice:* ${state.invoiceNumber}\n` +
        `📅 *Tanggal Acara:* ${state.customer.date} (${state.customer.time})\n` +
        `📍 *Lokasi:* ${state.customer.venue}\n\n` +
        `📋 *Rincian Menu Pesanan:*\n${itemsText}\n\n` +
        `💰 *Total Biaya:* ${formatIDR(fin.totalBill)}\n` +
        `💳 *Nominal DP (${state.selectedPaymentTerm.toUpperCase()}):* ${formatIDR(fin.amountDueNow)}\n` +
        `💵 *Sisa Pelunasan:* ${formatIDR(fin.totalBill - fin.amountDueNow)}\n\n` +
        `Rekening Pembayaran Resmi Aish Catering:\n` +
        `• *BCA:* 8820-919-223 a.n PT Aish Boga Nusantara\n` +
        `• *Mandiri:* 137-00-889922-1 a.n PT Aish Boga Nusantara\n\n` +
        `Terima kasih telah mempercayakan hidangan acara istimewa Anda kepada Aish Catering!`;

      navigator.clipboard.writeText(text).then(() => {
        showToast({
          title: 'Invoice WhatsApp Disalin',
          message: `Format pesan WA untuk ${state.customer.name} (${state.customer.phone}) siap dikirim!`,
          type: 'success',
          duration: 4500
        });
      }).catch(() => {
        showToast({
          title: 'Kirim WhatsApp',
          message: `Pesan siap dikirim ke nomor ${state.customer.phone}`,
          type: 'info'
        });
      });
    },

    // New Order Reset (Keranjang Bersih)
    startNewOrder: () => {
      state.invoiceNumber = generateNewInvoice();
      state.cart = [];
      state.customer = {
        name: 'Pelanggan Baru',
        phone: '-',
        date: getTodayDateStr(),
        time: '12:00 WIB',
        venue: 'Dapur / Takeaway / Pengiriman',
        eventType: 'Pesanan Baru'
      };
      state.deliveryType = 'pickup';
      state.deliveryFee = 0;
      state.discount = 0;
      state.selectedPaymentTerm = 'pelunasan';
      AishPOS.switchView('pos');
      renderCart();
      renderCatalog();
      showToast(`Pesanan Baru dimulai (${state.invoiceNumber}). Silakan klik menu di katalog.`);
    },

    // Load Existing Event into Cart
    loadEventToCart: (invCode) => {
      const ev = eventsData.find(e => e.inv === invCode);
      if (!ev) return;

      state.invoiceNumber = ev.inv;
      state.customer.name = ev.customer;
      state.customer.phone = ev.phone;
      state.customer.date = ev.date;
      state.customer.time = ev.time;
      state.customer.venue = ev.venue;

      if (Array.isArray(ev.items) && ev.items.length > 0) {
        state.cart = JSON.parse(JSON.stringify(ev.items));
      } else {
        const matchedCat = catalogData.find(c => c.name.toLowerCase().includes(ev.package.toLowerCase().slice(0, 10))) || catalogData[0];
        state.cart = [{ ...matchedCat, pax: ev.pax, customLauk: [...(matchedCat.defaultLauk || [])] }];
      }

      AishPOS.switchView('pos');
      renderCart();
      renderCatalog();
    },

    advanceKds: (orderId) => {
      if (typeof AishStorage !== 'undefined') {
        AishStorage.advanceKitchenOrderStage(orderId);
        refreshStorageState();
      } else {
        const ord = kitchenOrders.find(o => o.id === orderId);
        if (!ord) return;
        if (ord.stage === 'antrean') {
          ord.stage = 'masak';
          ord.badge = 'Sedang Diolah';
        } else if (ord.stage === 'masak') {
          ord.stage = 'kirim';
          ord.badge = 'Siap Kirim';
        } else if (ord.stage === 'kirim') {
          ord.stage = 'antrean';
          ord.badge = 'Selesai / Terkirim';
        }
      }
      renderKitchenDisplay();
      showToast({
        title: 'Status KDS Diperbarui',
        message: `Tiket pesanan dapur ${orderId} maju ke tahap berikutnya!`,
        type: 'info'
      });
    },

    showKitchenNotifSummary: () => {
      refreshStorageState();
      const antreanCount = kitchenOrders.filter(o => o.stage === 'antrean').length;
      const masakCount = kitchenOrders.filter(o => o.stage === 'masak').length;
      const kirimCount = kitchenOrders.filter(o => o.stage === 'kirim').length;
      showToast({
        title: 'Aktivitas Dapur & KDS',
        message: `${antreanCount} antrean persiapan • ${masakCount} sedang dimasak • ${kirimCount} siap armada kirim`,
        type: 'info',
        duration: 4500
      });
    },

    // Synchronize UI with Current Active Session
    syncAuthUI: () => {
      const user = (typeof AishAuth !== 'undefined') ? AishAuth.getCurrentUser() : null;
      const overlay = document.getElementById('loginOverlay');
      const shiftStatus = document.getElementById('headerShiftStatus');
      const avatar = document.getElementById('headerUserAvatar');
      const userName = document.getElementById('headerUserName');
      const userRole = document.getElementById('headerUserRole');
      const dropdownName = document.getElementById('dropdownStaffName');
      const dropdownRole = document.getElementById('dropdownStaffRole');
      const navStaffItem = document.getElementById('navStaffItem');

      if (!user) {
        if (overlay) overlay.classList.add('active');
        if (shiftStatus) shiftStatus.textContent = 'Akses Terkunci • Menunggu Login';
        if (avatar) avatar.textContent = '--';
        if (userName) userName.textContent = 'Akses Terkunci';
        if (userRole) userRole.textContent = 'TERKUNCI';
        if (dropdownName) dropdownName.textContent = 'Belum Login';
        if (dropdownRole) dropdownRole.textContent = 'TERKUNCI';
        if (navStaffItem) navStaffItem.style.display = 'none';
        return;
      }

      // User terautentikasi
      if (overlay) overlay.classList.remove('active');
      const roleUpper = user.role.toUpperCase();
      if (shiftStatus) shiftStatus.textContent = `Shift: ${user.name} - ${roleUpper} Aktif`;
      if (avatar) avatar.textContent = user.avatar || user.name.slice(0, 2).toUpperCase();
      if (userName) userName.textContent = user.name;
      if (userRole) userRole.textContent = roleUpper;
      if (dropdownName) dropdownName.textContent = user.name;
      if (dropdownRole) dropdownRole.textContent = roleUpper;

      // Tab Kelola Staf hanya terlihat untuk Admin
      if (navStaffItem) {
        navStaffItem.style.display = (user.role === 'admin') ? 'flex' : 'none';
      }

      // Khusus peran dapur, alihkan default ke KDS jika sedang di POS
      if (user.role === 'dapur' && state.activeView === 'pos') {
        AishPOS.switchView('kitchen');
      }
    },

    // Login Form Submission
    handleLogin: (e) => {
      if (e && e.preventDefault) e.preventDefault();
      const userEl = document.getElementById('loginUsername');
      const passEl = document.getElementById('loginPassword');
      const errEl = document.getElementById('loginErrorMsg');

      const username = userEl ? userEl.value.trim() : '';
      const password = passEl ? passEl.value : '';

      if (!username || !password) {
        if (errEl) {
          errEl.textContent = 'Harap isi nama pengguna dan kata sandi!';
          errEl.classList.add('active');
        }
        return;
      }

      if (typeof AishAuth === 'undefined') {
        showToast('Modul autentikasi belum dimuat!', 'warning');
        return;
      }

      const res = AishAuth.login(username, password);
      if (!res.success) {
        if (errEl) {
          errEl.textContent = res.message;
          errEl.classList.add('active');
        }
        showToast(res.message, 'warning');
        return;
      }

      if (errEl) {
        errEl.textContent = '';
        errEl.classList.remove('active');
      }

      if (userEl) userEl.value = '';
      if (passEl) passEl.value = '';

      AishPOS.syncAuthUI();
      showToast(`Login berhasil! Selamat bertugas, ${res.user.name}`);
    },

    // Quick switch demo button
    fillQuickLogin: (username, password) => {
      const userEl = document.getElementById('loginUsername');
      const passEl = document.getElementById('loginPassword');
      if (userEl) userEl.value = username;
      if (passEl) passEl.value = password;
      AishPOS.handleLogin(new Event('submit'));
    },

    // Logout & Lock POS (Kunci Layar & Ganti Akun)
    handleLogout: () => {
      const wrapper = document.querySelector('.user-profile-wrapper');
      if (wrapper) wrapper.classList.remove('active');

      if (confirm('Apakah Anda yakin ingin mengunci layar dan berganti akun/shift kasir?')) {
        if (typeof AishAuth !== 'undefined') {
          AishAuth.logout();
        }
        const userEl = document.getElementById('loginUsername');
        const passEl = document.getElementById('loginPassword');
        const errEl = document.getElementById('loginErrorMsg');
        if (userEl) userEl.value = '';
        if (passEl) passEl.value = '';
        if (errEl) {
          errEl.textContent = '';
          errEl.classList.remove('active');
        }
        AishPOS.switchView('pos');
        AishPOS.syncAuthUI();
        showToast('Sistem POS dikunci. Silakan login untuk bertugas kembali.', 'info');
      }
    },

    // Tutup / Keluar Aplikasi POS (Electron desktop quit)
    exitApp: () => {
      const wrapper = document.querySelector('.user-profile-wrapper');
      if (wrapper) wrapper.classList.remove('active');

      if (confirm('Apakah Anda yakin ingin keluar dan menutup aplikasi POS Aish Catering?')) {
        try {
          window.close();
        } catch (e) {
          showToast('Silakan tutup jendela aplikasi untuk keluar.', 'info');
        }
      }
    },

    // Toggle Dropdown
    toggleUserDropdown: () => {
      const wrapper = document.querySelector('.user-profile-wrapper');
      if (wrapper) wrapper.classList.toggle('active');
    },

    // Render Staff Table (Admin View)
    renderStaffView: () => {
      const tbody = document.getElementById('staffTableBody');
      const badge = document.getElementById('staffCountBadge');
      if (!tbody || typeof AishAuth === 'undefined') return;

      const staffList = AishAuth.getStaffList();
      const currentUser = AishAuth.getCurrentUser();

      if (badge) {
        badge.textContent = `${staffList.length} Staf Terdaftar`;
      }

      tbody.innerHTML = staffList.map(staf => {
        const isSelf = currentUser && currentUser.id === staf.id;
        const roleClass = staf.role.toLowerCase();
        const roleLabel = staf.role.toUpperCase();

        let avatarBg = 'background: rgba(16, 185, 129, 0.2); color: #34d399;';
        if (staf.role === 'admin') avatarBg = 'background: rgba(168, 85, 247, 0.2); color: #c084fc;';
        if (staf.role === 'dapur') avatarBg = 'background: rgba(245, 158, 11, 0.2); color: #fbbf24;';

        return `
          <tr>
            <td>
              <div class="staff-profile-cell">
                <div class="staff-table-avatar" style="${avatarBg}">
                  ${staf.avatar || staf.name.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <div class="staff-table-name">${staf.name}</div>
                  ${isSelf ? '<span style="font-size: 10px; color: #10b981; font-weight: 600;">(Sesi Anda Saat Ini)</span>' : ''}
                </div>
              </div>
            </td>
            <td>
              <code style="font-family: var(--font-mono); color: #94a3b8; font-size: 11.5px;">@${staf.username}</code>
            </td>
            <td>
              <span class="role-badge-tag ${roleClass}">${roleLabel}</span>
            </td>
            <td style="color: #64748b; font-size: 11.5px;">
              ${staf.createdAt || '2026-10-01'}
            </td>
            <td style="text-align: right;">
              ${isSelf ? `
                <span style="font-size: 11px; color: #64748b; font-style: italic;">Aktif</span>
              ` : `
                <button type="button" class="btn-delete-staff" onclick="AishPOS.handleDeleteStaff('${staf.id}')" title="Hapus akun staf ini">
                  🗑️ Hapus
                </button>
              `}
            </td>
          </tr>
        `;
      }).join('');
    },

    // Handle New Staff Registration Submission
    handleRegisterStaff: (e) => {
      if (e && e.preventDefault) e.preventDefault();
      const nameEl = document.getElementById('regStaffName');
      const usernameEl = document.getElementById('regStaffUsername');
      const roleEl = document.getElementById('regStaffRole');
      const passEl = document.getElementById('regStaffPassword');

      const name = nameEl ? nameEl.value.trim() : '';
      const username = usernameEl ? usernameEl.value.trim() : '';
      const role = roleEl ? roleEl.value : 'kasir';
      const password = passEl ? passEl.value : '';

      if (typeof AishAuth === 'undefined') {
        showToast('Modul autentikasi belum siap!', 'warning');
        return;
      }

      const res = AishAuth.registerStaff({ name, username, role, password });
      if (!res.success) {
        showToast(res.message, 'warning');
        return;
      }

      // Reset Form
      if (nameEl) nameEl.value = '';
      if (usernameEl) usernameEl.value = '';
      if (passEl) passEl.value = '';
      if (roleEl) roleEl.value = 'kasir';

      AishPOS.renderStaffView();
      showToast(res.message, 'success');
    },

    // Handle Delete Staff
    handleDeleteStaff: (userId) => {
      if (typeof AishAuth === 'undefined') return;

      if (confirm('Apakah Anda yakin ingin menghapus akun staf ini secara permanen?')) {
        const res = AishAuth.deleteStaff(userId);
        if (!res.success) {
          showToast(res.message, 'warning');
          return;
        }

        AishPOS.renderStaffView();
        showToast(res.message, 'info');
      }
    },

    closeModal: (modalId) => {
      const el = document.getElementById(modalId);
      if (el) el.classList.remove('active');
    },

    // =========================================================
    // Backup Export & Data Reset (Task 3: Admin Only)
    // =========================================================

    // Update stat chips on backup card
    updateBackupStats: () => {
      if (typeof AishStorage === 'undefined' || typeof AishAuth === 'undefined') return;
      const backup = AishStorage.exportFullBackup();
      const evEl = document.getElementById('backupStatEvents');
      const kdsEl = document.getElementById('backupStatKds');
      const stfEl = document.getElementById('backupStatStaff');
      if (evEl) evEl.textContent = `${backup.events.length} Transaksi`;
      if (kdsEl) kdsEl.textContent = `${backup.kitchenOrders.length} Tiket KDS`;
      if (stfEl) stfEl.textContent = `${backup.staff.length} Staf`;
    },

    // Export full backup as downloadable JSON file
    exportBackupData: () => {
      if (typeof AishStorage === 'undefined') {
        showToast('Modul penyimpanan belum siap!', 'warning');
        return;
      }
      const backup = AishStorage.exportFullBackup();
      const today = new Date();
      const ymd = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
      const filename = `backup-aish-pos-${ymd}.json`;

      const jsonStr = JSON.stringify(backup, null, 2);
      const blob = new Blob([jsonStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      showToast(`✅ Backup berhasil diunduh: ${filename}`, 'success');
    },

    // Reset all data to default demo dataset
    resetDemoData: () => {
      if (typeof AishStorage === 'undefined') {
        showToast('Modul penyimpanan belum siap!', 'warning');
        return;
      }
      const confirmed = confirm(
        'Apakah Anda yakin ingin mereset SEMUA data ke dataset demo bawaan?\n\n' +
        '⚠️  Seluruh transaksi, tiket KDS, dan akun staf yang ditambahkan akan DIHAPUS secara permanen.\n\n' +
        'Pastikan Anda telah mengunduh backup sebelum melanjutkan.'
      );
      if (!confirmed) return;

      AishStorage.resetToDefault();
      eventsData = AishStorage.getEvents();
      kitchenOrders = AishStorage.getKitchenOrders();

      renderEventsTable();
      renderInvoicesTable();
      renderKitchenDisplay();
      AishPOS.updateBackupStats();

      showToast('🔄 Data telah direset ke dataset demo bawaan.', 'info');
    },

    // =========================================================
    // Master Catalog CRUD Methods (Task 3 & 4)
    // =========================================================

    // Filter master catalog table
    filterMasterCatalog: () => {
      const searchEl = document.getElementById('masterCatalogSearch');
      state.masterCatalogSearch = searchEl ? searchEl.value.trim() : '';
      renderMasterCatalog();
    },

    // Set category filter for master catalog
    setMasterCatalogCategory: (cat, el) => {
      state.masterCatalogCategory = cat;
      // Update active tab styling
      document.querySelectorAll('[data-master-cat]').forEach(btn => btn.classList.remove('active'));
      if (el) el.classList.add('active');
      renderMasterCatalog();
    },

    // Open Add Menu modal
    openAddMenuModal: () => {
      const user = (typeof AishAuth !== 'undefined') ? AishAuth.getCurrentUser() : null;
      if (!user || user.role !== 'admin') {
        showToast('Hanya Administrator yang dapat menambah menu baru!', 'warning');
        return;
      }
      const titleEl = document.getElementById('menuFormModalTitle');
      if (titleEl) titleEl.textContent = 'Tambah Menu Catering Baru';

      // Reset form fields
      document.getElementById('menuFormId').value = '';
      document.getElementById('menuFormName').value = '';
      document.getElementById('menuFormCategory').value = 'Paket Prasmanan';
      document.getElementById('menuFormCategoryTag').value = '';
      document.getElementById('menuFormPrice').value = '';
      document.getElementById('menuFormUnit').value = '/pax';
      document.getElementById('menuFormMinPax').value = '25';
      document.getElementById('menuFormDefaultLauk').value = '';
      document.getElementById('menuFormComplementary').value = '';
      document.getElementById('menuFormDescription').value = '';
      document.getElementById('menuFormIsAvailable').checked = true;

      document.getElementById('modalMenuForm').classList.add('active');
    },

    // Open Edit Menu modal (pre-filled)
    openEditMenuModal: (itemId) => {
      const user = (typeof AishAuth !== 'undefined') ? AishAuth.getCurrentUser() : null;
      if (!user || user.role !== 'admin') {
        showToast('Hanya Administrator yang dapat mengedit menu!', 'warning');
        return;
      }
      const item = catalogData.find(i => i.id === itemId);
      if (!item) {
        showToast('Menu tidak ditemukan di database!', 'warning');
        return;
      }

      const titleEl = document.getElementById('menuFormModalTitle');
      if (titleEl) titleEl.textContent = `Edit: ${item.name}`;

      document.getElementById('menuFormId').value = item.id;
      document.getElementById('menuFormName').value = item.name || '';
      document.getElementById('menuFormCategory').value = item.category || 'Paket Prasmanan';
      document.getElementById('menuFormCategoryTag').value = item.categoryTag || '';
      document.getElementById('menuFormPrice').value = item.price || '';
      document.getElementById('menuFormUnit').value = item.unit || '/pax';
      document.getElementById('menuFormMinPax').value = item.minPax || 25;
      document.getElementById('menuFormDefaultLauk').value = (item.defaultLauk || []).join(', ');
      document.getElementById('menuFormComplementary').value = item.complementary || '';
      document.getElementById('menuFormDescription').value = item.description || '';
      document.getElementById('menuFormIsAvailable').checked = item.isAvailable !== false;

      document.getElementById('modalMenuForm').classList.add('active');
    },

    // Save menu form (Add or Update)
    saveMenuForm: (e) => {
      if (e && e.preventDefault) e.preventDefault();
      const user = (typeof AishAuth !== 'undefined') ? AishAuth.getCurrentUser() : null;
      if (!user || user.role !== 'admin') {
        showToast('Hanya Administrator yang dapat menyimpan menu!', 'warning');
        return;
      }

      const itemId = document.getElementById('menuFormId').value.trim();
      const name = document.getElementById('menuFormName').value.trim();
      const category = document.getElementById('menuFormCategory').value;
      const categoryTag = document.getElementById('menuFormCategoryTag').value.trim();
      const price = Number(document.getElementById('menuFormPrice').value) || 0;
      const unit = document.getElementById('menuFormUnit').value;
      const minPax = Number(document.getElementById('menuFormMinPax').value) || 1;
      const defaultLaukStr = document.getElementById('menuFormDefaultLauk').value.trim();
      const defaultLauk = defaultLaukStr ? defaultLaukStr.split(',').map(s => s.trim()).filter(Boolean) : [];
      const complementary = document.getElementById('menuFormComplementary').value.trim();
      const description = document.getElementById('menuFormDescription').value.trim();
      const isAvailable = document.getElementById('menuFormIsAvailable').checked;

      if (!name) {
        showToast('Nama menu tidak boleh kosong!', 'warning');
        return;
      }
      if (price <= 0) {
        showToast('Harga menu harus lebih dari Rp 0!', 'warning');
        return;
      }

      const itemData = {
        name,
        category,
        categoryTag: categoryTag || category,
        price,
        unit,
        minPax,
        badge1: categoryTag || category,
        badge2: '',
        minBadge: `Min. ${minPax} Pax`,
        isStar: false,
        isAvailable,
        description,
        image: 'assets/images/default_menu.jpg',
        defaultLauk,
        notes: '',
        complementary
      };

      // If editing, preserve the id and existing image/badges
      if (itemId) {
        itemData.id = itemId;
        const existing = catalogData.find(i => i.id === itemId);
        if (existing) {
          itemData.image = existing.image || itemData.image;
          itemData.badge1 = existing.badge1 || itemData.badge1;
          itemData.badge2 = existing.badge2 || itemData.badge2;
          itemData.isStar = existing.isStar || false;
          itemData.isThumb = existing.isThumb || false;
          itemData.isFire = existing.isFire || false;
          itemData.notes = existing.notes || '';
        }
      }

      if (typeof AishStorage !== 'undefined') {
        AishStorage.saveCatalogItem(itemData);
      }

      // Sync state
      refreshStorageState();
      renderMasterCatalog();
      renderCatalog();

      document.getElementById('modalMenuForm').classList.remove('active');
      showToast(`Menu "${name}" berhasil ${itemId ? 'diperbarui' : 'ditambahkan'}! 🍱`);
    },

    // Delete catalog menu
    deleteCatalogMenu: (itemId) => {
      const user = (typeof AishAuth !== 'undefined') ? AishAuth.getCurrentUser() : null;
      if (!user || user.role !== 'admin') {
        showToast('Hanya Administrator yang dapat menghapus menu!', 'warning');
        return;
      }
      const item = catalogData.find(i => i.id === itemId);
      if (!item) return;

      const confirmed = confirm(
        `⚠️ Hapus Menu: "${item.name}"\n\n` +
        `Harga: ${formatIDR(item.price)} ${item.unit}\n` +
        `Kategori: ${item.category}\n\n` +
        'Menu yang dihapus tidak dapat dikembalikan. Lanjutkan?'
      );
      if (!confirmed) return;

      if (typeof AishStorage !== 'undefined') {
        AishStorage.deleteCatalogItem(itemId);
      }

      // Remove from cart if present
      state.cart = (state.cart || []).filter(c => c.id !== itemId);

      refreshStorageState();
      renderMasterCatalog();
      renderCatalog();
      renderCart();
      showToast(`Menu "${item.name}" berhasil dihapus dari katalog.`, 'info');
    },

    // Toggle menu availability
    toggleMenuAvailability: (itemId) => {
      const user = (typeof AishAuth !== 'undefined') ? AishAuth.getCurrentUser() : null;
      if (!user || user.role !== 'admin') {
        showToast('Hanya Administrator yang dapat mengubah status ketersediaan menu!', 'warning');
        return;
      }

      if (typeof AishStorage !== 'undefined') {
        const updated = AishStorage.toggleCatalogAvailability(itemId);
        if (updated) {
          refreshStorageState();
          renderMasterCatalog();
          renderCatalog();
          const statusText = updated.isAvailable ? 'Tersedia ✅' : 'Stok Habis 🔴';
          showToast(`Status "${updated.name}" diubah menjadi: ${statusText}`);
        }
      }
    },

    // Expose renderMasterCatalog for external calls
    renderMasterCatalog: () => renderMasterCatalog(),

    // Public Toast Trigger
    showToast: (opts, type) => showToast(opts, type)
  };
})();

// Auto Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  AishPOS.init();
});
