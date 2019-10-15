import { Repository } from "./repository";

class UserRepository extends Repository {
  constructor(user) {
    super(user);
  }

  async getAllUsers() {
    console.log("UserRepository ", "getAllUsers");
    try {
      return await this.findAllRecords();
    } catch (error) {
      throw error;
    }
  }

  async getAUser(id) {
    console.log("UserRepository ", "getAUser");
    try {

      const theUser = await this.findAllRecords({ id: Number(id) });

      return theUser;
    } catch (error) {
      throw error;
    }
  }

  async createUser(id) {
    try {
      const theUser = await database.users.findOne({
        where: { id: Number(id) }
      });

      return theUser;
    } catch (error) {
      throw error;
    }
  }

  async updateUser(id) {
    try {
      const theUser = await database.users.findOne({
        where: { id: Number(id) }
      });

      return theUser;
    } catch (error) {
      throw error;
    }
  }

  async forgotPass(id) {
    try {
      const theUser = await database.users.findOne({
        where: { id: Number(id) }
      });

      return theUser;
    } catch (error) {
      throw error;
    }
  }

  async getManagees(id) {
    try {
      const theUser = await database.users.findOne({
        where: { id: Number(id) }
      });

      return theUser;
    } catch (error) {
      throw error;
    }
  }
}

export default UserRepository;
