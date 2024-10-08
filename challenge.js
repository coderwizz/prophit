const visualPairs = [ // for Visual only 
    [380, '$1 per calorie in this burger', 0.36, 0.27, 0.8],
    [1010, '$1 per calorie in this burger', 0.37, 0.28, 0.89],
    [942, '$1 per calorie in this pizza', 0.36, 0.28, 0.88],
    [929, '$1 for every 5 pounds this car weighs', 0.35, 0.28, 0.9],
    [178, 'Imagine each cell red/white, equally likely. $100(#trees on avg if at least 1)', 0.37, 0.28, 0.95],
    [450, '$1 per calorie in this drink', 0.41, 0.28, 0.84],
    [357, 'One cent for every dollar this artifact is worth today', 0.37, 0.28, 0.84],
    [258, '$2 for each episode from this show', 0.35, 0.28, 0.88],
    [510, '$2 for each episode from this show', 0.345, 0.31, 0.95],
    [886, '$1 for every jelly bean in this jar', 0.42, 0.28, 0.95],
    [605, '$5 for every distinct object in this image (background doesn\'t count)', 0.31, 0.28, 1.2],
    [450, '$5 for every minute this movie runs for', 0.36, 0.25, 0.6],
];

class Challenge {
    constructor(challenge) {
        this.challenge = challenge;
    }
}

export class Temp extends Challenge {
    constructor() {
        super('Temp');
    }
    displayQuestion() {
    }    

    displayValue() {
    }  

    displayScore() {
    }    
}

// Estimation class that picks a random question from the CSV
export class Estimation extends Challenge {
    constructor(questions) {
        super('Estimation');
        this.questions = questions;
        // Only set the random question once if it has not already been set
        if (!this.prompt && !this.value) {
            let curQuestion = this.getRandomQuestion();
            this.prompt = curQuestion['Prompt'];
            this.value = curQuestion['Value'];
        }
    }

    // Method to select a random question from the CSV
    getRandomQuestion() {
        // this.questions.length
        console.log('hello', this.questions)
        const randomIndex = Math.floor(Math.random() * this.questions.length);
        return this.questions[randomIndex];
    }

    displayQuestion() {
        const canvas = document.getElementById('canvas2');
        const context = canvas.getContext('2d');
        context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clear the canvas
        // guide 
        context.fillStyle = 'rgb(116, 7, 130)'; // Text color
        context.font = 'bold 42px "Libre Baskerville", serif';
        context.textAlign = 'center'; // Center the text
        context.textBaseline = 'middle'; // Align text vertically
        context.fillText('Take a moment to study the asset.', 406, 65); // Draw the text
        // actual
        context.fillStyle = 'rgb(57, 86, 171)'; // Text color
        let promptLen = this.prompt.length;
        let promptSize = 24 * 69 / promptLen;
        context.font = 'bold ' + promptSize + 'px "Libre Baskerville", serif';
        context.textAlign = 'center'; // Center the text
        context.textBaseline = 'middle'; // Align text vertically
        context.fillText(this.prompt, canvas.width / 2, canvas.height / 2); // Draw the question text
    }    

    displayValue(game) {
        const canvas = document.getElementById('canvas2');
        const context = canvas.getContext('2d');
        context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clear the canvas
        // guide 
        context.fillStyle = 'rgb(116, 7, 130)'; // Text color
        context.font = 'bold 42px "Libre Baskerville", serif';
        context.textAlign = 'center'; // Center the text
        context.textBaseline = 'middle'; // Align text vertically
        context.fillText('The true value of this asset is ...', 406, 65); // Draw the text
        // prompt
        context.fillStyle = 'rgb(57, 86, 171)'; // Text color
        let promptLen = this.prompt.length;
        let promptSize = 24 * 69 / promptLen;
        context.font = 'bold ' + promptSize + 'px "Libre Baskerville", serif';
        context.textAlign = 'center'; // Center the text
        context.textBaseline = 'middle'; // Align text vertically
        context.fillText(this.prompt, canvas.width / 2, canvas.height / 3); // Draw the question text
        // actual
        context.fillStyle = 'rgb(55, 180, 86)'; // Text color
        context.font = 'bold 120px "Libre Baskerville", serif';
        context.textAlign = 'center'; // Center the text
        context.textBaseline = 'middle'; // Align text vertically
        context.fillText('$' + this.value, canvas.width / 2, 3.1 * canvas.height / 5); // Draw the question text
        // score
        game.sel = this.value;
    }    

}

