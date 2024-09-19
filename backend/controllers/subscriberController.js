import asyncHandler from '../middleware/asyncHandler.js';
import dotenv from 'dotenv';
dotenv.config();
import MailerLite from '@mailerlite/mailerlite-nodejs';
import MailerCheck from '../utils/mailerCheck.js';

const mailerlite = new MailerLite({
  api_key: process.env.MAILERLITE_API_KEY,
});

const mailerCheck = new MailerCheck({
  api_key: process.env.MAILERCHECK_API_KEY,
});

const getGroups = asyncHandler(async (req, res) => {
  mailerlite.groups
    .get()
    .then((response) => {
      res.status(200).json(response.data);
    })
    .catch((err) => {
      if (err.response) {
        res.status(err.response.status);
        throw new Error(err.response.data.message);
      }
    });
});

// @desc    Get subscribers belonging to a group
// @route   POST /api/groups/:id/subscribers
// @access  Private/Admin
const getGroupSubscribers = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const params = {
    filter: {
      status: 'active',
    },
  };

  await mailerlite.groups
    .getSubscribers(id, params)
    .then((response) => {
      res.status(200).json(response.data);
    })
    .catch((err) => {
      if (err.response) {
        res.status(err.response.status);
      }
    });
});

const getSubscribers = asyncHandler(async (req, res) => {
  const params = {
    filter: {
      status: 'active',
    },
  };

  await mailerlite.subscribers
    .get(params)
    .then((response) => {
      res.status(200).json(response.data);
    })
    .catch((err) => {
      if (err.response) {
        res.status(err.response.status);
      }
    });
});

const getSubscriber = asyncHandler(async (req, res) => {
  await mailerlite.subscribers
    .find(req.params.email)
    .then((response) => {
      res.status(200).json(response.data);
    })
    .catch((err) => res.status(err.response.status));
});

const createSubscriber = asyncHandler(async (req, res) => {
  let params = {
    email: req.body.email,
    fields: {
      name: req.body.name,
    },
    groups: [process.env.SUBSCRIBE_GROUP],
  };

  mailerlite.subscribers
    .createOrUpdate(params)
    .then((response) => {
      res.status(201).json(response.data);
    })
    .catch((err) => {
      if (err.response) {
        res.status(err.response.status);
      }
    });
});

const getCountSubscribers = asyncHandler(async (req, res) => {
  mailerlite.subscribers
    .getCount()
    .then((response) => {
      res.status(200).json(response.data);
    })
    .catch((err) => {
      if (err.response) {
        res.status(err.response.status);
        throw new Error(err.response.data.message);
      }
    });
});

const checkemail = asyncHandler(async (req, res) => {
  await mailerCheck
    .checkEmail({ email: req.body.email })
    .then((response) => {
      res.status(200).json(response.data.status);
    })
    .catch((err) => {
      console.log(err);
    });
});

export {
  checkemail,
  getGroups,
  getSubscribers,
  getSubscriber,
  getCountSubscribers,
  createSubscriber,
  getGroupSubscribers,
};
