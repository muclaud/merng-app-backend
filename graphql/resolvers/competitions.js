const { UserInputError } = require('apollo-server');
const Competition = require('../../models/Competition');
const checkAuth = require('../../util/check-auth');

module.exports = {
  Query: {
    async getCompetitions() {
      try {
        const competitions = await Competition.find().sort({ StartTime: -1 });
        return competitions;
      } catch (err) {
        throw new Error(err);
      }
    },
    async getcompetition(_, { RaceId }) {
      try {
        const competition = await Competition.findById(RaceId);
        if (competition) {
          return competition;
        } else {
          throw new Error('Competition not found');
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    async likeCompetition(_, { RaceId }, context) {
      const { username } = checkAuth(context);

      const competition = await Competition.findById(RaceId);
      if (competition) {
        if (competition.likes.find((like) => like.username === username)) {
          //Post already likes, unlike it
          competition.likes = competition.likes.filter(
            (like) => like.username !== username
          );
        } else {
          // Not liked, like post
          competition.likes.push({
            username,
            createdAt: new Date().toISOString(),
          });
        }
        await competition.save();
        return competition;
      } else throw new UserInputError('Competition not found');
    },
    async createCommentCompetition(_, { RaceId, body }, context) {
      const { username } = checkAuth(context);
      if (body.trim() === '') {
        throw new UserInputError('Empty content', {
          errors: {
            body: 'Comment body must not empty',
          },
        });
      }
      const competition = await Competition.findById(RaceId);
      if (competition) {
        competition.comments.unshift({
          body,
          username,
          createdAt: new Date().toISOString(),
        });
        await competition.save();
        return competition;
      } else throw new UserInputError('Competition not found');
    },
  },
};