// Estimation class that picks a random question from the CSV
export class Scoreboard extends Challenge {
    constructor(sel, top) {
        super('Scoreboard');
        this.top = top;
        this.sel = sel;
    }

    displayScore() {
        const canvas = document.getElementById('canvas2');
        const context = canvas.getContext('2d');
        context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clear the canvas
        // guide 
        context.fillStyle = 'rgb(116, 7, 130)'; // Text color
        context.font = 'bold 24px "Libre Baskerville", serif';
        context.textAlign = 'center'; // Center the text
        context.textBaseline = 'middle'; // Align text vertically
        context.fillText('The maximum profit was:', 406, 45); // Draw the text
        // prompt
        context.fillStyle = 'rgb(57, 86, 171)'; // Text color
        context.font = 'bold 64px "Libre Baskerville", serif';
        context.textAlign = 'center'; // Center the text
        context.textBaseline = 'middle'; // Align text vertically
        context.fillText('$' + this.top, canvas.width / 2, canvas.height / 5); // Draw the question text
        // guide 
        context.fillStyle = 'rgb(116, 7, 130)'; // Text color
        context.font = 'bold 80px "Libre Baskerville", serif';
        context.textAlign = 'center'; // Center the text
        context.textBaseline = 'middle'; // Align text vertically
        context.fillText('You won:', canvas.width / 2, canvas.height * 0.45); // Draw the text
        // actual
        context.fillStyle = 'rgb(55, 180, 86)'; // Text color
        context.font = 'bold 155px "Libre Baskerville", serif';
        context.textAlign = 'center'; // Center the text
        context.textBaseline = 'middle'; // Align text vertically
        context.fillText(Math.round((this.sel / this.top) * 100) + '%', canvas.width / 2, 3 * canvas.height / 4); // Draw the question text
    }    

}

export class Balloon extends Challenge {
    constructor(p =  Math.random() * (0.91 - 0.66) + 0.66) {
        super('Balloon');
        this.frameX = 0;
        this.frameY = 0;
        this.sizeModifier = 1;
        this.image = document.getElementById('balloon');
        this.reviewed = 0;
        this.value = 300; // Start with $300
        this.buttonWidth = 150; // Button width
        this.buttonHeight = 50; // Button height
        this.buttonColor = 'rgb(116, 7, 130)'; // Default button color
        this.buttonHoverColor = 'rgb(96, 7, 110)'; // Darker hover color
        this.isHovered = false; // Track if the mouse is hovering over the button

        this.p = p;
        let argmax = this.gradientAscent(this.p);
        this.simVal = Math.random() > Math.pow(this.p, argmax) ? 300 * (1 - this.p) : 300 + 100 * argmax;
   
        // Calculate the button's position (will be set later in `displayQuestion`)
        this.buttonX = 0; // To be calculated dynamically
        this.buttonY = 400; // Fixed Y position for the button
        this.popped = false; // Track if the balloon has popped

        this.pval = this.value;
        if (this.reviewed === 0) {
            this.pval = this.simVal;
        } 

        // Attach event handlers
        this.attachEventHandlers();
    }
    // Function to maximize
    f(x, p) {
        return (100 * x + 300) * Math.pow(p, x) + (1 - Math.pow(p, x)) * (300 - 300 * p);
    }

    // Numerical gradient calculation
    gradientF(x, p, h = 1e-5) {
        return (this.f(x + h, p) - this.f(x - h, p)) / (2 * h);
    }

    // Gradient ascent function
    gradientAscent(p, xStart = 0, learningRate = 0.01, maxIterations = 1000) {
        let x = xStart;
        for (let i = 0; i < maxIterations; i++) {
            const grad = this.gradientF(x, p);
            x += learningRate * grad;
        }
        return Math.round(x);
    }

    // Function to check if a mouse is within the button bounds
    isMouseHovering(mouseX, mouseY) {
        return (
            mouseX >= this.buttonX &&
            mouseX <= this.buttonX + this.buttonWidth &&
            mouseY >= this.buttonY &&
            mouseY <= this.buttonY + this.buttonHeight
        );
    }

