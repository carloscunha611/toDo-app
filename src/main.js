const form = document.getElementById('form')
const input = document.getElementById('input')
const tasksE = document.getElementById('tasks')

const tasks = JSON.parse(localStorage.getItem('tasks')) || []

if (tasks.length > 0) {
  tasks.forEach(task => {
    addTask(task)
  })
}

form.addEventListener('submit', e => {
  e.preventDefault()
  addTask()
})

function addTask(task) {
  let taskTxt = input.value
  if (task && task.text) {
    taskTxt = task.text
  }
  if (taskTxt) {
    const tasksEl = document.createElement('li')
    tasksEl.classList.add(
      'panel-block',
      'is-active',
      'has-text-primary',
      'is-flex',
      'is-align-items-center',
      'is-justify-content-space-between'
    )

    if (task && task.completed) {
      tasksEl.classList.add('completed', 'has-text-danger')
    }

    tasksEl.innerHTML = `
      <p class="tasksEl">${taskTxt}</p>
      <div class="trash">
        <span>Remover</span>
      </div>
    `

    tasksEl.addEventListener('click', () => {
      tasksEl.classList.toggle('completed')
      tasksEl.classList.toggle(
        tasksEl.classList.contains('has-text-primary')
          ? 'has-text-danger'
          : 'has-text-primary'
      )

      updateLocalStorage()
    })

    tasksEl.addEventListener('contextmenu', e => {
      e.preventDefault()
      tasksEl.remove()
      updateLocalStorage()
    })

    tasksE.appendChild(tasksEl)
    input.value = ''
    updateLocalStorage()
  }
}

function updateLocalStorage() {
  const tasksEl = document.querySelectorAll('li')

  const tasks = []

  tasksEl.forEach(taskEl => {
    tasks.push({
      text: taskEl.querySelector('.tasksEl').textContent,
      completed: taskEl.classList.contains('completed')
    })
  })

  localStorage.setItem('tasks', JSON.stringify(tasks))
}

const chooseTheme = document.querySelector('.chooseTheme')
chooseTheme.addEventListener('click', () => {
  const classBody = document.body.classList
  classBody.toggle(
    classBody.contains('has-background-dark')
      ? 'has-background-light'
      : 'has-background-dark'
  )
})
