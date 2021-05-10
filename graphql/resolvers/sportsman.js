const { UserInputError } = require('apollo-server');
const Sportsman = require('../../models/Sportsman');
const checkAuth = require('../../util/check-auth');

module.exports = {
  Query: {
    async getSportsmen() {
      try {
        const sportsmen = await Sportsman.find().sort({ NAT: -1 });
        return sportsmen;
      } catch (err) {
        throw new Error(err);
      }
    },
    async getSportsman(_, { IBUId }) {
      try {
        const sportsman = await Sportsman.findById(IBUId);
        if (sportsman) {
          return sportsman;
        } else {
          throw new Error('Sportsman not found');
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    async likeSportsman(_, { IBUId }, context) {
      const { username } = checkAuth(context);

      const sportsman = await Sportsman.findById(IBUId);
      if (sportsman) {
        if (sportsman.likes.find((like) => like.username === username)) {
          //Post already likes, unlike it
          sportsman.likes = sportsman.likes.filter(
            (like) => like.username !== username
          );
        } else {
          // Not liked, like post
          sportsman.likes.push({
            username,
            createdAt: new Date().toISOString(),
          });
        }
        await sportsman.save();
        return sportsman;
      } else throw new UserInputError('Sportsman not found');
    },
    async createCommentSportsman(_, { IBUId, body }, context) {
      const { username } = checkAuth(context);
      if (body.trim() === '') {
        throw new UserInputError('Empty content', {
          errors: {
            body: 'Comment body must not empty',
          },
        });
      }
      const sportsman = await Sportsman.findById(IBUId);
      if (sportsman) {
        sportsman.comments.unshift({
          body,
          username,
          createdAt: new Date().toISOString(),
        });
        await sportsman.save();
        return sportsman;
      } else throw new UserInputError('Sportsman not found');
    },
  },
};
