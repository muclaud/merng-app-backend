const { model, Schema } = require('mongoose');

const competitionSchema = new Schema({
  RaceId: String,
  km: String,
  catId: String,
  StatusText: String,
  StartTime: String,
  Description: String,
  ShortDescription: String,
  Location: String,
  Results: [
    {
      StartOrder: Number,
      ResultOrder: Number,
      IBUId: String,
      Name: String,
      ShortName: String,
      Nat: String,
      Bib: String,
      Rank: String,
      Shootings: String,
      ShootingTotal: String,
      RunTime: String,
      TotalTime: String,
      StartInfo: String,
      Behind: String,
      Result: String,
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

module.exports = model('competition', competitionSchema);
