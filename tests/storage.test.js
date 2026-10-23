const test = require('node:test');
const assert = require('node:assert/strict');

// Provide localStorage polyfill for Node.js test environment if not present
if (typeof globalThis.localStorage === 'undefined') {
  let store = {};
  globalThis.localStorage = {
    getItem: (key) => store[key] || null,
    setItem: (key, val) => { store[key] = String(val); },
    removeItem: (key) => { delete store[key]; },
    clear: () => { store = {}; }
  };
}

const AishStorage = require('../js/storage.js');

test('AishStorage - Initialization and default seeding', () => {
  localStorage.clear();
  AishStorage.init();

  const events = AishStorage.getEvents();
  assert.equal(events.length >= 5, true, 'Harus memiliki minimal 5 data transaksi awal');

  const kitchen = AishStorage.getKitchenOrders();
  assert.equal(kitchen.length >= 3, true, 'Harus memiliki minimal 3 tiket antrean dapur awal');
});

test('AishStorage - Save new event and update existing event', () => {
  localStorage.clear();
  AishStorage.init();

  const newEvent = {
    inv: 'INV-TEST-001',
    customer: 'Ibu Fatimah',
    phone: '0812-3344-5566',
    date: '25 Okt 2026',
    time: '11:00 WIB',
    venue: 'Gedung Serbaguna',
    package: 'Paket Prasmanan Royal Nusantara',
    pax: 100,
    total: 6500000,
    paid: 3250000,
    status: 'dp',
    statusText: 'DP Masuk'
  };

  AishStorage.saveEvent(newEvent);
  let events = AishStorage.getEvents();
  const saved = events.find(e => e.inv === 'INV-TEST-001');
  assert.ok(saved);
  assert.equal(saved.paid, 3250000);

  // Update existing event (pelunasan)
  const updatedEvent = {
    ...newEvent,
    paid: 6500000,
    status: 'lunas',
    statusText: 'Lunas'
  };
  AishStorage.saveEvent(updatedEvent);

  events = AishStorage.getEvents();
  const updated = events.find(e => e.inv === 'INV-TEST-001');
  assert.equal(updated.paid, 6500000);
  assert.equal(updated.status, 'lunas');
});

test('AishStorage - Advance KDS order stage', () => {
  localStorage.clear();
  AishStorage.init();

  const kitchen = AishStorage.getKitchenOrders();
  const target = kitchen[0];
  const initialStage = target.stage;

  const advanced = AishStorage.advanceKitchenOrderStage(target.id);
  assert.notEqual(advanced.stage, initialStage);

  // Verify persistence
  const reloaded = AishStorage.getKitchenOrders().find(k => k.id === target.id);
  assert.equal(reloaded.stage, advanced.stage);
});

test('AishStorage - Auto generate KDS ticket from completed order', () => {
  localStorage.clear();
  AishStorage.init();

  const event = {
    inv: 'INV-AUTO-777',
    customer: 'Bp. Bambang Sutrisno',
    date: 'Minggu, 30 Okt 2026',
    time: '13:00 WIB',
    venue: 'Hotel Mulia Senayan'
  };

  const cartItem = {
    name: 'Paket Prasmanan Royal Nusantara',
    pax: 250,
    defaultLauk: ['Nasi Liwet', 'Rendang Daging Sapi', 'Sup Kimlo'],
    notes: 'Tanpa MSG, pedas level 1'
  };

  const ticket = AishStorage.createKitchenTicketFromOrder(event, cartItem);
  assert.ok(ticket);
  assert.equal(ticket.inv, 'INV-AUTO-777');
  assert.equal(ticket.stage, 'antrean');
  assert.equal(ticket.client, 'Bp. Bambang Sutrisno');

  // Verify ticket exists in kitchen orders list
  const kitchen = AishStorage.getKitchenOrders();
  const found = kitchen.find(k => k.id === ticket.id);
  assert.ok(found);
  assert.equal(found.subItems.length >= 3, true);
});

test('AishStorage - Export backup and reset to default', () => {
  localStorage.clear();
  AishStorage.init();

  const backup = AishStorage.exportFullBackup();
  assert.ok(backup.events);
  assert.ok(backup.kitchenOrders);
  assert.ok(backup.timestamp);

  // Add dummy and then reset
  AishStorage.saveEvent({ inv: 'INV-DUMMY', customer: 'Dummy' });
  assert.ok(AishStorage.getEvents().some(e => e.inv === 'INV-DUMMY'));

  AishStorage.resetToDefault();
  assert.equal(AishStorage.getEvents().some(e => e.inv === 'INV-DUMMY'), false);
});
