function changeTheme(){
    var today = new Date();
    var theme = "/jquery-ui.css'>";
    var link = "<link rel='stylesheet' class='theme' href='css/theme-";
    $('head').find('link').last().remove();

    switch (today.getDay()) {
        case 0: $('head').append(link+"ui-light"+theme); break;
        case 1: $('head').append(link+"humanity"+theme); break;
        case 2: {$('head').append(link+"flick"+theme);
                 $('#toDoListContainer table th').css('color', 'navy');
                 break;}
        case 3: $('head').append(link+"south"+theme); break;
        case 4: $('head').append(link+"hotsneaks"+theme); break;
        case 5: $('head').append(link+"sunny"+theme); break;
        case 6: $('head').append(link+"pepper"+theme); break;
        default: $('head').append(link+"sunny"+theme);
    }
}




//function updateProgressBar(){}
