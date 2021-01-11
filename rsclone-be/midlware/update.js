const jwt = require('jsonwebtoken');
const User = require('../models/User');

const update = async (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');
  const data = jwt.verify(token, process.env.JWT_KEY);
  try {
    const user = await User.findOne({ _id: data._id, 'tokens.token': token });
    if (!user) {
      throw new Error();
    }

    user.data = req.body;
    req.user = user;
    req.token = token;
    await User.updateOne(
      { _id: data._id },
      {
        $set: {
          data: req.body,
        },
      },
    );
    next();
  } catch (error) {
    res.status(401).send({ error: 'Not authorized to access this resource' });
  }
};
module.exports = update;
