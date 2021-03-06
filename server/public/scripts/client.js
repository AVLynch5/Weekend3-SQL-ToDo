//when HTML loaded, run readyNow
$(document).ready(readyNow);

readyNow();

function readyNow() {
    //console.log('JQ sourced');//test
    getTodoList();
    //add click events here
    $('#add-task-button').on('click', addNewTask);
    $('#todo-list').on('click', '.complete-button', updateTaskComplete);
    $('#todo-list').on('click', '.uncomplete-button', updateTaskComplete);
    $('#todo-list').on('click', '.delete-button', smartDeleteCheck);
}

//function to GET todo list data and call addToDOM function
function getTodoList() {
    $.ajax({
        method: 'GET',
        url: '/todo',
    }).then(function(response) {
        //console.log(response);//test
        addToDOM(response);//calls addToDOM with response array of todo objects as input param
    }).catch(function(error) {
        console.log('Error in GET', error);
    });
}

//function to display todo items on the DOM
function addToDOM(thingsToDo) {
    //clear the DOM
    $('#todo-list').empty();
    for (let task of thingsToDo) {
        //declare two variables and set value with switch statement
        let classToUse;
        let buttonToUse;
        switch (task.checked) {
            case true://if task checked/completed, display uncomplete button on DOM - uncheck PUT on click
                buttonToUse = `<button data-id="${task.id}" data-bool="${task.checked}" class="uncomplete-button">Mark Uncompleted</button>`;
                classToUse = 'strikeThrough';//for CSS styling
                break;
            case false://if task unchecked/not completed, display complete button on DOM - check PUT on click
                buttonToUse = `<button data-id="${task.id}" data-bool="${task.checked}" class="complete-button">Mark Complete</button>`;
                classToUse = 'nostrikeThrough';
                break;
        }
        $('#todo-list').append(`
            <tr>
                <td class="${classToUse}" data-id="${task.id}">${task.task}</td>
                <td>${buttonToUse}</td>
                <td><button data-id="${task.id}" class="delete-button">Delete Task</button></td>
            </tr>
        `);
    }
}

//function to POST new todo items to DB
function addNewTask() {
    const newTask = $('#new-task-field').val();//gets task from input field
    if (!newTask) {
        swal({title: 'Whoops!', text: 'Please enter a new task to proceed', icon: 'info', button: 'Gotcha!'});//smart alert
        return;//input check - if no input provided, function aborts and alert displays on DOM
    }
    $.ajax({
        type: 'POST',
        url: '/todo',
        data: {task: newTask},
    }).then(function(response) {
        console.log('Response from server', response);
        getTodoList();//calls GET function then appendToDOM
    }).catch(function(error) {
        console.log('Error in POST', error);
        swal({title: 'Sorry!', text: 'A POST error occurred', icon: 'error', button: 'Got it'});//smart alert
    });
    clearInput();//clears user input field
}

function clearInput() {
    $('#new-task-field').val('');
}

//PUT function to toggle task completed/not completed - check/uncheck
function updateTaskComplete() {
    const id = $(this).data('id');
    const bool = $(this).data('bool');
    //console.log('id', id);//test
    $.ajax({
        method: 'PUT',
        url: `/todo/${id}`,
        data: {id: id, checked: bool},//data to be sent to server for PUT switch
    }).then(function(response) {
        console.log('Task updated');
        getTodoList();//GET function then appendToDOM
    }).catch(function(error) {
        swal({title: 'Sorry!', text: 'A PUT error occurred', icon: 'error', button: 'Got it'});//smart alert
        console.log('Error in PUT', error);
    });
}

//DELETE function to delete task from DB
function deleteTask(id) {
    //console.log('id', id);//test
    $.ajax({
        method: 'DELETE',
        url: `/todo/${id}`,
    }).then(function(response) {
        console.log('Task deleted');
        getTodoList();
    }).catch(function(error) {
        swal({title: 'Sorry!', text: 'A DELETE error occurred', icon: 'error', button: 'Got it'});//smart alert
        console.log('Error in DELETE', error);
    });
}

function smartDeleteCheck() {
    const taskId = $(this).data('id');//like PUT, uses id data stored in clicked delete button. Declares const = task id.
    swal({//smart alert
        title: 'Are you sure?',
        text: 'Once deleted, you will not be able to recover this task!',
        icon: 'warning',
        buttons: true,//adds cancel button
        dangerMode: true,
    }).then(function(confirmDelete) {
        if (confirmDelete) {//if true
            swal('The task has been deleted', {icon: 'success',});
            deleteTask(taskId);//call deleteTask and pass on param taskID
        } else {
            swal('The task has not been deleted');
            return;//cancel function, deleteTask not called
        }
    });
}