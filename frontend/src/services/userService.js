import api from './api';
import requester from './requester';

const userService = {
    getUser: userId => requester(api.getUser(userId)).get(),
    getUserByEmail: userEmail => requester(api.getUserByEmail(userEmail)).get(),
    getUsers: () => requester(api.getFriends()).get(),
}


export const groupService = {
    getGroup: (id) => requester(api.getGroup(id)).get(),
    addGroup: groupInfo => requester(api.addGroup()).create(groupInfo),
}


export default userService;