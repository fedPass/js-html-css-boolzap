$(document).ready(function(){
    //intercetto il click sull'input su icona invio
    $('.sendBar i:last-of-type').click(function(){
        sendMessage()
        // un “ok” come risposta, che apparirà dopo 1 secondo.
        setTimeout(sendAnswer, 1000);
    });
    //intercetto l'INVIO del messaggio
    $('.sendBar').keypress(function(event){
        if (event.which == 13) {
            sendMessage()
            // un “ok” come risposta, che apparirà dopo 1 secondo.
            setTimeout(sendAnswer, 1000);
        }
    });
    //quando sto digitando cambia l'icona
    $('#messageInput').keypress(function(event){
        var textMessage = $('#messageInput').val();
        //se textMessage.length è maggiore di 0 rimuovi microfono e inserisci aeroplanino
        if (textMessage.length != 0) {
            $('.sendBar i:last-of-type').removeClass('fas fa-microphone').addClass('fa fa-paper-plane');
        } else {
            // altrimenti (è vuoto) rimuovi aeroplanino e inserisci microfono
            console.log('perora è vuoto');
            $('.sendBar i:last-of-type').addClass('fas fa-microphone').removeClass('fa fa-paper-plane');
        }
    });


    function sendAnswer() {
        //devo clonare il template
        var newMessage = $('.template .message').clone();
        //inserire il nuovomessaggio nel template messagio
        newMessage.children('.message-text').text('ok!');
        //aggiungere la classe sent al messaggio
        newMessage.addClass('received');
        //aggiungere per visualizzare il messaggio nel containerMessaggi
        $('.viewMessage').append(newMessage);
    }


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
            //reimposta icona microfono
        }
    }
});
