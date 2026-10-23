// ==========================================================================
// Aish Catering POS - Offline Storage Engine & KDS Ticket Generator
// ==========================================================================

const AishStorage = (() => {
  const STORAGE_KEY_EVENTS = 'aish_pos_events_history';
  const STORAGE_KEY_KITCHEN = 'aish_pos_kitchen_orders';
  const STORAGE_KEY_CATALOG = 'aish_pos_catalog_v1';

  const defaultCatalog = [
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

  const defaultEvents = [
    {
      inv: 'INV-2025/V/092',
      customer: 'Hj. Nurlaila Fitri',
      phone: '0812-9843-2211',
      date: '24 Mei 2026',
      time: '10:30 WIB',
      venue: 'Swiss-Belinn Singkawang Grand Ballroom',
      package: 'Paket Prasmanan Royal Nusantara',
      pax: 150,
      total: 11075000,
      paid: 5537500,
      status: 'dp',
      statusText: 'DP Masuk'
    },
    {
      inv: 'INV-2025/V/088',
      customer: 'PT. Telkom Akses (Bp. Hendra)',
      phone: '0811-234-981',
      date: '21 Okt 2026',
      time: '12:00 WIB',
      venue: 'Gedung Singkawang Cultural Center (SCC)',
      package: 'Nasi Box Premium Rendang',
      pax: 200,
      total: 9240000,
      paid: 9240000,
      status: 'masak',
      statusText: 'Siap Masak'
    },
    {
      inv: 'INV-2025/V/085',
      customer: 'dr. Farhan & dr. Amanda',
      phone: '0813-8821-4400',
      date: '21 Okt 2026',
      time: '18:30 WIB',
      venue: 'Hotel Mahkota Singkawang Grand Ballroom',
      package: 'Paket Wedding Elegance',
      pax: 600,
      total: 69000000,
      paid: 69000000,
      status: 'lunas',
      statusText: 'Lunas'
    },
    {
      inv: 'INV-2025/V/084',
      customer: 'Keluarga Bp. Supriatna',
      phone: '0857-1122-3344',
      date: '21 Okt 2026',
      time: '09:00 WIB',
      venue: 'Perumahan Graha Singkawang Indah Blok B/12',
      package: 'Tumpeng Megah Syukuran',
      pax: 30,
      total: 1685000,
      paid: 1685000,
      status: 'kirim',
      statusText: 'Siap Kirim'
    },
    {
      inv: 'INV-2025/V/079',
      customer: 'Yayasan Al-Ikhlas',
      phone: '0812-7766-5544',
      date: '22 Okt 2026',
      time: '15:30 WIB',
      venue: 'Masjid Raya Kota Singkawang',
      package: 'Snack Box Tradisional 4 Macam',
      pax: 250,
      total: 5125000,
      paid: 2500000,
      status: 'dp',
      statusText: 'DP Masuk'
    }
  ];

  const defaultKitchenOrders = [
    {
      id: 'KDS-088',
      inv: 'INV-2025/V/088',
      client: 'PT. Telkom Akses',
      time: '12:00 WIB (Kirim 10:45)',
      menu: '200 Pax Nasi Box Rendang',
      subItems: ['Rendang Daging Sapi (200 pcs)', 'Telur Balado (200 butir)', 'Tumis Buncis Jagung', 'Packing Box Kraft + Stiker'],
      stage: 'masak',
      badge: 'Sedang Diolah',
      urgency: 'high'
    },
    {
      id: 'KDS-084',
      inv: 'INV-2025/V/084',
      client: 'Keluarga Bp. Supriatna',
      time: '09:00 WIB (Berangkat 08:30)',
      menu: '1 Set Tumpeng Megah 30 Pax',
      subItems: ['Garnish & Hiasan Wortel/Cabe Selesai', 'Ayam Bakar Madu 30 ptg', 'Plating Tampah Bambu Daun Pisang'],
      stage: 'kirim',
      badge: 'Siap Kirim',
      urgency: 'ready'
    },
    {
      id: 'KDS-092',
      inv: 'INV-2025/V/092',
      client: 'Hj. Nurlaila Fitri',
      time: 'Sabtu, 24 Mei 2026 - 10:30 WIB',
      menu: '150 Pax Prasmanan Royal',
      subItems: ['Bumbu Marinate Rendang', 'Persiapan Chafing Dish & Roll Top', 'Jadwal Muat Armada Box 02'],
      stage: 'antrean',
      badge: 'Antrean Produksi',
      urgency: 'normal'
    }
  ];

  function readStorage(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) {
        localStorage.setItem(key, JSON.stringify(fallback));
        return JSON.parse(JSON.stringify(fallback));
      }
      return JSON.parse(raw);
    } catch (e) {
      console.error(`Gagal membaca ${key} dari localStorage:`, e);
      return JSON.parse(JSON.stringify(fallback));
    }
  }

  function writeStorage(key, data) {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.error(`Gagal menulis ${key} ke localStorage:`, e);
    }
  }

  return {
    init: () => {
      readStorage(STORAGE_KEY_EVENTS, defaultEvents);
      readStorage(STORAGE_KEY_KITCHEN, defaultKitchenOrders);
      readStorage(STORAGE_KEY_CATALOG, defaultCatalog);
    },

    getCatalog: () => {
      return readStorage(STORAGE_KEY_CATALOG, defaultCatalog);
    },

    saveCatalogItem: (itemData) => {
      if (!itemData || !itemData.name) return null;
      const list = readStorage(STORAGE_KEY_CATALOG, defaultCatalog);
      const itemId = itemData.id || ('menu-' + Date.now());
      const existingIdx = list.findIndex(c => c.id === itemId);

      const normalizedItem = {
        ...itemData,
        id: itemId,
        price: Number(itemData.price) || 0,
        minPax: Number(itemData.minPax) || 1,
        isAvailable: itemData.isAvailable !== false,
        defaultLauk: Array.isArray(itemData.defaultLauk)
          ? itemData.defaultLauk
          : (itemData.defaultLauk ? String(itemData.defaultLauk).split(',').map(s => s.trim()).filter(Boolean) : [])
      };

      if (existingIdx !== -1) {
        list[existingIdx] = { ...list[existingIdx], ...normalizedItem };
      } else {
        list.push(normalizedItem);
      }

      writeStorage(STORAGE_KEY_CATALOG, list);
      return normalizedItem;
    },

    deleteCatalogItem: (itemId) => {
      const list = readStorage(STORAGE_KEY_CATALOG, defaultCatalog);
      const filtered = list.filter(c => c.id !== itemId);
      writeStorage(STORAGE_KEY_CATALOG, filtered);
      return filtered;
    },

    toggleCatalogAvailability: (itemId) => {
      const list = readStorage(STORAGE_KEY_CATALOG, defaultCatalog);
      const item = list.find(c => c.id === itemId);
      if (item) {
        item.isAvailable = item.isAvailable === false ? true : false;
        writeStorage(STORAGE_KEY_CATALOG, list);
        return item;
      }
      return null;
    },

    getEvents: () => {
      return readStorage(STORAGE_KEY_EVENTS, defaultEvents);
    },

    saveEvent: (eventData) => {
      if (!eventData || !eventData.inv) return null;
      const list = readStorage(STORAGE_KEY_EVENTS, defaultEvents);
      const existingIdx = list.findIndex(e => e.inv === eventData.inv);

      if (existingIdx !== -1) {
        list[existingIdx] = { ...list[existingIdx], ...eventData };
      } else {
        list.unshift(eventData);
      }

      writeStorage(STORAGE_KEY_EVENTS, list);
      return eventData;
    },

    getKitchenOrders: () => {
      return readStorage(STORAGE_KEY_KITCHEN, defaultKitchenOrders);
    },

    saveKitchenOrder: (orderData) => {
      if (!orderData || !orderData.id) return null;
      const list = readStorage(STORAGE_KEY_KITCHEN, defaultKitchenOrders);
      const existingIdx = list.findIndex(k => k.id === orderData.id);

      if (existingIdx !== -1) {
        list[existingIdx] = { ...list[existingIdx], ...orderData };
      } else {
        list.unshift(orderData);
      }

      writeStorage(STORAGE_KEY_KITCHEN, list);
      return orderData;
    },

    advanceKitchenOrderStage: (orderId) => {
      const list = readStorage(STORAGE_KEY_KITCHEN, defaultKitchenOrders);
      const ord = list.find(o => o.id === orderId);
      if (!ord) return null;

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

      writeStorage(STORAGE_KEY_KITCHEN, list);
      return ord;
    },

    createKitchenTicketFromOrder: (event, cartItems) => {
      const list = readStorage(STORAGE_KEY_KITCHEN, defaultKitchenOrders);
      const randomSuffix = Math.floor(100 + Math.random() * 900);
      const ticketId = `KDS-${randomSuffix}`;

      let menuText = '';
      let dishes = [];

      if (Array.isArray(cartItems)) {
        menuText = cartItems.map(it => `${it.pax} Pax ${it.name}`).join(' + ');
        cartItems.forEach(it => {
          const itemDishes = it.customLauk || it.defaultLauk || [];
          if (itemDishes.length > 0) {
            itemDishes.forEach(l => dishes.push(`${it.name}: ${l} (${it.pax} porsi)`));
          } else {
            dishes.push(`${it.name} (${it.pax} porsi)`);
          }
          if (it.notes) {
            dishes.push(`Catatan (${it.name}): ${it.notes}`);
          }
        });
      } else if (cartItems) {
        menuText = `${cartItems.pax || 100} Pax ${cartItems.name || 'Paket Catering'}`;
        dishes = cartItems.defaultLauk && cartItems.defaultLauk.length > 0
          ? cartItems.defaultLauk.map(l => `${l} (${cartItems.pax} porsi)`)
          : ['Menu Catering Standar'];
        if (cartItems.notes) {
          dishes.push(`Note: ${cartItems.notes}`);
        }
      } else {
        menuText = 'Pesanan Catering';
        dishes = ['Menu Catering Standar'];
      }

      const newTicket = {
        id: ticketId,
        inv: event.inv,
        client: event.customer,
        time: `${event.date || 'Hari ini'} • ${event.time || '11:00 WIB'}`,
        menu: menuText,
        subItems: dishes,
        stage: 'antrean',
        badge: 'Antrean Produksi Baru',
        urgency: 'high'
      };

      list.unshift(newTicket);
      writeStorage(STORAGE_KEY_KITCHEN, list);
      return newTicket;
    },

    exportFullBackup: () => {
      const events = readStorage(STORAGE_KEY_EVENTS, defaultEvents);
      const kitchen = readStorage(STORAGE_KEY_KITCHEN, defaultKitchenOrders);
      const catalog = readStorage(STORAGE_KEY_CATALOG, defaultCatalog);
      return {
        brand: 'Aish Catering POS',
        version: '1.0',
        timestamp: new Date().toISOString(),
        events,
        kitchenOrders: kitchen,
        catalog
      };
    },

    resetToDefault: () => {
      writeStorage(STORAGE_KEY_EVENTS, defaultEvents);
      writeStorage(STORAGE_KEY_KITCHEN, defaultKitchenOrders);
      writeStorage(STORAGE_KEY_CATALOG, defaultCatalog);
    }
  };
})();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = AishStorage;
}
