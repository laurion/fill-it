Template.board.element = function(){
    var	item =  Items.findOne(); 
    return item;
    
}
Template.board.screen = function (){
        var scren = new Object()
         scren.w = $(document.body).width()/20;   
         scren.h = $(document).height()/25
        return scren
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
