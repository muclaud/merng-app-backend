const { model, Schema } = require('mongoose');

const sportswomanSchema = new Schema({
  IBUId: String,
  FullName: String,
  FamilyName: String,
  GivenName: String,
  NAT: String,
  NF: String,
  Birthdate: String,
  BirthYear: Number,
  Age: Number,
  GenderId: String,
  Functions: String,
  PhotoURI: String,
  FlagURI: String,
  Personal: [
    {
      Description: String,
      Value: String,
    },
  ],
  Sport: [
    {
      Description: String,
      Value: String,
    },
  ],
  Equipment: [
    {
      Description: String,
      Value: String,
    },
  ],
  TopResults: [
    {
      RaceId: String,
      Season: String,
      Comp: String,
      Level: String,
      Place: String,
      Rank: String,
      SO: Number,
      Pen: String,
    },
  ],
  comments: [
    {
      body: String,
      username: String,
      createdAt: String,
    },
  ],
  likes: [
    {
      username: String,
      createdAt: String,
    },
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
});

module.exports = model('Sportswoman', sportswomanSchema);
