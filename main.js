import { ASSET0, REVIEW0, SCORE, HOME } from "./playerStates.js";

window.addEventListener('load', function () {
    const canvas1 = document.getElementById('canvas1');
    const ctx1 = canvas1.getContext('2d');
    const canvas2 = document.getElementById('canvas2');
    const ctx2 = canvas2.getContext('2d');

    // Set canvas dimensions
    canvas1.width = 800;
    canvas1.height = 640;
    canvas2.width = 800;
    canvas2.height = 640;

    // Button configurations
    const buttons = [
        {
            x: 160,
            y: 15,
            width: 627,
            height: 228,
            text: 'Prophet Inequality',
            ver: 0,
            isHovered: false // Track hover state
        },
        {
            x: 15,
            y: 398, // Adjusted position for the second button
            width: 628,
            height: 229,
            text: 'Secretary Version',
            ver: 1,
            isHovered: false // Track hover state
        }
    ];

    const avgs = [
        {
            x: 75,
            y: 115,
            text: 'Avg',
        },
        {
            x: 720,
            y: 530,
            text: 'Avg',
        }
    ];

    const vals = [
        {
            x: 85,
            y: 205,
            ver: 0,
        },
        {
            x: 730,
            y: 450,
            ver: 1,
        }
    ];

    const guides = [
        {
            x: 406,
            y: 65,
            text: 'Take a moment to study the asset.',
        },
    ];

    class Game {
        constructor(width, height) {
            this.width = width;
            this.height = height;
            this.assets = [];
            this.states = [new ASSET0(this, ctx2), new REVIEW0(this, ctx2), 
                new SCORE(this, ctx2), new HOME(this, ctx1)
            ];
            this.currentState = this.states[3];
            this.currentState.enter();
            this.version = 0;
            this.sel = 0;
            this.yes = 0;
            this.no = 0;
        }

        update() {
            if (this.currentState === this.states[2]) {
                this.currentState.scoreDisplay();
            }
            else if (this.currentState != this.states[3] && this.no < 11) {
                this.currentState.updateDisplay();
            } 
        }

        draw(context) {
            // Implement draw logic (e.g., rendering game objects)
        }

        setState(state){
            this.currentState = this.states[state];
            this.currentState.enter(); 
        }
    }

    const game = new Game(canvas1.width, canvas1.height);
    console.log(game);
    let lastTime = 0;

    // Mouse position tracking
    let mouseX, mouseY;

    let animationFrameId; // To store the animation frame ID

    function animate(timeStamp) {
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;
        ctx1.clearRect(0, 0, canvas1.width, canvas1.height);

        // Draw buttons
        buttons.forEach(button => drawButton(button));
        // Draw avgs
        avgs.forEach(avg => drawAvg(avg));
        // Draw avg vals
        vals.forEach(val => drawVal(val));

        animationFrameId = requestAnimationFrame(animate); // Store the animation frame ID
    }

    animate(0);

    function drawGuide(guide) {
        ctx2.fillStyle = 'rgb(70, 0, 100)'; // Text color
        ctx2.font = 'bold 36px "Libre Baskerville", serif';
        ctx2.textAlign = 'center'; // Center the text
        ctx2.textBaseline = 'middle'; // Align text vertically
        ctx2.fillText(guide.text, guide.x, guide.y); // Draw the text
    }

    function drawAvg(avg) {
        ctx1.fillStyle = 'rgb(57, 86, 171)'; // Text color
        ctx1.font = 'bold 72px "Libre Baskerville", serif';
        ctx1.textAlign = 'center'; // Center the text
        ctx1.textBaseline = 'middle'; // Align text vertically
        ctx1.fillText(avg.text, avg.x, avg.y); // Draw the text
    }

    function drawVal(val) {
        ctx1.fillStyle = 'rgb(55, 180, 86)'; // Text color
        ctx1.font = 'bold 72px "Libre Baskerville", serif';
        ctx1.textAlign = 'center'; // Center the text
        ctx1.textBaseline = 'middle'; // Align text vertically
        let totalScore = parseFloat(localStorage.getItem('totalScore' + val.ver)) || 0;
        let numberOfSessions = parseInt(localStorage.getItem('numberOfSessions' + val.ver)) || 0;
        let percent = numberOfSessions > 0 ? Math.round(totalScore / numberOfSessions) : 0;
        ctx1.fillText(percent + '%', val.x, val.y); // Draw the text
    }

    // Function to draw a button
    function drawButton(button) {
        // Determine button color based on hover state
        ctx1.strokeStyle = button.isHovered ? 'rgb(200, 50, 200)' : 'rgb(150, 0, 150)'; // Border color
        ctx1.lineWidth = 5; // Set border width
        ctx1.strokeRect(button.x, button.y, button.width, button.height); // Draw button border
    
        // Button text
        ctx1.fillStyle = button.isHovered ? 'rgb(200, 50, 200)' : 'rgb(150, 0, 150)'; // Text color
        ctx1.font = 'bold 72px "Libre Baskerville", serif';
        ctx1.textAlign = 'center'; // Center the text
        ctx1.textBaseline = 'middle'; // Align text vertically
        ctx1.fillText(button.text, button.x + button.width / 2, button.y + button.height / 2); // Draw the text
    }

    // Check if the mouse click is within any button's area
    canvas1.addEventListener('click', function (event) {
        const rect = canvas1.getBoundingClientRect();
        mouseX = event.clientX - rect.left; // Get mouse X relative to canvas
        mouseY = event.clientY - rect.top; // Get mouse Y relative to canvas

        // Check each button for a click
        buttons.forEach(button => {
            if (
                mouseX >= button.x &&
                mouseX <= button.x + button.width &&
                mouseY >= button.y &&
                mouseY <= button.y + button.height
            ) {
                if (button.ver == 0) {
                    game.version = 0;
                } else {
                    game.version = 1;
                }
                // Button action here (e.g., log a message)
                console.log(`${button.text} clicked!`);
                switchToCanvas2(); // Switch to canvas2 when a button is clicked
            }
        });
    });

    // Function to switch to canvas2
    function switchToCanvas2() {
        cancelAnimationFrame(animationFrameId); // Stop the animation for canvas1
        canvas1.style.display = 'none'; // Hide canvas1       
        document.querySelector('.middle-container').style.display = 'none';
        canvas2.style.display = 'block'; // Show canvas2
        game.part = 1;
        game.setState(0);
        animateCanvas2(); // Start the loop for canvas2
    }

    // Example function for animating canvas2 (replace with your actual logic)
    function animateCanvas2() {
        ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
        ctx2.fillStyle = 'white'; // Example background color
        ctx2.fillRect(0, 0, canvas2.width, canvas2.height); // Example rectangle

        // Draw guides
        guides.forEach(guide => drawGuide(guide));
        game.update();

        animationFrameId = requestAnimationFrame(animate);

        requestAnimationFrame(animateCanvas2); // Loop for canvas2
    }

    // Check for mouse movement to update hover state
    canvas1.addEventListener('mousemove', function (event) {
        const rect = canvas1.getBoundingClientRect();
        mouseX = event.clientX - rect.left; // Get mouse X relative to canvas
        mouseY = event.clientY - rect.top; // Get mouse Y relative to canvas

        // Update hover state for each button
        buttons.forEach(button => {
            button.isHovered = (
                mouseX >= button.x &&
                mouseX <= button.x + button.width &&
                mouseY >= button.y &&
                mouseY <= button.y + button.height
            );
        });
    });
});
