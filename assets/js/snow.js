//Snow Fall
document.addEventListener('DOMContentLoaded', function () {
    const currentMonth = new Date().getMonth() + 1; // Get current month (1-12)

    // Define months when snowfall should occur
    const snowMonths = [12, 1]; // December, January // Example [12, 1, 2];

    // Check if the current month is in the snowMonths array
    if (snowMonths.includes(currentMonth)) {
        // Proceed with creating snowflakes
        const snowflakesContainer = document.createElement('div');
        snowflakesContainer.style.position = 'fixed';
        snowflakesContainer.style.top = '0';
        snowflakesContainer.style.left = '0';
        snowflakesContainer.style.pointerEvents = 'none';
        snowflakesContainer.style.width = '100%';
        snowflakesContainer.style.height = '100%';
        snowflakesContainer.style.zIndex = '1';
        document.body.appendChild(snowflakesContainer);

        document.addEventListener('mousemove', function (event) {
            const mouseX = event.clientX / window.innerWidth;
            snowflakesContainer.style.transform = `translateX(${mouseX * 50}px)`;
        });

        for (let i = 0; i < 50; i++) {
            createSnowflake();
        }

        function createSnowflake() {
            const snowflake = document.createElement('div');
            snowflake.className = 'snowflake';
            snowflake.innerHTML = '❄';
            snowflake.style.left = Math.random() * window.innerWidth + 'px';
            snowflake.style.animationDuration = Math.random() * 5 + 5 + 's'; // Adjust speed

            snowflakesContainer.appendChild(snowflake);
        }
    }
});





// Add this section at the bottom of your script.js file
const style = document.createElement('style');
style.textContent = `
    @keyframes falling {
        0% {
            transform: translateY(-100vh);
        }
        100% {
            transform: translateY(100vh);
        }
    }

    .snowflake {
        animation: falling linear infinite;
        position: absolute;
        font-size: 20px;
        color: #fff;
        user-select: none;
        opacity: 0.8;
    }
`;

document.head.appendChild(style);

