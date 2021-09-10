$(document).ready(readyNow);

readyNow();

function readyNow() {
    console.log('JQ sourced');
    getTodoList();
    //add click events here
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