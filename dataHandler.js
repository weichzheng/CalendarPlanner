
var difficultyCol = "<select class='difficulty' data-completed='false'> <option value='1'>1</option><option value='2'>2</option>"
                    + "<option value='3'>3</option><option value='4'>4</option>"
                    + "<option value='5'>5</option> </select>";

var tableTemplate = "<table class='taskTable' cellpadding='3px'><tr>"
                    + "<th>Select</th><th style='width:400px'>Task</th>"
                    + "<th>Difficulty</th></tr></table>";

var rowTemplate = "<tr class='row'><td align='center'><input type='checkbox'/></td>"
                + "<td><p class='task' contenteditable='true' data-placeholder='Enter Task Here...'></p></td>"
                + "<td align='center'>" + difficultyCol + "</td>"
                + "</tr>";


function TaskInfo(task, difficulty, completed){
    this.task = task;
    this.difficulty = difficulty;
    this.completed = completed;
}


function saveTasks(date){
    if (!isTableEmpty()){
        var dataArr = [];
        for (i = 1; i < $("#toDoListContainer").find('table').find('tr').length; i++){
            var task = document.querySelector('#task'+i).innerText;
            var diff;
            if ($("#row"+i).find('select').length === 0){
                diff = document.querySelector('#diff'+i).innerText;
            }
            else { diff = $("#row"+i).find('select').val(); }
            var comp = $("#row"+i).find('.difficulty').attr('data-completed');
            dataArr.push(new TaskInfo(task, diff, comp));
        }
        localStorage.setItem(date, JSON.stringify(dataArr));
    }
}


function getTasks(date){
    if (localStorage.getItem(date) === null){
        throw "Error: Date has no saved tasks.";
    }
    return JSON.parse(localStorage.getItem(date));
}


function isTableEmpty(){
    var isEmpty = true;
    for (i = 1; i < $("#toDoListContainer").find('table').find('tr').length; i++){
        if(document.querySelector('#task'+i).innerText !== ""){
            isEmpty = false;
            return false;
        }
    }
    return isEmpty;
}


function tasksOnDate(date){
    try{
        var tasks = getTasks(date);
        $("#toDoListContainer").find('table').replaceWith(tableTemplate);
        for (i = 1; i <= tasks.length; i++) {
            addNewTask($("#toDoListContainer").find('table'));
            document.querySelector("#task"+i).innerText = tasks[i-1].task;
            if (tasks[i-1].completed === 'true'){
                $("#row"+i).find('select').replaceWith("<p class='difficulty' data-completed='true' style='color:grey'>"
                                                    + tasks[i-1].difficulty +"</p>");
                $('#row'+i).find('.difficulty').attr('id', 'diff'+i).css('color', 'grey');
                $("#task"+i).css('color', 'grey');
                $('#task'+i).attr('contenteditable', 'false');
            }
            $("#toDoListContainer").find('table').find('tr').last().find('.difficulty')
                .val(tasks[i-1].difficulty);
        }
    }
    catch(err){
        $("#toDoListContainer").find('table').replaceWith(tableTemplate);
    }
}


function manageTasks(chosenDate, previousDate){
    if (isTableEmpty()){
        localStorage.removeItem(previousDate);
    }
    else{
        saveTasks(previousDate);
    }
    tasksOnDate(chosenDate);
}

function updateTaskHeading(date){
    var dateVals = date.split("/");
    var month = parseInt(dateVals[0])-1;
    var day = parseInt(dateVals[1]);
    var year = parseInt(dateVals[2]);
    var chosenDate = new Date(year, month, day);
    var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    var months = ['January', 'February', 'March', 'April', 'May', 'June',
                  'July', 'August', 'September', 'October', 'November', 'December'];
    chosenDate.getDay();
    $("#taskHeading").text("Tasks for: "+days[chosenDate.getDay()]+", "+ months[month] +" "+day+", "+year);
}
