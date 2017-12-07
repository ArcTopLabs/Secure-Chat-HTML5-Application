/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var me = {};
me.name = "dushyant";
me.avatar = "https://lh6.googleusercontent.com/-lr2nyjhhjXw/AAAAAAAAAAI/AAAAAAAARmE/MdtfUmC0M4s/photo.jpg?sz=48";

var you = {};
you.name = "john"
you.avatar = "https://a11.t26.net/taringa/avatares/9/1/2/F/7/8/Demon_King1/48x48_5C5.jpg";

function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
}

//-- No use time. It is a javaScript effect.
function insertChat(who, text, time = 0){
    var control = "";
    var date = formatAMPM(new Date());

    if (who == "me") {

        control = '<li style="width:100%">' +
                '<div class="msj macro">' +
                '<div class="avatar"><img class="img-circle" style="width:100%;" src="' + me.avatar + '" /></div>' +
                '<div class="text text-l">' +
                '<p>' + text + '</p>' +
                '<p><small>' + date + '</small></p>' +
                '</div>' +
                '</div>' +
                '</li>';
    } else {
        control = '<li style="width:100%;">' +
                '<div class="msj-rta macro">' +
                '<div class="text text-r">' +
                '<p>' + text + '</p>' +
                '<p><small>' + date + '</small></p>' +
                '</div>' +
                '<div class="avatar" style="padding:0px 0px 0px 10px !important"><img class="img-circle" style="width:100%;" src="' + you.avatar + '" /></div>' +
                '</li>';
    }
    setTimeout(
            function () {
                $("ul").append(control);

            }, time);
}

function resetChat() {
    $("ul").empty();
}


$(document).ready(function () {
//-- Clear Chat
    resetChat();


    $(".mytext").on("keyup", function (e) {
        if (e.which == 13) {
            var text = $(this).val();
            console.log("enter is been hit");
            if (text !== "") {
                insertChat("me", text);
                $(this).val('');
                console.log("--------------");
                var data = [];
                data.push(me.name);
                data.push(me.avatar);
                data.push(text);
                data.push(formatAMPM(new Date()));
                html5chat.add(data);
                console.log("--------------");
            }
        }
    });
    
    
    $(".youText").on("keyup", function (e) {
        if (e.which == 13) {
            var text = $(this).val();
            console.log("enter is been hit");
            if (text !== "") {
                insertChat("me", text);
                $(this).val('');
                console.log("--------------");
                var data = [];
                data.push(you.name);
                data.push(you.avatar);
                data.push(text);
                data.push(formatAMPM(new Date()));
                html5chat.add(data);
                console.log("--------------");
            }
        }
    });


//-- Print Messages
//    insertChat("me", "Hello Tom...", 0);
//    insertChat("you", "Hi, Pablo", 1500);
//    insertChat("me", "What would you like to talk about today?", 3500);
//    insertChat("you", "Tell me a joke", 7000);
//    insertChat("me", "Spaceman: Computer! Computer! Do we bring battery?!", 9500);
//    insertChat("you", "LOL", 12000);
});
