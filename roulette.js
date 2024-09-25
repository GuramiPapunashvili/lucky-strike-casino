let userChoice

function chooseNumber(number) {
    userChoice = number;

    const numberElements = document.querySelectorAll('.number');
    numberElements.forEach(num => {
        if (parseInt(num.textContent) === number) {
            num.style.backgroundColor = 'yellow';
        } else {
            num.style.backgroundColor = ''; 
        }
    });
}

function spinRoulette() {
    if (userChoice === null) {
        alert("Please choose a number before spinning the roulette!");
        return;
    }

    const numbers = Array.from({ length: 37 }, (_, i) => i);
    const randomIndex = Math.floor(Math.random() * numbers.length);
    const spunNumber = numbers[randomIndex];

    const numberElements = document.querySelectorAll('.number');
    numberElements.forEach(num => {
        if (parseInt(num.textContent) === spunNumber) {
            num.style.fontWeight = 'bold';
            num.style.color = 'red';
        } else {
            num.style.fontWeight = 'normal';
            num.style.color = 'black';
        }
    });

    if (spunNumber === userChoice) {
        alert(`You spun: ${spunNumber}. Congratulations, you won!`);
    } else {
        alert(`You spun: ${spunNumber}. Sorry, you lost!`);
    }
}
