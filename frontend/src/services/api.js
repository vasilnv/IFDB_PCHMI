
const api = {
    //userControler
    registerUser: () => `/users/register`,
    loginUser: (username, password) => `/users/login?username=${username}&password=${password}`,
    restaurant: (userId) => `/restaurants/${userId}`,
    restaurants: (userId) => `/restaurants`,
    blockAccounts: () => `/users/block-accounts`
}
export default api;
