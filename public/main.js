console.log('connected')

// Step 1: Add the HTML
const getAllBtn = document.querySelector('#all')
const charBtns = document.querySelectorAll('.char-btns')
const ageForm = document.querySelector('#age-form')
const ageInput = document.querySelector('#age-input')
const createForm = document.querySelector('#create-form')
const newFirstInput = document.querySelector('#first')
const newLastInput = document.querySelector('#last')
const newGenderDropDown = document.querySelector('select')
const newAgeInput = document.querySelector('#age')
const newLikesText = document.querySelector('textarea')
const charContainer = document.querySelector('section')

const baseURL = "http://localhost:4000"

// Step 2: Create callback function
function createCharacterCard(char) {
  let charCard = document.createElement('div')
  charCard.innerHTML = `<h3>${char.firstName} ${char.lastName}</h3>
  <p>gender: ${char.gender} | age: ${char.age}</p>
  <h4>Likes</h4>
  <ul>
    <li>${char.likes[0]}</li>
    <li>${char.likes[1]}</li>
    <li>${char.likes[2]}</li>
  </ul>`

  charContainer.appendChild(charCard)
}

function clearCharacters() {
  charContainer.innerHTML = ``
}

// Create a function that will send axios.get request
function getAllChars(){
  clearCharacters()
  axios.get(`${baseURL}/characters`)
  .then((response) => {
    console.log(response.data)
for (let i = 0; i < response.data.length; i++){
  createCharacterCard(response.data[i])
    }
  })
}

// Create a function that will run axios.get with route Param
function getOneChar(event){
  clearCharacters()
axios.get(`${baseURL}/character/${event.target.id}`)
.then((res) => {
  console.log(res)
  createCharacterCard(res.data)
})
.catch((err) => {
console.log(err)
})
}

// Create a function that will run axios request with Query String
function getOldChars(event){
  event.preventDefault()

  clearCharacters()

  axios.get(`${baseURL}/character/?age=${ageInput.value}`)
  .then((res) => {
    console.log(res.data)
    for(let i = 0; i < res.data.length; i++){
      createCharacterCard(res.data[i])
    }
  })
  .catch((err) => {
    console.log(err)
  })
}

// Create a new character
function createNewChar(e){
  e.preventDefault()

let newLikes = [...newLikesText.value.split(',')]
// ['eat', 'run', 'play']

let body = {
  firstName: newFirstInput.value,
  lastName: newLastInput.value,
  gender: newGenderDropDown.value,
  age: newAgeInput.value,
  likes: newLikes
}

axios.post(`${baseURL}/character`, body)
.then((res) => {
console.log(res)
for (let i = 0; i < res.data.length; i++){
  createCharacterCard(res.data[i])
}
})
.catch((err) => {
  console.log(err)
})

newFirstInput.value = ''
newLastInput.value = ''
newGenderDropDown.value = ''
newAgeInput.value = ''
newLikesText.value = ''
}

// Step 3: Add Event Listener
getAllBtn.addEventListener('click', getAllChars )

// Add indiv CharBtns
for(let i = 0; i < charBtns.length; i++){
  charBtns[i].addEventListener('click',getOneChar)
}

ageForm.addEventListener("submit", getOldChars)

createForm.addEventListener("submit", createNewChar)