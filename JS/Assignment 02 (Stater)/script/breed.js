'use strict';

// Selecting elements
const submitBtn = document.querySelector('#submit-btn')
const breedEle = document.querySelector('#input-breed')
const typeEle = document.querySelector('#input-type')
const tableBreed =  document.querySelector('#tbody')
const toastConfirm = document.querySelector('#toast-confirm')
const confirmBtn = document.querySelector('#confirm-btn')

let currentRow;

let breedArr = []

let hasBreed = Boolean(localStorage.getItem('breeds'))

/**
 * Action when click at confirm button
 * @param {HTMLTableRowElement} row 
 */
const actionDelete = function() {

    console.log("Current row deleted", currentRow);
    let index = Number(currentRow.firstChild.textContent) - 1
    let result = removeEleByIndex(breedArr, index)

    saveLocal('breeds', JSON.stringify(result))
    currentRow.remove()
    location.reload()
}
confirmBtn.addEventListener('click', actionDelete)

/**
 * remove a element in array
 * @param {[]} arr 
 * @param {number} index 
 */
function removeEleByIndex(arr, index) {
    let result = []

    if (arr.length === index + 1) {
        arr.pop()
        return arr
    }

    for (let i = 0; i < index; i++) {
        // const element = arr[i];
        result.push(arr[i])
    }
    if (index < arr.length - 1) {
        for (let i = index + 1; i < arr.length; i++) {
            
            result.push(arr[i])
        }
    }
    return result
}

/**
 * Catching event when action button clicked
 * @param {MouseEvent} e 
 */
const handleDelete = function(e) {
    // console.log("Current element: ", e.currentTarget.parentNode.parentNode);
    currentRow = e.target.parentNode.parentNode
    
    // let tmpArr = breedArr
    toastConfirm.classList.toggle('show')
}
/**
 * Adding new breed into local storage and show in table
 * @param {Object} breed 
 * @param {number} index 
 */
const addingRowBreed = function(breed, index) {

    let row = document.createElement('tr')
    // #
    let tdNumber = document.createElement('td')
    tdNumber.textContent = index
    row.appendChild(tdNumber)

    // name breed
    let tdName = document.createElement('td')
    tdName.textContent = breed.name
    row.appendChild(tdName)

    // type breed
    let tdType = document.createElement('td')
    tdType.textContent = breed.type
    row.appendChild(tdType)
    
    // Action(Delete) button
    let action = document.createElement('td')
    let deleteBtn = document.createElement('button')
    deleteBtn.setAttribute('type', 'button')
    deleteBtn.setAttribute('class', 'btn btn-danger')
    deleteBtn.textContent = "Delete"
    deleteBtn.addEventListener('click', handleDelete)
    action.appendChild(deleteBtn)
    row.appendChild(action)

    tableBreed.appendChild(row)
}

if (hasBreed) {
    breedArr = JSON.parse(localStorage.getItem('breeds'))
    breedArr.forEach(function(value, index) {
        addingRowBreed(value, index + 1)
    });
} else {
    console.log("Not data");
}

/**
 * Handle event submit form
 */
const handleSubmit = function() {

    let breed = {
        'name': breedEle.value,
        'type': typeEle.value,    
    }
    breedArr.push(breed)
    
    addingRowBreed(breed, breedArr.length)
    saveLocal('breeds', JSON.stringify(breedArr))
}

submitBtn.addEventListener('click', handleSubmit)