var main_game = null;
$(document).ready(function(){
    main_game = new game_template($('#game_area'));
    //creates a new game_template object called main_game
    main_game.create_cells(9);
    //calls create_cells() method in main_game object to create 9 cells in the #game_area
    main_game.create_players();
    //calls create_players method in main_game object to create player 1 and player 2 and activates player 1 as the current player since it will be the first turn
});

var cell_template = function(parent){
    var self = this;
        //assigns current "this" (the cell_template object) to a variable so it can still be used when "this" changes
            //"this" can change when an event bound to an element calls a method, like when you click an element
            //in that case "this" would become the object that was clicked instead of the object we created with the cell_template constructor
    this.parent = parent;
        //the game_template (game board) that created the cell
    this.element = null;
        //placeholder for the div created by create_self()
    this.symbol = null;
        //placeholder for the symbol of the current player
    this.create_self = function(){
        //create a div with class ttt_cell
        this.element = $("<div>",
            {
                class:'ttt_cell',
                    //gives the div a class labeling it as a tic tac toe cell
                html: '&nbsp;'
                    //space character that prevents an automatic line break at its position
            }
        ).click(this.cell_click);
            //created div calls .cell_click() method when clicked
            //we can change this to target elements that already exist instead of creating new divs
        return this.element;
            //returns the created div: <div class="ttt_cell">&nbsp;</div>
    };
    this.cell_click = function(){
        //console.log("this:", this, "self:", self);
            //"this" has changed to the object that was clicked (the actual div of the cell) so we have to use the "self" variable we set earlier while in the scope of this method
        if(self.element.hasClass('selected')){
            //if the cell was already selected, stop the function
            return;
        }
        //console.log('this cell clicked',self.element);
        var current_player = self.parent.get_current_player();
            //assigns call to get_current_player() method from the current cell's parent game_template (game board) to a variable
            //if we have multiple game boards this can be useful
        self.symbol = current_player.get_symbol();
            //assigns the symbol of the current player_template (the player whose turn it is) to self.symbol
        console.log('current player\'s symbol: '+self.symbol);
        self.element.addClass('selected');
            //adds selected class to the current cell so it won't be selected again (see line 27)
        self.change_symbol(self.symbol);
            //changes the cell's text (with jQuery's .text() method) to the current player's symbol(an X or an O)
        self.parent.cell_clicked(self);
            //tells the game_template which cell was clicked, determines if the game was won and then switches current player to the other player
    };
    this.change_symbol = function(symbol){
        //console.log("this:", this, "self:", self);
            //"this" didn't change so we could use it here but Dan used self
        this.element.text(symbol);
            //changes the cell's text (with jQuery's .text() method) to the current player's symbol(an X or an O)
    };
    this.get_symbol = function(){
        //console.log("this:", this, "self:", self);
            //"this" didn't change so we could use it here but Dan used self
        //gets the symbol inside the current cell
        //there's two methods called get_symbol, this one is called by check_win_conditions() in the game_template
        //it loops through each cell and gets the symbols of each to test if they win
        console.log("this:", this, "self:", self);
        return this.symbol;
            //returns the symbol in the current cell, which we got from calling get_symbol() on the current player_template object
    };
};

