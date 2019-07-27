import * as Yup from 'yup';
import { startOfDay, parseISO, isBefore, endOfDay } from 'date-fns';
import { Op } from 'sequelize';

import Meetaap from '../models/Meetapp';
import User from '../models/User';

class MeetappController {
  async index(req, res) {
    const where = {};
    const { page = 1 } = req.query;

    if (req.query.date) {
      const searchDate = parseISO(req.query.date);

      where.date = {
        [Op.between]: [startOfDay(searchDate), endOfDay(searchDate)],
      };
    }

    const metapps = await Meetaap.findAll({
      where,
      include: [{ model: User, attributes: ['id', 'name', 'email'] }],
      order: ['date'],
      limit: 10,
      offset: (page - 1) * 10,
    });

    return res.json(metapps);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      file_id: Yup.string().required(),
      description: Yup.string().required(),
      location: Yup.string().required(),
      date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validate fails' });
    }

    const { file_id, user_id, title, description, location, date } = req.body;

    const dayStart = startOfDay(parseISO(date));

    if (isBefore(dayStart, new Date())) {
      return res.status(401).json({ error: 'Past dates are not permited' });
    }

    const meetapp = await Meetaap.create({
      file_id,
      user_id,
      title,
      description,
      location,
      date,
    });

    return res.json(meetapp);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      file_id: Yup.string().required(),
      description: Yup.string().required(),
      location: Yup.string().required(),
      date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validate fails' });
    }

    const meetaap = await Meetaap.findByPk(req.params.id);

    if (meetaap.user_id !== req.userId) {
      return res.status(401).json('Not authorized');
    }

    if (meetaap.past) {
      return res.status(401).json("Can't update past meetups");
    }

    if (isBefore(parseISO(req.body.date), new Date())) {
      return res.status(401).json('Meetup date invalid');
    }

    await meetaap.update(req.body);

    return res.json(meetaap);
  }

  async delete(req, res) {
    const meetaap = await Meetaap.findByPk(req.params.id);

    if (meetaap.user_id !== req.userId) {
      return res.status(401).json('Not authorized');
    }

    if (meetaap.past) {
      return res.status(401).json("Can't delete past meetups");
    }

    await meetaap.destroy();

    return res.send();
  }
}

export default new MeetappController();
