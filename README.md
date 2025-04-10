# Caint - A Wordle Clone in Irish

Caint is a web-based word guessing game inspired by Wordle, where players can guess words of varying lengths (4, 5, 6, or 7 letters) using an Irish language dictionary. The game features smooth animations and an engaging user interface.

## Features

- Playable in the browser
- Word lengths of 4, 5, 6, or 7 letters
- Dictionary of Irish words
- Smooth animations for an enhanced user experience

## Getting Started

To run the game locally, follow these steps:

1. **Clone the repository:**
   ```
   git clone https://github.com/yourusername/caint.git
   cd caint
   ```

2. **Install dependencies:**
   Make sure you have Node.js installed. Then run:
   ```
   npm install
   ```

3. **Run the application:**
   You can start a local server to view the game in your browser. Use a tool like `live-server` or any other local server setup:
   ```
   npx live-server public
   ```

4. **Open your browser:**
   Navigate to `http://localhost:8080` (or the port specified by your local server) to start playing Caint.

## How to Play

- Enter your guess in the input field.
- After each guess, the game will provide feedback:
  - Correct letters in the correct position will be highlighted in green.
  - Correct letters in the wrong position will be highlighted in yellow.
  - Incorrect letters will be highlighted in gray.
- You have a limited number of guesses to find the correct word.

## Contributing

Contributions are welcome! If you have suggestions for improvements or new features, feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Acknowledgments

Special thanks to the contributors of the Irish language dictionary and the developers of similar word games that inspired this project.