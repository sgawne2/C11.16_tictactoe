var main_game = null;
$(document).ready(function(){
    var size = 5;
    main_game = new game_template($('#game_area'), size, size);
    //creates a new game_template object called main_game
    main_game.create_cells(size, size);
    //calls create_cells() method in main_game object to create 9 cells in the #game_area
    main_game.create_players();
    //calls create_players method in main_game object to create player 1 and player 2 and activates player 1 as the current player since it will be the first turn
});


    //assigns current "this" (the cell_template object) to a variable so it can still be used when "this" changes
    //"this" can change when an event bound to an element calls a method, like when you click an element
    //in that case "this" would become the object that was clicked instead of the object we created with the cell_template constructor

    //the game_template (game board) that created the cell

    //placeholder for the div created by create_self()

    //placeholder for the symbol of the current player

        //create a div with class ttt_cell

                //gives the div a class labeling it as a tic tac toe cell

                //space character that prevents an automatic line break at its position


        //created div calls .cell_click() method when clicked
        //we can change this to target elements that already exist instead of creating new divs

        //returns the created div: <div class="ttt_cell">&nbsp;</div>

        //console.log("this:", this, "self:", self);
        //"this" has changed to the object that was clicked (the actual div of the cell) so we have to use the "self" variable we set earlier while in the scope of this method

            //if the cell was already selected, stop the function

        }
        //console.log('this cell clicked',self.element);

        //assigns call to get_current_player() method from the current cell's parent game_template (game board) to a variable
        //if we have multiple game boards this can be useful

        //assigns the symbol of the current player_template (the player whose turn it is) to self.symbol

        //adds selected class to the current cell so it won't be selected again (see line 27)

        //changes the cell's text (with jQuery's .text() method) to the current player's symbol(an X or an O)

        //tells the game_template which cell was clicked, determines if the game was won and then switches current player to the other player


        //console.log("this:", this, "self:", self);
        //"this" didn't change so we could use it here but Dan used self

        //changes the cell's text (with jQuery's .text() method) to the current player's symbol(an X or an O)

        //console.log("this:", this, "self:", self);
        //"this" didn't change so we could use it here but Dan used self
        //gets the symbol inside the current cell
        //there's two methods called get_symbol, this one is called by check_win_conditions() in the game_template
        //it loops through each cell and gets the symbols of each to test if they win

        //returns the symbol in the current cell, which we got from calling get_symbol() on the current player_template object



    //console.log('game template constructor called');

    //assigns current "this" to variable so it can still be used when "this" changes

    //assigns main_element (the main game board div) to this.element

    //placeholder for the array that will store the created game cell objects (this.create_cells())

    //placeholder for the array that will store the players (X and O in a normal game)

    //this will be the index to refer to the players in the this.players array
    //   0    1    2
    //   3    4    5
    //   6    7    8
    /*
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
     */
    this.win_conditions = set_win_conditions(this.rows, this.cols);
    //an array of all possible winning combinations on a 3x3 board (line 92-99 gives names to the tic tac toe cells)
    //there might be a better way to do this so that it can work with any amount of cells

        //creates number of tic tac toe cells based on cell_count parameter (9 would be a normal game)
        //console.log('game template create cells called');

            //loops based on cell_count amount (9 times in a normal game)

            //creates a new cell OBJECT and passes the current game_template as the cell's parent parameter

            //new cell object creates a div for itself
            //this element is assigned to the cell_element variable

            //pushes the loop's current cell object to the array this.cell_array

            //appends the div created by the cell to the main_element (the game board div)


        //creates new player_template object with symbol: X, and element with id #player1

        //creates new player_template object with symbol: O, and element: with id #player2

        //pushes player 1 (X) to the players array (this.players))

        //pushes player 2 (O) to the players array (this.players))

        //calls activate_player() method on the object in this.players array at index 0 (it's player 1 (X))
        //activate player says whose turn it is

        //console.log('current player before '+this.current_player);

            //if current player index isn't 0
            //this will only work with 2 players in the this.players array

            //makes current player's index 0

            //if current player is 0

            //makes current player's index 1

        //console.log('current player before '+this.current_player);

        //console.log('current player is ',this.players);

        //returns the player object at the current_player index in the this.players array

        //"this" actually didn't change here, we could use it if we wanted to for some reason

        //calls check_win_conditions() method to test if the clicked cell won the game

        //calls deactivate_player() method on the current player to remove the active_player class from their element

        //calls switch_players() method on this game_template to change the current_players property to the next player's index in the players array

        //calls activate players on the now switched current player to add the active_player class to their element

        //console.log('check win conditions called');

        //calls .get_symbol() method on the player in the this.players array at the current_player index

            //loops through every item in win_conditions array
            //each item is also an array (an array of 3 cells needed to win a game)
            //we loop through THAT next in the j loop

            //count will increment by one for each cell in the sub array that the current player has a space in
            //console.log('checking win conditions ',this.win_conditions);

                //loops through each item in the current array that was in the win_conditions array

                    //if the symbol of the current index (j) in the 3 cells array inside the win_conditions array is the same as the current player's symbol


                    //increment count (when count is 3 you win in a normal game)

                        //if count reaches 3

                        //calls this.player_wins method and passes it the current player (player in the players array at the current_player's index)


        //just tells the browser to alert who won the game
        //probably change this to something else



    //console.log('player constructor called');

    //assigns symbol parameter to this.symbol

    //assigns element parameter to this.element

        //console.log('activate player called');

        //adds class "active_player" to the element given in the element parameter (eg: id #player1)

        //removes class "active_player" from the element given

        //returns the symbol (e.g: "X") given in the symbol parameter when the method was called in create_players