    // Attach event handlers for hover and click
    attachEventHandlers() {
        const canvas = document.getElementById('canvas2');

        // Mousemove event to track hover state
        canvas.addEventListener('mousemove', (event) => {
            const rect = canvas.getBoundingClientRect();
            const mouseX = event.clientX - rect.left;
            const mouseY = event.clientY - rect.top;

            // Check if the mouse is hovering over the button
            if (this.isMouseHovering(mouseX, mouseY)) {
                if (!this.isHovered) {
                    this.isHovered = true;
                    this.displayQuestion(); // Re-render to show hover effect
                }
            } else {
                if (this.isHovered) {
                    this.isHovered = false;
                    this.displayQuestion(); // Re-render to remove hover effect
                }
            }
        });

        // Mousedown event to handle clicks (money gets added here)
        canvas.addEventListener('mousedown', (event) => {
            const rect = canvas.getBoundingClientRect();
            const mouseX = event.clientX - rect.left;
            const mouseY = event.clientY - rect.top;

            // Check if the button was clicked and if the balloon hasn't popped
            if (this.isMouseHovering(mouseX, mouseY) && !this.popped) {
                this.value += 100; // Add $100
                this.sizeModifier += 0.12;

                // Check if the balloon pops
                if (Math.random() > this.p) {
                    this.value = Math.round(300 * (1 - this.p)); // Set value to 300 * (1 - p)
                    this.popped = true; // Mark balloon as popped
                }

                this.displayQuestion(); // Re-render to update the value
            }
        });
    }

    // Draw the button and value on the canvas
    displayQuestion() {
        const canvas = document.getElementById('canvas2');
        const context = canvas.getContext('2d');
        context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clear the canvas

        // Calculate the button position on the right of the canvas
        this.buttonX = canvas.width - this.buttonWidth - 20; // 20px margin from the right edge

        // Draw the balloon image
        context.drawImage(this.image, 0, 0, this.image.width / 7, this.image.height, context.canvas.width * 0.42 - (this.sizeModifier - 1) * this.image.width / 14, 
        context.canvas.height * 0.27 - (this.sizeModifier - 1) * this.image.height / 3.5, this.sizeModifier * this.image.width / 7, this.sizeModifier * this.image.height);

        // Set the button color based on whether it's being hovered over
        context.fillStyle = this.isHovered ? this.buttonHoverColor : this.buttonColor;
        context.fillRect(this.buttonX, this.buttonY, this.buttonWidth, this.buttonHeight);

        // Draw the button text
        context.fillStyle = 'white';
        context.font = 'bold 24px "Libre Baskerville", serif';
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillText('Pump (+$100)', this.buttonX + this.buttonWidth / 2, this.buttonY + this.buttonHeight / 2);

        // Draw the current value (winnings) on the left side of the canvas
        context.fillStyle = 'rgb(55, 180, 86)';
        context.font = 'bold 36x "Libre Baskerville", serif';
        context.textAlign = 'left';
        context.textBaseline = 'middle';
        context.fillText(`Winnings: $${this.value}`, 24, this.buttonY + 0.98 * this.buttonHeight / 2); // 24px margin from the left

        // Draw a "Balloon popped" message if the balloon has popped
        if (this.popped) {
            context.fillStyle = 'rgb(57, 86, 171)';
            context.font = 'bold 32px "Libre Baskerville", serif';
            context.textAlign = 'center';
            context.textBaseline = 'middle';
            context.fillText('Balloon popped :(', canvas.width / 2, canvas.height / 2); // Center the message
        }

        // guide 
        context.fillStyle = 'rgb(116, 7, 130)'; // Text color
        context.font = 'bold 42px "Libre Baskerville", serif';
        context.textAlign = 'center'; // Center the text
        context.textBaseline = 'middle'; // Align text vertically
        context.fillText('Take a moment to study the asset.', 406, 65); // Draw the text
        // actual
        context.fillStyle = 'rgb(57, 86, 171)'; // Text color
        context.font = 'bold 19.5px "Libre Baskerville", serif';
        context.textAlign = 'center'; // Center the text
        context.textBaseline = 'middle'; // Align text vertically
        context.fillText('Start with $300. For each pump, there is probability p it will pop giving final winnings $300p.', canvas.width / 2, canvas.height * 0.8); // Draw the question text
    }

