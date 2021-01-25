const listItems = document.querySelector('.list-items');
let toDos = [];

//Render To Do Items
let renderToDo = function (toDo) {
  const item = document.querySelector(`[data-key='${toDo.id}']`)

  if (toDo.deleted) {
    item.remove();
    return
  }

  const isChecked = toDo.checked ? 'complete': '';
  const node = document.createElement("div");
  node.setAttribute('class', `list-item ${isChecked}`);
  node.setAttribute('data-key', toDo.id);
  node.innerHTML = `
    <div class="circle">
      <svg class="check" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 11 9" width="11" height="9"><path fill="none" stroke="#FFF" stroke-width="2" d="M1 4.304L3.696 7l6-6"/></svg>
    </div>
    <div class="list-item-title">${toDo.text}</div>
    <div class="delete">
      <svg class="x" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" width="18" height="18" ><path fill="#494C6B" fill-rule="evenodd" d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"/></svg>
    </div>
  `

  //check if item already exists in the DOM
  if (item) {
    listItems.replaceChild(node, item);
  } else {
    listItems.append(node);
  }
}

//Create a new to do item
function addToDo(text) {
  const toDoItem = {
    text, 
    checked: false,
    id: Date.now(),
  }

  toDos.push(toDoItem)
  renderToDo(toDoItem)
}

//Add New To Do to the List from Create To Do Form
const newToDoForm = document.getElementById('form');
newToDoForm.addEventListener('submit', e => {
  e.preventDefault();
  let toDoText = e.target[0].value
  console.log(toDoText)
  
  if (toDoText !== '') {
    addToDo(toDoText)
    e.target[0].value = '';
  }
})

//Mark to do as completed
listItems.addEventListener('click', e => {
  console.log(e.target)
  if (e.target.classList.contains('circle')) {    
    const key = e.target.parentElement.dataset.key;
    toggleComplete(key);
  } else if (e.target.classList.contains('check')) {
    const key = e.target.parentNode.parentNode.dataset.key
    toggleComplete(key);
  }
})

function toggleComplete(key) {
  const index = toDos.findIndex(item => item.id === Number(key));

  toDos[index].checked = !toDos[index].checked
  renderToDo(toDos[index])
}

//Delete to do item
listItems.addEventListener('click', e => {
  if (e.target.classList.contains('delete')) {    
    const key = e.target.parentElement.dataset.key;
    deleteToDo(key);
  } else if (e.target.classList.contains('x')) {
    const key = e.target.parentNode.parentNode.dataset.key
    deleteToDo(key);
  }
})

function deleteToDo(key) {

  let index = toDos.findIndex(item => item.id === Number(key));

  let todo = {
    deleted: true,
    ...toDos[index]
  };

  toDos = toDos.filter( todo => todo.id !== Number(key)) 
  renderToDo(todo)
}






