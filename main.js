$(document).ready(function(){

    // for (var i = 0; i < 5; i++) {
    //     $('.contactPreview').clone().appendTo('.contactList');
    // }
    $('#messageInput').click(function(){
        $('#messageInput').val('');
    })

    $('#sendMess').click(function(){
        var messaggio = $('#messageInput').val();
        console.log(messaggio);
        $(messaggio).append('<div class="message sent"><span>' + messaggio + '</span><span>16:45</span></div>');
        $('#messageInput').val('');
    })

})
