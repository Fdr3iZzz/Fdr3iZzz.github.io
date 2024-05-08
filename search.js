const transferToDDG = () => {
    let content = document.querySelector('input.searchField').value;
    window.open(`https://www.startpage.com/do/dsearch?query=${content}&cat=web&pl=ext-ff&language=deutsch&extVersion=1.3.0`, '_self')
}

const postLoad = () => {
    const delegateSubmission = (event) => {
        if (event.keyCode == 13) {
            transferToDDG();
        }
    }
    document.addEventListener('keydown', delegateSubmission);
}

document.addEventListener('DOMContentLoaded', postLoad);