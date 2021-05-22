import api from './api';
import requester from './requester';

const userService = {
    getUser: userId => requester(api.getUser(userId)).get(),
    getUserByEmail: userEmail => requester(api.getUserByEmail(userEmail)).get(),
    getUsers: () => requester(api.getFriends()).get(),
    register: async (userData) => await requester(api.registerUser()).create(userData),
    login: async (userData) => await requester(api.loginUser()).create(userData),
}


export default userService;