import api from './api';
import requester from './requester';

const userService = {
    getUser: userId => requester(api.getUser(userId)).get(),
    getUserByEmail: userEmail => requester(api.getUserByEmail(userEmail)).get(),
    getUsers: () => requester(api.getFriends()).get(),
    createRestaurant: (userId, data) => requester(api.restaurant(userId)).uploadFile(data),
    register: async (userData) => await requester(api.registerUser()).create(userData),
    login: async (username, password) => await requester(api.loginUser(username, password)).get(),
    blockAccounts: async (data) => await requester(api.blockAccounts()).update(data),
    getRestaurant: async (restaurantId) => await requester(api.restaurant(restaurantId)).get(),
    getComments: async (restaurantId) => await requester(api.restaurantComments(restaurantId)).get(),
    getRestaurants: async () => await requester(api.restaurants()).get(),
    getUsers: async () => await requester(api.users()).get(),
    addComment: async (data) => await requester(api.comment()).create(data),
    removeComment: async (commentId) => await requester(api.removeComment(commentId)).delete(),
    getRates: async (restaurantId, userId) => await requester(api.rates(restaurantId, userId)).get(),
    updateRate: async (data) => await requester(api.rate()).create(data),
}


export default userService;