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
Colors = new Meteor.Collection('colors');

// End collections declaration
// 
// -------------------------
//
//Start global varibale declaration
//
var q = 0;
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
//insert_colors :: insert random ten colors in db
insert_colors = function () {
        

          var letters = '0123456789ABCDEF'.split('');
          chosen_color = '#';
             for (var j = 0; j < 6; j++ ) {
            	chosen_color += letters[Math.round(Math.random() * 15)];
                }
                
              Colors.insert({"cid" : q , color : chosen_color, use:0});
              q++;
               
    
     
};
//get_random_color :: get a random element of COLORS array
get_random_color = function() {
	var count = Colors.find({ use : 0 }).count();
    if(count == 0) {
        insert_colors();
        count = Colors.find({ use : 0 }).count();
    }

      var t  = parseInt(Math.random()*count,10);
      var col  = Colors.findOne({"cid" : t});
      var chosen_color = col.color;

      
       Colors.update({"_id" : col._id }, { $set : { "use" : 1 } });    
 
    console.log(chosen_color);
    return chosen_color;
};

