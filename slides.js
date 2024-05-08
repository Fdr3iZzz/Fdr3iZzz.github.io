const localStoredDataEnum = Object.freeze({
    lastImageIndex: "lastImageIndex",
    lastShuffledIndices: "lastShuffledIndices"
});
const numberOfImages = 23;

function initializeStartpage() {
    const lastImageIndex = localStorage.getItem(localStoredDataEnum.lastImageIndex);
    const lastShuffledIndices = localStorage.getItem(localStoredDataEnum.lastShuffledIndices);

    if (lastImageIndex === null || lastShuffledIndices === null || lastImageIndex === "undefined" || lastShuffledIndices === "undefined") {
        const imageIndices = Array.from({ length: numberOfImages }, (_, i) => i + 1);
        const shuffledIndices = shuffleArray(imageIndices);
        localStorage.setItem(localStoredDataEnum.lastShuffledIndices, JSON.stringify(shuffledIndices));
        localStorage.setItem(localStoredDataEnum.lastImageIndex, "0");
    }
    setNewImage();
}

function setNewImage() {
    const index = getNextImageIndex();
    changeImage(index);
}

function getNextImageIndex() {
    const shuffledIndices = JSON.parse(localStorage.getItem(localStoredDataEnum.lastShuffledIndices));
    const nextImageIndex = shuffledIndices[parseInt(localStorage.getItem(localStoredDataEnum.lastImageIndex))];
    const currentIndex = (parseInt(localStorage.getItem(localStoredDataEnum.lastImageIndex)) + 1) % shuffledIndices.length;
    localStorage.setItem(localStoredDataEnum.lastImageIndex, currentIndex.toString());
    if (currentIndex === 0) {
        shuffleArray(shuffledIndices);
        localStorage.setItem(localStoredDataEnum.lastShuffledIndices, JSON.stringify(shuffledIndices));
    }
    return nextImageIndex;
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function changeImage(index) {
    const imageFolder = 'img/';
    const imageUrl = imageFolder + 'side' + index + '.gif';
    document.getElementById('slideshow-container').innerHTML = '<img src="' + imageUrl + '">';
    localStorage.setItem(localStoredDataEnum.lastImageIndex, index.toString()); // Convert index to string
}

initializeStartpage();
