Meteor.startup(function () {
  // code to run on server at startup
});

Meteor.publish("items", function(){
   // console.log($(document.body).width())
    if(!Items.find().count()){
    console.log("adding items");
    data = [];
    for(i=0;i<20;i++){
      var row=[];
      for(j=0;j<20;j++){
        row.push({i:i,j:j, color: ""});
      }
      data.push(row);
    }
  Items.insert({value:data});
 // Items.insert({game_id:"aaa")
  }
  return Items.find();
});
