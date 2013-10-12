if (Meteor.isClient) {
  data = [];
  for(i=0;i<20;i++){
    var row=[];
    for(j=0;j<20;j++){
      row.push({title:(i+" "+j), body: "test"});
    }
    data.push(row);
  }
  Session.set("els",data);
Template.table.element = function(){
	console.log("wtf");
  
	return Session.get("els");
}
Template.table.events({
  "click td": function(event){
    console.log(this);
  }
});


}

Items = new Meteor.Collection("items");
if(Meteor.isServer){

}

