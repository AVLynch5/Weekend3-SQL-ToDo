$(document).ready(readyNow);

readyNow();

function readyNow() {
    console.log('JQ sourced');
    getTodoList();
    //add click events here
    $('#add-task-button').on('click', addNewTask);
    $('#todo-list').on('click', '.complete-button', updateTaskComplete);
    $('#todo-list').on('click', '.uncomplete-button', updateTaskComplete);
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
        let buttonToUse;
        switch (task.checked) {
            case true:
                buttonToUse = `<button data-id="${task.id}" data-bool="${task.checked}" class="uncomplete-button">Mark Uncompleted</button>`;
                break;
            case false:
                buttonToUse = `<button data-id="${task.id}" data-bool="${task.checked}" class="complete-button">Mark Complete</button>`;
                break;
        }
        $('#todo-list').append(`
            <tr>
                <td data-id="${task.id}">${task.task}</td>
                <td>${buttonToUse}</td>
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

function updateTaskComplete() {
    const id = $(this).data('id');
    const bool = $(this).data('bool');
    console.log('id', id);
    $.ajax({
        method: 'PUT',
        url: `/todo/${id}`,
        data: {id: id, checked: bool},
    }).then(function(response) {
        console.log('Task updated');
        getTodoList();
    }).catch(function(error) {
        alert('Something went wrong');
        console.log('Error in PUT', error);
    });
}