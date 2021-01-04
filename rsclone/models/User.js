const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
  email: { type: 'String', requierd: true, unique: true },
  password: { type: 'String', requierd: true },
  nickName: { type: 'String', requierd: true },
  data: {
    numberOfGames: { type: 'String', default: '0' },
    numberOfWins: { type: 'String', default: '0' },
    maximumNumberOfPoints: { type: 'String', default: '0' },
    averageNumbersOfPoints: { type: 'String', default: '0' },
    averageTimeOfGame: { type: 'String', default: '0' },
    maximumTimeOfGame: { type: 'String', default: '0' },
  },
  links: [{ type: Types.ObjectId, ref: 'Link' }],
});

module.exports = model('User', schema);
