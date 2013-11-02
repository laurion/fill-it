Template.board.element = function(){
	item =  Items.findOne();
  return item;
}
Template.board.events({
  "click td": function(event){
    console.log(this);
    console.log(Session.get());
    item = Items.findOne();
    if(item && item.value){
      item.value[this.i][this.j].color="blue";
      Items.update({_id:item._id},{value:item.value});
    }
  }
});
Meteor.subscribe("items");