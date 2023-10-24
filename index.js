

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
  const checkbox = document.getElementById('checkbox2');

  
  if (button) {
    button.addEventListener('click', handleClick);
  }

  if (checkbox) {
    checkbox.addEventListener('change', handleCheckboxChange);
  }
 
  function handleClick(event) {
    event.preventDefault();
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
      spanCompleted.textContent = todo.completed? `Done` : `Pending`
      checkbox.type = `checkbox`
      checkbox.classList.add(`checkbox`)
      checkbox.id = `checkbox_${todo.id}`

      li.append(checkbox)
      li.append(spanTitle)
      li.append(spanCompleted)
      ul.append(li)
    })

    todosWrapper.append(ul)
  }

  function handleCheckboxChange() {
    console.log('Checked', this.checked);
  }
})





// 1. Get real users list from https://jsonplaceholder.typicode.com/
// 2. When setting user ID get this user ToDos
// 3. When checking a todo, set it's status to done and send the "completed" value to server using PUT
