export function getRandomWord(wordLength, dictionary) {
    const filteredWords = dictionary.filter(word => word.length === wordLength);
    const randomIndex = Math.floor(Math.random() * filteredWords.length);
    return filteredWords[randomIndex];
}

export function isValidWord(word, dictionary) {
    return dictionary.includes(word);
}

export function getWordLengthSuggestions() {
    return [4, 5, 6, 7];
}