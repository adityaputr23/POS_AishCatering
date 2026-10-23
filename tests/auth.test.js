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

const AishAuth = require('../js/auth.js');

test('AishAuth - Initialization and default seeding', () => {
  localStorage.clear();
  AishAuth.init();

  const staff = AishAuth.getStaffList();
  assert.equal(staff.length >= 2, true, 'Harus memiliki minimal 2 akun default');
  
  const admin = staff.find(s => s.username === 'admin');
  assert.ok(admin, 'Akun admin harus ada');
  assert.equal(admin.role, 'admin');

  const kasir = staff.find(s => s.username === 'kasir');
  assert.ok(kasir, 'Akun kasir harus ada');
  assert.equal(kasir.role, 'kasir');
});

test('AishAuth - Login authentication flow', () => {
  localStorage.clear();
  AishAuth.init();

  // Test invalid login
  const failedLogin = AishAuth.login('admin', 'wrongpass');
  assert.equal(failedLogin.success, false);
  assert.equal(AishAuth.getCurrentUser(), null);

  // Test valid login
  const successLogin = AishAuth.login('admin', 'admin123');
  assert.equal(successLogin.success, true);
  assert.equal(successLogin.user.username, 'admin');
  assert.equal(AishAuth.getCurrentUser().username, 'admin');

  // Test logout
  AishAuth.logout();
  assert.equal(AishAuth.getCurrentUser(), null);
});

test('AishAuth - Staff registration and duplicate prevention', () => {
  localStorage.clear();
  AishAuth.init();

  const regResult = AishAuth.registerStaff({
    name: 'Dewi Rahma',
    username: 'dewi',
    role: 'kasir',
    password: 'dewi123'
  });
  assert.equal(regResult.success, true);

  // Verify can login with new credentials
  const loginDewi = AishAuth.login('dewi', 'dewi123');
  assert.equal(loginDewi.success, true);
  assert.equal(loginDewi.user.name, 'Dewi Rahma');

  // Duplicate username attempt
  const dupResult = AishAuth.registerStaff({
    name: 'Dewi Lain',
    username: 'dewi',
    role: 'dapur',
    password: 'password'
  });
  assert.equal(dupResult.success, false);
});

test('AishAuth - Delete staff and safety guards', () => {
  localStorage.clear();
  AishAuth.init();

  AishAuth.registerStaff({
    name: 'Staf Percobaan',
    username: 'percobaan',
    role: 'kasir',
    password: '123'
  });

  const staffList = AishAuth.getStaffList();
  const target = staffList.find(s => s.username === 'percobaan');
  assert.ok(target);

  const delResult = AishAuth.deleteStaff(target.id);
  assert.equal(delResult.success, true);

  // Check deleted
  const updatedList = AishAuth.getStaffList();
  assert.equal(updatedList.some(s => s.username === 'percobaan'), false);

  // Guard: cannot delete the last admin
  const adminUser = updatedList.find(s => s.role === 'admin');
  const delAdmin = AishAuth.deleteStaff(adminUser.id);
  assert.equal(delAdmin.success, false, 'Tidak boleh menghapus satu-satunya admin');
});
