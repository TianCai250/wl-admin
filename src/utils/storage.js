const TOKEN = 'TOKEN';
const MENU = 'MENU';
const USER_INFO = 'USER_INFO';

const storage = {
    getToken: () => JSON.parse(localStorage.getItem(TOKEN)),
    setToken: value => localStorage.setItem(TOKEN, JSON.stringify(value)),
    removeToken: () => localStorage.removeItem(TOKEN),

    getMenu: () => JSON.parse(localStorage.getItem(MENU)),
    setMenu: value => localStorage.setItem(MENU, JSON.stringify(value)),
    removeMenu: () => localStorage.removeItem(MENU),

    getUserInfo: () => JSON.parse(localStorage.getItem(USER_INFO)),
    setUserInfo: value => localStorage.setItem(USER_INFO, JSON.stringify(value)),
    removeUserInfo: () => localStorage.removeItem(USER_INFO),

    clear: () => localStorage.clear()
};

export default storage;
