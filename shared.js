Games = new Meteor.Collection('games');
// { players: [{player_id, name}], winners: [player_id] }
// Items = new Meteor.Collection('items');

Players = new Meteor.Collection('players');
// {name: 'laur', game_id: xxx}

COLORS = ['blue','red','green','yellow','orange','purple'];
// generate a new random selection of letters.
new_board = function () {
	console.log("GENERATING NEW BOARD!!!!!!!!");
  	var board = [];
	console.log("adding items");
	for (var i = 0; i < 20; i++){
	  var row = [];
	  for (var j = 0; j < 20; j++){
	      row.push({i: i,j: j, color: "grey"});
	  }
	  board.push(row);
	}
  	return board;
};

get_random_color = function() {
	if(COLORS.length) {
      var index = parseInt(Math.random()*COLORS.length,10);
      var chosen_color = COLORS[index];
      COLORS.splice(index,1);
    }
    else {
      var letters = '0123456789ABCDEF'.split('');
      chosen_color = '#';
      for (var i = 0; i < 6; i++ ) {
      	chosen_color += letters[Math.round(Math.random() * 15)];
      }
    }
    console.log(chosen_color);
    return chosen_color;
}

if (Meteor.isServer) {
	// publish all the non-idle players.
	Meteor.publish('players', function () {
	  return Players.find({idle: false});
	});

	// publish single games
	Meteor.publish('games', function (id) {
	  check(id, String);
	  return Games.find({_id: id});
	});

	// Meteor.publish('items', function (game_id, player_id) {
	//     check(game_id, String);
	//     check(player_id, String);
	//     return Items.find({$or: [{game_id: game_id},
 //                             {player_id: player_id}]});
 //  });
}