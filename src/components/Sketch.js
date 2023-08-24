import { createRef, useEffect } from "react";
import p5 from "p5";

function Sketch() {
	const myRef = createRef();

	function sketch(p) {
		let width = Math.min(p.windowWidth / 1.2, 600);
		let height = width;

		// Point in center of canvas
		let x = width / 2;
		let y = height / 2;

		// Walk variables
		let stepSize = 1;
		let numberOfPoints = 125000;

		let name = "";
		let seed = 0;

		let navigationJump = 50;

		/* Canvas UI */

		// Form Fields
		let userInput = p.createDiv();
		let nameField = p.createInput();
		nameField.attribute("placeholder", "Solid Snake");
		let generateButton = p
			.createButton("Generate")
			.class("btn generate");
		
		let walkDisplay = p.createDiv();

		// Canvas Navigation
		let navigation = p.createDiv().class("navigation");
		
		let upButton = p.createButton("Up").class("btn");
		let downButton = p.createButton("Down").class("btn");
		let leftButton = p.createButton("Left").class("btn");
		let rightButton = p.createButton("Right").class("btn");

		let reverse = p.createDiv();
		let reverseButton = p.createButton("Invert Controls").class("btn reverse");

		/* p5 Setup */
		p.setup = () => {
			userInput.child(nameField);
			userInput.child(generateButton);

			generateButton.mousePressed(convertNameToSeed);
			walkDisplay.child(p.createCanvas(width, height));

			reverse.child(reverseButton);
			reverseButton.mousePressed(reverseNavigationControls);

			navigation.child(upButton);
			navigation.child(downButton);
			navigation.child(leftButton);
			navigation.child(rightButton);

			upButton.mousePressed(navigateUp);
			downButton.mousePressed(navigateDown);
			leftButton.mousePressed(navigateLeft);
			rightButton.mousePressed(navigateRight);

			p.pixelDensity(1);
		}

		function convertNameToSeed() {
			let accumulator = 0;
			name = nameField.value();
			for (let i = 0; i < name.length; i++) {
				accumulator += name.charCodeAt(i);
			}

			seed = accumulator;
			p.redraw();
		}

		function navigateUp() {
			p.translate(0, +navigationJump);
			p.draw();
		}
		function navigateDown() {
			p.translate(0, -navigationJump);
			p.draw();
		}
		function navigateLeft() {
			p.translate(+navigationJump, 0);
			p.draw();
		}
		function navigateRight() {
			p.translate(-navigationJump, 0);
			p.draw();
		}

		function reverseNavigationControls() {
			navigationJump += -1;
		}

		function staticRandomWalk() {
			x = width / 2;
			y = height / 2;

			p.background(229);
			p.randomSeed(seed);

			for (let i = 0; i < numberOfPoints; i++) {
				let color = p.color(0);

				p.stroke(color);
				p.strokeWeight(stepSize);

				p.noSmooth();
				p.point(x, y);

				let r = Math.floor(p.random() * 4);

				switch (r) {
					case 0:
						x += stepSize;
            break;
          case 1:
            x -= stepSize;
            break;
          case 2:
            y += stepSize;
            break;
          case 3:
            y -= stepSize;
            break;
          default:
            break;
        }
			};
			p.noLoop();
		}
		
		p.windowResized = () => {
			if (p.windowWidth < 600) {
				p.resizeCanvas(p.windowWidth / 1.2, p.windowWidth / 1.2);
			} else {
				p.resizeCanvas(600, 600);
			}
		};

		p.draw = () => {
			staticRandomWalk();
		};
	}

	useEffect(() => {
		new p5(sketch, myRef.current);
	}, [myRef]);

	return <div className="sketch" ref={myRef}></div>;
}

export default Sketch;