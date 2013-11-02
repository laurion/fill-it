Items = new Meteor.Collection("items");

Games = new Meteor.Collection('games');
// { players: [{player_id, name}], winners: [player_id] }

Players = new Meteor.Collection('players');
// {name: 'laur', game_id: xxx}