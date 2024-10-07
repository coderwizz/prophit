import { Temp, Scoreboard, Estimation, Uniform, Exponential, Balloon} from "./challenge.js";
import { loadCSVData } from './csv.js';

let data = []; // Declare a variable to hold the loaded CSV data

async function initialize() {
    data = await loadCSVData(); // Load CSV data and assign it to the variable
    console.log("Accessed Data:", data); // Log the loaded data

    // Now you can create game instances or set the initial state
    // For example, if you have a game instance you can initialize it here
}

// Call the initialize function to start the process
initialize().catch(error => {
    console.error("Error loading CSV:", error);
});

const states = {
    ASSET0: 0,
    REVIEW0: 1,
    SCORE: 2,
    HOME: 3
} 

let buttonkey = 0;

class State {
    constructor(state){
        this.state = state;
        this.values = ['Balloon', 'Estimation', 'Estimation', 'Estimation', 'Estimation',
            'Exponential', 'Uniform', 'Uniform', 'Uniform', 'Estimation', 'Estimation'
        ];
    }

    clearCanvas() {
        const ctx = this.context;
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); // Clear the entire canvas
        this.context.canvas.removeEventListener('mousemove', this.onMouseMove.bind(this));
        this.context.canvas.removeEventListener('click', this.handleInput.bind(this));
        
        // Optionally, you might also want to set mouseX and mouseY to null
        this.clickX = 0;
        this.clickY = 0;
    }
}

export class ASSET0 extends State {
    constructor(game, context) {
        super('Asset0');
        this.game = game;
        this.context = context;
        
        // Button properties
        this.button = {
            x: context.canvas.width / 2 - 50, // Center the button
            y: context.canvas.height - 50,    // Position it near the bottom
            width: 100,
            height: 30,
            text: 'Next',                     // Button label
        };

        // Track mouse position
        this.mouseX = 0;
        this.mouseY = 0;

        // Add mouse move event listener
        context.canvas.addEventListener('mousemove', this.onMouseMove.bind(this));
        context.canvas.addEventListener('click', this.handleInput.bind(this));
    }

    enter() {
        this.game.no += 1;
        buttonkey = 46890;
        const assetName = this.values[Math.floor(Math.random() * this.values.length)];
        if (assetName === 'Estimation') {
            this.chosenAsset = new Estimation(data, 0);
        } else if (assetName === 'Uniform') {
            this.chosenAsset = new Uniform();
        } else if (assetName === 'Exponential') {
            this.chosenAsset = new Exponential();
        } else if (assetName === 'Balloon') {
            this.chosenAsset = new Balloon();
        }
        this.game.assets.push(this.chosenAsset);
    }

    updateDisplay(){
        this.chosenAsset.displayQuestion();
        this.drawButton();
    }

    drawButton() {
        const ctx = this.context;

        // Determine if mouse is over the button
        const isHover = this.isMouseOverButton(this.mouseX, this.mouseY);
        // Darker shade when hovered
        const buttonColor = isHover ? 'rgb(70, 0, 100)' : 'rgb(116, 7, 130)';

        // Draw the button background
        ctx.fillStyle = buttonColor;
        ctx.fillRect(this.button.x, this.button.y, this.button.width, this.button.height);

        // Draw the button text
        ctx.fillStyle = 'white';
        ctx.font = 'bold 20px "Libre Baskerville", serif';
        ctx.fillText(
            this.button.text,
            this.button.x + this.button.width / 2 - ctx.measureText(this.button.text).width / 2,
            this.button.y + this.button.height / 2 + 5 // Center the text vertically
        );
    }

    isMouseOverButton(mouseX, mouseY) {
        return mouseX >= this.button.x &&
               mouseX <= this.button.x + this.button.width &&
               mouseY >= this.button.y &&
               mouseY <= this.button.y + this.button.height;
    }

    onMouseMove(event) {
        // Update mouse position
        const rect = this.context.canvas.getBoundingClientRect();
        this.mouseX = event.clientX - rect.left;
        this.mouseY = event.clientY - rect.top;

        // Redraw the display when mouse moves
        this.updateDisplay();
    }

    handleInput(event) {
        const clickX = event.offsetX;
        const clickY = event.offsetY;
    
        // Check if the click is within the button boundaries
        if (
            this.isMouseOverButton(clickX, clickY) &&
            buttonkey === 46890
        ) {
            this.clearCanvas(); // Clear the canvas before changing state
            
            // Transition to the next state based on the current value of this.game.no
            if (this.game.no < 5) {
                this.game.setState(states.ASSET0); // Or the next state if appropriate
            } else if (this.game.no === 5) {
                // randomize the elements here if this.game.version == 1. this.game.assets
                if (this.game.version === 1) { 
                    this.game.assets = this.shuffleArray(this.game.assets);
                }
                this.game.setState(states.REVIEW0);
            }
        }
    }