    // Draw the button and value on the canvas
    displayValue(game) {
        this.reviewed = 1;
        const canvas = document.getElementById('canvas2');
        const context = canvas.getContext('2d');
        context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clear the canvas
    
        // Calculate the button position on the right of the canvas
        this.buttonX = canvas.width - this.buttonWidth - 20; // 20px margin from the right edge
    
        // Draw the balloon image
        context.drawImage(
            this.image,
            0,
            0,
            this.image.width / 7,
            this.image.height,
            context.canvas.width * 0.42 - (this.sizeModifier - 1) * this.image.width / 14,
            context.canvas.height * 0.27 - (this.sizeModifier - 1) * this.image.height / 3.5,
            this.sizeModifier * this.image.width / 7,
            this.sizeModifier * this.image.height
        );
    
        // Set the button color based on whether it's being hovered over
        context.fillStyle = this.isHovered ? this.buttonHoverColor : this.buttonColor;
        context.fillRect(this.buttonX, this.buttonY, this.buttonWidth, this.buttonHeight);
    
        // Draw the button text
        context.fillStyle = 'white';
        context.font = 'bold 24px "Libre Baskerville", serif';
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillText('Pump (+$100)', this.buttonX + this.buttonWidth / 2, this.buttonY + this.buttonHeight / 2);
    
        // Draw the current value (winnings) on the left side of the canvas
        context.fillStyle = 'rgb(55, 180, 86)';
        context.font = 'bold 36px "Libre Baskerville", serif';
        context.textAlign = 'left';
        context.textBaseline = 'middle';
        context.fillText(`Winnings: $${this.value}`, 24, this.buttonY + 0.98 * this.buttonHeight / 2); // 20px margin from the left
    
        // Draw a "Balloon popped" message if the balloon has popped
        if (this.popped) {
            context.fillStyle = 'rgb(57, 86, 171)';
            context.font = 'bold 32px "Libre Baskerville", serif';
            context.textAlign = 'center';
            context.textBaseline = 'middle';
            context.fillText('Balloon popped :(', canvas.width / 2, canvas.height / 2); // Center the message
        }
    
        // guide 
        context.fillStyle = 'rgb(116, 7, 130)'; // Text color
        context.font = 'bold 42px "Libre Baskerville", serif';
        context.textAlign = 'center'; // Center the text
        context.textBaseline = 'middle'; // Align text vertically
        context.fillText('The true value of this asset is ...', 406, 65); // Draw the text
        // actual
        context.fillStyle = 'rgb(57, 86, 171)'; // Text color
        context.font = 'bold 19.5px "Libre Baskerville", serif';
        context.textAlign = 'center'; // Center the text
        context.textBaseline = 'middle'; // Align text vertically
        context.fillText('Start with $300. For each pump, there is probability p it will pop giving final winnings $300p.', canvas.width / 2, canvas.height * 0.8); // Draw the question text
        this.pval = this.value;
        game.sel = this.value;
    }
}

export class Uniform extends Challenge {
    constructor() {
        super('Uniform');
        // Only set the random question once if it has not already been set
        if (!this.lowr && !this.upp) {
            let range = Math.floor(Math.random() * (41 - 15 + 1)) + 15; // in 20s
            this.lowr = (Math.floor(Math.random() * (50 - range - 4 + 1)) + 4) * 20;
            this.uppr = this.lowr + range * 20;
        }
        this.reviewed = 0;
        if (this.reviewed === 0) {
            this.value = Math.floor(Math.random() * (this.uppr - this.lowr + 1)) + this.lowr;
        }
    }

    displayQuestion() {
        const canvas = document.getElementById('canvas2');
        const context = canvas.getContext('2d');
        context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clear the canvas
        // guide 
        context.fillStyle = 'rgb(116, 7, 130)'; // Text color
        context.font = 'bold 42px "Libre Baskerville", serif';
        context.textAlign = 'center'; // Center the text
        context.textBaseline = 'middle'; // Align text vertically
        context.fillText('Take a moment to study the asset.', 406, 65); // Draw the text
        // actual
        context.fillStyle = 'rgb(57, 86, 171)'; // Text color
        context.font = 'bold 25px "Libre Baskerville", serif';
        context.textAlign = 'center'; // Center the text
        context.textBaseline = 'middle'; // Align text vertically
        context.fillText('$N, where N is an integer chosen uniformly from the interval [' +this.lowr+', '+this.uppr+'].', canvas.width / 2, canvas.height / 2); // Draw the question text
    }    

