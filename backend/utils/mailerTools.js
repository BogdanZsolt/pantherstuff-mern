import MailerLite from '@mailerlite/mailerlite-nodejs';

const mailerlite = new MailerLite({
  api_key: process.env.MAILERLITE_API_KEY,
});

const getSubscriber = async (email) => {
  try {
    const response = await mailerlite.subscribers.find(email);
    if (!response) {
      return null;
    }
    return response.data;
  } catch (err) {
    console.log(err.response.data.message);
  }
};

const assignSubscriberGroup = async (email, groupId) => {
  try {
    const response = await mailerlite.groups.assignSubscriber(email, groupId);
    if (!response) {
      return null;
    }
    return response.data;
  } catch (err) {
    console.log(err.response.data.message);
  }
};

const unAssignSubscriberGroup = async (email, groupId) => {
  try {
    const response = await mailerlite.groups.unAssignSubscriber(email, groupId);
    if (!response) {
      return null;
    }
    return response.data;
  } catch (err) {
    console.log(err.response.data.message);
  }
};

const createSubscriber = async (email, name, groups) => {
  let params = {
    email,
    fields: {
      name,
    },
    groups,
  };

  try {
    const response = await mailerlite.subscribers.createOrUpdate(params);
    if (!response) {
      return null;
    }
    return response.data;
  } catch (err) {
    console.log(err.response.data.message);
  }
};

export {
  createSubscriber,
  getSubscriber,
  assignSubscriberGroup,
  unAssignSubscriberGroup,
};
