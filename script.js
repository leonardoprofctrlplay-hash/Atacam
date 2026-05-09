let displayValue = '0';
let isBSODActive = false;
let isBlackScreenActive = false;
let blackScreenTimeout = null;

function updateDisplay() {
    const display = document.getElementById('display');
    display.innerText = displayValue;
}

function appendToDisplay(char) {
    if (isBSODActive || isBlackScreenActive) return;
    if (displayValue === '0' && char !== '.') {
        displayValue = char;
    } else {
        displayValue += char;
    }
    updateDisplay();
}

function clearDisplay() {
    if (isBSODActive || isBlackScreenActive) return;
    displayValue = '0';
    updateDisplay();
}

function deleteLast() {
    if (isBSODActive || isBlackScreenActive) return;
    if (displayValue.length > 1) {
        displayValue = displayValue.slice(0, -1);
    } else {
        displayValue = '0';
    }
    updateDisplay();
}

function calculate() {
    if (isBSODActive || isBlackScreenActive) return;
    
    try {
        const result = eval(displayValue);
        displayValue = result.toString();
        updateDisplay();
        
        const calculatorContainer = document.getElementById('calculator-container');
        calculatorContainer.classList.add('spinning');
        
        setTimeout(triggerBSOD, 2000);
    } catch (e) {
        displayValue = 'Erro';
        updateDisplay();
    }
}

function triggerBSOD() {
    isBSODActive = true;
    const calculator = document.getElementById('calculator-container');
    const bsod = document.getElementById('bsod');
    const imageScreen = document.getElementById('image-screen');
    
    calculator.classList.add('hidden');
    bsod.classList.remove('hidden');
    
    let percent = 0;
    const percentElement = document.getElementById('percent');
    
    const interval = setInterval(() => {
        percent += Math.floor(Math.random() * 10) + 1;
        if (percent >= 100) {
            percent = 100;
            clearInterval(interval);
            setTimeout(() => {
                bsod.classList.add('hidden');
                imageScreen.classList.remove('hidden');
                
                setTimeout(() => {
                    imageScreen.classList.add('hidden');
                    showBlackScreen();
                }, 4000);
            }, 2000);
        }
        percentElement.innerText = percent;
    }, 300);
}

function showBlackScreen() {
    isBlackScreenActive = true;
    const blackScreen = document.getElementById('black-screen');
    blackScreen.classList.remove('hidden');
    
    // Iniciar temporizador de 5 minutos (300000 ms)
    blackScreenTimeout = setTimeout(() => {
        redirectToYouTube();
    }, 300);
}

function redirectToYouTube() {
    // Abre um vídeo do YouTube em uma nova aba
    window.open('https://youtu.be/LHXpiTLVXR4?si=nUSh5PePNuDEUJF3', '_blank');
}

function handleKeyPress(event) {
    if (event.key.toLowerCase() === 'f' && isBlackScreenActive) {
        clearTimeout(blackScreenTimeout);
        returnToCalculator();
    }
}

function returnToCalculator() {
    isBlackScreenActive = false;
    isBSODActive = false;
    const calculator = document.getElementById('calculator-container');
    const blackScreen = document.getElementById('black-screen');
    
    blackScreen.classList.add('hidden');
    calculator.classList.remove('hidden');
    calculator.classList.remove('spinning');
    clearDisplay();
}

document.addEventListener('keydown', handleKeyPress);
