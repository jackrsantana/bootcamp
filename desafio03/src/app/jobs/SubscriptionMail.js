import Mail from '../../lib/Mail';

class SubscriptionMail {
  get key() {
    return 'SubscriptionMail';
  }

  async handle({ data }) {
    const { meetapp, user } = data;

    await Mail.sendMail({
      to: `${meetapp.User.name} <${meetapp.User.email}>`,
      subject: 'Inscrição Realizada',
      template: 'subscription',
      context: {
        organizer: meetapp.User.name,
        meetapp: meetapp.title,
        user: user.name,
        email: user.email,
      },
    });
  }
}

export default new SubscriptionMail();
