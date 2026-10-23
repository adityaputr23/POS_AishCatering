// ==========================================================================
// Aish Catering POS - Multi-Item Cart Engine & Financial Calculators
// ==========================================================================

const AishCart = (() => {
  /**
   * Add an item to the cart or increment its pax if already present.
   * @param {Array} cart - Current cart array
   * @param {Object} item - Catalog item
   * @param {number} pax - Number of portions/pax to add
   * @returns {Array} Updated cart
   */
  const addItem = (cart = [], item, pax = null) => {
    const existingIndex = cart.findIndex(c => c.id === item.id);
    const addedPax = Number(pax) > 0 ? Number(pax) : (item.minPax || 1);

    if (existingIndex >= 0) {
      const updated = [...cart];
      updated[existingIndex] = {
        ...updated[existingIndex],
        pax: updated[existingIndex].pax + addedPax
      };
      return updated;
    }

    const newItem = {
      id: item.id,
      name: item.name,
      price: Number(item.price) || 0,
      unit: item.unit || '/pax',
      minPax: item.minPax || 1,
      pax: addedPax,
      defaultLauk: Array.isArray(item.defaultLauk) ? [...item.defaultLauk] : [],
      customLauk: Array.isArray(item.defaultLauk) ? [...item.defaultLauk] : [],
      notes: item.notes || '',
      complementary: item.complementary || '',
      image: item.image || ''
    };

    return [...cart, newItem];
  };

  /**
   * Update the pax count for an item at index, clamped to minimum 1.
   * @param {Array} cart
   * @param {number} index
   * @param {number} pax
   * @returns {Array}
   */
  const updatePax = (cart = [], index, pax) => {
    if (index < 0 || index >= cart.length) return cart;
    const clampedPax = Math.max(1, Math.round(Number(pax) || 1));
    const updated = [...cart];
    updated[index] = {
      ...updated[index],
      pax: clampedPax
    };
    return updated;
  };

  /**
   * Remove an item from the cart by index.
   * @param {Array} cart
   * @param {number} index
   * @returns {Array}
   */
  const removeItem = (cart = [], index) => {
    return cart.filter((_, i) => i !== index);
  };

  /**
   * Calculate all financial breakdowns for current cart.
   * @param {Array} cart
   * @param {string} deliveryType - 'ambil', 'kurir', 'buffet'
   * @param {number|null} customFee - Optional custom delivery fee
   * @param {string} paymentTerm - 'dp30', 'dp50', 'full'
   */
  const calculateFinancials = (cart = [], deliveryType = 'kurir', customFee = null, paymentTerm = 'dp50') => {
    const itemSubtotal = cart.reduce((sum, it) => sum + ((Number(it.price) || 0) * (Number(it.pax) || 0)), 0);
    const totalPax = cart.reduce((sum, it) => sum + (Number(it.pax) || 0), 0);

    let deliveryFee = 0;
    if (deliveryType === 'ambil') {
      deliveryFee = 0;
    } else if (deliveryType === 'buffet') {
      deliveryFee = 150000;
    } else {
      // 'kurir'
      if (customFee !== null && customFee !== undefined && Number(customFee) >= 0) {
        deliveryFee = Number(customFee);
      } else if (totalPax <= 10) {
        deliveryFee = 20000;
      } else {
        deliveryFee = 50000;
      }
    }

    const taxPB1 = Math.round(itemSubtotal * 0.10);
    const totalBill = itemSubtotal + deliveryFee + taxPB1;

    let amountDueNow = totalBill;
    if (paymentTerm === 'dp30') {
      amountDueNow = Math.round(totalBill * 0.30);
    } else if (paymentTerm === 'dp50') {
      amountDueNow = Math.round(totalBill * 0.50);
    } else {
      amountDueNow = totalBill;
    }

    const remainingBalance = Math.max(0, totalBill - amountDueNow);

    return {
      itemSubtotal,
      totalPax,
      deliveryFee,
      taxPB1,
      totalBill,
      amountDueNow,
      remainingBalance,
      itemCount: cart.length
    };
  };

  /**
   * Format human-friendly summary text for an order
   * @param {Array} cart
   * @returns {string}
   */
  const formatSummaryText = (cart = []) => {
    if (!Array.isArray(cart) || cart.length === 0) {
      return 'Belum ada menu';
    }
    return cart.map(it => `${it.name} (${it.pax} ${it.unit ? it.unit.replace('/', '') : 'pax'})`).join(' + ');
  };

  return {
    addItem,
    updatePax,
    removeItem,
    calculateFinancials,
    formatSummaryText
  };
})();

// Export for Node.js test environment or Browser global
if (typeof module !== 'undefined' && module.exports) {
  module.exports = AishCart;
}
