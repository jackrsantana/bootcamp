import Meetaap from '../models/Meetapp';

class OrganizingController {
  async index(req, res) {
    const meetapps = await Meetaap.findAll({
      where: {
        user_id: req.userId,
      },
    });

    return res.json(meetapps);
  }
}

export default new OrganizingController();
