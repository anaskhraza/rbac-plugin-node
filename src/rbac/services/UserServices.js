import UserRepository from "../repository/UserRepository";


class UserServices {
  constructor(users) {
    this.UserRepository = new UserRepository(users);

    this.getAllUsers = this.getAllUsers.bind(this);
    this.getAUser = this.getAUser.bind(this);
  }

  async getAllUsers() {
    console.log("UserController ", "UserController");
    return await this.UserRepository.getAllUsers();
  }

  async getAUser(id) {
    console.log("UserServices getAUser ", "getAUser");
    return await this.UserRepository.getAllUsers(id);
  }

}


export default UserServices;