    // Function to shuffle an array
    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1)); // Random index
            [array[i], array[j]] = [array[j], array[i]]; // Swap elements
        }
        return array;
    }
}

export class REVIEW0 extends State {
    constructor(game, context) {
        super('Review0');
        this.game = game;
        this.context = context;
        this.chosenAsset = new Temp();

        // Button properties with updated positions
        this.selectButton = {
            x: context.canvas.width / 2 - 292, // Updated left button position
            y: context.canvas.height - 50,     // Position it near the bottom
            width: 100,
            height: 30,
            text: 'Select',                     // Button label
            button_dark: 'rgb(44, 144, 69)',
            button_bright: 'rgb(55, 180, 86)'
        };

        this.skipButton = {
            x: context.canvas.width / 2 + 200,  // Updated right button position
            y: context.canvas.height - 50,      // Position it near the bottom
            width: 100,
            height: 30,
            text: 'Skip',                       // Button label
            button_dark: 'rgb(70, 0, 100)',
            button_bright: 'rgb(116, 7, 130)'
        };

        // Track mouse position
        this.mouseX = 0;
        this.mouseY = 0;

        // Add mouse move event listener
        context.canvas.addEventListener('mousemove', this.onMouseMove.bind(this));
        context.canvas.addEventListener('click', this.handleInput.bind(this));
    }

    enter() {
        buttonkey = 96950;
        this.game.no += 1;
        console.log('index :' , this.game.no);
        
        if (this.game.assets[this.game.no - 6] instanceof Balloon) {
            let currentBalloon = this.game.assets[this.game.no - 6];
            let p = currentBalloon.p;
            console.log("post", currentBalloon.p);
            this.game.assets[this.game.no - 6] = new Balloon(p=p);
            console.log("afffff", this.game.assets[this.game.no - 6].p);
        }
        this.chosenAsset = this.game.assets[this.game.no - 6];
        console.log("afffff", this.chosenAsset.p);
    }

    updateDisplay() {
        this.chosenAsset.displayValue(this.game); // Display the current asset question
        this.drawButtons(); // Draw both buttons
    }

    drawButtons() {
        const ctx = this.context;

        // Draw the select button
        this.drawButton(this.selectButton);

        // Draw the skip button
        this.drawButton(this.skipButton);
    }

    drawButton(button) {
        const ctx = this.context;

        // Determine if mouse is over the button
        const isHover = this.isMouseOverButton(this.mouseX, this.mouseY, button);
        // Darker shade when hovered
        const buttonColor = isHover ? button.button_dark : button.button_bright;

        // Draw the button background
        ctx.fillStyle = buttonColor;
        ctx.fillRect(button.x, button.y, button.width, button.height);

        // Draw the button text
        ctx.fillStyle = 'white';
        ctx.font = 'bold 20px "Libre Baskerville", serif';
        ctx.fillText(
            button.text,
            button.x + 1.25 * button.width / 2 - ctx.measureText(button.text).width / 2,
            button.y + button.height / 2 + 5 // Center the text vertically
        );
    }

    isMouseOverButton(mouseX, mouseY, button) {
        return mouseX >= button.x &&
               mouseX <= button.x + button.width &&
               mouseY >= button.y &&
               mouseY <= button.y + button.height;
    }

    onMouseMove(event) {
        // Update mouse position
        const rect = this.context.canvas.getBoundingClientRect();
        this.mouseX = event.clientX - rect.left;
        this.mouseY = event.clientY - rect.top;

        // Redraw the display when mouse moves
        this.updateDisplay();
    }

    handleInput(event) {
        const clickX = event.offsetX;
        const clickY = event.offsetY;
        // Check if the click is within the select button boundaries
        if (
            this.isMouseOverButton(clickX, clickY, this.selectButton) &&
            buttonkey === 96950
        ) {
            this.game.yes = 1;
            this.clearCanvas(); // Clear the canvas before changing state
            // Change the state to SCORE
            this.game.setState(states.SCORE);
        } else if (this.isMouseOverButton(clickX, clickY, this.skipButton) &&
            buttonkey === 96950) {
            this.game.yes = 0;
            this.clearCanvas();
            
            // Check if this is the final review before transitioning to SCORE
            if (this.game.no === 10) {
                this.game.setState(states.SCORE);  // Transition directly to the SCORE state
            } else {
                this.game.setState(states.REVIEW0);  // Continue to the next review state
            }
        }
    }
}


