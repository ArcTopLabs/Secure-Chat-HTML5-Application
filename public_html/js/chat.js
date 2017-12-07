/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var me = {};
me.name = localStorage.getItem("name");
me.avatar = localStorage.getItem("avatar");// 
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
function insertChat(data){
    var control = "";
    if (data["name"] == me.name) {

        control = '<li style="width:100%">' +
                '<div class="msj macro">' +
                '<div class="avatar"><img class="img-circle" style="width:100%;" src="' + data["avatar"] + '" /></div>' +
                '<div class="text text-l">' +
                '<p>' + data["text"] + '</p>' +
                '<p><small>' + 'you send : ' + data["date"] + '</small></p>' +
                '</div>' +
                '</div>' +
                '</li>';
    } else {
        control = '<li style="width:100%;">' +
                '<div class="msj-rta macro">' +
                '<div class="text text-r">' +
                '<p>' + data["text"] + '</p>' +
                '<p><small>' + data["name"]  + ' send : '+ data["date"] + '</small></p>' +
                '</div>' +
                '<div class="avatar" style="padding:0px 0px 0px 10px !important"><img class="img-circle" style="width:100%;" src="' + data["avatar"] + '" /></div>' +
                '</li>';
    }
    $("ul").append(control);
}




function resetChat() {
    $("ul").empty();
    // Store
    localStorage.setItem("lastfetch", 0);
    console.log("----reset t zero ------");

    var name = localStorage.getItem("name");
    if (name == null) {
        $("#startChat").prop('disabled', false);
        $("#clearChat").prop('disabled', true);
    } else {
        $("#name").val(localStorage.getItem("name"));
        $("#phone").val(localStorage.getItem("phone"));
        $("#email").val(localStorage.getItem("email"));
        $("#token").val(localStorage.getItem("token"));
        $("#startChat").prop('disabled', true);
        html5chat.data(0);
        $("#clearChat").prop('disabled', false);
        $("#name").prop('disabled', true);
        $("#email").prop('disabled', true);
        $("#token").prop('disabled', true);
        $("#mytext").focus();

    }



}

function get_gravatar_image_url (email, size, default_image, allowed_rating, force_default)
{
    email = typeof email !== 'undefined' ? email : 'john.doe@example.com';
    size = (size >= 1 && size <= 2048) ? size : 80;
    default_image = typeof default_image !== 'undefined' ? default_image : 'mm';
    allowed_rating = typeof allowed_rating !== 'undefined' ? allowed_rating : 'g';
    force_default = force_default === true ? 'y' : 'n';
    
    return ("https://secure.gravatar.com/avatar/" + md5(email.toLowerCase().trim()) + "?size=" + size + "&default=" + encodeURIComponent(default_image) + "&rating=" + allowed_rating + (force_default === 'y' ? "&forcedefault=" + force_default : ''));
}


$(document).ready(function () {
//-- Clear Chat
    resetChat();

    var tid = setTimeout(mycode, 3000);
    function mycode() {
        // do some stuff...
        html5chat.data(1);
        tid = setTimeout(mycode, 10000); // repeat myself
    }
    function abortTimer() { // to be called when you want to stop the timer
        clearTimeout(tid);
    }


    $("#mytext").on("keyup", function (e) {
        if (e.which == 13) {
            var text = $(this).val();
            console.log("enter is been hit");
            if (text !== "") {
                var data1 = {};
                data1["name"] = me.name;
                data1["date"] = formatAMPM(new Date());
                ;
                data1["avatar"] = me.avatar;
                data1["text"] = text;
                insertChat(data1);
                $(this).val('');
                console.log("--------------");
                var data = [];
                data.push(localStorage.getItem("name"));
                data.push(me.avatar);
                data.push(text);
                data.push(formatAMPM(new Date()));
                html5chat.add(data);
                console.log("--------------");
            }
        }
    });
    
    $("#clearChat").on("click", function (e) {
        localStorage.setItem("lastfetch", 0);
        html5chat.delete(me.name);
        $("#startChat").prop('disabled', false);
    });
    
    $("#reEnter").on("click", function (e) {
        localStorage.setItem("lastfetch", 0);
        $("#name").prop('disabled', false);
        $("#email").prop('disabled', false);
        $("#token").prop('disabled', false);
        $("#name").focus();
        $("#startChat").prop('disabled', false);
    });
    
    
    $("#startChat").on("click", function (e) {
        var text = $(this).val();

//        console.log("enter is been hit");
        localStorage.setItem("name", $("#name").val());
        localStorage.setItem("phone", $("#phone").val());
        localStorage.setItem("email", $("#email").val());
        localStorage.setItem("token", $("#token").val());

        // get the email
        var email = $('#email').val();
        var gravatar_image_url = get_gravatar_image_url (email, 200);
        localStorage.setItem("avatar", gravatar_image_url);
        me.avatar = gravatar_image_url;
        console.log(me.avatar);
        html5chat.data(0);
        html5chat.showMessage('#9BED87', 'black', 'Data saved successfully :)');
        $("#startChat").prop('disabled', true);
        $("#mytext").focus();
    });
});
