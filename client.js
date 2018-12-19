

var todoList = {
    todos: [],
  
  
    addTodo: function(todoText) {
      this.todos.push({
        todoText: todoText,
        completed: false,
      })
    },
  
  
    changeTodo: function(position, todoText) {
      this.todos[position].todoText = todoText;
    },
  
  
    deleteTodo: function(position) {
      this.todos.splice(position, 1);
    },
  
  
    toggleCompleted: function(position) {
      var todo = this.todos[position];
      todo.completed = !todo.completed;
    },
  
  
    toggleAll: function() {
      var totalTodos = this.todos.length;
      var completedTodos = 0;
  
      //gets number of completed Todos 
      this.todos.forEach(function(todo) {
        if (todo.completed === true) {
          completedTodos++;
        }
      });
  
      //if everyting is true, make everything false
  
      this.todos.forEach(function(todo) {
        if (completedTodos === totalTodos) {
          todo.completed = false;
        } else {
          todo.completed = true;
        }
      });
    }
  };
  
  
  var handlers = {
  
    toggleAll: function() {
      todoList.toggleAll();
      view.displayTodos();
    },
    addTodo: function() {
      var addTodoText = document.getElementById('addTodoText');
      todoList.addTodo(addTodoText.value);
      addTodoText.value = '';
      view.displayTodos();
    },
    changeTodo: function() {
      var changeTodoPosition = document.getElementById('changeTodoPosition');
      var changeTodoText = document.getElementById('changeTodoText');
      todoList.changeTodo(changeTodoPosition.valueAsNumber, changeTodoText.value);
      changeTodoPosition.value = '';
      changeTodoText.value = '';
      view.displayTodos();
    },
    deleteTodo: function(position) {
    
      todoList.deleteTodo(position);
  
      view.displayTodos();
    },
    toggleCompleted: function() {
      var toggleCompletedPosition = document.getElementById('toggleCompletedPosition');
      todoList.toggleCompleted(toggleCompletedPosition.valueAsNumber);
      toggleCompletedPosition.value = '';
      view.displayTodos();
    }
  };
  
  var view = {
    displayTodos: function() {
      var todosUl = document.querySelector('ul');
      todosUl.innerHTML = '';
      
      todoList.todos.forEach(function(todo, position) {
        var todoLi = document.createElement('li');
        var todoTextWithCompletion = '';
  
  
        if (todo.completed === true) {
          todoTextWithCompletion = '(x) ' + todo.todoText;
        } else {
          todoTextWithCompletion = '( ) ' + todo.todoText;
        }
  
        
        todoLi.id = position;
        todoLi.textContent = todoTextWithCompletion;
        todoLi.appendChild(this.createDeleteButton());
        todosUl.appendChild(todoLi);
        
      }, this);
      
    },
    createDeleteButton: function () {
      var deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.className = 'deleteButton';
      return deleteButton;
    },
    setUpEventListeners: function () {
      var todosUl = document.querySelector('ul');
  
  todosUl.addEventListener('click', function(event) {
  
    
    //get elemement on user click
    
    var elementClicked = event.target;
    
    //check if element click is delete button
    if (elementClicked.className === 'deleteButton') {
      handlers.deleteTodo(parseInt(elementClicked.parentNode.id));
    }
    
  });
  
    }
  };
  
  view.setUpEventListeners();
  
  
  
  
                             