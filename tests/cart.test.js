const test = require('node:test');
const assert = require('node:assert/strict');
const AishCart = require('../js/cart.js');

test('AishCart - Add items and update quantity for existing item', () => {
  let cart = [];
  const item1 = {
    id: 'nasi-box-rendang',
    name: 'Nasi Box Rendang',
    price: 42000,
    unit: '/pax',
    minPax: 25,
    defaultLauk: ['Nasi', 'Rendang', 'Telur']
  };
  const item2 = {
    id: 'tumpeng-megah',
    name: 'Tumpeng Megah',
    price: 1350000,
    unit: '/set',
    minPax: 30,
    defaultLauk: ['Nasi Kuning', 'Ayam Bakar']
  };

  // Add item 1
  cart = AishCart.addItem(cart, item1, 50);
  assert.equal(cart.length, 1);
  assert.equal(cart[0].id, 'nasi-box-rendang');
  assert.equal(cart[0].pax, 50);

  // Add item 2
  cart = AishCart.addItem(cart, item2, 1);
  assert.equal(cart.length, 2);

  // Add item 1 again - should increment pax
  cart = AishCart.addItem(cart, item1, 25);
  assert.equal(cart.length, 2);
  assert.equal(cart[0].pax, 75);
});

test('AishCart - Update pax and clamp to minimum 1', () => {
  let cart = [
    { id: 'snack-box', name: 'Snack Box', price: 18500, pax: 30 }
  ];

  cart = AishCart.updatePax(cart, 0, 45);
  assert.equal(cart[0].pax, 45);

  cart = AishCart.updatePax(cart, 0, -10);
  assert.equal(cart[0].pax, 1); // clamped to 1
});

test('AishCart - Remove item by index', () => {
  let cart = [
    { id: 'item-1', name: 'Menu 1', price: 10000, pax: 10 },
    { id: 'item-2', name: 'Menu 2', price: 20000, pax: 5 }
  ];

  cart = AishCart.removeItem(cart, 0);
  assert.equal(cart.length, 1);
  assert.equal(cart[0].id, 'item-2');
});

test('AishCart - Financial calculations for multi-item order', () => {
  const cart = [
    { id: 'p1', name: 'Prasmanan', price: 65000, pax: 100 }, // 6,500,000
    { id: 's1', name: 'Snack Box', price: 20000, pax: 50 }   // 1,000,000
  ];

  // itemSubtotal = 7,500,000
  // deliveryType = 'kurir', totalPax = 150 (>10) -> deliveryFee = 50,000
  // taxPB1 = 7,500,000 * 0.10 = 750,000
  // totalBill = 7,500,000 + 50,000 + 750,000 = 8,300,000
  // dp50 = 4,150,000
  const fin = AishCart.calculateFinancials(cart, 'kurir', null, 'dp50');

  assert.equal(fin.itemSubtotal, 7500000);
  assert.equal(fin.totalPax, 150);
  assert.equal(fin.deliveryFee, 50000);
  assert.equal(fin.taxPB1, 750000);
  assert.equal(fin.totalBill, 8300000);
  assert.equal(fin.amountDueNow, 4150000);
  assert.equal(fin.remainingBalance, 4150000);
  assert.equal(fin.itemCount, 2);
});

test('AishCart - Format summary text for multi-item', () => {
  const cart = [
    { name: 'Prasmanan Royal', pax: 100, unit: '/pax' },
    { name: 'Snack Box', pax: 50, unit: '/pax' }
  ];

  const summary = AishCart.formatSummaryText(cart);
  assert.equal(summary, 'Prasmanan Royal (100 pax) + Snack Box (50 pax)');

  assert.equal(AishCart.formatSummaryText([]), 'Belum ada menu');
});
