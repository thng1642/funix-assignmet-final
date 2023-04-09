'use strict';
// ===== SELECTING ELEMENTS
// Button
const submitBtn = document.querySelector('#submit-btn')
const showBtn = document.querySelector('#healthy-btn')
const deleteBtns = document.querySelectorAll('.btn-danger')
// Input fields
const idEle = document.querySelector('#input-id')
const nameEle = document.querySelector('#input-name')
const ageEle = document.querySelector('#input-age')
const typeEle = document.querySelector('#input-type')
const weightEle = document.querySelector('#input-weight')
const lengthEle = document.querySelector('#input-length')
const colorEle = document.querySelector('#input-color-1')
const breedEle = document.querySelector('#input-breed')
const vaccinatedEle = document.querySelector('#input-vaccinated')
const dewormedEle = document.querySelector('#input-dewormed')
const sterilizedEle = document.querySelector('#input-sterilized')
// Table
const bodyTable = document.querySelector('#tbody')

const hasPets = Boolean(getArrayPet('petArr'))
if (hasPets) {
    console.log(getArrayPet('petArr'));
}

// ===== PET OBJECT
const pet = {
    'id': '',
    'name': '',
    'age': 0,
    'type' : '',
    'weight' : 0,
    'length': 0,
    'color': '',
    'breed': '',
    'vaccinated': false,
    'dewormed': false,
    'sterilized': false
}
// ====== DELETE pet FEATURE
let currentDelete = ''

const actionDeletePet = (id) => {
    console.log("Delete id: ", id);
    const petRow = document.getElementById(`${id}`)
    petRow.remove()
}

const btnConfirm = document.getElementById('btn-confirm')
btnConfirm.addEventListener('click', ()=>{
    
    actionDeletePet(currentDelete)
    // event.target.parentElement.parentElement.classList.add('hidden');
    document.querySelector('#toast-delete-pet').classList.remove('show')

})

/**
 * 
 * @param {MouseEvent} event 
 */
const handleDeletePet = (event) => {
    // get id pet
    const id = event.target.parentElement.parentElement.querySelector('th').textContent;
    currentDelete = id
    // show toast confirm delete
    const toast = document.querySelector('#toast-delete-pet')
    toast.classList.add('show')
    // show alter
    toast.querySelector('#toast-content-delete').textContent = `Do you want delete Pet id: ${id}`
}

// ====== ADDING NEW PET FEATURE
// const petArr = JSON.parse(getArrayPet('petArr'))
const petArr = []
// Creating check item
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
/**
 * Checking null fields value
 */
const validPet = function(pet){
    let rowsPet = bodyTable.querySelectorAll('tr')
    let petsId = []
    // Valid ID
    rowsPet.forEach((value)=>{
        
        petsId.push(value.querySelector('th').textContent)
    })
    if (petsId.indexOf(pet.id) !== -1 || pet.id === '' || pet.id === null) {

        document.querySelector('#toast-id').addEventListener('hidden.bs.toast', ()=>{
            idEle.focus()
        })
        document.querySelector('#toast-id-body').textContent = `Invalid ID - ID existed or empty`
        document.querySelector('#toast-id').classList.add('show')
        return
    }
    // checking null for name
    if (pet.name === null || pet.name === '') {
        document.querySelector('#toast-id').addEventListener('hidden.bs.toast', ()=>{
            nameEle.focus()
        })
        document.querySelector('#toast-id-body').textContent = "Invalid name!"
        document.querySelector('#toast-id').classList.add('show')
        return
    }
    // Valid age, which age > 0 and age is Integer, or null
    if (pet.age.toString().indexOf('.') !== -1 || pet.age === 0 || pet.age === null || pet.age === '') {
        
        document.querySelector('#toast-id').addEventListener('hidden.bs.toast', ()=>{
            ageEle.focus()
        })
        document.querySelector('#toast-id-body').textContent = "Invalid age!"
        document.querySelector('#toast-id').classList.add('show')
        return
    }
    //Valid weight
    if (pet.weight < 1 || pet.weight === null || pet.weight === '') {
        
        document.querySelector('#toast-id').addEventListener('hidden.bs.toast', ()=>{
            weightEle.focus()
        })
        document.querySelector('#toast-id-body').textContent = "Invalid weight!"
        document.querySelector('#toast-id').classList.add('show')
        return
    }
    // Valid length
    if (pet.length < 1 || pet.length === null || pet.length === '') {
        
        document.querySelector('#toast-id').addEventListener('hidden.bs.toast', ()=>{
            lengthEle.focus()
        })
        document.querySelector('#toast-id-body').textContent = "Invalid length!"
        document.querySelector('#toast-id').classList.add('show')
        return
    }

    // Checking null value
    if (typeEle.value === 'Select Type') {

        document.querySelector('#toast-id').addEventListener('hidden.bs.toast', ()=>{
            typeEle.focus()
        })
        document.querySelector('#toast-id-body').textContent = "No selected type!"
        document.querySelector('#toast-id').classList.add('show')
        return
    }
    if (pet.breed === "Select Breed") {
        document.querySelector('#toast-id').addEventListener('hidden.bs.toast', ()=>{
            breedEle.focus()
        })
        document.querySelector('#toast-id-body').textContent = "No selected breed!"
        document.querySelector('#toast-id').classList.add('show')
        return
    }

    petArr.push(pet)
    // savePet('petArr', petArr)

    addingNewRow(pet)
}

/**
 * Handle log click submit pet
 */
