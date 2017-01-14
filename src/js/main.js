'use strict';

(()=>{
    const name = 'MoMo';
    console.log(`Hello ${name}!`);
    const client_id = '';
    const url = `https://api.amazon.com/auth/o2/token`;
//     $.ajax({
//         url: 'https://api.amazon.com/auth/o2/',
//         contentType: 'application/x-www-form-urlencoded',
//         data: {
//             format: 'json'
//         },
//         error: function() {
//             $('#info').html('<p>An error has occurred</p>');
//         },
//         dataType: 'json',
//         success: function(data) {
//             var $title = $('<h1>').text(data.talks[0].talk_title);
//             var $description = $('<p>').text(data.talks[0].talk_description);
//             $('#info')
//                 .append($title)
//                 .append($description);
//         },
//         type: 'POST'
// });
    // const url2 = ``;
    //https://developer.amazon.com/blogs/post/Tx3CX1ETRZZ2NPC/alexa-account-linking-5-steps-to-seamlessly-link-your-alexa-skill-with-login-with-amazon
    
    $.post( url, 
        { 
            client_id: "John", 
            time: "2pm" 
        }, (data)=>{
            console.log(data);
        } );
})();