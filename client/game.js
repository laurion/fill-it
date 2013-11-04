//////
////// Utility functions
//////

var player = function () {
  return Players.findOne(Session.get('player_id'));
  };

var game = function () {
  // console.log("game():");
  var me = player();
  // console.log(me);
  // if(me) console.log(me.game_id);
  // if(me) console.log(Games.findOne(me.game_id));
  // console.log("--game()");
  return me && me.game_id && Games.findOne(me.game_id);
};

//////
////// lobby template: shows random code to share, and
////// offers a button to start a fresh game.
//////

Template.lobby.show = function () {
  // only show lobby if we're not in a game
  // console.log("start_game: " + game());
  return !game();
};

Template.lobby.waiting = function () {
  var players = Players.find({_id: {$ne: Session.get('player_id')},
                              name: {$ne: ''},
                              game_id: {$exists: false}});

  return players;
};

Template.lobby.count = function () {
  var players = Players.find({_id: {$ne: Session.get('player_id')},
                              name: {$ne: ''},
                              game_id: {$exists: false}});

  return players.count();
};

Template.lobby.disabled = function () {
  var me = player();
  if (me && me.name)
    return '';
  return 'disabled="disabled"';
};

Template.lobby.events({
  'keyup input#myname': function (evt) {
    var name = $('#lobby input#myname').val().trim();
    Session.set("player_name" , name)
    Players.update(Session.get('player_id'), {$set: {name: name}});
  },
  'click button.startgame': function () {
    // console.log("Should start new game");
    Meteor.call('start_new_game');
    // console.log("did it start new game?")
  }
});



//////
////// board template: renders the board and the clock given the
////// current game.
//////

Template.board.element = function() {
	if(player() && player().game_id) 
    return Games.findOne(player().game_id);
}
Template.board.screen = function (){
        var scren = new Object()
         scren.w = $(document.body).width()/20;   
         scren.h = ($(document).height()-200)/25
        return scren
}

Template.board.score = function(){
        return Session.get("player_score");
}
Template.board.player_name = function()
{
        return Session.get('player_name')

}
Template.board.events({
  "click td": function(event) {
    //console.log(this);
    // console.log(Session.get('player_id'));
    
    item = Games.findOne(player().game_id);
    // console.log(player().game_id);
    if(item.board[this.i][this.j].color == 'grey')
    {
    console.log(item);
    var score = Session.get('player_score') + 1;
    if(item && item.board) {
      item.board[this.i][this.j].color = Session.get("color"); //player().color;
      console.log(item.board[this.i][this.j]);
      Games.update(player().game_id, {board: item.board});
    }
    Session.set("player_score", score);
    } 
}
});

Meteor.startup(function () {
  // Allocate a new player id.
  //
  // XXX this does not handle hot reload. In the reload case,
  // Session.get('player_id') will return a real id. We should check for
  // a pre-existing player, and if it exists, make sure the server still
  // knows about us.
  var player_id = Players.insert({name: '', idle: false});
  console.log("player_id: " + player_id);
  Session.set('player_score', 0);
  Session.set('player_id', player_id);
  Session.set('color', get_random_color());
  Session.set('player_name', 'None')
  Meteor.subscribe('players');

  Meteor.autorun(function () {
    console.log("Deps or meteor autorun for reactive re-running");
    Meteor.subscribe('players');

    if (Session.get('player_id')) {
      var me = player();
      console.log("me: " + me);
      if (me && me.game_id) {
        console.log("me.game_id: " + me.game_id);
        Meteor.subscribe('games', me.game_id);
        // Meteor.subscribe('items', me.game_id, Session.get('player_id'));
      }
    }
  });


  // send keepalives so the server can tell when we go away.
  //
  // XXX this is not a great idiom. meteor server does not yet have a
  // way to expose connection status to user code. Once it does, this
  // code can go away.
  Meteor.setInterval(function() {
    if (Meteor.status().connected)
      Meteor.call('keepalive', Session.get('player_id'));
  }, 20*1000);
});




//Meteor.subscribe("items");
