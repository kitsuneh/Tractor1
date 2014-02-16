
var mycards = [];

function connect_to_server ()
{
    socket = io.connect();
    socket.on('connect', function(){
        this.state = 'connecting';
    });

    socket.on('uid', function(data){
        console.log(data);
        $('#welcomemsg').append('<p>hello user ' + data['hello'] + '</p>');
        $('#welcomemsg').show();
    });

    socket.on('msg', function(data) {
        $('#servermsg').text('server got ' + data);
    })

    socket.on('message', function(message) {
        $('#servermsg').text('server said ' + message);
    })

    socket.on('newcard', function(message) {
        mycards.push(message);
        $('#servermsg').text('I got card ' + message.suit+' ' + message.value);
        //console.log(message.value);
        console.log(mycards.length);
        if (mycards.length === 27){
           // $('#servermsg').text(mycards.valu);
            var ccc = '';
            for (var i = 0; i < 27; i++){
                ccc += (mycards[i].suit + ' '+ mycards[i].value + ' , ' )
            }
            $('#servermsg').text(ccc);
        }
    })
}


function send_msg(type, msg)
{
    socket.emit(type, msg);
}

