const Event = require('../models/Event');

module.exports = {
  async index(req, res) {
    const events = await Event.findAll();
    return res.json(events);
  },

  async store(req, res) {
    const { title, date, organizer_id } = req.body;
    const event = await Event.create({ id,title, date, organizer_id });
    return res.json(event);
  }
};
