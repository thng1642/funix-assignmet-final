
const nav = document.querySelector('#sidebar')

nav.addEventListener('click', function() {
    console.log('Navigation clicked, ', this);
    this.classList.toggle('active')
})