export class SCORE extends State {
    constructor(game, context) {
        super('Score');
        this.game = game;
        this.context = context;
        this.chosenAsset = new Temp();

        // Button properties for going back to HOME
        this.button = {
            x: context.canvas.width / 2 + 300, // +200, Center the button
            y: context.canvas.height - 50,     // Position it near the bottom
            width: 80,
            height: 30,
            text: 'Home',               // Button label
        };

        // Track mouse position
        this.mouseX = 0;
        this.mouseY = 0;

        // Add mouse move and click event listeners
        context.canvas.addEventListener('mousemove', this.onMouseMove.bind(this));
        context.canvas.addEventListener('click', this.handleInput.bind(this));
    }

    updateAverageScore(newScore, ver) {
        // Retrieve current average and number of sessions from localStorage
        let totalScore = parseFloat(localStorage.getItem('totalScore' + ver)) || 0;
        let numberOfSessions = parseInt(localStorage.getItem('numberOfSessions' + ver)) || 0;

        // Update total score and session count
        totalScore += newScore;
        numberOfSessions += 1;

        // Calculate new average
        const newAverage = totalScore / numberOfSessions;

        // Store the updated total score and session count back in localStorage
        localStorage.setItem('totalScore' + ver, totalScore.toString());
        localStorage.setItem('numberOfSessions' + ver, numberOfSessions.toString());
    }

    enter() {
        buttonkey = 39281;
        let top = -1;
        for (let asset of this.game.assets) {
            if (asset instanceof Balloon) {
                top = Math.max(top, asset.pval);
            } else {
                top = Math.max(top, asset.value);
            }
        }
        this.chosenAsset = new Scoreboard(this.game.sel * this.game.yes, top);
        this.updateAverageScore(Math.round(100 * this.game.sel * this.game.yes / top), this.game.version);
    }

    scoreDisplay() {
        this.chosenAsset.displayScore(); // Display the current asset question
        this.drawButton(); // Draw the back to HOME button
    }

    drawButton() {
        const ctx = this.context;

        // Determine if mouse is over the button
        const isHover = this.isMouseOverButton(this.mouseX, this.mouseY);
        // Darker shade when hovered
        const buttonColor = isHover ? 'rgb(70, 0, 100)' : 'rgb(116, 7, 130)';

        // Draw the button background
        ctx.fillStyle = buttonColor;
        ctx.fillRect(this.button.x, this.button.y, this.button.width, this.button.height);

        // Draw the button text
        ctx.fillStyle = 'white';
        ctx.font = 'bold 20px "Libre Baskerville", serif';
        ctx.fillText(
            this.button.text,
            this.button.x + 1.4 * this.button.width / 2 - ctx.measureText(this.button.text).width / 2,
            this.button.y + this.button.height / 2 + 5 // Center the text vertically
        );
    }

    isMouseOverButton(mouseX, mouseY) {
        return mouseX >= this.button.x &&
               mouseX <= this.button.x + this.button.width &&
               mouseY >= this.button.y &&
               mouseY <= this.button.y + this.button.height;
    }

    onMouseMove(event) {
        // Update mouse position
        const rect = this.context.canvas.getBoundingClientRect();
        this.mouseX = event.clientX - rect.left;
        this.mouseY = event.clientY - rect.top;

        // Redraw the display when mouse moves
        this.scoreDisplay();
    }

    handleInput(event) {
        const clickX = event.offsetX;
        const clickY = event.offsetY;

        // Check if the click is within the button boundaries
        if (this.isMouseOverButton(clickX, clickY) && buttonkey === 39281) {
            this.clearCanvas(); // Clear the canvas before changing state
            this.game.setState(states.HOME); // Transition to the HOME state
        }
    }
}

export class HOME extends State {
    constructor(game, context) {
        super('Home');
        this.game = game;
        this.context = context;
    }

    // Method called when entering the 'Home' state
    enter() {
        this.game.assets = [];
        this.game.sel = 0;
        this.game.yes = 0;
        this.game.no = 0;
        this.game.version = 0;
        buttonkey = 0;
        // Hide canvas2 and make canvas1 visible
        const canvas1 = document.getElementById('canvas1');
        const canvas2 = document.getElementById('canvas2');
        const middleContainer = document.querySelector('.middle-container');

        canvas1.style.display = 'block'; // Make canvas1 visible
        canvas2.style.display = 'none'; // Hide canvas2
        middleContainer.style.display = 'block'; // Ensure the middle container is also visible if needed

        // Clear and reset canvas1 context as needed
        this.context.clearRect(0, 0, canvas1.width, canvas1.height); // Clear canvas1 content if necessary
    }

    handleInput(event) {
        // Input handling logic for the HOME state
    }
}