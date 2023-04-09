'use strict';

// selecting 
const tBody = document.querySelector('#tbody')
const containerForm = document.querySelector('#container-form')
const formEle = document.querySelector('form')
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
const submitBtn = document.querySelector('#submit-btn')

let currentEdit;
let breedArr = [];

const petArr = JSON.parse(localStorage.getItem('pets'))
// generate breed options 
function renderBreeds(type) {

    breedArr = JSON.parse(localStorage.getItem('breeds'))
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

const validPetForm = function(pet){
    
    let toast = document.querySelector('#toast-id')
    
    
    // checking null for name
    if (pet.name === null || pet.name === '') {

        toast.classList.remove('hide')

        toast.addEventListener('hidden.bs.toast', function(){
            nameEle.focus()
        })
        toast.querySelector('#toast-id-body').textContent = "Invalid name!"
        toast.classList.add('show')
        return
    }
    // Valid age, which age > 0 and age is Integer, or null
    if (pet.age.toString().indexOf('.') !== -1 || pet.age === 0 || pet.age === null || pet.age === '') {

        toast.classList.remove('hide')
        toast.addEventListener('hidden.bs.toast', function(){
            ageEle.focus()
        })
        toast.querySelector('#toast-id-body').textContent = "Invalid age!"
        toast.classList.add('show')
        return
    }
    //Valid weight
    if (pet.weight < 1 || pet.weight === null || pet.weight === '') {
        
        toast.classList.remove('hide')

        toast.addEventListener('hidden.bs.toast', ()=>{
            weightEle.focus()
        })
        toast.querySelector('#toast-id-body').textContent = "Invalid weight!"
        toast.classList.add('show')
        return
    }
    // Valid length
    if (pet.length < 1 || pet.length === null || pet.length === '') {
        
        toast.classList.remove('hide')

        toast.addEventListener('hidden.bs.toast', ()=>{
            lengthEle.focus()
        })
        document.querySelector('#toast-id-body').textContent = "Invalid length!"
        toast.classList.add('show')

        return
    }

    // Checking null value
    if (typeEle.value === 'Select Type') {

        toast.classList.remove('hide')

        toast.addEventListener('hidden.bs.toast', ()=>{
            typeEle.focus()
        })
        toast.querySelector('#toast-id-body').textContent = "No selected type!"
        toast.classList.add('show')
        return
    }
    if (pet.breed === "Select Breed") {
        toast.classList.remove('hide')

        toast.addEventListener('hidden.bs.toast', ()=>{
            breedEle.focus()
        })
        toast.querySelector('#toast-id-body').textContent = "No selected breed!"
        toast.classList.add('show')
        return
    }

    // ==> Valid success
    // update into local storage
    for (let i = 0; i < petArr.length; i++) {
        if (petArr[i].id === pet.id) {

            petArr[i] = {...pet}
            saveLocal('pets', JSON.stringify(petArr))
            break
        }    
    }
    // showing table
    let listRow = tBody.querySelectorAll('tr')
    listRow.forEach((ele)=>{
        ele.remove()
    })
    petArr.forEach((item)=>{
        addingRowPet(item)
    })
    clearFormPet()
    containerForm.classList.add('hide')
}

// handle submit action
const handleSubmitAction = function() {
    // getting data
    const createAt = new Date()
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
    console.log(pet);
    // valid data
    validPetForm(pet)
}
submitBtn.addEventListener('click', handleSubmitAction)
/**
 * 
 * @param {string} id 
 */
function showPetAtForm(id) {
    const pet = petArr.find(element => element.id === id)
    renderBreeds(pet.type)
    // console.log("Pet: ", pet);
    idEle.value = pet.id
    nameEle.value = pet.name
    ageEle.value = pet.age
    typeEle.value = pet.type
    weightEle.value = pet.weight
    lengthEle.value = pet.length
    breedEle.value = pet.breed
    colorEle.value = pet.color
    vaccinatedEle.checked = pet.isVaccinated
    dewormedEle.checked = pet.isDewormed
    sterEle.checked = pet.isSterilized

}
/**
 * 
 * @param {MouseEvent} event 
 */
function handleEditPet(event) {
    const tr = event.target.parentNode.parentNode;
    const id = tr.getAttribute('id')

    showPetAtForm(id)
    containerForm.classList.remove('hide')
}
// adding row
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
    const btnEdit = document.createElement('button')
    btnEdit.setAttribute('type', 'button')
    btnEdit.textContent = 'Edit'
    btnEdit.addEventListener('click', handleEditPet)
    btnEdit.setAttribute('class', 'btn btn-warning')

    // btnDanger.addEventListener('click', handleDeletePet)
    actionCell.appendChild(btnEdit)

    row.appendChild(actionCell)  
    tBody.appendChild(row)
}

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


// get pets in local storage

if (petArr.length !== 0) {
    petArr.forEach((item)=>{
        addingRowPet(item)
    })
}