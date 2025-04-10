const board = document.getElementById('board');
const messageContainer = document.getElementById('message');

let words = []; // Store the dictionary here
let targetWord = '';
let wordLength = 0;
let attempts = 0;
const maxAttempts = 6;

// Add score tracking variables
let gamesWon = 0;
let gamesPlayed = 0;

// Create a score display element
const scoreDisplay = document.createElement('div');
scoreDisplay.id = 'score-display';
scoreDisplay.style.marginTop = '20px';
scoreDisplay.style.fontSize = '1.2em';
scoreDisplay.style.color = '#ffffff';
document.body.appendChild(scoreDisplay);

// Add a dynamic header to display the word length
const header = document.createElement('h2');
header.id = 'word-length-header';
// Ensure board.parentElement is a child of document.body before inserting
if (board.parentElement && document.body.contains(board.parentElement)) {
    document.body.insertBefore(header, board.parentElement);
} else {
    document.body.appendChild(header);
}

// Add a button to provide hints
const hintButton = document.createElement('button');
hintButton.id = 'hint-button';
hintButton.textContent = 'Get a Hint';
hintButton.style.marginTop = '10px';
hintButton.style.padding = '10px';
hintButton.style.fontSize = '1em';
hintButton.style.cursor = 'pointer';
document.body.appendChild(hintButton);

// Add a start again button
const startAgainButton = document.createElement('button');
startAgainButton.id = 'start-again-button';
startAgainButton.textContent = 'Start Again';
startAgainButton.style.marginTop = '10px';
startAgainButton.style.padding = '10px';
startAgainButton.style.fontSize = '1em';
startAgainButton.style.cursor = 'pointer';
document.body.appendChild(startAgainButton);

// Highlight the current row by adding a specific class to the row
function highlightCurrentRow() {
    Array.from(board.children).forEach((row, index) => {
        if (index === attempts) {
            row.classList.add('highlight-row');
            console.log(`Highlighting row ${index + 1}`); // Debugging log
        } else {
            row.classList.remove('highlight-row');
        }
    });
}

// Update the header to show the word length in a descriptive way
function updateHeader() {
    header.textContent = `This word is ${wordLength} letters long.`;
    console.log(header.textContent); // Debugging log
}

// Fetch the dictionary and initialize the game
async function initializeGame() {
    try {
        // Fetch the dictionary
        const response = await fetch('/dictionary/irish-words.json');
        if (!response.ok) {
            throw new Error(`Failed to fetch dictionary: ${response.statusText}`);
        }
        words = await response.json();

        // Initialize game variables
        wordLength = getRandomWordLength();
        targetWord = getRandomWord(wordLength);
        attempts = 0;
        board.innerHTML = '';
        messageContainer.textContent = '';

        console.log(`Target word: ${targetWord}`); // Debugging log

        // Set the word length as a CSS variable
        document.documentElement.style.setProperty('--word-length', wordLength);

        // Dynamically set grid-template-columns to match word length
        board.style.gridTemplateColumns = `repeat(${wordLength}, 1fr)`;

        // Create the board dynamically
        for (let i = 0; i < maxAttempts; i++) {
            const row = document.createElement('div');
            row.classList.add('row');
            for (let j = 0; j < wordLength; j++) {
                const box = document.createElement('div');
                box.classList.add('input-box');
                row.appendChild(box);
            }
            board.appendChild(row);
        }

        // Highlight the first row
        highlightCurrentRow();

        console.log('Game initialized.'); // Debugging log
    } catch (error) {
        console.error('Failed to load the dictionary:', error);
        showMessage('Earráid: Níor éirigh leis an gcluiche a luchtú.');
    }
}

// Get a random word length (4–7 letters)
function getRandomWordLength() {
    return Math.floor(Math.random() * 4) + 4; // Random number between 4 and 7
}

// Get a random word of the specified length
function getRandomWord(length) {
    const filteredWords = words.filter(word => word.length === length);
    if (filteredWords.length === 0) {
        throw new Error(`No words of length ${length} found in the dictionary.`);
    }
    return filteredWords[Math.floor(Math.random() * filteredWords.length)];
}

