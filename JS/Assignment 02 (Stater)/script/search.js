'use strict';

// selecting
const findBtn = document.querySelector('#find-btn')
const idEle = document.querySelector('#input-id')
const nameEle = document.querySelector('#input-name')
const typeEle = document.querySelector('#input-type')
const breedEle = document.querySelector('#input-breed')
const vaccinatedEle = document.querySelector('#input-vaccinated')
const dewormedEle = document.querySelector('#input-dewormed')
const sterilizedEle = document.querySelector('#input-sterilized')

const tableBody = document.querySelector('#tbody')

let isCheckVac = false
let isCheckDew = false
let isCheckSte = false
let isFound = false

const funcYes = (ele) =>{
    let yes = document.createElement('i')
    yes.setAttribute('class',"bi bi-check-circle-fill")
    ele.appendChild(yes);
}
const funcNo = (ele) =>{
    let no = document.createElement('i')
    no.setAttribute('class', "bi bi-x-circle-fill")
    ele.appendChild(no)
}
// get all pets from local storage
function getAllPets() {

    let tmp = JSON.parse(localStorage.getItem('pets'))
    if (!Boolean(tmp) || tmp.length === 0) {
        return null
    }
    return tmp;
}
const pets = getAllPets()

/**
 * 
 * @param {number} id 
 * @param {Array} result
 */
function getPetsById(id, result) {

    // console.log("ID: ", id);
    return result.filter(pet => (pet.id).indexOf(id) !== -1)
}
/**
 * 
 * @param {string} name 
 */
function getPetsByName(name, result) {
    return result.filter(pet => (pet.name).indexOf(name) !== -1)
}

vaccinatedEle.addEventListener('click', ()=>isCheckVac = true)

dewormedEle.addEventListener("click", ()=>isCheckDew=true)

sterilizedEle.addEventListener('click', ()=>isCheckSte=true)

function addingCellPet(text) {

    const cell = document.createElement('td')
    cell.textContent = text

    return cell
}

function addingRowPet(pet) {

    const row = document.createElement('tr')
    row.setAttribute('id', pet.id)
    // id
    let idCell = document.createElement('th')
    idCell.setAttribute('scope', 'row')
    idCell.textContent = pet.id
    row.appendChild(idCell)

    // name
    let nameCell = addingCellPet(pet.name)
    row.appendChild(nameCell)

    // age
    let ageCell = addingCellPet(pet.age)
    row.appendChild(ageCell)

    // type
    let typeCell = addingCellPet(pet.type)
    row.appendChild(typeCell)

    // weight
    let weightCell = document.createElement('td')
    weightCell.textContent = pet.weight + "kg"
    row.appendChild(weightCell)

    // Length 
    let lengthCell = document.createElement('td')
    lengthCell.textContent = pet.length + "cm"
    row.appendChild(lengthCell)

    // Breed
    let breedCell = addingCellPet(pet.breed)
    row.appendChild(breedCell)

    // Color
    let colorItem = document.createElement('i')
    colorItem.setAttribute('class', 'bi bi-square-fill')
    colorItem.setAttribute('style', `color:${pet.color}`)
    let colorCell = document.createElement('td')
    colorCell.appendChild(colorItem)
    row.appendChild(colorCell)

    // Vaccinated
    let vaccinatedCell = document.createElement('td')
    vaccinatedCell.setAttribute('class', 'vaccinated-cell')
    if (pet.isVaccinated) {
        funcYes(vaccinatedCell)
    } else {
        funcNo(vaccinatedCell)
    }
    
    row.appendChild(vaccinatedCell)

    // Dewormed
    let deCell = document.createElement('td') 
    deCell.setAttribute('class', 'dewormed-cell')
    if (pet.isDewormed) {
        funcYes(deCell)
    } else {
        funcNo(deCell)
    }
    row.appendChild(deCell)

    //Sterilized
    let steCell = document.createElement('td') 
    if (pet.isSterilized) {
        funcYes(steCell)
    } else {
        funcNo(steCell) 
    }
    row.appendChild(steCell)

    // Date at
    let dateCell = addingCellPet(pet.createAt)
    row.appendChild(dateCell)

    tableBody.appendChild(row)
}

/**
 * 
 * @param {Array} args 
 */
function searchPets(args) {

    let result = [...pets]

    // ID
    if (args[0] !== null) {
        result = [...getPetsById(args[0], result)]
    }
    // name
    if (args[1] !== null) {
        result = [...getPetsByName(args[1], result)]
    }
    // type
    if (args[2] !== null) {
        result = [...result.filter(item => item.type.indexOf(args[2]) !== -1)]
    }
    // breed
    if (args[3] !== null) {
        result = [...result.filter(item=>item.breed.indexOf(args[3]) !== -1)]
    }
    // vaccinated
    if (args[4] !== null) {
        result = [...result.filter(item => item.isVaccinated === args[4])]
    }
    // dewormed
    if (args[5] !== null) {
        result = [...result.filter(item => item.isDewormed === args[5])]
    }
    // sterilized
    if (args[6] !== null) {
        result = [...result.filter(item => item.isSterilized === args[6])]
    }

    // Deleting row before
    if (isFound) {
        let rows = tableBody.querySelectorAll('tr')
        rows.forEach(item=>item.remove())
    }

    result.forEach((ele)=>{
        addingRowPet(ele)
    })
    console.log("Search result: ", result);
}

const handleFindClick = function() {
    const argsKey = []
    isFound = true

    const id = idEle.value
    argsKey.push(id)

    const name = nameEle.value
    argsKey.push(name)

    const type = typeEle.value
    if ('Select Type' === type) {
        argsKey.push(null)
    } else {
        argsKey.push(type)
    }

    const breed = breedEle.value
    if ('Select Breed' === breed) {
        argsKey.push(null)
    } else {
        argsKey.push(breed)
    }

    const isVaccinated = vaccinatedEle.checked
    if (isCheckVac) {
        argsKey.push(isVaccinated)
    } else {
        argsKey.push(null)
    }

    const isDewormed = vaccinatedEle.checked
    if (isCheckDew) {
        argsKey.push(isDewormed)
    } else {
        argsKey.push(null)
    }

    const isSterilized = sterilizedEle.checked
    if (isCheckSte) {
        argsKey.push(isSterilized)
    } else {
        argsKey.push(null)
    }
    console.log(argsKey);
    searchPets(argsKey)
    
}

function renderBreeds(type) {

    let breedArr = JSON.parse(localStorage.getItem('breeds'))
    let breedForType = breedArr.filter((value)=>{
        return value.type === type
    });
    breedForType.forEach(element => {
        let optBreed = document.createElement('option')
        optBreed.value = element.name
        optBreed.textContent = element.name
        document.querySelector('#input-breed').appendChild(optBreed)
    });
}
findBtn.addEventListener('click', handleFindClick)

typeEle.addEventListener('change', function(){

    console.log("on change type");
    let listOpt = breedEle.querySelectorAll('option')
    
    listOpt.forEach((element)=>{
        element.remove()
    })

    const defaultOpt = document.createElement('option')
    defaultOpt.textContent = 'Select Breed'
    breedEle.appendChild(defaultOpt)

    // breedEle.removeAttribute('disabled')
    renderBreeds(typeEle.value)
})