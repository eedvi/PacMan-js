let canvas;
let context;
let sObj = {};
let level = [];
let x = 0,
	y = 0;
let lastEaten = 0;


let setGameLevel = (gameLevel) => {
	level = gameLevel;
};

let setScreenObj = (screenObj) => {
	sObj = screenObj;
};

let getLastEaten = () => {
	return lastEaten;
};

let cleanLastEaten = () => {
	lastEaten = 0;
};

let getContext = () => {
	return context;
};

let drawScreen = () => {
	canvas = document.getElementById(sObj.canvasId);
	canvas.height = sObj.height;
	canvas.width = sObj.width;
	context = canvas.getContext("2d");
	context.fillStyle = sObj.backgroundColor;
	context.fillRect(0, 0, sObj.width, sObj.height);
	context.fillStyle = "#F0B86E";
	context.font = "20px Arial";
	context.fillText("Points: ", sObj.startOnX, sObj.startOnY - 10);
};

let drawLevel = () => {
	y = sObj.startOnY;
	x = sObj.startOnX;
	for (const yElement of level) {
		for (const xElement of yElement) {
			if (xElement == 1) {
				// 1 = pared
				context.fillStyle = "#205295";
				context.fillRect(x, y, sObj.dimension, sObj.dimension);
			} else if (xElement == 4) {
				// 4 = comida
				context.beginPath();
				context.fillStyle = "#FEFF9F";
				context.arc(
					x + sObj.dimension / 2,
					y + sObj.dimension / 2,
					sObj.dimension / 10,
					0,
					Math.PI * 2,
					true
				);
				context.closePath();
				context.fill();
			} else if (xElement == 3) {
				//Super Comida:)
				context.beginPath();
				context.fillStyle = "#E94560";
				context.arc(
					x + sObj.dimension / 2,
					y + sObj.dimension / 2,
					sObj.dimension / 5,
					0,
					Math.PI * 2,
					true
				);
				context.closePath();
				context.fill();
			} else if (xElement == 5) {
				//pac
				context.beginPath();
				context.fillStyle = "yellow";
				context.arc(
					x + sObj.dimension / 2,
					y + sObj.dimension / 2,
					sObj.dimension / 2.8,
					Math.PI * 1.75, // 315 grados
					Math.PI * 0.25, // 45 Grados
					true
				);
				context.lineTo(x + sObj.dimension / 2, y + sObj.dimension / 2);
				context.closePath();
				context.fill();
			} else if (xElement == 2) {
				context.beginPath();
				context.fillStyle = '#FEA1A1';
				context.arc(
					x + sObj.dimension / 2,
					y + sObj.dimension / 2,
					sObj.dimension / 2.5,
					Math.PI,
					Math.PI * 2,
					false
				);
				context.lineTo(
					x + sObj.dimension - 5,
					y + sObj.dimension / 1.1
				);
				context.lineTo(
					x + sObj.dimension - 4 * 2,
					y + sObj.dimension / 1.5
				);
				context.lineTo(
					x + sObj.dimension - 4.3 * 3,
					y + sObj.dimension / 1.1
				);
				context.lineTo(
					x + sObj.dimension - 4.3 * 4,
					y + sObj.dimension / 1.5
				);
				context.lineTo(
					x + sObj.dimension - 4.3 * 5,
					y + sObj.dimension / 1.1
				);
				context.lineTo(
					x + sObj.dimension - 3.70 * 6,
					y + sObj.dimension / 1.5
				);

				context.closePath();
				context.fill();

				// Ojos
				context.beginPath();
				context.strokeStyle = "white";
				context.fillStyle = "white";
				context.arc(
					x + sObj.dimension / 3,
					y + sObj.dimension / 2.5,
					2,
					0,
					Math.PI * 2,
					true
				);
				context.fill();
				context.closePath();
				context.stroke();
				context.beginPath();

				context.arc(
					x + sObj.dimension / 1.5,
					y + sObj.dimension / 2.5,
					2,
					0,
					Math.PI * 2,
					true
				);
				context.fill();
				context.closePath();
				context.stroke();
			}
			x = x + sObj.dimension;
		}
		y = y + sObj.dimension;
		x = sObj.startOnX;
	}
};

