// ==========================================================================
// Aish Catering POS - Authentication & Staff Management Engine
// ==========================================================================

const AishAuth = (() => {
  const STORAGE_KEY_STAFF = 'aish_pos_staff_accounts';
  const STORAGE_KEY_SESSION = 'aish_pos_active_session';

  const defaultStaff = [
    {
      id: 'staff-admin-01',
      name: 'Aditya (Manager)',
      username: 'admin',
      password: 'admin123',
      role: 'admin',
      avatar: 'AD',
      createdAt: '2026-10-01'
    },
    {
      id: 'staff-kasir-01',
      name: 'Ratna (Kasir Shift Pagi)',
      username: 'kasir',
      password: '123456',
      role: 'kasir',
      avatar: 'RA',
      createdAt: '2026-10-05'
    }
  ];

  let currentSession = null;

  function loadStaff() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_STAFF);
      if (!raw) {
        localStorage.setItem(STORAGE_KEY_STAFF, JSON.stringify(defaultStaff));
        return [...defaultStaff];
      }
      return JSON.parse(raw);
    } catch (e) {
      console.error('Gagal membaca data staf dari localStorage:', e);
      return [...defaultStaff];
    }
  }

  function saveStaff(staffList) {
    try {
      localStorage.setItem(STORAGE_KEY_STAFF, JSON.stringify(staffList));
    } catch (e) {
      console.error('Gagal menyimpan data staf ke localStorage:', e);
    }
  }

  function loadSession() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_SESSION);
      if (!raw) return null;
      return JSON.parse(raw);
    } catch (e) {
      return null;
    }
  }

  function saveSession(user) {
    try {
      if (!user) {
        localStorage.removeItem(STORAGE_KEY_SESSION);
      } else {
        localStorage.setItem(STORAGE_KEY_SESSION, JSON.stringify(user));
      }
    } catch (e) {}
  }

  return {
    init: () => {
      loadStaff();
      currentSession = loadSession();
    },

    getStaffList: () => {
      return loadStaff();
    },

    getCurrentUser: () => {
      if (!currentSession) {
        currentSession = loadSession();
      }
      return currentSession;
    },

    login: (username, password) => {
      const staffList = loadStaff();
      const user = staffList.find(
        s => s.username.toLowerCase() === String(username).trim().toLowerCase() && s.password === String(password)
      );

      if (!user) {
        return { success: false, message: 'Username atau Password salah!' };
      }

      currentSession = {
        id: user.id,
        name: user.name,
        username: user.username,
        role: user.role,
        avatar: user.avatar || user.name.slice(0, 2).toUpperCase()
      };
      saveSession(currentSession);

      return {
        success: true,
        message: `Selamat datang, ${user.name}!`,
        user: currentSession
      };
    },

    logout: () => {
      currentSession = null;
      saveSession(null);
    },

    registerStaff: ({ name, username, role, password }) => {
      if (!name || !username || !password) {
        return { success: false, message: 'Nama, username, dan password wajib diisi!' };
      }

      const staffList = loadStaff();
      const cleanUsername = String(username).trim().toLowerCase();

      if (staffList.some(s => s.username.toLowerCase() === cleanUsername)) {
        return { success: false, message: `Username "${username}" sudah digunakan!` };
      }

      const initials = name
        .split(' ')
        .map(n => n[0])
        .slice(0, 2)
        .join('')
        .toUpperCase() || 'ST';

      const newStaff = {
        id: 'staff-' + Date.now(),
        name: name.trim(),
        username: cleanUsername,
        password: String(password).trim(),
        role: role || 'kasir',
        avatar: initials,
        createdAt: new Date().toISOString().split('T')[0]
      };

      staffList.push(newStaff);
      saveStaff(staffList);

      return {
        success: true,
        message: `Staf baru ${newStaff.name} berhasil didaftarkan!`,
        staff: newStaff
      };
    },

    deleteStaff: (userId) => {
      const staffList = loadStaff();
      const targetIndex = staffList.findIndex(s => s.id === userId);

      if (targetIndex === -1) {
        return { success: false, message: 'Staf tidak ditemukan!' };
      }

      const target = staffList[targetIndex];

      // Proteksi: jangan hapus admin jika hanya ada 1 admin
      if (target.role === 'admin') {
        const adminCount = staffList.filter(s => s.role === 'admin').length;
        if (adminCount <= 1) {
          return { success: false, message: 'Tidak dapat menghapus satu-satunya akun Administrator!' };
        }
      }

      // Proteksi: tidak bisa menghapus diri sendiri saat login
      if (currentSession && currentSession.id === userId) {
        return { success: false, message: 'Tidak dapat menghapus akun yang sedang aktif digunakan!' };
      }

      staffList.splice(targetIndex, 1);
      saveStaff(staffList);

      return { success: true, message: `Akun staf ${target.name} berhasil dihapus!` };
    }
  };
})();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = AishAuth;
}
