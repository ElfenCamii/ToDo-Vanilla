
var data = (localStorage.getItem('todoList')) ? JSON.parse(localStorage.getItem('todoList')):{
    todo: [],
    completed: []
  };
console.log(data);

var removerI = '<i class="fa-regular fa-trash-can"></i>';
var completoI = '<i class="fa-regular fa-circle-check">';

renderTodoList();

//HACER CLICK EN EL BOTON DE ADD
document.getElementById('add').addEventListener('click', function() {
    var value = document.getElementById('item').value;
    if (value) {
        
        addItemTodo(value);
        document.getElementById('item').value = '';

        data.todo.push(value);
        dataObjectUpdated();
    }
});

document.getElementById('item').addEventListener('keydown', function (e) {
    var value = this.value;
    if ((e.code === 'Enter' || e.code === 'NumpadEnter') && value) {
      addItem(value);
    }
  });
  
  function addItem (value) {
    addItemTodo(value);
    document.getElementById('item').value = '';
  
    data.todo.push(value);
    dataObjectUpdated();
  }
  
  function renderTodoList() {
    if (!data.todo.length && !data.completed.length) return;
  
    for (var i = 0; i < data.todo.length; i++) {
      var value = data.todo[i];
      addItemTodo(value);
    }
  
    for (var j = 0; j < data.completed.length; j++) {
      var value = data.completed[j];
      addItemTodo(value, true);
    }
  }

function dataObjectUpdated(){
 localStorage.setItem('todoList', JSON.stringify(data));
}

function removeItem(){
    var item = this.parentNode.parentNode;
    var parent = item.parentNode;
    var id = parent.id;
    var value = item.innerText;

    if( id === 'todo'){
        data.todo.splice(data.todo.indexOf(value), 1);
    }else{
        data.completed.splice(data.completed.indexOf(value), 1);
    }
    dataObjectUpdated();

    parent.removeChild(item);
}

function completeItem(){
    var item = this.parentNode.parentNode;
    var parent = item.parentNode;
    var id = parent.id;
    var value = item.innerText;

    if( id === 'todo'){
        data.todo.splice(data.todo.indexOf(value), 1);
        data.completed.push(value)
    }else{
        data.completed.splice(data.completed.indexOf(value), 1);
        data.todo.push(value)
    }
    dataObjectUpdated();

    var target = (id === 'todo') ? document.getElementById('completed'):document.getElementById('todo');

    parent.removeChild(item);
    target.insertBefore(item, target.childNodes[0]);
}

//AGREGAR UN NUEVO ITEM A LA LISTA 
function addItemTodo(text, completed){

    var list = (completed) ? document.getElementById('completed'):document.getElementById('todo');

    var item = document.createElement('li');
    item.innerText = text;

    var botones = document.createElement('div');
    botones.classList.add('botones');

    var remover = document.createElement('button');
    remover.classList.add('remover');
    remover.innerHTML = removerI;

    //AGREGAR EVENTO CLICK PARA REMOVER ITEMS
    remover.addEventListener('click', removeItem);
    
    var completo = document.createElement('button');
    completo.classList.add('completo');
    completo.innerHTML = completoI;

    //AGREGAR EVENTO CLICK PARA  ITEMS COMPLETADOS
    completo.addEventListener('click', completeItem);

    botones.appendChild(remover);
    botones.appendChild(completo);
    item.appendChild(botones);

    list.insertBefore(item, list.childNodes[0]);
}