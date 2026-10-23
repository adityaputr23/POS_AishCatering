// ==========================================================================
// Aish Catering POS - Core Operational & Transaction Engine
// ==========================================================================

const AishPOS = (() => {
  // Master Catalog Data
  const catalogData = [
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
    }
  }

  // Active Transaction State
  let state = {
    activeView: 'pos',
    currentCategory: 'Semua Menu',
    searchQuery: '',
    customer: {
      name: 'Hj. Nurlaila Fitri',
      phone: '0812-9843-2211',
      date: 'Sabtu, 24 Mei 2025',
      time: '10:30 WIB',
      venue: 'Gedung Graha Mandiri Lt. 3 Ballroom, Jl. Imam Bonjol No.61, Menteng, Jakarta...',
      eventType: 'Resepsi Pernikahan'
    },
    invoiceNumber: 'INV-2025/V/092',
    cartItem: { ...catalogData[0], pax: 150 },
    deliveryType: 'buffet',
    deliveryFee: 350000,
    pb1TaxRate: 0.10, // 10%
    discount: 0,
    selectedPaymentTerm: 'dp50', // 'dp30', 'dp50', 'pelunasan'
    tenderPaidInput: 0,
    selectedPaymentMethod: 'Transfer QRIS'
  };

  // Helper formatting currency
  const formatIDR = (num) => {
    return 'Rp ' + Number(num || 0).toLocaleString('id-ID');
  };

  // Calculate financials
  const getFinancials = () => {
    const hasItem = !!state.cartItem;
    const itemSubtotal = hasItem ? (state.cartItem.price || 0) * (state.cartItem.pax || 0) : 0;
    const deliveryFee = hasItem ? (state.deliveryFee || 0) : 0;
    const taxPB1 = Math.round(itemSubtotal * state.pb1TaxRate);
    const totalBill = hasItem ? Math.max(0, itemSubtotal + deliveryFee + taxPB1 - state.discount) : 0;

    let termRate = 0.50;
    if (state.selectedPaymentTerm === 'dp30') termRate = 0.30;
    if (state.selectedPaymentTerm === 'dp50') termRate = 0.50;
    if (state.selectedPaymentTerm === 'pelunasan') termRate = 1.00;

    const amountDueNow = Math.round(totalBill * termRate);

    return {
      itemSubtotal,
      deliveryFee,
      taxPB1,
      discount: state.discount,
      totalBill,
      amountDueNow,
      dp30Amount: Math.round(totalBill * 0.30),
      dp50Amount: Math.round(totalBill * 0.50),
      pelunasanAmount: totalBill
    };
  };

  // Render the Right Rail Cart
  const renderCart = () => {
    const fin = getFinancials();

    // Customer info card
    document.getElementById('cartCustomerName').textContent = state.customer.name;
    document.getElementById('cartCustomerPhone').textContent = state.customer.phone;
    document.getElementById('cartEventTime').textContent = `${state.customer.date} • ${state.customer.time}`;
    document.getElementById('cartEventVenue').textContent = state.customer.venue;

    const emptyCard = document.getElementById('cartEmptyCard');
    const activeCard = document.getElementById('cartActiveItemCard');
    const compBanner = document.getElementById('cartCompBanner');
    const satuanNotice = document.getElementById('cartSatuanNotice');

    // Cart Item Content
    const item = state.cartItem;
    if (!item) {
      if (emptyCard) emptyCard.style.display = 'block';
      if (activeCard) activeCard.style.display = 'none';
      if (compBanner) compBanner.style.display = 'none';
      if (satuanNotice) satuanNotice.style.display = 'none';

      document.getElementById('billSubtotalLabel').textContent = 'Subtotal Menu (0 Pax)';
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
    if (activeCard) activeCard.style.display = 'block';
    if (compBanner) compBanner.style.display = 'flex';

    document.getElementById('cartItemCategory').textContent = item.categoryTag.toUpperCase() + (item.category === 'Paket Prasmanan' ? ' BUFFET' : '');
    document.getElementById('cartItemName').textContent = item.name;
    document.getElementById('cartItemUnitPrice').textContent = `${formatIDR(item.price)} / ${item.unit.replace('/', '')}`;

    // Direct input value
    const paxInput = document.getElementById('cartPaxInput');
    if (paxInput && document.activeElement !== paxInput) {
      paxInput.value = item.pax;
    }

    // Satuan notice badge
    if (satuanNotice) {
      const isSatuan = item.pax < (item.minPax || 25);
      satuanNotice.style.display = isSatuan ? 'flex' : 'none';
      if (isSatuan) {
        satuanNotice.innerHTML = `<span>⚡</span><span><strong>Pesanan Satuan / Eceran:</strong> ${item.pax} Porsi (Bebas tanpa minimal order).</span>`;
      }
    }

    document.getElementById('cartItemSubtotal').textContent = formatIDR(fin.itemSubtotal);

    // Selected dishes chips
    const dishesListContainer = document.getElementById('cartDishesList');
    if (dishesListContainer) {
      dishesListContainer.innerHTML = (item.defaultLauk || [])
        .map(dish => `<span class="dish-chip">${dish}</span>`)
        .join('');
    }

    // Notes
    const notesEl = document.getElementById('cartItemNotes');
    if (notesEl) {
      notesEl.textContent = item.notes || 'Catatan standar catering';
    }

    // Complementary text
    const compEl = document.getElementById('cartCompText');
    if (compEl) {
      compEl.textContent = item.complementary || 'FREE COMPLEMENTARY: Peralatan Buffet Standar';
    }

    // Subtotal Menu (N Pax)
    document.getElementById('billSubtotalLabel').textContent = `Subtotal Menu (${item.pax} Pax)`;
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
      const isCurrentInCart = state.cartItem && state.cartItem.id === item.id;
      return `
        <div class="menu-card" data-id="${item.id}">
          <div class="menu-card-image-wrap">
            <img src="${item.image}" alt="${item.name}" loading="lazy" />
            <div class="menu-badge-overlay-left">
              <span class="badge-tag badge-gold">${item.badge1}</span>
              ${item.badge2 ? `<span class="badge-tag badge-dark">${item.badge2}</span>` : ''}
            </div>
            <div class="menu-badge-overlay-right">
              <span class="badge-min-pax">${item.minBadge}</span>
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
              <button class="btn-select-menu ${isCurrentInCart ? 'added' : ''}" onclick="AishPOS.selectCatalogItem('${item.id}')">
                ${isCurrentInCart ? '✓ Terpilih' : '+ Pilih'}
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

  // Toast notification
  const showToast = (message, type = 'success') => {
    const toast = document.getElementById('posToast');
    if (!toast) return;
    toast.textContent = message;
    toast.className = `toast-notification ${type} show`;
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
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

      const currentPax = state.cartItem ? state.cartItem.pax : 1;
      state.cartItem = {
        ...item,
        pax: currentPax > 0 ? currentPax : 1
      };

      // Auto-set kurir delivery fee if pax <= 10
      if (state.cartItem.pax <= 10 && state.deliveryType === 'buffet') {
        state.deliveryType = 'kurir';
        state.deliveryFee = 20000;
      }

      renderCatalog();
      renderCart();
      showToast(`Menu "${item.name}" dimasukkan ke keranjang!`);
    },

    // Stepper control (Supports Satuan / Any Porsi)
    adjustPax: (delta) => {
      if (!state.cartItem) return;
      const current = Number(state.cartItem.pax) || 1;
      const newPax = current + delta;
      if (newPax <= 0) {
        AishPOS.removeCartItem();
        return;
      }
      state.cartItem.pax = newPax;
      renderCart();
    },

    // Direct input number of pax
    setPaxDirect: (val) => {
      if (!state.cartItem) return;
      const parsed = parseInt(val, 10);
      if (isNaN(parsed) || parsed <= 0) {
        state.cartItem.pax = 1;
      } else {
        state.cartItem.pax = parsed;
      }
      renderCart();
    },

    // Quick chips (+5, +10, +25, +50, etc.)
    addPaxShortcut: (amount) => {
      if (!state.cartItem) return;
      state.cartItem.pax = (Number(state.cartItem.pax) || 0) + amount;
      renderCart();
      showToast(`Porsi bertambah +${amount} Pax (${state.cartItem.pax} Pax)`);
    },

    // Hapus Item / Kosongkan Keranjang
    removeCartItem: () => {
      if (!state.cartItem) return;
      const itemName = state.cartItem.name;
      if (confirm(`Apakah Anda yakin ingin menghapus "${itemName}" dari keranjang pesanan?`)) {
        state.cartItem = null;
        renderCatalog();
        renderCart();
        showToast('Item berhasil dihapus dari keranjang.', 'info');
      }
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
    openCustomLaukModal: () => {
      if (!state.cartItem) {
        showToast('Pilih menu di katalog terlebih dahulu!', 'warning');
        return;
      }

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

      const currentLauk = state.cartItem.defaultLauk || [];

      listContainer.innerHTML = allAvailableOptions.map(dish => {
        const isChecked = currentLauk.some(l => dish.toLowerCase().includes(l.toLowerCase()));
        return `
          <label style="display: flex; align-items: center; gap: 0.5rem; font-size: 12.5px; padding: 0.4rem; background: #f8fafc; border-radius: 4px; border: 1px solid var(--border-light);">
            <input type="checkbox" value="${dish}" ${isChecked ? 'checked' : ''} style="width: 16px; height: 16px; accent-color: var(--primary);">
            <span>${dish}</span>
          </label>
        `;
      }).join('');

      document.getElementById('customNotesInput').value = state.cartItem.notes || '';
      document.getElementById('modalCustomLauk').classList.add('active');
    },

    saveCustomLauk: () => {
      if (!state.cartItem) return;
      const checked = [];
      document.querySelectorAll('#customDishesChecklist input[type="checkbox"]:checked').forEach(cb => {
        checked.push(cb.value);
      });

      if (checked.length > 0) {
        state.cartItem.defaultLauk = checked;
      }
      state.cartItem.notes = document.getElementById('customNotesInput').value;

      document.getElementById('modalCustomLauk').classList.remove('active');
      renderCart();
      showToast('Kustomisasi menu lauk acara berhasil disimpan!');
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
      if (!state.cartItem) {
        showToast('Keranjang masih kosong, silakan pilih menu terlebih dahulu!', 'warning');
        return;
      }

      const fin = getFinancials();
      state.tenderPaidInput = fin.amountDueNow;

      document.getElementById('payInvoiceCode').textContent = state.invoiceNumber;
      document.getElementById('payCustomerSummary').textContent = `${state.customer.name} • ${state.cartItem.pax} Pax ${state.cartItem.name}`;
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

      // Add to events history or update
      const existing = eventsData.find(e => e.inv === state.invoiceNumber);
      let targetEvent;

      if (existing) {
        existing.paid = (existing.paid || 0) + state.tenderPaidInput;
        if (existing.paid >= existing.total) {
          existing.status = 'lunas';
          existing.statusText = 'Lunas';
        }
        targetEvent = existing;
      } else {
        targetEvent = {
          inv: state.invoiceNumber,
          customer: state.customer.name,
          phone: state.customer.phone,
          date: state.customer.date,
          time: state.customer.time,
          venue: state.customer.venue,
          package: state.cartItem.name,
          pax: state.cartItem.pax,
          total: fin.totalBill,
          paid: state.tenderPaidInput,
          status: state.tenderPaidInput >= fin.totalBill ? 'lunas' : 'dp',
          statusText: state.tenderPaidInput >= fin.totalBill ? 'Lunas' : 'DP Masuk'
        };
      }

      // Simpan permanen transaksi & otomatisasi tiket dapur KDS
      if (typeof AishStorage !== 'undefined') {
        AishStorage.saveEvent(targetEvent);
        if (!existing) {
          AishStorage.createKitchenTicketFromOrder(targetEvent, state.cartItem);
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

    // Invoice & Receipt Slip Preview
    openInvoiceSlip: (invCode = state.invoiceNumber) => {
      if (!state.cartItem) {
        showToast('Keranjang masih kosong, pilih menu terlebih dahulu!', 'warning');
        return;
      }
      const fin = getFinancials();
      const currentInv = invCode || state.invoiceNumber;

      document.getElementById('printInvNumber').textContent = currentInv;
      document.getElementById('printInvDate').textContent = new Date().toLocaleDateString('id-ID', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
      });
      document.getElementById('printCustName').textContent = state.customer.name;
      document.getElementById('printCustPhone').textContent = state.customer.phone;
      document.getElementById('printCustEvent').textContent = `${state.customer.date} • ${state.customer.time}`;
      document.getElementById('printCustVenue').textContent = state.customer.venue;

      document.getElementById('printItemRow').innerHTML = `
        <tr>
          <td>
            <strong>${state.cartItem.name}</strong>
            <div style="font-size: 10.5px; color: #64748b;">${(state.cartItem.defaultLauk || []).join(', ')}</div>
            <div style="font-size: 10px; color: #94a3b8; font-style: italic;">${state.cartItem.notes || ''}</div>
          </td>
          <td class="font-mono" style="text-align: center;">${state.cartItem.pax}</td>
          <td class="font-mono" style="text-align: right;">${formatIDR(state.cartItem.price)}</td>
          <td class="font-mono" style="text-align: right; font-weight: 700;">${formatIDR(fin.itemSubtotal)}</td>
        </tr>
      `;

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

    // Kitchen Slip Printer
    printKitchenSlip: () => {
      if (!state.cartItem) {
        showToast('Keranjang masih kosong, tidak ada pesanan untuk dicetak!', 'warning');
        return;
      }
      const slipWindow = window.open('', '_blank', 'width=420,height=600');
      const item = state.cartItem;
      const currentUser = (typeof AishAuth !== 'undefined') ? AishAuth.getCurrentUser() : null;
      const staffLabel = currentUser ? `${currentUser.name} (${currentUser.role.toUpperCase()})` : 'Kasir Operasional';

      const html = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>SLIP ORDER DAPUR - ${state.invoiceNumber}</title>
          <style>
            body { font-family: 'JetBrains Mono', monospace; font-size: 12px; padding: 15px; color: #000; }
            h2, h3 { margin: 2px 0; text-align: center; }
            hr { border: none; border-top: 1px dashed #000; margin: 8px 0; }
            .row { display: flex; justify-content: space-between; }
            .bold { font-weight: bold; }
            ul { margin: 4px 0 8px 18px; padding: 0; }
          </style>
        </head>
        <body>
          <h2>*** TIKET DAPUR CATERING ***</h2>
          <h3>AISH CATERING - JAKSEL</h3>
          <hr/>
          <div class="row"><span>NO PESANAN:</span><span class="bold">${state.invoiceNumber}</span></div>
          <div class="row"><span>WAKTU ACARA:</span><span>${state.customer.date} • ${state.customer.time}</span></div>
          <div class="row"><span>PELANGGAN:</span><span class="bold">${state.customer.name}</span></div>
          <div class="row"><span>LOKASI:</span><span>${state.customer.venue}</span></div>
          <hr/>
          <div class="bold" style="font-size: 14px; text-transform: uppercase;">
            [ ${item.pax} PAX ] ${item.name}
          </div>
          <p class="bold" style="margin-top: 6px;">KOMPOSISI LAUK & SAJIAN:</p>
          <ul>
            ${(item.defaultLauk || []).map(l => `<li>${l}</li>`).join('')}
          </ul>
          <hr/>
          <div class="bold">CATATAN KHUSUS / ALERGI:</div>
          <div>${item.notes || 'Tidak ada catatan'}</div>
          <hr/>
          <div class="bold">COMPLEMENTARY / LOGISTIK:</div>
          <div>${item.complementary || 'Peralatan standar'}</div>
          <div>Armada Pengiriman: Box 02 (B 9182 PQA)</div>
          <hr/>
          <div style="text-align: center; font-size: 10px; margin-top: 15px;">
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

    // Share Invoice via WhatsApp
    shareWhatsappInvoice: () => {
      if (!state.cartItem) {
        showToast('Keranjang masih kosong, pilih menu terlebih dahulu!', 'warning');
        return;
      }
      const fin = getFinancials();
      const text = `*Yth. Bapak/Ibu ${state.customer.name}*,\n\nBerikut ringkasan pesanan & invoice resmi dari *AISH CATERING*:\n\n` +
        `🧾 *No. Invoice:* ${state.invoiceNumber}\n` +
        `📅 *Tanggal Acara:* ${state.customer.date} (${state.customer.time})\n` +
        `📍 *Lokasi:* ${state.customer.venue}\n` +
        `🍲 *Paket:* ${state.cartItem.name} (${state.cartItem.pax} Pax)\n` +
        `💰 *Total Biaya:* ${formatIDR(fin.totalBill)}\n` +
        `💳 *Nominal DP (${state.selectedPaymentTerm.toUpperCase()}):* ${formatIDR(fin.amountDueNow)}\n` +
        `💵 *Sisa Pelunasan:* ${formatIDR(fin.totalBill - fin.amountDueNow)}\n\n` +
        `Rekening Pembayaran Resmi Aish Catering:\n` +
        `• *BCA:* 8820-919-223 a.n PT Aish Boga Nusantara\n` +
        `• *Mandiri:* 137-00-889922-1 a.n PT Aish Boga Nusantara\n\n` +
        `Terima kasih telah mempercayakan hidangan acara istimewa Anda kepada Aish Catering!`;

      navigator.clipboard.writeText(text).then(() => {
        showToast('Teks Invoice WA tersalin ke Clipboard!', 'info');
      }).catch(() => {});

      alert("Pesan WhatsApp siap dikirim ke nomor " + state.customer.phone + ":\n\n" + text);
    },

    // New Order Reset
    startNewOrder: () => {
      const randomId = Math.floor(100 + Math.random() * 900);
      state.invoiceNumber = `INV-2025/V/${randomId}`;
      state.cartItem = { ...catalogData[0], pax: 100 };
      state.customer = {
        name: 'Pelanggan Baru',
        phone: '0812-XXXX-XXXX',
        date: 'Minggu, 1 Juni 2025',
        time: '11:00 WIB',
        venue: 'Jl. Kemang Raya No. 10, Jakarta Selatan',
        eventType: 'Acara Syukuran'
      };
      state.selectedPaymentTerm = 'dp50';
      AishPOS.switchView('pos');
      renderCart();
      renderCatalog();
      showToast(`Pesanan Baru diinisialisasi (${state.invoiceNumber})`);
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

      const matchedCat = catalogData.find(c => c.name.toLowerCase().includes(ev.package.toLowerCase().slice(0, 10))) || catalogData[0];
      state.cartItem = { ...matchedCat, pax: ev.pax };

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
      showToast(`Status pesanan dapur ${orderId} diperbarui!`);
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
        if (userName) userName.textContent = 'Belum Masuk';
        if (userRole) userRole.textContent = 'Tamu';
        if (dropdownName) dropdownName.textContent = 'Belum Masuk';
        if (dropdownRole) dropdownRole.textContent = 'TAMU';
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

    // Logout & Lock POS
    handleLogout: () => {
      const wrapper = document.querySelector('.user-profile-wrapper');
      if (wrapper) wrapper.classList.remove('active');

      if (confirm('Apakah Anda yakin ingin keluar / berganti shift kasir?')) {
        if (typeof AishAuth !== 'undefined') {
          AishAuth.logout();
        }
        AishPOS.syncAuthUI();
        showToast('Anda telah keluar dari sistem kasir.', 'info');
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
    }
  };
})();

// Auto Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  AishPOS.init();
});
