$(document).ready(function(){
    //intercetto il click sull'input su icona invio
    $('.sendBar i:last-of-type').click(function(){
            sendMessage()
    });

    //intercetto l'INVIO del messaggio
    $('.sendBar').keypress(function(event){
        if (event.which == 13) {
            sendMessage()
        }
    });

    //quando sto digitando cambia l'icona
    $('#messageInput').keyup(function(event){
        var textMessage = $('#messageInput').val();
        //se textMessage.length è maggiore di 0 rimuovi microfono e inserisci aeroplanino
        if (textMessage.length != 0) {
            $('.sendBar i:last-of-type').removeClass('fas fa-microphone').addClass('fa fa-paper-plane');
        } else {
            // altrimenti (è vuoto) rimuovi aeroplanino e inserisci microfono
            $('.sendBar i:last-of-type').addClass('fas fa-microphone').removeClass('fa fa-paper-plane');
        }
    });

    //faccio la ricerca tra i contatti
    $('#searchBar input').keyup(function(){
        var nomeRicercato = $('#searchBar input').val();
        //se stai digitando qualcosa
        if (nomeRicercato.length > 0) {
            //prendi ogni div contatti
            $('.contactPreview').each(function(){
                //estrai il valore del nome
                var nomeContatto = $(this).find('.name').text();
                nomeContatto = nomeContatto.toUpperCase();
                nomeRicercato = nomeRicercato.toUpperCase();
                //se quello che digito è contenuto nel nome contatto
                if(nomeContatto.includes(nomeRicercato)) {
                    //mostramelo
                    $(this).show();
                } else {
                    //altrimenti nascondilo
                    $(this).hide();
                }
            });
        } else {
            //se l'input è vuoto mostrameli tutti
            $('.contactPreview').show();
        }
    });

    //mostra la conversazione del contatto cliccato
    //intercetto il click
    $('.contactPreview').click(function(){
        //intercetto su quale index sto cliccando
        var indexContact = $(this).index();
        //nascondo la conversazione attualemnte visualizzata
        var currentContact = $('.chat.active');
        currentContact.removeClass('active');
        //gli collego la conversazione con stesso index
        var selectedContact = $('.chat').eq(indexContact);
        //rendo visibile la conversazione cliccata
        selectedContact.addClass('active');
        //cambia foto in header
        var photoSelected = $('.contactPreview img').eq(indexContact).attr('src');
        $('#messageContainer img').attr('src', photoSelected);
        //cambio nome in header
        var nomeSelected = $('.contactPreview .name').eq(indexContact).text();
        console.log(nomeSelected);
        $('#messageContainer .name').text(nomeSelected);
    });
});

function sendAnswer() {
    //devo clonare il template
    var newMessage = $('.template .message').clone();
    //inserire il nuovomessaggio nel template messagio
    newMessage.children('.message-text').text('ok!');
    //aggiungere la classe sent al messaggio
    newMessage.addClass('received');
    //aggiungere per visualizzare il messaggio nel containerMessaggi
    $('.chat.active').append(newMessage);
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
        $('.chat.active').append(newMessage);
        //resetto il value dell'input
        $('#messageInput').val('');
        //reimposto icona microfono
        $('.sendBar i:last-of-type').addClass('fas fa-microphone').removeClass('fa fa-paper-plane');
        //funzione per impostare risposta dopo 1 sec
        setTimeout(sendAnswer, 1000);
    }
}