// Handle guess submission
function handleGuess() {
    const currentRow = board.children[attempts];
    const guess = Array.from(currentRow.children)
        .map(box => box.textContent.toLowerCase())
        .join('');

    // Validate input
    if (guess.length !== wordLength) {
        showMessage(`Caithfidh do thomhas a bheith ${wordLength} litir ar fad.`);
        return;
    }
    if (!words.includes(guess)) {
        showMessage('Ní focal bailí é seo.');
        return;
    }

    // Process the guess
    const feedback = getFeedback(guess);

    for (let i = 0; i < wordLength; i++) {
        const box = currentRow.children[i];
        box.classList.add(feedback[i]); // Add feedback class (correct, present, absent)
    }

    attempts++;

    // Check win/loss conditions
    if (guess === targetWord) {
        showMessage('Comhghairdeas! Bhuaigh tú!', true);
        return;
    }
    if (attempts === maxAttempts) {
        showMessage(`Tá an cluiche thart. An focal ceart ná: ${targetWord}`, true);
        return;
    }

    // Highlight the next row
    highlightCurrentRow();

    // Focus on the first box of the next row
    const nextRow = board.children[attempts];
    if (nextRow) nextRow.children[0].focus();
}

// Get feedback for the guess
function getFeedback(guess) {
    const feedback = Array(wordLength).fill('absent');
    const targetArray = targetWord.split('');

    // Check for correct letters in the correct position
    for (let i = 0; i < wordLength; i++) {
        if (guess[i] === targetArray[i]) {
            feedback[i] = 'correct';
            targetArray[i] = null; // Mark as used
        }
    }

    // Check for correct letters in the wrong position
    for (let i = 0; i < wordLength; i++) {
        if (feedback[i] === 'correct') continue;
        const index = targetArray.indexOf(guess[i]);
        if (index !== -1) {
            feedback[i] = 'present';
            targetArray[index] = null; // Mark as used
        }
    }

    return feedback;
}

// Show a message to the player
function showMessage(message, isFinal = false) {
    messageContainer.textContent = message;
    if (isFinal) {
        gamesPlayed++;
        if (message.includes('Bhuaigh t\u00fa')) {
            gamesWon++;
        }
        updateScoreDisplay();
        Array.from(board.querySelectorAll('.input-box')).forEach(box => (box.disabled = true));
    } else {
        setTimeout(() => {
            messageContainer.textContent = '';
        }, 3000); // Clear the message after 3 seconds
    }
}

// Update the score display
function updateScoreDisplay() {
    scoreDisplay.textContent = `Games Played: ${gamesPlayed} | Games Won: ${gamesWon}`;
}

// Allow typing directly into the grid
board.addEventListener('click', (e) => {
    if (e.target.classList.contains('input-box')) {
        e.target.contentEditable = true;
        e.target.focus();
    }
});

document.addEventListener('keydown', (e) => {
    const activeElement = document.activeElement;
    if (activeElement.classList.contains('input-box')) {
        if (e.key === 'ArrowRight') {
            const next = activeElement.nextElementSibling;
            if (next) next.focus();
        } else if (e.key === 'ArrowLeft') {
            const prev = activeElement.previousElementSibling;
            if (prev) prev.focus();
        }
    }
});

// Add event listener for hint button
hintButton.addEventListener('click', () => {
    if (attempts >= maxAttempts) {
        showMessage('No hints available after the game is over.');
        return;
    }

    const currentRow = board.children[attempts];
    const hintIndex = targetWord.split('').findIndex((letter, index) => {
        const box = currentRow.children[index];
        return !box.textContent && !box.classList.contains('correct');
    });

    if (hintIndex !== -1) {
        const hintBox = currentRow.children[hintIndex];
        hintBox.textContent = targetWord[hintIndex].toUpperCase();
        hintBox.classList.add('hint');
        showMessage('Hint provided!');
    } else {
        showMessage('No more hints available for this row.');
    }
});

// Add event listener for start again button
startAgainButton.addEventListener('click', () => {
    initializeGame();
    showMessage('Game restarted!');
});

// Start the game
initializeGame();
updateScoreDisplay();