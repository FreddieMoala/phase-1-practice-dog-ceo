console.log('%c HI', 'color: firebrick')
const imgUrl = "https://dog.ceo/api/breeds/image/random/4"

document.addEventListener('DOMContentLoaded', function() {
    fetch(imgUrl) 
    .then(response => response.json())
    .then(data => {
        data.message.forEach(image => {
            const img = document.createElement('img');
            img.src = image;
            document.querySelector('#dog-image-container').appendChild(img);
        });
    })
})

const breedUrl = 'https://dog.ceo/api/breeds/list/all'

document.addEventListener('DOMContentLoaded', function() {
    fetch(breedUrl)
    .then(response => response.json())
    .then(data => {
        const breeds = Object.keys(data.message);
        renderBreeds(breeds);
        addBreedSelectListener();
    })
})

function addBreedSelectListener() {
    let breedDropdown = document.querySelector('#breed-dropdown');
    breedDropdown.addEventListener('change', function(event) {
        selectBreedsStartingWith(event.target.value);
    })
}

function selectBreedsStartingWith(letter) {
    const ul = document.querySelector('#dog-breeds');
    const breeds = ul.children;
    for (let i = 0; i < breeds.length; i++) {
        if (breeds[i].innerText.startsWith(letter)) {
            breeds[i].style.display = '';
        } else {
            breeds[i].style.display = 'none';
        }
    }
}


function renderBreeds(breeds) {
    const ul = document.querySelector('#dog-breeds');
    breeds.forEach(breed => {
        const li = document.createElement('li');
        li.innerText = breed;
        ul.appendChild(li);
        li.addEventListener('click', updateColor)
    })
}

function updateColor(event) {
    event.target.style.color = 'red';
}

function updateBreedsList(breeds) {
    let ul = document.querySelector('#dog-breeds');
    removeChildren(ul);
    renderBreeds(breeds);
}

function removeChildren(element) {
    let child = element.lastElementChild;
    while (child) {
        element.removeChild(child);
        child = element.lastElementChild;
    }
}

