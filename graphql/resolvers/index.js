const postsResolvers = require('./posts');
const usersResolvers = require('./users');
const commentsResolvers = require('./comments');
const competitionsResolvers = require('./competitions');
const sportsmanResolvers = require('./sportsman');
const sportswomanResolvers = require('./sportswoman');

module.exports = {
  Post: {
    //   likeCount: (parent) => {
    //     parent.likes.length;
    //   },
    commentCount: (parent) => {
      parent.comments.length;
    },
    // },
    // Competition: {
    //   likeCount: (parent) => {
    //     parent.likes.length;
    //   },
    //   commentCount: (parent) => {
    //     parent.comments.length;
    //   },
    //   ResultCounter: (parent) => {
    //     parent.Results.length;
    //   },
    // },
    // Sportsman: {
    //   likeCount: (parent) => {
    //     parent.likes.length;
    //   },
    //   commentCount: (parent) => {
    //     parent.comments.length;
    //   },
    // },
    // Sportswoman: {
    //   likeCount: (parent) => {
    //     parent.likes.length;
    //   },
    //   commentCount: (parent) => {
    //     parent.comments.length;
    //   },
    // },
    // Sportsmen: {
    //   sportsmenCount: (parent) => {
    //     parent.List.length;
    //   },
    // },
    // Sportswomen: {
    //   sportswomenCount: (parent) => {
    //     parent.List.length;
    //   },
  },
  Query: {
    ...postsResolvers.Query,
    ...competitionsResolvers.Query,
    ...sportsmanResolvers.Query,
    ...sportswomanResolvers.Query,
  },
  Mutation: {
    ...usersResolvers.Mutation,
    ...postsResolvers.Mutation,
    ...commentsResolvers.Mutation,
    ...competitionsResolvers.Mutation,
    ...sportsmanResolvers.Mutation,
    ...sportswomanResolvers.Mutation,
  },
  Subscription: {
    ...postsResolvers.Subscription,
  },
};
