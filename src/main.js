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

const button = document.querySelector('.button')

button.addEventListener('click', () => {
  const currentIcon = button.innerHTML
  const light =
    '<span class="light icon is-small"><ion-icon name="sunny-sharp"></ion-icon></span>'
  const dark =
    '<span class="dark icon is-small"><ion-icon name="moon-sharp"></ion-icon></span>'
  const header = document.querySelector('.header')
  const titleHeader = document.querySelector('.titleHeader')
  const checkLogo = document.querySelector('.checkLogo')
  const linkPort = document.querySelector('.linkPort')
  const footer = document.querySelector('#footer')

  if (currentIcon.includes('sunny-sharp')) {
    button.innerHTML = dark
    document.body.classList.add('has-background-dark')
    document.body.classList.remove('has-background-light')

    button.classList.add('is-black', 'has-text-primary')
    button.classList.remove('is-light')

    header.classList.add('has-background-black')
    header.classList.remove('has-background-grey-light')
    footer.classList.add('has-background-black')
    footer.classList.remove('has-background-grey-light')

    checkLogo.classList.add('has-text-primary')
    checkLogo.classList.remove('has-text-dark')
    titleHeader.classList.add('has-text-white-ter')
    titleHeader.classList.remove('has-text-dark')
  } else {
    button.innerHTML = light
    document.body.classList.add('has-background-light')
    document.body.classList.remove('has-background-dark')

    button.classList.add('is-light')
    button.classList.remove('is-black', 'has-text-primary')

    header.classList.add('has-background-grey-light')
    header.classList.remove('has-background-black')
    footer.classList.add('has-background-grey-light')
    footer.classList.remove('has-background-black')

    checkLogo.classList.add('has-text-dark')
    checkLogo.classList.remove('has-text-primary')
    titleHeader.classList.add('has-text-dark')
    titleHeader.classList.remove('has-text-white-ter')
  }

  linkPort.classList.toggle(
    linkPort.classList.contains('has-text-primary')
      ? `has-text-danger`
      : `has-text-primary`
  )
})
