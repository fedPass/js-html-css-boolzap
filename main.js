$(document).ready(function(){
    //intercetto il click sull'input
    $('#sendMess').click(function(){
        sendMessage()
    });

    function sendMessage() {
        //recupero il value inserito
        var textMessage = $('#messageInput').val();
        console.log(textMessage);
        //devo verificare se ha digitato qualcosa o no
        if (textMessage.length != 0) {
            //devo clonare il template
            var newMessage = $('.template .message').clone();
            //inserire il nuovomessaggio nel template messagio
            newMessage.children('.message-text').text(textMessage);
            //aggiungere la classe sent al messaggio
            newMessage.addClass('sent');
            //aggiungere per visualizzare il messaggio nel containerMessaggi
            $('.viewMessage').append(newMessage);
            //resetto il value dell'input
            $('#messageInput').val('');
        }
    }
});
