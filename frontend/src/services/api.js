
const api = {
    //userControler
    registerUser: () => `/users/register`,
    loginUser: (username, password) => `/users/login?username=${username}&password=${password}`,
    restaurant: (userId) => `/restaurants/${userId}`,
    restaurants: () => `/restaurants`,
    blockAccounts: () => `/users/block`,
    comment: () => `/users/add-comment`,
    removeComment: (restaurantId, comment) => `/restaurants/${restaurantId}/comments/${comment}`,
    restaurantComments: (restaurantId) => `/restaurants/${restaurantId}/comments`,
    users: () => `users/all`,
}
export default api;
