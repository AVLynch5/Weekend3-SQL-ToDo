$(document).ready(readyNow);

readyNow();

function readyNow() {
    console.log('JQ sourced');
    getTodoList();
    //add click events here
    $('#add-task-button').on('click', addNewTask);
}

function getTodoList() {
    $.ajax({
        method: 'GET',
        url: '/todo',
    }).then(function(response) {
        console.log(response);
        addToDOM(response);
    }).catch(function(error) {
        console.log('Error in GET', error);
    });
}

function addToDOM(thingsToDo) {
    $('#todo-list').empty();
    for (let task of thingsToDo) {
        $('#todo-list').append(`
            <tr>
                <td>${task.task}</td>
                <td>Filler</td>
                <td>Filler</td>
            </tr>
        `);
    }
}

function addNewTask() {
    const newTask = {task: $('#new-task-field').val()};
    $.ajax({
        type: 'POST',
        url: '/todo',
        data: newTask,
    }).then(function(response) {
        console.log('Response from server', response);
        getTodoList();
    }).catch(function(error) {
        console.log('Error in POST', error);
        alert('Unable to add task');
    });
    clearInput();
}

function clearInput() {
    $('#new-task-field').val('');
}