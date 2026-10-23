// ==========================================================================
// Aish Catering POS - Offline Storage Engine & KDS Ticket Generator
// ==========================================================================

const AishStorage = (() => {
  const STORAGE_KEY_EVENTS = 'aish_pos_events_history';
  const STORAGE_KEY_KITCHEN = 'aish_pos_kitchen_orders';

  const defaultEvents = [
    {
      inv: 'INV-2025/V/092',
      customer: 'Hj. Nurlaila Fitri',
      phone: '0812-9843-2211',
      date: '24 Mei 2026',
      time: '10:30 WIB',
      venue: 'Gedung Graha Mandiri Lt. 3 Ballroom, Jakarta',
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
      venue: 'Gedung Menara Multimedia Lt. 12',
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
      venue: 'Balai Samudera Kelapa Gading',
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
      venue: 'Perum Villa Bintaro Regency D2/14',
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
      venue: 'Masjid Agung Al-Azhar Kebayoran',
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

    createKitchenTicketFromOrder: (event, cartItem) => {
      const list = readStorage(STORAGE_KEY_KITCHEN, defaultKitchenOrders);
      const randomSuffix = Math.floor(100 + Math.random() * 900);
      const ticketId = `KDS-${randomSuffix}`;

      const dishes = cartItem && cartItem.defaultLauk && cartItem.defaultLauk.length > 0
        ? cartItem.defaultLauk.map(l => `${l} (${cartItem.pax} porsi)`)
        : ['Menu Catering Standar'];

      if (cartItem && cartItem.notes) {
        dishes.push(`Note: ${cartItem.notes}`);
      }

      const newTicket = {
        id: ticketId,
        inv: event.inv,
        client: event.customer,
        time: `${event.date || 'Hari ini'} • ${event.time || '11:00 WIB'}`,
        menu: `${cartItem ? cartItem.pax : 100} Pax ${cartItem ? cartItem.name : 'Paket Catering'}`,
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
      return {
        brand: 'Aish Catering POS',
        version: '1.0',
        timestamp: new Date().toISOString(),
        events,
        kitchenOrders: kitchen
      };
    },

    resetToDefault: () => {
      writeStorage(STORAGE_KEY_EVENTS, defaultEvents);
      writeStorage(STORAGE_KEY_KITCHEN, defaultKitchenOrders);
    }
  };
})();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = AishStorage;
}
