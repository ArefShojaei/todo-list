document.addEventListener("alpine:init", () => {
    Alpine.data("app", () =>  ({
        taskName : '',
        taskTitle : '',
        search : '',
        todos : [] ,
        currentTodoIndex : null,
        addBtnStatus : true,
        init() {
            console.log("Initializing app...");
            
            // get all todos from LocalStorage
            const getTodos = JSON.parse(localStorage.getItem("todos"))

            // check for existing the todos, which are ready or No
            if(getTodos === null) {
                return localStorage.setItem("todos", "[]")
            }

            // set the data to todos array
            return this.todos = getTodos
        },
        filteredTodos() {
            // handle search-bar for getting the todo and showing that + loop
            console.log(this.todos.filter(todo => todo.name.startsWith(this.search)));
            return this.todos.filter(todo => todo.name.startsWith(this.search))
        },
        addNewTodo() {
            // validation for adding new Todo 
            const result = (this.taskName && this.taskTitle) ? this.todos.push({
                id : crypto.randomUUID(),
                name : this.taskName,
                title : this.taskTitle,
            }) : alert('Please enter values!'); 
    
            // save new Todo data in LocalStorage
            localStorage.setItem("todos", JSON.stringify(this.todos))

            // empty inputs after creating new Todo
            this.taskName = null
            this.taskTitle = null
    
            return result
        },
        updateTodo() {
            // get current todo for updating values
            const todo = this.todos.find((todo, index) => index === this.currentTodoIndex)

            // set new data ( name & title ) for the current todo 
            todo.name = this.taskName
            todo.title = this.taskTitle

            // empty inputs after updating the current todo
            this.taskName = null
            this.taskTitle = null

            // save new current Todo data in LocalStorage 
            return localStorage.setItem("todos", JSON.stringify(this.todos))
        },
        clearAllTodos() {
            // empty todos array
            this.todos = []

            // save empty array as value in LocalStorage
            return localStorage.setItem("todos", "[]")
        },
        editTodoHandler(index) {
            // get todo data ( object details ) from list of todos
            const todo = this.todos[index]

            // change button state from "Create" to "Update" 
            this.addBtnStatus = false; 
            
            // set input values 
            this.taskName = todo.name; 
            this.taskTitle = todo.title

            // set new value to currentTodoIndex key
            return this.currentTodoIndex = index
        },
        removeTodoHandler(todoIndex) {
            // remove the todo of todos
            this.todos.splice(todoIndex, 1)

            // save todos in LocalStorage
            return localStorage.setItem("todos", JSON.stringify(this.todos))
        }
    }))
})