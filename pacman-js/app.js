import {
	setGameLevel,
	setScreenObj,
	getLastEaten,
	cleanLastEaten,
	drawScreen,
	drawLevel,
	drawPoints,
	movePacman,
} from "./js/screen.js";
import { gameLevels } from "./level.js";
import { getPosition, getLevelPills, removeScrollPage } from "./js/utilities.js";
import { screenObj } from "./js/config.js";

let currentLevel = 0;
let inGameLevel = {};
let pacPos = [];
let totalLevelPills = 0;
let points = 0;
class Juego {
	constructor() {
		setScreenObj(screenObj);
		drawScreen();
		setGameLevel([...gameLevels[currentLevel]]);
		drawLevel();
		removeScrollPage();
	}
	play = () => {
		inGameLevel = [...gameLevels[currentLevel]];
		setGameLevel(inGameLevel);
		pacPos = getPosition(inGameLevel, 5);
		totalLevelPills = getLevelPills(inGameLevel, [4, 3]);
		// Capturando teclado
		document.addEventListener("keydown", (e) => {
			pacPos = movePacman(e.key, pacPos);
		});

		// Verificando puntos y movimiento de fantasmas
		setInterval(() => {
			if (getLastEaten() === 4) points += screenObj.pointCategory.pills;
			if (getLastEaten() === 3)
				points += screenObj.pointCategory.superPills;
			if (getLastEaten() === 6) points += screenObj.pointCategory.ghost;
			cleanLastEaten();
			drawPoints(points);
			console.log(points);
		}, 500 / screenObj.speed);
	};
}

let juegoPacman = new Juego();
juegoPacman.play();
