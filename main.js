$(document).ready(function(){

    //intercetto il click sull'input su icona invio
    $('.sendBar i:last-of-type').click(function(){
        //recupero il value inserito
        var textMessage = $('#messageInput').val();
        //devo verificare se ha digitato qualcosa o no
        if (textMessage.length != 0) {
            sendMessage(textMessage);
        }
    });

    //intercetto l'INVIO del messaggio
    $('.sendBar').keypress(function(event){
        //recupero il value inserito
        var textMessage = $('#messageInput').val();
        //verifico se ha cliccato enter e se ha digitato qualcosa
        if (event.which == 13 && textMessage.length != 0) {
            sendMessage(textMessage);
        }
    });

    //quando sto digitando cambia l'icona
    $('#messageInput').keyup(function(event){
        //recupero il value inserito
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
        $('.chat.active').removeClass('active');
        //rimuovo active anche al contatto evidenziato
        $('.contactPreview.active').removeClass('active');
        //gli collego la conversazione con stesso index
        var selectedContact = $('.chat').eq(indexContact);
        var selectedContPrew = $('.contactPreview').eq(indexContact);
        //rendo visibile la conversazione cliccata
        selectedContact.addClass('active');
        selectedContPrew.addClass('active');
        //cambia foto in header
        var photoSelected = $('.contactPreview img').eq(indexContact).attr('src');
        $('#messageContainer img').attr('src', photoSelected);
        //cambio nome in header
        var nomeSelected = $('.contactPreview .name').eq(indexContact).text();
        $('#messageContainer .name').text(nomeSelected);
    });

    //quando clicco sull'icona chevron-down si apre il menu opzioni
    $(document).on('click','.message i.fa.fa-chevron-down', function(){
        //prendi il message-options-panel che ho cliccato
        var messageOptClicked = $(this).next();
        //se non è visibile
        if(messageOptClicked.is(':hidden')){
            //mostralo
            $(messageOptClicked).addClass('active');
        } else {
            //se è visibile e ho cliccato nascondilo
            $(messageOptClicked).removeClass('active');
        }
    });

    //quando clicco su elimina messaggio
    $(document).on('click','.message-destroy', function(){
        $(this).parentsUntil('.chat').hide();
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

function sendMessage(textMessage) {
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
    //sposta il contatto il cima nella lista contatti
    $('.contactPreview.active').prependTo('.contactList');
    //sposta anche il pannello (si spostano insieme al contatto)
    $('.chat.active').prependTo('.viewMessage');
    //funzione per impostare risposta dopo 1 sec
    setTimeout(sendAnswer, 1000);
}
