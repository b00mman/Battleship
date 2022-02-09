const canvas = document.getElementById("main-canvas");
const context = canvas.getContext("2d");

canvas.width = window.innerHeight * .45;
canvas.height = window.innerHeight * .9;
canvas.style.marginLeft = "auto";
canvas.style.marginRight = "auto";

var ships = [1];
var shipPlacement = [5, 5, 0, 2];

var topGrid = Array(10).fill(Array(10).fill(0));
var bottomGrid = Array(10).fill(Array(10).fill(0));
var rots = [[1, 0], [0, 1], [-1, 0], [0,-1]];

renderGrid(topGrid, bottomGrid, context);

function renderGrid(topGrid, bottomGrid, context){
    context.clearRect(0, 0, canvas.width, canvas.height);
	tileWidth = canvas.width / 10;
	tileHeight = canvas.height / 21;
    const fontSize = tileWidth / 1.5;
    context.font = fontSize + 'px serif';
	for (var y = 0; y < 10; y++){
		for (var x = 0; x < 10; x++){
			context.beginPath();
            context.fillStyle = "#FFFFFF";
		    context.strokeStyle = "#000000";
			context.strokeRect(x*tileWidth, y*tileHeight, tileWidth, tileHeight);
			context.stroke();
		}
	}
    for (var y = 11; y < 21; y++){
		for (var x = 0; x < 10; x++){
			context.beginPath();
            context.fillStyle = "#FFFFFF";
		    context.strokeStyle = "#000000";
			context.strokeRect(x*tileWidth, y*tileHeight, tileWidth, tileHeight);
			context.stroke();
		}
	}
    if (ships.length < 6){
        for (var j = 0; j < shipPlacement[3]; j++){
            context.beginPath();
            context.fillStyle = "#FF00FF";
            context.fillRect((shipPlacement[0]+(j*rots[shipPlacement[2]][0]))*tileWidth, (11+shipPlacement[1]+(j*rots[shipPlacement[2]][1]))*tileHeight, tileWidth, tileHeight);
            context.stroke();
        }
    }
}

document.onkeydown = keyPress;
document.onmousemove = mouseMove;


function mouseMove(e){
    var bounding = canvas.getBoundingClientRect();
    mousePos = {
		x: e.clientX - bounding.left,
		y: e.clientY - bounding.top
	}

    if (mousePos.x >= 0 && mousePos.x <= canvas.width && mousePos.y >= canvas.height/(21/11) && mousePos.y  <= canvas.height) {
        shipPlacement[0] = Math.floor(mousePos.x * (10 / canvas.width));
        shipPlacement[1] = Math.floor(mousePos.y * (21 / canvas.height)) - 11;
        document.getElementById("testing").innerHTML = shipPlacement;
        renderGrid(topGrid, bottomGrid, context);
    }
}

function keyPress(e){
    if (e.key=="r"){
        shipPlacement[2] = (shipPlacement[2] + 1) % 4
        renderGrid(topGrid, bottomGrid, context);
    }
}