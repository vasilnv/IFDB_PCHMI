
const api = {
    //userControler
    registerUser: () => `/users/register`,
    loginUser: () => `/users/login`,
    restaurant: (userId) => `/restaurants/${userId}`,
    blockAccounts: () => `/users/block-accounts`
}

export default api;
