Items = new Meteor.Collection("items");
// Items.insert({data: []})
if (Meteor.isClient) {
  Template.table.element = function(){
  	item =  Items.findOne();
    return item;
  }
  Template.table.events({
    "click td": function(event){
      console.log(this);
      item = Items.findOne();
      if(item && item.value){
        item.value[this.i][this.j].color="blue";
        Items.update({_id:item._id},{value:item.value});
      }
    }
  });
  Meteor.subscribe("items");

}

if(Meteor.isServer){
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
}

