'use strict';
//Selecting
const breedEle = document.querySelector('#input-breed')
const typeEle = document.querySelector('#input-type')
const idEle = document.querySelector('#input-id')
const nameEle = document.querySelector('#input-name')
const ageEle = document.querySelector('#input-age')
const weightEle = document.querySelector('#input-weight')
const lengthEle = document.querySelector('#input-length')
const colorEle = document.querySelector('#input-color-1')
// check box
const vaccinatedEle = document.querySelector('#input-vaccinated')
const dewormedEle = document.querySelector('#input-dewormed')
const sterEle = document.querySelector('#input-sterilized')
// table
const tableBody = document.querySelector('#tbody')
// generate ele cell check
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
// generate cell
function addingCellPet(text) {

    const cell = document.createElement('td')
    cell.textContent = text

    return cell
}

breedEle.setAttribute('disabled', true)

let breedArr = []

let isPets = Boolean (JSON.parse(localStorage.getItem('pets')))
if (isPets) {
    let listPet = JSON.parse(localStorage.getItem('pets'))
    listPet.forEach((value)=>{
        addingRowPet(value);
    })
}

// JSON.parse(localStorage.getItem('breeds'))
function renderBreeds(type) {
    breedArr = JSON.parse(localStorage.getItem('breeds'))
    

    // breedArr.forEach(function(value) {
    //     let optBreed = document.createElement('option')
    //     optBreed.value = value.name
    //     optBreed.textContent = value.name
    //     document.querySelector('#input-breed').appendChild(optBreed)
    // });
    let breedForType = breedArr.filter((value)=>{
        return value.type === type
    });
    breedForType.forEach(element => {
        let optBreed = document.createElement('option')
        optBreed.value = element.name
        optBreed.textContent = element.name
        document.querySelector('#input-breed').appendChild(optBreed)
    });
    // console.log(breedForType);
}


// Adding animation nav
const nav = document.querySelector('#sidebar')
nav.addEventListener('click', function() {
    nav.classList.toggle('active')
})

typeEle.addEventListener('change', function(){

    console.log("on change type");
    let listOpt = breedEle.querySelectorAll('option')
    
    listOpt.forEach((element)=>{
        element.remove()
    })

    const defaultOpt = document.createElement('option')
    defaultOpt.textContent = 'Select Breed'
    breedEle.appendChild(defaultOpt)

    breedEle.removeAttribute('disabled')
    renderBreeds(typeEle.value)
})

// ====> ADDING NEW PET
const petArr = []

// handle submit action
const handleSubmitAction = function() {
    // getting data
    let createAt = new Date()

    let pet = {
        'id': idEle.value,
        'name': nameEle.value,
        'age': ageEle.value,
        'type': typeEle.value,
        'weight': weightEle.value,
        'length': lengthEle.value,
        'color': colorEle.value,
        'breed': breedEle.value,
        'isVaccinated': vaccinatedEle.checked,
        'isDewormed': dewormedEle.checked,
        'isSterilized': sterEle.checked,
        'createAt': `${createAt.getDay()}/${createAt.getMonth()}/${createAt.getFullYear()}`
    }
    // valid data
    validPetForm(pet)
    // petArr.push(pet)
    // console.log("Pets: ", petArr);
}
const submitBtn = document.querySelector('#submit-btn')
submitBtn.addEventListener('click', handleSubmitAction)

/**
 * valid pet
 * @param {Object} pet 
 */
function validPetForm(pet) {
    // Invalid

    // Valid
    addingRowPet(pet)
    petArr.push(pet)
    saveLocal('pets', JSON.stringify(petArr))
    // location.reload()
}
// successful
function clearFormPet() {
    idEle.value = null
    nameEle.value = null
    ageEle.value = null
    typeEle.value = 'Select Type'
    weightEle.value = null
    lengthEle.value = null
    colorEle.value = '#000000'
    breedEle.value = 'Select Breed'
    vaccinatedEle.checked = false
    dewormedEle.checked = false
    sterEle.checked = false
}

/**
 * Add row into table, clear form 
 * @param {Object} pet 
 */
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

    // Action delete button
    let actionCell = document.createElement('td')
    const btnDanger = document.createElement('button')
    btnDanger.setAttribute('type', 'button')
    btnDanger.textContent = 'Delete'
    btnDanger.setAttribute('class', 'btn btn-danger')

    // btnDanger.addEventListener('click', handleDeletePet)
    actionCell.appendChild(btnDanger)

    row.appendChild(actionCell)  
    tableBody.appendChild(row)

    clearFormPet()
    // document.querySelector('#toast-id-body').textContent = "Adding Pet Success"
    // document.querySelector('#toast-id').classList.add('show')
}

// failed