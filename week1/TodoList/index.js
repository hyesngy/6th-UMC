function addTask() {
    var taskInput = document.getElementById('taskInput');
    var taskList = document.getElementById('taskList');

    // 해야할일 input
    var taskText = taskInput.value.trim();

    if (taskText !== '') {
        var listItem = document.createElement('li');
        listItem.innerHTML = taskText + ' <button onclick="completeTask(this)">완료</button>';
        taskList.appendChild(listItem);
        taskInput.value = '';
    }
}

function completeTask(btn) {
    var listItem = btn.parentNode;
    var taskList = document.getElementById('taskList');
    var completedList = document.getElementById('completedList');

    btn.innerHTML = '삭제';
    btn.onclick = function() {
        completedList.removeChild(listItem);
    };

    taskList.removeChild(listItem);
    completedList.appendChild(listItem);
}

//해야 할 일 추가
document.getElementById('taskInput').addEventListener('keypress', function(event) {
    var enterKey = 13;
    if (event.key === 'Enter') {
        addTask();
    }
});
