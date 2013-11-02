Meteor.startup(function () {
  // code to run on server at startup
});
Meteor.publish("items", function(){
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
  }
  return Items.find();
});