    displayValue(game) {
        this.reviewed = 1; // prevent further changes to value
        const canvas = document.getElementById('canvas2');
        const context = canvas.getContext('2d');
        context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clear the canvas
        // guide 
        context.fillStyle = 'rgb(116, 7, 130)'; // Text color
        context.font = 'bold 42px "Libre Baskerville", serif';
        context.textAlign = 'center'; // Center the text
        context.textBaseline = 'middle'; // Align text vertically
        context.fillText('The true value of this asset is ...', 406, 65); // Draw the text
        // prompt
        context.fillStyle = 'rgb(57, 86, 171)'; // Text color
        context.font = 'bold 25px "Libre Baskerville", serif';
        context.textAlign = 'center'; // Center the text
        context.textBaseline = 'middle'; // Align text vertically
        context.fillText('$N, where N is an integer chosen uniformly from the interval [' +this.lowr+', '+this.uppr+'].', canvas.width / 2, canvas.height / 3); // Draw the question text
        // actual
        context.fillStyle = 'rgb(55, 180, 86)'; // Text color
        context.font = 'bold 120px "Libre Baskerville", serif';
        context.textAlign = 'center'; // Center the text
        context.textBaseline = 'middle'; // Align text vertically
        context.fillText('$' + this.value, canvas.width / 2, 3.1 * canvas.height / 5); // Draw the question text
        // score
        game.sel = this.value;
    }    

}

// Exponential class that picks a random question from the CSV
export class Exponential extends Challenge {
    constructor() {
        super('Exponential');
        // Only set the random question once if it has not already been set
        if (!this.lambda) {
            this.lambda = (Math.floor(Math.random() * 10) * 2 + 17) / 100;
        }
        this.reviewed = 0;
        if (this.reviewed === 0) {
            this.value = Math.round(100 * this.randomExponential(this.lambda));
        }
    }

    randomExponential(lambda) {
        // Generate a random number between 0 and 1
        const u = Math.random();
        // Use the inverse transform method to get an exponential random variable
        return -Math.log(1 - u) / lambda;
    }
    

    displayQuestion() {
        const canvas = document.getElementById('canvas2');
        const context = canvas.getContext('2d');
        context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clear the canvas
        // guide 
        context.fillStyle = 'rgb(116, 7, 130)'; // Text color
        context.font = 'bold 42px "Libre Baskerville", serif';
        context.textAlign = 'center'; // Center the text
        context.textBaseline = 'middle'; // Align text vertically
        context.fillText('Take a moment to study the asset.', 406, 65); // Draw the text
        // actual
        context.fillStyle = 'rgb(57, 86, 171)'; // Text color
        context.font = 'bold 27px "Libre Baskerville", serif';
        context.textAlign = 'center'; // Center the text
        context.textBaseline = 'middle'; // Align text vertically
        context.fillText('$N, where N is the closest integer from an 100exp(' +this.lambda+') distribution.', canvas.width / 2, canvas.height / 2); // Draw the question text
    }    

    displayValue(game) {
        this.reviewed = 1; // prevent further changes to value
        const canvas = document.getElementById('canvas2');
        const context = canvas.getContext('2d');
        context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clear the canvas
        // guide 
        context.fillStyle = 'rgb(116, 7, 130)'; // Text color
        context.font = 'bold 42px "Libre Baskerville", serif';
        context.textAlign = 'center'; // Center the text
        context.textBaseline = 'middle'; // Align text vertically
        context.fillText('The true value of this asset is ...', 406, 65); // Draw the text
        // prompt
        context.fillStyle = 'rgb(57, 86, 171)'; // Text color
        context.font = 'bold 27px "Libre Baskerville", serif';
        context.textAlign = 'center'; // Center the text
        context.textBaseline = 'middle'; // Align text vertically
        context.fillText('$N, where N is the closest integer from an 100exp(' +this.lambda+') distribution.', canvas.width / 2, canvas.height / 3); // Draw the question text
        // actual
        context.fillStyle = 'rgb(55, 180, 86)'; // Text color
        context.font = 'bold 120px "Libre Baskerville", serif';
        context.textAlign = 'center'; // Center the text
        context.textBaseline = 'middle'; // Align text vertically
        context.fillText('$' + this.value, canvas.width / 2, 3.1 * canvas.height / 5); // Draw the question text
        // score
        game.sel = this.value;
    }    

}

