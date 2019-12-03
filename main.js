$(document).ready(function(){
    //intercetto il click sull'input
    $('#sendMess').click(function(){
        //recupero il value inserito
        var textMessage = $('#messageInput').val();
        console.log(textMessage);
        //devo verificare se ha digitato qualcosa o no
        if (textMessage.length != 0) {
            //devo clonare il template

            //inserire il nuovomessaggio nel template messagio

            //aggiungere la classe sent al messaggio

            //aggiungere per visualizzare il messaggio nel containerMessaggi

            //resetto il value dell'input
            $('#messageInput').val('');
        }
    });
});
