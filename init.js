// Only the js file for  declaration
// Read more here : http://docs.meteor.com/#coffeescript
//
//
//
//
//
//
//
//

// Start collections declaration
//


Games = new Meteor.Collection('games');
Players = new Meteor.Collection('players');


// End collections declaration
// 
// -------------------------
//
// Start arrays declaration

COLORS = ['blue','red','green','yellow','orange','purple'];

// End arrays declaration

// Start functions declaration

//new_board :: generate a new random selection of letters.
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
//get_random_color :: get a random element of COLORS array
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