var game_template = function(main_element){
    //console.log('game template constructor called');
    var self = this;
        //assigns current "this" to variable so it can still be used when "this" changes
    this.element = main_element;
        //assigns main_element (the main game board div) to this.element
    this.cell_array = [];
        //placeholder for the array that will store the created game cell objects (this.create_cells())
    this.players = [];
        //placeholder for the array that will store the players (X and O in a normal game)
    this.current_player = 0;
        //this will be the index to refer to the players in the this.players array
    //   0    1    2
    //   3    4    5
    //   6    7    8
    this.win_conditions = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];
        //an array of all possible winning combinations on a 3x3 board (line 63-65 gives names to the tic tac toe cells)
        //there might be a better way to do this so that it can work with any amount of cells
    this.create_cells = function(cell_count) {
        //creates number of tic tac toe cells based on cell_count parameter (9 would be a normal game)
        //console.log('game template create cells called');
        for (var i = 0; i < cell_count; i++) {
            //loops based on cell_count amount (9 times in a normal game)
            var cell = new cell_template(this);
                //creates a new cell OBJECT and passes the current game_template as the cell's parent parameter
            var cell_element = cell.create_self();
                //new cell object creates a div for itself
                //this element is assigned to the cell_element variable
            this.cell_array.push(cell);
                //pushes the loop's current cell object to the array this.cell_array
            this.element.append(cell_element);
                //appends the div created by the cell to the main_element (the game board div)
        }
    };
    this.create_players = function(){
        var player1 = new player_template('X', $('#player_1'));
            //creates new player_template object with symbol: X, and element with id #player1
        var player2 = new player_template('O', $('#player_2'));
            //creates new player_template object with symbol: O, and element: with id #player2
        this.players.push(player1);
            //pushes player 1 (X) to the players array (this.players))
        this.players.push(player2);
            //pushes player 2 (O) to the players array (this.players))
        this.players[0].activate_player();
            //calls activate_player() method on the object in this.players array at index 0 (it's player 1 (X))
            //activate player says whose turn it is
    };
    this.switch_players = function(){
        //console.log('current player before '+this.current_player);
        if(this.current_player){
            //if current player index isn't 0
            //this will only work with 2 players in the this.players array
            this.current_player=0;
                //makes current player's index 0
        } else{
            //if current player is 0
            this.current_player=1;
                //makes current player's index 1
        }
        //console.log('current player before '+this.current_player);
    };
    this.get_current_player = function(){
        //console.log('current player is ',this.players);
        return this.players[this.current_player];
            //returns the player object at the current_player index in the this.players array
    };
    this.cell_clicked = function(clicked_cell){
        console.log("this:", this, "self:", self);
            //"this" actually didn't change here, we could use it if we wanted to for some reason
        self.check_win_conditions();
            //calls check_win_conditions() method to test if the clicked cell won the game
        self.players[self.current_player].deactivate_player();
            //calls deactivate_player() method on the current player to remove the active_player class from their element
        self.switch_players();
            //calls switch_players() method on this game_template to change the current_players property to the next player's index in the players array
        self.players[self.current_player].activate_player();
            //calls activate players on the now switched current player to add the active_player class to their element
    };
    this.check_win_conditions = function(){
        //console.log('check win conditions called');
        var current_player_symbol = this.players[this.current_player].get_symbol();
            //calls .get_symbol() method on the player in the this.players array at the current_player index
        for(var i=0; i<this.win_conditions.length;i++){
            //loops through every item in win_conditions array
            //each item is also an array (an array of 3 cells needed to win a game)
            //we loop through THAT next in the j loop
            var count=0;
                //count will increment by one for each cell in the sub array that the current player has a space in
            //console.log('checking win conditions ',this.win_conditions);
            for(var j=0; j<this.win_conditions[i].length; j++){
                //loops through each item in the current array that was in the win_conditions array
                if(this.cell_array[this.win_conditions[i][j]].get_symbol() == current_player_symbol){
                    //if the symbol of the current index (j) in the 3 cells array inside the win_conditions array is the same as the current player's symbol
                    console.log('symbols match');
                    count++;
                        //increment count (when count is 3 you win in a normal game)
                    if(count==3){
                        //if count reaches 3
                        console.log('someone won');
                        this.player_wins(this.players[this.current_player]);
                            //calls this.player_wins method and passes it the current player (player in the players array at the current_player's index)
                    }//end of count == 3
                } //end of symbols match
            } //end of inner loop
        } //end of outer loop
        //TODO check conditions
    };
    this.player_wins = function(player){
        console.log(player.get_symbol()+' won the game');
        alert(player.get_symbol()+' won the game');
            //just tells the browser to alert who won the game
            //probably change this to something else
    };
};

var player_template = function(symbol, element){
    //console.log('player constructor called');
    this.symbol = symbol;
        //assigns symbol parameter to this.symbol
    this.element = element;
        //assigns element parameter to this.element
    this.activate_player = function(){
        //console.log('activate player called');
        this.element.addClass('active_player');
            //adds class "active_player" to the element given in the element parameter (eg: id #player1)
    };
    this.deactivate_player = function(){
        this.element.removeClass('active_player');
            //removes class "active_player" from the element given
    };
    this.get_symbol = function(){
        return this.symbol;
            //returns the symbol (e.g: "X") given in the symbol parameter when the method was called in create_players
    };
};