# Backend file
# Read more here : http://docs.meteor.com/#structuringyourapp
#
#
#
#
#
#
#
# 

Meteor.methods
  start_new_game: ->
    console.log "Starting new game..."
    
    # create a new game w/ fresh board
    game_id = Games.insert(
      board: new_board()
      clock: 120
    )
    
    # move everyone who is ready in the lobby to the game
    Players.update # color: ''},
      game_id: null
      idle: false
      name:
        $ne: ""
    ,
      $set: #,color:chosen_color}},
        game_id: game_id
    ,
      multi: true

    
    # Save a record of who is in the game, so when they leave we can
    # still show them.
    p = Players.find(
      game_id: game_id
    ,
      fields:
        _id: true
        name: true
    ).fetch()
    console.log "PLAYERS in the game:\n"
    console.log p
    Games.update
      _id: game_id
    ,
      $set:
        players: p

    
    # wind down the game clock
    clock = 120
    interval = Meteor.setInterval(->
      clock -= 1
      Games.update game_id,
        $set:
          clock: clock

      
      # end of game
      if clock is 0
        
        # stop the clock
        Meteor.clearInterval interval
        
        # declare zero or more winners
        scores = {}
        Games.find(game_id: game_id).forEach (item) ->
          item = item.board
          scores[item.player_id] = 0  unless scores[item.player_id]
          scores[item.player_id] += 1

        high_score = _.max(scores)
        winners = []
        _.each scores, (score, player_id) ->
          winners.push player_id  if score is high_score

        Games.update game_id,
          $set:
            winners: winners

    , 1000)
    game_id

  keepalive: (player_id) ->
    check player_id, String
    Players.update
      _id: player_id
    ,
      $set:
        last_keepalive: (new Date()).getTime()
        idle: false


Meteor.setInterval (->
  now = (new Date()).getTime()
  idle_threshold = now - 70 * 1000 # 70 sec
  remove_threshold = now - 60 * 60 * 1000 # 1hr
  Players.update
    last_keepalive:
      $lt: idle_threshold
  ,
    $set:
      idle: true


# XXX need to deal with people coming back!

), 30 * 1000