const handleSubmitClick = function() {

    console.log("Clicked submit button");

    // getting data from form when submit
    pet.id = idEle.value
    pet.name = nameEle.value
    pet.age = Number(ageEle.value)
    pet.type = typeEle.value
    pet.weight = Number(weightEle.value)
    pet.length = Number(lengthEle.value)
    pet.color = colorEle.value
    pet.breed = breedEle.value
    pet.vaccinated = vaccinatedEle.checked
    pet.dewormed = dewormedEle.checked
    pet.sterilized = sterilizedEle.checked

    validPet(pet)
}
submitBtn.addEventListener('click', handleSubmitClick)
/**
 * 
 */
const addPetSuccessful = () => {

    savePet('petArr', JSON.stringify(petArr))
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
    sterilizedEle.checked = false
}
/**
 * Adding new row from data were inputted by users
 */
const addingNewRow = function(pet){

    const row = document.createElement('tr')
    row.setAttribute('id', pet.id)
    // id
    let idCell = document.createElement('th')
    idCell.setAttribute('scope', 'row')
    idCell.textContent = pet.id
    
    row.appendChild(idCell)
    // name
    let nameCell = document.createElement('td')
    nameCell.textContent = pet.name
    
    row.appendChild(nameCell)
    // age
    let ageCell = document.createElement('td')
    ageCell.textContent = pet.age
    row.appendChild(ageCell)
    // type
    let typeCell = document.createElement('td')
    typeCell.textContent = pet.type
    row.appendChild(typeCell)

    // weight
    let weightCell = document.createElement('td')
    weightCell.setAttribute('class', 'weight-cell')
    weightCell.textContent = pet.weight + "kg"
    row.appendChild(weightCell)
    // Length 
    let lengthCell = document.createElement('td')
    lengthCell.setAttribute('class', 'length-cell')
    lengthCell.textContent = pet.length + "cm"
    row.appendChild(lengthCell)
    // BMI
    let bmiCell = document.createElement('td')
    bmiCell.setAttribute('class', 'bmi-cell')
    bmiCell.textContent = '?'
    row.appendChild(bmiCell)

    // Breed
    let breedCell = document.createElement('td')
    breedCell.textContent = pet.breed
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
    if (pet.vaccinated) {
        funcYes(vaccinatedCell)
    } else {
        funcNo(vaccinatedCell)
    }
    row.appendChild(vaccinatedCell)

    // Dewormed
    let deCell = document.createElement('td') 
    deCell.setAttribute('class', 'dewormed-cell')
    if (pet.dewormed) {
        funcYes(deCell)
    } else {
        funcNo(deCell)
    }
    row.appendChild(deCell)

    //Sterilized
    let steCell = document.createElement('td') 
    if (pet.sterilized) {
        funcYes(steCell)
    } else {
        funcNo(steCell) 
    }
    row.appendChild(steCell)
    // Date at
    let dateCell = document.createElement('td')
    let createAt = new Date()
    dateCell.textContent = `${createAt.getDay()}/${createAt.getMonth()}/${createAt.getFullYear()}`
    row.appendChild(dateCell)

    // Action delete button
    let actionCell = document.createElement('td')
    const btnDanger = document.createElement('button')
    btnDanger.setAttribute('type', 'button')
    btnDanger.textContent = 'Delete'
    btnDanger.setAttribute('class', 'btn btn-danger')

    btnDanger.addEventListener('click', handleDeletePet)
    actionCell.appendChild(btnDanger)

    row.appendChild(actionCell)  
    bodyTable.appendChild(row)
    document.querySelector('#toast-id-body').textContent = "Adding Pet Success"
    document.querySelector('#toast-id').classList.add('show')

    savePet('petArr', JSON.stringify(pet))

    addPetSuccessful()
}
// ====== END FEATURE


// =========== HEALTHY SHOW PET
let isCheckHealthy = false
/**
 * Checking healthy at cells: vaccinated and dewormed
 * @param {HTMLTableRowElement} row pet saved
 */
const rowCheck = (row)=> {
    const iEle1 = row.querySelector('.vaccinated-cell').querySelector('i')
    const iEle2 = row.querySelector('.dewormed-cell').querySelector('i')
    if (iEle1.classList.contains('bi-x-circle-fill') || iEle2.classList.contains('bi-x-circle-fill')) {
        row.classList.add('hidden')
    }
}
/**
 * Handle event show healthy pet (button)
 */
const showHealthyPet = () => {
    if (!isCheckHealthy) {
        const listPetRows = bodyTable.querySelectorAll('tr')

        listPetRows.forEach((value)=>{
            rowCheck(value)
        })

        showBtn.textContent = "Show All Pet"
        isCheckHealthy = true
    } else {
        isCheckHealthy = false
        showBtn.textContent = 'Show Healthy Pet'
        bodyTable.querySelectorAll('tr').forEach((value)=>{
            value.classList.remove('hidden')
        })
    }
}
showBtn.addEventListener('click', showHealthyPet)
// =========== END FEATURE

// ====== SHOW BMI FEATURE

/**
 * BIM calculation
 * @param {HTMLTableRowElement} element a pet data
 */
const rowCalculatorBMI = (element) => {

    const wStr = element.querySelector('.weight-cell').textContent.replace('kg', '')
    const hStr = element.querySelector('.length-cell').textContent.replace('cm', '')
    const w = Number(wStr)
    const h = Number(hStr)
    const bmi = w / ([h / 100] * [h / 100])
    element.querySelector('.bmi-cell').textContent = bmi.toFixed(2)
    console.log("BMI = ", bmi.toFixed(2));
}

const bmiBtn = document.querySelector('#bmi-btn')

const calculatorBMI = () => {
    const listRows = bodyTable.querySelectorAll('tr')
    listRows.forEach((value)=>{

        rowCalculatorBMI(value)
    })
}

bmiBtn.addEventListener('click', calculatorBMI)
// ====== END FEATURE

// ========== ADDING FEATURE WHEN USING LOCAL STORAGE