function set_win_conditions(height, width) {
    var win_conditions = [];
    var temp_array = [];
//ROWS
    for (var i = 0; i < height * width; i = j) {
        //i starts at 0
        //stop loop before i = the amount of cells on the board
        //after the work: set i to the value of j
            //will be the first value in the next row after j loop completes a row
        for (var j = i; j < i + width; j++) {
            //j will start as the value of i when each row is started
            //stop before j = value of first cell + the amount of cells in a row
                //eg: on row 1 with 3 cells per row, j < 0 + 3 will stop the row on 2
            //after the work: increment j by 1
            temp_array.push(j);
                //put the current value of j in the temporary array
        }
        win_conditions.push(temp_array);
            //puts the array of the completed row into the win conditions array
        temp_array = [];
            //clears temporary array for the next row to use it
    }
//COLUMNS
    for (i = 0; i < height; i++) {
        //i starts as 0
        //stop loop before i = the amount of rows on the board
        //after the work: increment i by one
        for (j = i; j < width * height; j += width) {
            //j starts as the value of i when each column is started
            //stop before j = the amount of cells on the board
                //in a 3x3 board the last index we'd need to use is 8
                //since there are 9 cells on a 3x3 board, this would stop before 9, or in other words, on 8
            //after the work: add the amount of columns to j
                //eg: on a 3x3 board, start on 0, the next index in the column would be 3
                //j (0: first index) + width (3 cells) = next item in column
                //0 + 3 = 3, j is now 3
                //3 + 3 = 6, j is now 6
                //6 + 3 = 9, j is 9 (width*height) so the loop stops
                //on the next loop, i will increment so j will start as 1 since i incremented
            temp_array.push(j);
        }
        win_conditions.push(temp_array);
        temp_array = [];
    }
//DIAGONALS NW TO SE
    for (i = 0; i < height * width; i += width + 1) {
        //i starts as 0
        //stop before i = total amount of cells
        //after the work: add the amount of columns + 1 to i
            //eg: in a 4x4 board, the first cell in a diagonal would be index 0
            //the next cell would be one row down and one column to the right of that
            //if we add the amount of columns to i we'll be on the next row
                //eg: 0 + width (4) = 4
                /*
                [0, 1, 2, 3],
                [4, 5, 6, 7],
                [8, 9, 10, 11],
                [12, 13, 14, 15]
                */
            //we just add one to that number to move one space to the right
            //the next time we do this we'll land on 10
            //5 + 4 (the width) + 1 = 10
        temp_array.push(i);
    }
    win_conditions.push(temp_array);
    temp_array = [];
//DIAGONALS NE to SW
    for (i = width - 1; i <= height * width; i += width - 1) {
        //i starts as the total amount of columns - 1
            //subtracting 1 from the amount of columns gives us the index of the last cell in the first row
            //in a 3x3 board this means we start on index 2, or the 3rd cell
            //3 (width) - 1 = 2;
        //stop when i is EQUAL to the amount of cells on the board
            //
        //after the work: add the amount of columns - 1 to i
            //eg: on a 3x3 board, if we start on 2, add 3
            //we're now one row down, or on 5
            /*
             [0, 1, 2],
             [3, 4, 5],
             [6, 7, 8]
            */
            //subtract one more and we've shifted one cell to the left, on 4
        temp_array.push(i);
    }
    win_conditions.push(temp_array);
    return win_conditions;
}
var count = 10;
var timer = null;
function countdown() {
    $("#timer").text(count);
    count--;
    if (count >= 0) {
        setTimeout(countdown, 1000);
    } else {
        console.log('stop');
    }
};
