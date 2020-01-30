
var difficultyCol = "<select class='difficulty' data-completed='false'> <option value='1'>1</option><option value='2'>2</option>"
                    + "<option value='3'>3</option><option value='4'>4</option>"
                    + "<option value='5'>5</option> </select>";


function addNewTask(table) {
    var numRows = table.find('tr').length;
    table.append("<tr class='row'><td align='center'><input type='checkbox'/></td>"
                   + "<td><p class='task' contenteditable='true' data-placeholder='Enter Task Here...'></p></td>"
                   + "<td align='center'>" + difficultyCol + "</td>"
                   + "</tr>");
    table.find('tr').last().attr('id', 'row'+numRows);
    table.find('input[type=checkbox]').last().attr('id', 'cb'+numRows);
    table.find('p').last().attr('id', 'task'+numRows);
    table.find('select').last().attr('id', 'diff'+numRows);
}


function removeTask(){
    $("#toDoListContainer tr").each(function(){
        if ($(this).find('input[type=checkbox]').is(':checked')){
            $(this).remove();
        }
    });
    var i = 0;
    $("#toDoListContainer tr").each(function(){
        $(this).attr('id', 'row'+i);
        $(this).find('input').attr('id', 'cb'+i);
        $(this).find('.task').attr('id', 'task'+i);
        $(this).find('.difficulty').attr('id', 'diff'+i);
        i++;
    });
}


function markCompleted(){
    $("#dummy").css('color', 'black');
    $("#toDoListContainer tr").each(function(){
        if ($(this).find('input[type=checkbox]').is(':checked')){
            var diffID = $(this).find('.difficulty').attr('id');
            console.log(diffID);
            if ($(this).find('p').css('color') === $("#dummy").css('color')){
                $(this).find('p').attr('contenteditable', false).css('color', 'grey');
                var difficulty = $(this).find('select').val();
                $(this).find('select').replaceWith("<p class='difficulty' style='color:grey'>"+difficulty+"</p>");
                $(this).find('.difficulty').attr('data-completed', 'true');
            }
            else{
                $(this).find('p').attr('contenteditable', true).css('color', 'black');
                $(this).find('.difficulty').replaceWith(difficultyCol);
            }
            $(this).find('.difficulty').attr('id', diffID);
            $(this).find('input[type=checkbox]').prop('checked', false);
        }
    });
}
