/**
 * Safe wrapper for localStorage access to prevent crashes on iOS Safari
 * in private mode or when storage is restricted.
 */
class SafeStorage {
    getItem(key) {
        if (typeof window === 'undefined') return null;
        try {
            return localStorage.getItem(key);
        } catch (e) {
            console.warn(`SafeStorage: Failed to get item "${key}"`, e);
            return null;
        }
    }

    setItem(key, value) {
        if (typeof window === 'undefined') return;
        try {
            localStorage.setItem(key, value);
        } catch (e) {
            console.warn(`SafeStorage: Failed to set item "${key}"`, e);
        }
    }

    removeItem(key) {
        if (typeof window === 'undefined') return;
        try {
            localStorage.removeItem(key);
        } catch (e) {
            console.warn(`SafeStorage: Failed to remove item "${key}"`, e);
        }
    }

    clear() {
        if (typeof window === 'undefined') return;
        try {
            localStorage.clear();
        } catch (e) {
            console.warn('SafeStorage: Failed to clear storage', e);
        }
    }
}

export const safeStorage = new SafeStorage();
