const BirthdayModel = require('../models/birthdayModel');
  
  exports.getBirthdays = async (req, res) => {
    try {
      const birthdays = await BirthdayModel.findByUserId(req.userId);
      res.json(birthdays);
    } catch(err) {
      res.status(500).json({ message: err.message });
    }
  };
  
  exports.createBirthday = async (req, res) => {
    try {
      const { name, date } = req.body;
      if (!name || !date) {
        return res.status(400).json({ message: 'Name and date required' });
      }
      const newBirthday = await BirthdayModel.create({
        id: Date.now().toString(),
        name,
        date,
        userId: req.userId,
        createdAt: new Date().toISOString()
      });
      res.status(201).json(newBirthday);
    } catch(err) {
      res.status(500).json({ message: err.message });
    }
  };
  
  exports.updateBirthday = async (req, res) => {
    try {
      const { id } = req.params;
      const birthday = await BirthdayModel.findById(id);
      if (!birthday) {
        return res.status(404).json({ message: 'Birthday not found' });
      }
      if (birthday.userId !== req.userId) {
        return res.status(403).json({ message: 'Unauthorized' });
      }
      const updated = await BirthdayModel.update(id, { ...birthday, ...req.body });
      res.json(updated);
    } catch(err) {
      res.status(500).json({ message: err.message });
    }
  };
  
  exports.deleteBirthday = async (req, res) => {
    try {
      const { id } = req.params;
      const birthday = await BirthdayModel.findById(id);
      if (!birthday) {
        return res.status(404).json({ message: 'Birthday not found' });
      }
      if (birthday.userId !== req.userId) {
        return res.status(403).json({ message: 'Unauthorized' });
      }
      await BirthdayModel.delete(id);
      res.json({ message: 'Birthday deleted' });
    } catch(err) {
      res.status(500).json({ message: err.message });
    }
  };