'use strict'

// localStorage.setItem('petArr', JSON.stringify([]))

/**
 * Save pet into local storage
 * @param {string} key 
 * @param {Object} value 
 */
function savePet(key, value) {
    localStorage.setItem(key, value);
}

function getArrayPet(key, d) {
    return localStorage.getItem(key) ?? d
}