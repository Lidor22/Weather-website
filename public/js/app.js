const weatherForm = document.querySelector('form') // target by tag
const search = document.querySelector('input')

const messageOne = document.querySelector('#message-1')// target by id
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit' , (e) => {
    e.preventDefault() /*prevent the default refresh of the browser*/ 
    const location= search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch('/weather?address=' + location ).then((response) => {
    response.json().then((data) => {
        if(data.error){
            messageOne.textContent = data.error
        }
        else{
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
        }

    })
})
    
})