export class Visual extends Challenge {
    constructor() {
        super('Visual');
        // Only set the random question once if it has not already been set
        this.image = document.getElementById('visual');
        if (!this.idx) {
            this.idx = Math.floor(Math.random() * 12);
        }
        this.image = document.getElementById('visual' + this.idx);
        this.value = visualPairs[this.idx][0];
    }
    displayQuestion() {
        const canvas = document.getElementById('canvas2');
        const context = canvas.getContext('2d');
        context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clear the canvas

        context.drawImage(
            this.image, 
            0, // sx: Source X (horizontal position of the frame in the image)
            0, // sy: Adjust for the top margin
            this.image.width, // sWidth: Width of each frame minus right margin
            this.image.height, // sHeight: Height of each frame minus top margin
            context.canvas.width * visualPairs[this.idx][2], // dx: Destination X (where on the canvas to start drawing)
            context.canvas.height * visualPairs[this.idx][3], // dy: Destination Y (where on the canvas to start drawing)
            visualPairs[this.idx][4] * this.image.width, // dWidth: Width of the drawn image minus right margin
            visualPairs[this.idx][4] * this.image.height, // dHeight: Height of the drawn image minus top margin
        );
        // guide 
        context.fillStyle = 'rgb(116, 7, 130)'; // Text color
        context.font = 'bold 42px "Libre Baskerville", serif';
        context.textAlign = 'center'; // Center the text
        context.textBaseline = 'middle'; // Align text vertically
        context.fillText('Take a moment to study the asset.', 406, 65); // Draw the text
        // actual
        context.fillStyle = 'rgb(57, 86, 171)'; // Text color
        let promptLen = visualPairs[this.idx][1].length;
        let promptSize = 24 * 68 / promptLen;
        context.font = 'bold ' + promptSize + 'px "Libre Baskerville", serif';
        context.textAlign = 'center'; // Center the text
        context.textBaseline = 'middle'; // Align text vertically
        context.fillText(visualPairs[this.idx][1], canvas.width / 2, canvas.height * 0.75); // Draw the question text
    }    

    displayValue(game) {
        const canvas = document.getElementById('canvas2');
        const context = canvas.getContext('2d');
        context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clear the canvas

        context.drawImage(
            this.image, 
            0, // sx: Source X (horizontal position of the frame in the image)
            0, // sy: Adjust for the top margin
            this.image.width, // sWidth: Width of each frame minus right margin
            this.image.height, // sHeight: Height of each frame minus top margin
            context.canvas.width * visualPairs[this.idx][2], // dx: Destination X (where on the canvas to start drawing)
            context.canvas.height * visualPairs[this.idx][3], // dy: Destination Y (where on the canvas to start drawing)
            visualPairs[this.idx][4] * this.image.width, // dWidth: Width of the drawn image minus right margin
            visualPairs[this.idx][4] * this.image.height, // dHeight: Height of the drawn image minus top margin
        );

        // guide 
        context.fillStyle = 'rgb(116, 7, 130)'; // Text color
        context.font = 'bold 42px "Libre Baskerville", serif';
        context.textAlign = 'center'; // Center the text
        context.textBaseline = 'middle'; // Align text vertically
        context.fillText('The true value of this asset is ...', 406, 65); // Draw the text
        // actual
        context.fillStyle = 'rgb(57, 86, 171)'; // Text color
        let promptLen = visualPairs[this.idx][1].length;
        let promptSize = 24 * 68 / promptLen;
        context.font = 'bold ' + promptSize + 'px "Libre Baskerville", serif';
        context.textAlign = 'center'; // Center the text
        context.textBaseline = 'middle'; // Align text vertically
        context.fillText(visualPairs[this.idx][1], canvas.width / 2, canvas.height * 0.8); 
        // actual
        context.fillStyle = 'rgb(55, 180, 86)'; // Text color
        context.font = 'bold 120px "Libre Baskerville", serif';
        context.textAlign = 'center'; // Center the text
        context.textBaseline = 'middle'; // Align text vertically
        context.fillText('$' + this.value, canvas.width / 2, 3.1 * canvas.height / 5); // Draw the question text
        // score
        game.sel = this.value;
    }    

}
