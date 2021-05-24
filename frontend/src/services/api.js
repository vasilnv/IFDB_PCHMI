
const api = {
    //userControler
    registerUser: () => `/users/register`,
    loginUser: (username, password) => `/users/login?username=${username}&password=${password}`,
    restaurant: (userId) => `/restaurants/${userId}`,
    restaurants: () => `/restaurants`,
    blockAccounts: () => `/users/block-accounts`,
    comment: () => `/users/add-comment`,
    restaurantComments: (restaurantId) => `/restaurants/${restaurantId}/comments`
}
export default api;
