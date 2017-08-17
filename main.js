(function() {
    /* ======= Model ======= */

    const model = {
        nextPlayer: '',
        squares: Array(9),
    };


    /* ======= gameController ======= */

    const gameController = {
        init: function() {
            model.nextPlayer = 'X';
            model.squares.fill('');
            gameBoardView.init();
            gameInfoView.init();
        },

        getSquares: function() {
            return model.squares;
        },

        checkForDraw: function() {
            if (model.squares.every(el => el !== '')) {
                gameInfoView.declareDraw();
            }
        },

        processClick: function(num) {
            const nextMove = {'X': 'O', 'O': 'X'};

            if (model.squares[num] === '') {
                model.squares[num] = model.nextPlayer;
                model.nextPlayer = nextMove[model.nextPlayer];
                gameBoardView.render();
                this.checkForDraw();
            }
        },
    };


    /* ======= Views ======= */

    const gameBoardView = {
        init: function() {
            const gameBoard = document.getElementById('game-board');
            this.squareElems = [...document.querySelectorAll('.square')];

            gameBoard.addEventListener('click', e => {
                gameController.processClick(e.target.getAttribute('data-n'));
            });

            this.render();
        },

        render: function() {
            const squares = gameController.getSquares();
            
            squares.forEach((square, i) => {
                this.squareElems[i].innerHTML = square;
            });
        },
    };

    const gameInfoView = {
        init: function() {
            const resetButton = document.getElementById('reset');
            this.statusLabel = document.getElementById('status');

            resetButton.addEventListener('click', () => {
                gameController.init();
            });

            this.render();
        },

        declareDraw: function() {
            this.statusLabel.innerHTML = 'Game Over'
        },

        render: function() {
            this.statusLabel.innerHTML = '';
        },
    };

    gameController.init();
})();
