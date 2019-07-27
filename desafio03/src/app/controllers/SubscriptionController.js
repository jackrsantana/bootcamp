import * as Yup from 'yup';
import { Op } from 'sequelize';

import Meetapp from '../models/Meetapp';
import User from '../models/User';
import Subscription from '../models/Subscription';
import Queue from '../../lib/Queue';
import SubscriptionMail from '../jobs/SubscriptionMail';

class SubscriptionController {
  async index(req, res) {
    const subscriptions = await Subscription.findAll({
      where: {
        user_id: req.userId,
      },
      include: [
        {
          model: Meetapp,
          where: {
            date: {
              [Op.gt]: new Date(),
            },
          },
          required: true,
        },
      ],
      order: [[Meetapp, 'date']],
    });

    return res.json(subscriptions);
  }

  async store(req, res) {
    const user = await User.findByPk(req.userId);
    const meetapp = await Meetapp.findByPk(req.params.meetappId, {
      include: [{ model: User, attributes: ['name', 'email'] }],
    });

    console.log('a fila executou');

    if (meetapp.user_id === user.id) {
      return res
        .status(400)
        .json({ error: "Can't subscribe to you own meetapps" });
    }

    if (meetapp.past) {
      return res
        .status(400)
        .json({ error: "Can't subscribe to past meetapps" });
    }

    const checkDate = await Subscription.findOne({
      where: {
        user_id: user.id,
      },
      include: [
        {
          model: Meetapp,
          required: true,
          where: {
            date: meetapp.date,
          },
        },
      ],
    });

    if (checkDate) {
      return res
        .status(400)
        .json({ error: "Can't subscribe to two meetups at the same time" });
    }

    const subscribe = await Subscription.create({
      user_id: user.id,
      meetapp_id: meetapp.id,
    });

    await Queue.add(SubscriptionMail, { meetapp, user });

    return res.json(subscribe);
  }
}

export default new SubscriptionController();
