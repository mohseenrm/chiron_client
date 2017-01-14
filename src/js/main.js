'use strict';

const SpeechRecognition = SpeechRecognition || webkitSpeechRecognition,
    SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList,
    SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent;

(() => {
    const name = 'MoMo';
    console.log(`Hello ${name}!`);
    // const client_id = ''; const url = `https://api.amazon.com/auth/o2/token`;
    // $.ajax({         url: 'https://api.amazon.com/auth/o2/', contentType:
    // 'application/x-www-form-urlencoded',         data: { format: 'json' },
    // error: function() { $('#info').html('<p>An error has occurred</p>'); },
    //   dataType: 'json',         success: function(data) { var $title =
    // $('<h1>').text(data.talks[0].talk_title);             var $description =
    // $('<p>').text(data.talks[0].talk_description); $('#info') .append($title)
    //             .append($description);         },    type: 'POST' }); const url2
    // = ``;
    // https://developer.amazon.com/blogs/post/Tx3CX1ETRZZ2NPC/alexa-account-linking
    // - 5-steps-to-seamlessly-link-your-alexa-skill-with-login-with-amazon $.post(
    // url,     {         client_id: "John",         time: "2pm"     }, (data)=>{
    // console.log(data);     } );

    const colors = [
            'aqua',
            'azure',
            'beige',
            'bisque',
            'black',
            'blue',
            'brown',
            'chocolate',
            'coral',
            'crimson',
            'cyan',
            'fuchsia',
            'ghostwhite',
            'gold',
            'goldenrod',
            'gray',
            'green',
            'indigo',
            'ivory',
            'khaki',
            'lavender',
            'lime',
            'linen',
            'magenta',
            'maroon',
            'moccasin',
            'navy',
            'olive',
            'orange',
            'orchid',
            'peru',
            'pink',
            'plum',
            'purple',
            'red',
            'salmon',
            'sienna',
            'silver',
            'snow',
            'tan',
            'teal',
            'thistle',
            'tomato',
            'turquoise',
            'violet',
            'white',
            'yellow'
        ],
        grammar = '#JSGF V1.0; grammar colors; public <color> = ' + colors.join(' | ') + ' ;';

    let recognition = new SpeechRecognition(),
        speechRecognitionList = new SpeechGrammarList();
    speechRecognitionList.addFromString(grammar, 1);
    recognition.grammars = speechRecognitionList;
    //recognition.continuous = false;
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    document.body.onclick = function () {
        recognition.start();
        console.log('Ready to receive a color command.');
    }

    recognition.onresult = (event) => {
        // The SpeechRecognitionEvent results property returns a
        // SpeechRecognitionResultList object The SpeechRecognitionResultList object
        // contains SpeechRecognitionResult objects. It has a getter so it can be
        // accessed like an array The [last] returns the SpeechRecognitionResult at the
        // last position. Each SpeechRecognitionResult object contains
        // SpeechRecognitionAlternative objects that contain individual results. These
        // also have getters so they can be accessed like arrays. The [0] returns the
        // SpeechRecognitionAlternative at position 0. We then return the transcript
        // property of the SpeechRecognitionAlternative object

        const last = event.results.length - 1,
            color = event.results[last][0].transcript;
        
        console.log(`Color recieved: ${color}`);
        console.log('Confidence: ' + event.results[0][0].confidence);
    };

    recognition.onspeechend = () => {
        recognition.stop();
    };
    recognition.onnomatch = () => {
        console.log('No match');
    };
    recognition.onerror = (e) => {
        console.log(e);
    }
})();