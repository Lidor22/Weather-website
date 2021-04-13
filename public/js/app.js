const weatherForm = document.querySelector('form') // target by tag
const search = document.querySelector('input')

const messageOne = document.querySelector('#message-1')// target by id
const messageTwo = document.querySelector('#message-2')

const weeklyContainer = document.querySelector('#weekly-container')



weatherForm.addEventListener('submit' , (e) => {
    e.preventDefault() /*prevent the default refresh of the browser*/ 
    const location= search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    if(weeklyContainer.hasChildNodes()){
        while (weeklyContainer.firstChild) {
            weeklyContainer.removeChild(weeklyContainer.lastChild);
          }
    }

    fetch('/weather?address=' + location ).then((response) => {
    response.json().then((data) => {
        if(data.error){
            messageOne.textContent = data.error
        }
        else{

            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast

            var list = document.createElement('ul');

            data.weekly.forEach(element => {
            // Create the list item:
            var item = document.createElement('li');
            // Set its contents:
            item.appendChild(document.createTextNode(element.forecast));
            // Add it to the list:
            list.appendChild(item);
             
            });

            weeklyContainer.appendChild(list);
        }

    })
})
    
})

