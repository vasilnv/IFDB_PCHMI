import api from './api';
import requester from './requester';

const userService = {
    getUser: userId => requester(api.getUser(userId)).get(),
    getUserByEmail: userEmail => requester(api.getUserByEmail(userEmail)).get(),
    getUsers: () => requester(api.getFriends()).get(),
    createRestaurant: (userId, data) => requester(api.restaurant(userId)).uploadFile(data),
    register: async (userData) => await requester(api.registerUser()).create(userData),
    login: async (userData) => await requester(api.loginUser()).create(userData),
    blockAccounts: async (userId, data) => await requester(api.blockAccounts()).update(data),
}


export default userService;