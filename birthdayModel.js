const axios = require('axios');
  const JSON_SERVER_URL = 'http://localhost:3001';
  
  class BirthdayModel {
    static async findAll() {
      const res = await axios.get(`${JSON_SERVER_URL}/birthdays`);
      return res.data;
    }
    static async findByUserId(userId) {
      const all = await this.findAll();
      return all.filter(b => b.userId === userId);
    }
    static async create(birthdayData) {
      const res = await axios.post(`${JSON_SERVER_URL}/birthdays`, birthdayData);
      return res.data;
    }
    static async update(id, updatedData) {
      const res = await axios.put(`${JSON_SERVER_URL}/birthdays/${id}`, updatedData);
      return res.data;
    }
    static async delete(id) {
      await axios.delete(`${JSON_SERVER_URL}/birthdays/${id}`);
      return true;
    }
    static async findById(id) {
      const res = await axios.get(`${JSON_SERVER_URL}/birthdays/${id}`);
      return res.data;
    }
  }
  module.exports = BirthdayModel;