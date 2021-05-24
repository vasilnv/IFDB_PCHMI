import api from './api';
import requester from './requester';

const userService = {
    getUser: userId => requester(api.getUser(userId)).get(),
    getUserByEmail: userEmail => requester(api.getUserByEmail(userEmail)).get(),
    getUsers: () => requester(api.getFriends()).get(),
    createRestaurant: (userId, data) => requester(api.restaurant(userId)).uploadFile(data),
    register: async (userData) => await requester(api.registerUser()).create(userData),
    login: async (username, password) => await requester(api.loginUser(username, password)).get(),
    blockAccounts: async (userId, data) => await requester(api.blockAccounts()).update(data),
    getRestaurant: async () => await requester(api.restaurant()).get(),
    getRestaurants: async () => await requester(api.restaurants()).get(),
    addComment: async (data) => await requester(api.comment()).create(data),
}


export default userService;