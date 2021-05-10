const { gql } = require('apollo-server');

module.exports = gql`
  type Sportsmen {
    List: [Sportsman]!
    sportsmenCount: Int!
  }
  type Sportswomen {
    List: [Sportswoman]!
    sportswomenCount: Int!
  }
  type Sportsman {
    id: ID!
    IBUId: String!
    FullName: String!
    FamilyName: String!
    GivenName: String!
    NAT: String!
    NF: String!
    Birthdate: String!
    BirthYear: Int!
    Age: Int!
    GenderId: String!
    Functions: String
    PhotoURI: String
    FlagURI: String
    Personal: [PersonalInfo]
    Sport: [PersonalInfo]
    Equipment: [PersonalInfo]
    comments: [Comment]!
    likes: [Like]!
    # likeCount: Int
    # commentCount: Int
    sportsmenCount: Int
  }
  type Sportswoman {
    id: ID!
    IBUId: String!
    FullName: String!
    FamilyName: String!
    GivenName: String!
    NAT: String!
    NF: String!
    Birthdate: String!
    BirthYear: Int!
    Age: Int!
    GenderId: String!
    Functions: String
    PhotoURI: String
    FlagURI: String
    Personal: [PersonalInfo]
    Sport: [PersonalInfo]
    Equipment: [PersonalInfo]
    comments: [Comment]!
    likes: [Like]!
    # likeCount: Int
    # commentCount: Int
  }
  type PersonalInfo {
    Description: String
    Value: String
  }
  type Competition {
    id: ID!
    RaceId: String!
    km: String!
    catId: String!
    StatusText: String
    StartTime: String
    Description: String
    ShortDescription: String
    Location: String
    Results: [Result]!
    comments: [Comment]!
    likes: [Like]!
    # likeCount: Int
    # commentCount: Int
    ResultCounter: Int
  }
  type Result {
    StartOrder: Int
    ResultOrder: Int
    IBUId: String
    Name: String
    ShortName: String
    Nat: String
    Bib: String
    Rank: String
    Shootings: String
    ShootingTotal: String
    RunTime: String
    TotalTime: String
    StartInfo: String
    Behind: String
    Result: String
  }
  type Post {
    id: ID!
    body: String!
    createdAt: String!
    username: String!
    comments: [Comment]!
    likes: [Like]!
    # likeCount: Int!
    commentCount: Int!
  }
  type Comment {
    id: ID!
    createdAt: String!
    username: String!
    body: String!
  }
  type Like {
    id: ID!
    createdAt: String!
    username: String!
  }
  type User {
    id: ID!
    email: String!
    token: String!
    username: String!
    createdAt: String!
  }
  input RegisterInput {
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
  }
  type Query {
    getPosts: [Post]
    getPost(postId: ID!): Post
    getSportsmen: [Sportsman]
    getSportswomen: [Sportswoman]
    getSportsman(IBUId: String!): Sportsman
    getSportswoman(IBUId: String!): Sportswoman
    getCompetitions: [Competition]
    getcompetition(RaceId: String!): Competition
  }
  type Mutation {
    register(registerInput: RegisterInput): User!
    login(username: String!, password: String!): User!
    createPost(body: String!): Post!
    deletePost(postId: ID!): String!
    createComment(postId: ID!, body: String!): Post!
    deleteComment(postId: ID!, commentId: ID!): Post!
    likePost(postId: ID!): Post!
    likeCompetition(RaceId: String!): Competition!
    likeSportsman(IBUId: String!): Sportsman!
    likeSportswoman(IBUId: String!): Sportswoman!
    createCommentCompetition(RaceId: ID!, body: String!): Competition!
    createCommentSportsman(IBUId: ID!, body: String!): Sportsman!
    createCommentSportswoman(IBUId: ID!, body: String!): Sportswoman!
  }
  type Subscription {
    newPost: Post!
  }
`;
