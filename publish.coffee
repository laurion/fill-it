# Publish file for collections
# Read more here : http://docs.meteor.com/#dataandsecurity
# 
#
#
#
#
#
#
#


if Meteor.isServer
  
  # publish all the non-idle players.
  Meteor.publish "players", ->
    Players.find idle: false

  
  # publish single games
  Meteor.publish "games", (id) ->
    check id, String
    Games.find _id: id

