

document.addEventListener('DOMContentLoaded', function () {
  const getUsers = async () => {
    const usersResponse = await fetch(`https://jsonplaceholder.typicode.com/users`, {
      method: `GET`,
      mode: `cors`
    })
    const users = await usersResponse.json()
    console.table(users)

    const ul = document.createElement(`ul`)
    ul.classList.add(`user-list`)
    const usersWrapper = document.getElementById(`users`)

    users.forEach(user => {
      
      const li = document.createElement(`li`)
      const spanId = document.createElement(`span`)
      const spanName = document.createElement(`span`)
      
      spanId.classList.add(`user-id`)
      spanId.textContent = user.id
      spanName.classList.add(`user-name`)
      spanName.textContent = user.name

      li.append(spanId)
      li.append(spanName)
      ul.append(li)
    })
   
    usersWrapper.append(ul)
    }
    getUsers()

  const button = document.getElementById('get_todos');
  const input = document.getElementById(`user-id-input`)
  //const checkbox = document.getElementById(`checkbox2`)//

  
  if (button) {
    button.addEventListener('click', handleClick);
  }
  
  
 
  function handleClick(event) {
    event.preventDefault()
    const userId = input.value
    const parError = document.getElementById(`error`)
    if (userId < 11) {
      parError.textContent = (``)
    }
    
    fetch(`https://jsonplaceholder.typicode.com/todos?userId=${userId}`)
    .then((response) => response.json())
    .then((todos) => { 
      generateTodos(todos)
    })
    .catch((error) => console.log(error))

    if (userId > 10)  {
      
      parError.classList.add(`parError`)
      parError.textContent = (`This User ID Doesn't exist`)
    }
    
  }

  const generateTodos = (todos) => {
    const ul = document.createElement(`ul`)
    ul.classList.add(`todos-list`)
    const todosWrapper = document.getElementById(`todos`)

    const currentUl = todosWrapper.querySelector(`ul`)
    if (currentUl) todosWrapper.removeChild(currentUl)

    todos.forEach((todo) => {
      const li = document.createElement(`li`)
      const spanTitle = document.createElement(`span`)
      const spanCompleted = document.createElement(`span`)
      const checkbox = document.createElement(`input`)

      spanTitle.classList.add(`todo-title`)
      spanTitle.textContent = todo.title
      spanCompleted.classList.add(`todo-completed`)
      
      checkbox.type = `checkbox`
      checkbox.classList.add(`checkbox`)
      checkbox.id = `checkbox_${todo.id}`
      

      checkbox.addEventListener('change', function (event) {
        handleCheckboxChange(todo.id, event.target.checked);
      });

      li.append(checkbox)
      li.append(spanTitle)
      li.append(spanCompleted)
      ul.append(li)
    })
    
    todosWrapper.append(ul)

  }
  

  /*function handleCheckboxChange() {
    if (checkbox.checked) {
      console.log('Checkbox is checked')
    } else {
      console.log('Checkbox is unchecked')
    }
  }*/

  function handleCheckboxChange(todoId, isChecked) {
    
    const url = `https://jsonplaceholder.typicode.com/todos/${todoId}`
    const newStatus = isChecked ? true : false

    fetch(url, {
      method: 'PUT',
      body: JSON.stringify({ completed: isChecked }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((updatedTodo) => {
        updateTodoStatus(todoId, updatedTodo.completed)
      })
      .catch((error) => console.log(error))
  }
  function updateTodoStatus(todoId, newStatus) {
    const checkbox = document.getElementById(`checkbox_${todoId}`);
    const parentLi = checkbox.closest('li'); 
    const spanCompleted = parentLi.querySelector('.todo-completed')
    spanCompleted.textContent = newStatus ? 'Done' : 'Pending';
  }
})






// 3. When checking a todo, set it's status to done and send the "completed" value to server using PUT
