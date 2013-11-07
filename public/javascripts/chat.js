var chatInfra = io.connect("/chat_infra"),
		chatCom = io.connect("/chat_com");

var roomName = decodeURI (
	(RegExp("room" + '=' + '(.+?)(&|$)').exec(location.search) || [, null]) [1]
);

if (roomName) {
	chatInfra.emit("join_room", { name: roomName });

	chatInfra.on("name_set", function (data) {
		chatInfra.on("user_entered", function (user) {
			$('#messages').append('<div class="systemMessage">' + user.name + ' has join the room.</div>');
		});

		chatInfra.on("message", function (message) {
			var message = JSON.parse(message);
			$('#messages').append('<div class="' + message.type + '">' + message.message + '</div>');
		});

		chatCom.on("message", function (message) {
			var message = JSON.parse(message);
			$('#messages').append('<div class="' + message.type + '"><span class="name">' + message.username + ':</span> ' + message.message + '</div>');
		});

		$('#nameform').hide();
		$('#messages').append('<div class="systemMessage">Hello: ' + data.name + '</div>');

		$('#send').on('click', function (e) {
			var data = {
				type: 'userMessage',
				message: $('#message').val()
			};

			chatCom.send(JSON.stringify(data));
			$('#message').val();
		});

		$('#message').on('keypress', function (e) {
			var keycode = e.keyCode;
			if (keycode == 13) {
				var data = {
					type: 'userMessage',
					message: $('#message').val()
				};

				chatCom.send(JSON.stringify(data));
				$('#message').val('');
			}
		});
	});
}

$(function () {
	// $('#setname').on('click', function (e) {
	// 	chatInfra.emit('set_name', { name: $('#nickname').val() });
	// });
});