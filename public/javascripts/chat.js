var socket = io.connect('/');

socket.on('message', function (data) {
	data = JSON.parse(data);
	$('#messages').append('<div class="' + data.type + '">' + data.message + '</div>');
});

$(function(){
	$('#send').click(function (e) {
		sendMessage();
	})

	$('#message').on('keypress', function(e){
		var keycode = e.keyCode;
		if (keycode == 13) {
			sendMessage();
			return 1;
		}

		return;
	});
});

function sendMessage() {
	var data = {
		message: $('#message').val(),
		type: "userMessage"
	};

	socket.send(JSON.stringify(data));
	$('#message').val('');
}