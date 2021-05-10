const { UserInputError } = require('apollo-server');
const Sportswoman = require('../../models/Sportswoman');
const checkAuth = require('../../util/check-auth');

module.exports = {
  Query: {
    async getSportswomen() {
      try {
        const sportswomen = await Sportswoman.find().sort({ NAT: -1 });
        return sportswomen;
      } catch (err) {
        throw new Error(err);
      }
    },
    async getSportswoman(_, { IBUId }) {
      try {
        const sportswoman = await Sportswoman.findById(IBUId);
        if (sportswoman) {
          return sportswoman;
        } else {
          throw new Error('Sportswoman not found');
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    async likeSportswoman(_, { IBUId }, context) {
      const { username } = checkAuth(context);

      const sportswoman = await Sportswoman.findById(IBUId);
      if (sportswoman) {
        if (sportswoman.likes.find((like) => like.username === username)) {
          //Post already likes, unlike it
          sportswoman.likes = sportswoman.likes.filter(
            (like) => like.username !== username
          );
        } else {
          // Not liked, like post
          sportswoman.likes.push({
            username,
            createdAt: new Date().toISOString(),
          });
        }
        await sportswoman.save();
        return sportswoman;
      } else throw new UserInputError('Sportswoman not found');
    },
    async createCommentSportswoman(_, { IBUId, body }, context) {
      const { username } = checkAuth(context);
      if (body.trim() === '') {
        throw new UserInputError('Empty content', {
          errors: {
            body: 'Comment body must not empty',
          },
        });
      }
      const sportswoman = await Sportswoman.findById(IBUId);
      if (sportswoman) {
        sportswoman.comments.unshift({
          body,
          username,
          createdAt: new Date().toISOString(),
        });
        await sportswoman.save();
        return sportswoman;
      } else throw new UserInputError('Sportsman not found');
    },
  },
};
