Items = new Meteor.Collection("items");
// Items.insert({data: []})
if (Meteor.isClient) {
  data = [];
  for(i=0;i<20;i++){
    var row=[];
    for(j=0;j<20;j++){
      row.push({title:(i+" "+j), color: "aa"});
    }
    data.push(row);
  }
  // Items.update({Session.get("data"):data});
  Session.set("els",data);
  Template.table.element = function(){
  	console.log("wtf");
    
  	return Session.get("els");
  }
  Template.table.events({
    "click td": function(event){
      a = get[]
    }
});


}

if(Meteor.isServer){

}