let drawPoints = (points) => {
	context.fillStyle = sObj.backgroundColor;
	context.fillRect(sObj.startOnX + 60, sObj.startOnY - 30, 65, 25);
	context.fillStyle = "#F0B86E";
	context.font = "20px Arial";
	context.fillText(points, sObj.startOnX + 65, sObj.startOnY - 10);
};

let movePacman = (dir, position) => {
	let arrPosX = 0,
		arrPosY = 0;
	let nextPos = 0;
	if (dir === "ArrowUp") {
		arrPosY = position[1] - 1;
		arrPosX = position[0];
		nextPos = level[arrPosY][arrPosX];
	} else if (dir === "ArrowDown") {
		arrPosY = position[1] + 1;
		arrPosX = position[0];
		nextPos = level[arrPosY][arrPosX];
	} else if (dir === "ArrowLeft") {
		arrPosY = position[1];
		arrPosX = position[0] - 1;
		nextPos = level[arrPosY][arrPosX];
	} else if (dir === "ArrowRight") {
		arrPosY = position[1];
		arrPosX = position[0] + 1;
		nextPos = level[arrPosY][arrPosX];
	}
	if ([6, 4, 3, 0].includes(nextPos)) {
		lastEaten = nextPos;
		level[position[1]][position[0]] = 0;
		level[arrPosY][arrPosX] = 5;
		position = [arrPosX, arrPosY];
		drawPacman(dir, position);
	}
	return position;
};

let drawPacman = (dir, position) => {
	let x = position[0] * sObj.dimension + sObj.startOnX;
	let y = position[1] * sObj.dimension + sObj.startOnY;
	clearRect(dir, position);
	if (dir === "ArrowUp") {
		context.beginPath();
		context.fillStyle = "yellow";
		context.arc(
			x + sObj.dimension / 2,
			y + sObj.dimension / 2,
			sObj.dimension / 2.8,
			Math.PI * 1.75, 
			Math.PI * 1.25, 
			false
		);
		context.lineTo(x + sObj.dimension / 2, y + sObj.dimension / 2);
		context.closePath();
		context.fill();
	} else if (dir === "ArrowDown") {
		context.beginPath();
		context.fillStyle = "yellow";
		context.arc(
			x + sObj.dimension / 2,
			y + sObj.dimension / 2,
			sObj.dimension / 2.8,
			Math.PI * 0.25, 
			Math.PI * 0.75, 
			true
		);
		context.lineTo(x + sObj.dimension / 2, y + sObj.dimension / 2);
		context.closePath();
		context.fill();
	} else if (dir === "ArrowLeft") {
		context.beginPath();
		context.fillStyle = "yellow";
		context.arc(
			x + sObj.dimension / 2,
			y + sObj.dimension / 2,
			sObj.dimension / 2.8,
			Math.PI * 0.75, // 135 grados
			Math.PI * 1.25, // 225 Grados
			true
		);
		context.lineTo(x + sObj.dimension / 2, y + sObj.dimension / 2);
		context.closePath();
		context.fill();
	} else if (dir === "ArrowRight") {
		//x = (position[0] + 1) * sObj.dimension;
		context.beginPath();
		context.fillStyle = "yellow";
		context.arc(
			x + sObj.dimension / 2,
			y + sObj.dimension / 2,
			sObj.dimension / 2.8,
			Math.PI * 1.75, // 315 grados
			Math.PI * 0.25, // 45 Grados
			true
		);
		context.lineTo(x + sObj.dimension / 2, y + sObj.dimension / 2);
		context.closePath();
		context.fill();
	}
};

let clearRect = (dir, position) => {
	let cRX = position[0];
	let cRY = position[1];
	context.fillStyle = sObj.backgroundColor;
	context.fillRect(
		cRX * sObj.dimension + sObj.startOnX,
		cRY * sObj.dimension + sObj.startOnY,
		sObj.dimension,
		sObj.dimension
	);
	if (dir === "ArrowUp") {
		cRY++;
	} else if (dir === "ArrowDown") {
		cRY--;
	} else if (dir === "ArrowLeft") {
		cRX++;
	} else if (dir === "ArrowRight") {
		cRX--;
	}
	context.fillRect(
		cRX * sObj.dimension + sObj.startOnX,
		cRY * sObj.dimension + sObj.startOnY,
		sObj.dimension,
		sObj.dimension
	);
};

export {
	setScreenObj,
	setGameLevel,
	getLastEaten,
	cleanLastEaten,
	drawScreen,
	drawLevel,
	drawPoints,
	movePacman,
};
