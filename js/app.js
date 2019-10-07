var auxArray = document.getElementById("main").querySelectorAll(".box");
var squares = [];
var turno = 0;
var modal = document.getElementById("modal");

pushIntoArray();
addListeners();

function pushIntoArray() {
    for (var i = 0; i <= auxArray.length - 1; i++) {
        squares.push(auxArray[i]);
    }
}

function checkEmptyCard(square) {
    var clickedPosition = getPosition(square);
    var otherPosition = "";
    var row = Math.floor((clickedPosition / 4) + 1);
    var leftBoard = parseFloat(clickedPosition / 4) == row - 1;
    var rightBoard = (clickedPosition + 1) / row == 4;

    if (clickedPosition - 4 >= 0) { // up
        otherPosition = clickedPosition - 4;
        if (squares[(otherPosition)].innerHTML == "") { // up
            var auxClicked = squares[clickedPosition].innerHTML;
            squares[clickedPosition].innerHTML = squares[otherPosition].innerHTML;
            squares[otherPosition].innerHTML = auxClicked;
        }
    }

    if (clickedPosition + 4 < 16) { // down
        otherPosition = clickedPosition + 4;
        if (squares[otherPosition].innerHTML == "") {
            var auxClicked = squares[clickedPosition].innerHTML;
            squares[clickedPosition].innerHTML = squares[otherPosition].innerHTML;
            squares[otherPosition].innerHTML = auxClicked;
        }
    }

    if (!rightBoard) { // right
        if (clickedPosition + 1 != "") {
            otherPosition = clickedPosition + 1;
        }
        if (squares[otherPosition].innerHTML == "") {
            var auxClicked = squares[clickedPosition].innerHTML;
            squares[clickedPosition].innerHTML = squares[otherPosition].innerHTML;
            squares[otherPosition].innerHTML = auxClicked;
        }
    }

    if (!leftBoard) { // left
        otherPosition = clickedPosition - 1;
        if (squares[otherPosition].innerHTML == "") {
            var auxClicked = squares[clickedPosition].innerHTML;
            squares[clickedPosition].innerHTML = squares[otherPosition].innerHTML;
            squares[otherPosition].innerHTML = auxClicked;
        }
    }
    checkOrderer();
}

function getPosition(number) {
    for (var i = 0; i <= squares.length - 1; i++) {
        if (squares[i].innerHTML == number) {
            return i;
        }
    }
}

function addListeners() {
    for (var i = 0; i <= squares.length - 1; i++) {
        squares[i].addEventListener("click", function (e) {
            checkEmptyCard(this.innerHTML);
        });
    }
}

function desordenar() {
    var random = 0;
    turno = 0;
    for (var i = 0; i < 1000; i++) {
        random = Math.floor(Math.random() * 16);
        squares[random].click();
    }
    turno++;
}


function checkOrderer() {
    if (turno > 0) {
        var orderer = true;
        for (var i = 0; i < squares.length - 2; i++) {
            if (squares[i].innerHTML != "") {
                if (squares[i].innerHTML != i && squares[i + 1].innerHTML != (i + 2)) {
                    orderer = false;
                    break;
                }
            } else {
                orderer = false;
                break;
            }
        }
        if (orderer) {
            setTimeout(() => {
                toggleModal("HAS GANADO, DESORDENA EL PUZZLE PARA VOLVER A JUGARLO");
            }, 10);
        }
    }
}

function toggleModal(msg) {
    document.getElementById("msg").innerHTML = msg;
    modal.classList.toggle("show-modal");
}

function windowOnClick(event) {
    if (event.target === modal) {
        toggleModal("");
        location.reload();
    }
}

window.addEventListener("click", windowOnClick);