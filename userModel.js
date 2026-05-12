 const axios = require('axios');
  const JSON_SERVER_URL = 'http://localhost:3001';
  
  class UserModel {
    static async findAll() {
      const res = await axios.get(`${JSON_SERVER_URL}/users`);
      return res.data;
    }
    static async findByEmail(email) {
      const users = await this.findAll();
      return users.find(user => user.email === email);
    }
    static async create(userData) {
      const res = await axios.post(`${JSON_SERVER_URL}/users`, userData);
      return res.data;
    }
  }
  module.exports = UserModel;