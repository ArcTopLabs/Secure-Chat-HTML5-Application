/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var appName = "demo";
var url = 'https://api.masterdatanode.com/' + appName + '/chat/';
var access_token = localStorage.getItem("token"); //'Zs0nTQB-ujOSV0KmEoPhBx2E6-Ab_GKO';  //'######access_token###########'
var content_type = 'application/json';
var itemsPerPage = 3;


var html5chat = {}

html5chat.data = function (type) {

    var lf = parseInt(localStorage.getItem("lastfetch"));
    console.log(" ----- las lf set -------" + lf);
    var name = localStorage.getItem("name");
//    var d = new Date();
//    var nindex = d.getTime();
    console.log(" ======== auth token " + access_token);
    var SendInfo = {"sort": {
            "created_date": "desc"
        }, "limit": 5,
        "filter": {
            "timestamp": {">": lf}
        }
    };
//                    alert("canvas clear");

    if (access_token !== null) {



        $.ajax({
            url: url + 'find',
            async: false,
            type: 'post',
            cache: false,
//                        data: {},
            data: JSON.stringify(SendInfo),
            headers: {
                "access_token": access_token, //'Zs0nTQB-ujOSV0KmEoPhBx2E6-Ab_GKO',
                "Content-Type": 'application/json'
            },
            dataType: 'json',
            success: function (data) {

                //$("#test_div").html(JSON.stringify(data));
                console.info(JSON.stringify(data));

                console.info(data.DataCount);
                var dataCount = data.DataCount;

                var identifier, todo;
                var count = 1;
                var dataArray = [];
                var counter = 0;
                $.each(data.result, function (k, jsonObject) {
//                identifier = jsonObject.identifier;
                    var data = {};
                    data["name"] = jsonObject.name;
                    data["date"] = jsonObject.time;
                    data["avatar"] = jsonObject.avatar;
                    data["text"] = jsonObject.text;
                    data["timestamp"] = jsonObject.timestamp;
//                count++;
                    dataArray[counter++] = data;

                    count++;
                });

                if (counter != 0) {
                    for (i = (counter - 1); i > -1; i--) {
                        insertChat(dataArray[i]);
                        localStorage.setItem("lastfetch", dataArray[i]["timestamp"]);
                        console.log(" ----- las set -------" + dataArray[i]["timestamp"]);
                    }
                }



//            console.info(JSON.stringify(obj.result));
            },
            error: function (xhr, thrownError) {
                console.info("readyState: " + xhr.readyState + "\nstatus: " + xhr.status + "\nresponseText: " + xhr.responseText);
//            alert(thrownError);
            },
            timeout: 5000
        });
    }
};


html5chat.filterDel = function (email) {

    $('#deleteInfo').val(email);
//    document.getElementById("deleteInfo").value = email;
    $('#deleteData').html(email);

};



html5chat.add = function (data) {

    console.log(data);
    var d = new Date();
    var nindex = d.getTime();

    var SendInfo = {"Data": [{"name": data[0], "avatar": data[1], "text": data[2], "time": data[3], "timestamp": nindex}]};
    console.log(JSON.stringify(SendInfo));

    $.ajax({
        url: url + 'save',
        type: 'post',
        async: false,
        data: JSON.stringify(SendInfo),
        headers: {
            "access_token": access_token,
            "Content-Type": content_type
        },
        dataType: 'json',
        success: function (data) {
//            $("#test_div").show();
            localStorage.setItem("lastfetch", nindex);
            var result = $.parseJSON(JSON.stringify(data));
            console.info(JSON.stringify(result));
//            $("#test_div").html(JSON.stringify(result.description));
            
        }
    });
};

html5chat.delete = function (identifier) {

    console.log(identifier);

    var SendInfo = {"filter": {"name": identifier}, "type": "all"};
    ////alert(JSON.stringify(SendInfo)); 

    $.ajax({
        url: url + 'delete',
        type: 'post',
        async: false,
        data: JSON.stringify(SendInfo),
        headers: {
            "access_token": access_token,
            "Content-Type": content_type,
            "origin": 'app'
        },
        dataType: 'json',
        success: function (data) {
//            $("#test_div").show();
            var result = $.parseJSON(JSON.stringify(data));
            console.info(JSON.stringify(result));
//            $("#test_div").html(JSON.stringify(result.description));
            html5chat.showMessage('#9BED87', 'black', 'All your Data is been deleted successfully.)');
            $("ul").empty();
            html5chat.data(0)
        }
    });
};

// share note
html5chat.showMessage = function (bgcolor, color, msg) {
    if (!$('#smsg').is(':visible'))
    {
        $('html, body').animate({
            scrollTop: 0
        }, 500, function () {
            if (!$('#smsg').length)
            {
                $('<div id="smsg">' + msg + '</div>').appendTo($('body')).css({
                    position: 'absolute',
                    top: 0,
                    left: 3,
                    width: '98%',
                    height: '30px',
                    lineHeight: '30px',
                    background: bgcolor,
                    color: color,
                    zIndex: 1000,
                    padding: '10px',
                    fontWeight: 'bold',
                    textAlign: 'center',
                    opacity: 0.9,
                    margin: 'auto',
                    display: 'none'
                }).slideDown('show');
                setTimeout(function () {
                    $('#smsg').animate({'width': 'hide'}, function () {
                        $('#smsg').remove();
                    });
                }, 4000);
            }
        });
    }
};


