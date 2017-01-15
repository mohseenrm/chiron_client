'use strict';

const SpeechRecognition = SpeechRecognition || webkitSpeechRecognition,
    SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList,
    SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent;

(() => {
    const name = 'MoMo';
    console.log(`Hello ${name}!`);
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
            speechToText = event.results[last][0].transcript;

        document
            .getElementById('hint-text')
            .innerHTML = speechToText;

        // Insert whatever words come from voice recognition implementation
        const specialKeywords = extractKeyword(speechToText);
        console.log(specialKeywords);
        const allDiseases = findPossibleDiseases(specialKeywords);
        console.log('all diseases' + allDiseases);
        const sids = getSymptomId(allDiseases); 
        console.log(`sids: ${sids}`);

        const payload = generatePayload(sids);
        console.log(JSON.stringify(payload));

        // console.log(`Color recieved: ${speechToText}`);
        // console.log('Confidence: ' + event.results[0][0].confidence);
    };

    recognition.onspeechend = () => {
        recognition.stop();
    };
    recognition.onnomatch = () => {
        console.log('No match');
    };
    recognition.onerror = (e) => {
        console.log(e);
    };

    var stopList = [
        "a",
        "a's",
        "able",
        "about",
        "above",
        "abroad",
        "according",
        "accordingly",
        "across",
        "actually",
        "adj",
        "after",
        "afterwards",
        "again",
        "against",
        "ago",
        "ahead",
        "ain't",
        "aint",
        "all",
        "allow",
        "allows",
        "almost",
        "alone",
        "along",
        "alongside",
        "already",
        "also",
        "although",
        "always",
        "am",
        "amid",
        "amidst",
        "among",
        "amongst",
        "amoungst",
        "amount",
        "an",
        "and",
        "another",
        "any",
        "anybody",
        "anyhow",
        "anyone",
        "anything",
        "anyway",
        "anyways",
        "anywhere",
        "apart",
        "appear",
        "appreciate",
        "appropriate",
        "are",
        "aren't",
        "arent",
        "around",
        "as",
        "aside",
        "ask",
        "asking",
        "associated",
        "at",
        "available",
        "away",
        "awfully",
        "b",
        "back",
        "backward",
        "backwards",
        "be",
        "became",
        "because",
        "become",
        "becomes",
        "becoming",
        "been",
        "before",
        "beforehand",
        "begin",
        "behind",
        "being",
        "believe",
        "below",
        "beside",
        "besides",
        "best",
        "better",
        "between",
        "beyond",
        "bill",
        "both",
        "bottom",
        "brief",
        "but",
        "by",
        "c",
        "c'mon",
        "c's",
        "call",
        "came",
        "can",
        "can't",
        "cannot",
        "cant",
        "caption",
        "cause",
        "causes",
        "certain",
        "certainly",
        "changes",
        "clearly",
        "cmon",
        "co",
        "co.",
        "com",
        "come",
        "comes",
        "computer",
        "con",
        "concerning",
        "consequently",
        "consider",
        "considering",
        "contain",
        "containing",
        "contains",
        "corresponding",
        "could",
        "couldn't",
        "couldnt",
        "course",
        "cry",
        "currently",
        "d",
        "dare",
        "daren't",
        "darent",
        "de",
        "definitely",
        "describe",
        "described",
        "despite",
        "detail",
        "did",
        "didn't",
        "didnt",
        "different",
        "directly",
        "do",
        "does",
        "doesn't",
        "doesnt",
        "doing",
        "don't",
        "done",
        "dont",
        "down",
        "downwards",
        "due",
        "during",
        "e",
        "each",
        "edu",
        "eg",
        "eight",
        "eighty",
        "either",
        "eleven",
        "else",
        "elsewhere",
        "empty",
        "end",
        "ending",
        "enough",
        "entirely",
        "especially",
        "et",
        "etc",
        "even",
        "ever",
        "evermore",
        "every",
        "everybody",
        "everyone",
        "everything",
        "everywhere",
        "ex",
        "exactly",
        "example",
        "except",
        "f",
        "fairly",
        "far",
        "farther",
        "few",
        "fewer",
        "fifteen",
        "fifth",
        "fify",
        "fill",
        "find",
        "fire",
        "first",
        "five",
        "followed",
        "following",
        "follows",
        "for",
        "forever",
        "former",
        "formerly",
        "forth",
        "forty",
        "forward",
        "found",
        "four",
        "from",
        "front",
        "full",
        "further",
        "furthermore",
        "g",
        "get",
        "gets",
        "getting",
        "give",
        "given",
        "gives",
        "go",
        "goes",
        "going",
        "gone",
        "got",
        "gotten",
        "greetings",
        "h",
        "had",
        "hadn't",
        "hadnt",
        "half",
        "happens",
        "hardly",
        "has",
        "hasn't",
        "hasnt",
        "have",
        "haven't",
        "havent",
        "having",
        "he",
        "he'd",
        "he'll",
        "he's",
        "hello",
        "help",
        "hence",
        "her",
        "here",
        "here's",
        "hereafter",
        "hereby",
        "herein",
        "heres",
        "hereupon",
        "hers",
        "herse",
        "herself",
        "hi",
        "him",
        "himse",
        "himself",
        "his",
        "hither",
        "hopefully",
        "how",
        "how's",
        "howbeit",
        "however",
        "hows",
        "hundred",
        "i",
        "i'd",
        "i'll",
        "i'm",
        "i've",
        "ie",
        "if",
        "ignored",
        "immediate",
        "in",
        "inasmuch",
        "inc",
        "inc.",
        "indeed",
        "indicate",
        "indicated",
        "indicates",
        "inner",
        "inside",
        "insofar",
        "instead",
        "interest",
        "into",
        "inward",
        "is",
        "isn't",
        "isnt",
        "it",
        "it'd",
        "it'll",
        "it's",
        "itd",
        "itll",
        "its",
        "itse",
        "itself",
        "j",
        "just",
        "k",
        "keep",
        "keeps",
        "kept",
        "know",
        "known",
        "knows",
        "l",
        "last",
        "lately",
        "later",
        "latter",
        "latterly",
        "least",
        "less",
        "lest",
        "let",
        "let's",
        "lets",
        "like",
        "liked",
        "likely",
        "likewise",
        "little",
        "look",
        "looking",
        "looks",
        "low",
        "lower",
        "ltd",
        "m",
        "made",
        "mainly",
        "make",
        "makes",
        "many",
        "may",
        "maybe",
        "mayn't",
        "maynt",
        "me",
        "mean",
        "meantime",
        "meanwhile",
        "merely",
        "might",
        "mightn't",
        "mightnt",
        "mill",
        "mine",
        "minus",
        "miss",
        "more",
        "moreover",
        "most",
        "mostly",
        "move",
        "mr",
        "mrs",
        "much",
        "must",
        "mustn't",
        "mustnt",
        "my",
        "myse",
        "myself",
        "n",
        "name",
        "namely",
        "nd",
        "near",
        "nearly",
        "necessary",
        "need",
        "needn't",
        "neednt",
        "needs",
        "neither",
        "never",
        "neverf",
        "neverless",
        "nevertheless",
        "new",
        "next",
        "nine",
        "ninety",
        "no",
        "no-one",
        "nobody",
        "non",
        "none",
        "nonetheless",
        "noone",
        "nor",
        "normally",
        "not",
        "nothing",
        "notwithstanding",
        "novel",
        "now",
        "nowhere",
        "o",
        "obviously",
        "of",
        "off",
        "often",
        "oh",
        "ok",
        "okay",
        "old",
        "on",
        "once",
        "one",
        "one's",
        "ones",
        "only",
        "onto",
        "opposite",
        "or",
        "other",
        "others",
        "otherwise",
        "ought",
        "oughtn't",
        "oughtnt",
        "our",
        "ours",
        "ourselves",
        "out",
        "outside",
        "over",
        "overall",
        "own",
        "p",
        "part",
        "particular",
        "particularly",
        "past",
        "per",
        "perhaps",
        "placed",
        "please",
        "plus",
        "possible",
        "presumably",
        "probably",
        "provided",
        "provides",
        "put",
        "q",
        "que",
        "quite",
        "qv",
        "r",
        "rather",
        "rd",
        "re",
        "really",
        "reasonably",
        "recent",
        "recently",
        "regarding",
        "regardless",
        "regards",
        "relatively",
        "respectively",
        "right",
        "round",
        "s",
        "said",
        "same",
        "saw",
        "say",
        "saying",
        "says",
        "second",
        "secondly",
        "see",
        "seeing",
        "seem",
        "seemed",
        "seeming",
        "seems",
        "seen",
        "self",
        "selves",
        "sensible",
        "sent",
        "serious",
        "seriously",
        "seven",
        "several",
        "shall",
        "shan't",
        "shant",
        "she",
        "she'd",
        "she'll",
        "she's",
        "shes",
        "should",
        "shouldn't",
        "shouldnt",
        "show",
        "side",
        "since",
        "sincere",
        "six",
        "sixty",
        "so",
        "some",
        "somebody",
        "someday",
        "somehow",
        "someone",
        "something",
        "sometime",
        "sometimes",
        "somewhat",
        "somewhere",
        "soon",
        "sorry",
        "specified",
        "specify",
        "specifying",
        "still",
        "sub",
        "such",
        "sup",
        "sure",
        "system",
        "t",
        "t's",
        "take",
        "taken",
        "taking",
        "tell",
        "ten",
        "tends",
        "th",
        "than",
        "thank",
        "thanks",
        "thanx",
        "that",
        "that'll",
        "that's",
        "that've",
        "thatll",
        "thats",
        "thatve",
        "the",
        "their",
        "theirs",
        "them",
        "themselves",
        "then",
        "thence",
        "there",
        "there'd",
        "there'll",
        "there're",
        "there's",
        "there've",
        "thereafter",
        "thereby",
        "thered",
        "therefore",
        "therein",
        "therell",
        "therere",
        "theres",
        "thereupon",
        "thereve",
        "these",
        "they",
        "they'd",
        "they'll",
        "they're",
        "they've",
        "theyd",
        "theyll",
        "theyre",
        "theyve",
        "thick",
        "thin",
        "thing",
        "things",
        "think",
        "third",
        "thirty",
        "this",
        "thorough",
        "thoroughly",
        "those",
        "though",
        "three",
        "through",
        "throughout",
        "thru",
        "thus",
        "till",
        "to",
        "together",
        "too",
        "took",
        "top",
        "toward",
        "towards",
        "tried",
        "tries",
        "truly",
        "try",
        "trying",
        "twelve",
        "twenty",
        "twice",
        "two",
        "u",
        "un",
        "under",
        "underneath",
        "undoing",
        "unfortunately",
        "unless",
        "unlike",
        "unlikely",
        "until",
        "unto",
        "up",
        "upon",
        "upwards",
        "us",
        "use",
        "used",
        "useful",
        "uses",
        "using",
        "usually",
        "v",
        "value",
        "various",
        "versus",
        "very",
        "via",
        "viz",
        "vs",
        "w",
        "want",
        "wants",
        "was",
        "wasn't",
        "wasnt",
        "way",
        "we",
        "we'd",
        "we'll",
        "we're",
        "we've",
        "welcome",
        "well",
        "went",
        "were",
        "weren't",
        "werent",
        "weve",
        "what",
        "what'll",
        "what's",
        "what've",
        "whatever",
        "whatll",
        "whats",
        "whatve",
        "when",
        "when's",
        "whence",
        "whenever",
        "whens",
        "where",
        "where's",
        "whereafter",
        "whereas",
        "whereby",
        "wherein",
        "wheres",
        "whereupon",
        "wherever",
        "whether",
        "which",
        "whichever",
        "while",
        "whilst",
        "whither",
        "who",
        "who'd",
        "who'll",
        "who's",
        "whod",
        "whoever",
        "whole",
        "wholl",
        "whom",
        "whomever",
        "whos",
        "whose",
        "why",
        "why's",
        "whys",
        "will",
        "willing",
        "wish",
        "with",
        "within",
        "without",
        "won't",
        "wonder",
        "wont",
        "would",
        "wouldn't",
        "wouldnt",
        "x",
        "y",
        "yes",
        "yet",
        "you",
        "you'd",
        "you'll",
        "you're",
        "you've",
        "youd",
        "youll",
        "your",
        "youre",
        "yours",
        "yourself",
        "yourselves",
        "youve",
        "z",
        "zero"
    ];

    var symptoms = {
        's_1168': 'calcification of the tympanic membrane',
        's_181': 'constant need for sex',
        's_1165': 'burning skin',
        's_825': 'alcohol-related amnesia',
        's_1369': 'abdominal pain, sharp, stabbing',
        's_16': 'abdominal pain, increasing after a meal',
        's_1489': 'chest pain radiating to left shoulder',
        's_118': 'cold sensitivity',
        's_115': 'bleeding from anus',
        's_500': 'blurred vision',
        's_1480': 'breast tenderness',
        's_111': 'bleeding gums',
        's_113': 'blood in urine',
        's_112': 'blood in stool',
        's_51': 'chest pain, diffuse',
        's_50': 'chest pain',
        's_53': 'back pain, lumbar',
        's_239': 'carbohydrate consumption',
        's_57': 'abdominal pain, reduced by defecation or relieving flatulence',
        's_234': 'bruises or petechiae',
        's_1269': 'aponeurotic reflex',
        's_1268': 'corneal reflex weak or absent',
        's_339': 'cold foods ease toothache',
        's_1509': 'chest pain, substernal',
        's_1502': 'achilles tendon hyper-reflexia',
        's_1501': 'anterior drawer sign',
        's_744': 'ascending muscle weakness',
        's_749': 'blood pressure fluctuation',
        's_436': 'anorectal pain',
        's_435': 'bladder not emptying completely',
        's_345': 'change in handwriting',
        's_346': 'change in color of a tooth',
        's_348': 'change in behavior, personality or mood',
        's_438': 'consciousness disturbances',
        's_1069': 'ascending paresthesias',
        's_26': 'articular edema and pain of both hands or feet',
        's_1212': 'conjunctival pallor',
        's_1340': 'absent or decreased knee reflex',
        's_1345': 'confusion',
        's_1187': 'abdominal pain, flare-ups and remissions',
        's_1184': 'coating on tongue',
        's_1189': 'back pain, flare-ups and remissions',
        's_137': 'binge eating attacks',
        's_135': 'cough, attacks',
        's_1281': 'clasp-knife spasticity',
        's_1528': 'abdominal pain, right upper quadrant',
        's_1283': 'cogwheel muscle rigidity',
        's_1119': 'bladder sphincter dysfunction',
        's_969': 'aphasia',
        's_1116': 'ascites',
        's_1111': 'adenoid face',
        's_818': 'alcohol withdrawal syndrome',
        's_720': 'avoiding talking to authority figures',
        's_36': 'chest pain radiating to neck',
        's_1207': 'abdominal pain, exacerbating after caffeine consumption',
        's_497': 'anisocoria',
        's_550': 'cataract',
        's_559': 'aggravated by emotional stress',
        's_1322': 'axillary or inguinal freckles',
        's_1321': 'cafe au lait macules are 15mm in diameter or larger',
        's_1328': 'color blindness',
        's_1202': 'abdominal pain, exacerbating during deep breath',
        's_1230': 'compensatory head tilt (in order to avoid diplopia)',
        's_152': 'bleeding after intercourse',
        's_159': 'back pain, exacerbating after physical exertion',
        's_508': 'anhedonia',
        's_651': 'ataxia',
        's_1195': 'abdominal pain, severe',
        's_373': 'blisters fester or dry to form honey-colored crust',
        's_374': 'blisters usually appearing around mouth or nose',
        's_1032': 'amusia',
        's_117': 'calf muscle spasms',
        's_1030': 'anomic aphasia',
        's_4': 'apathy',
        's_709': 'avoiding thoughts, feelings, conversations related to traumatic experience',
        's_383': 'change in skin lesion (enlargement, darkening, bleeding, itching)',
        's_6': 'appetite for salty foods',
        's_577': 'bony lumps near the affected joints',
        's_1205': 'back pain, lasting at least a few hours',
        's_477': 'aphonia',
        's_200': 'burning tongue',
        's_855': 'auscultative crackles over the thorax',
        's_209': 'broken capillaries',
        's_1258': 'chaddock sign',
        's_1552': 'bowel sounds, hyperactive, high-pitched',
        's_1558': 'abdominal guarding',
        's_670': 'cough, coughing ...',
        's_1257': 'bing sign',
        's_556': 'cold hands or fingers',
        's_276': 'clogged ear',
        's_277': 'abdominal distension',
        's_771': 'blunted affect',
        's_195': 'cigarette smoking',
        's_197': 'blisters or erosion on penis',
        's_1400': 'abdominal tenderness, lower',
        's_192': 'blepharoptosis',
        's_1019': 'allelomimetic behavior, allomimetic behavior',
        's_857': 'auscultative rales over the thorax',
        's_1010': 'apraxia',
        's_1011': 'bilateral limb apraxia',
        's_1012': 'agraphia',
        's_1013': 'buccofacial or orofacial apraxia',
        's_1490': 'chest pain radiating to left arm',
        's_46': 'chest pain lasting longer than 30 minutes',
        's_45': 'chest pain lasting 2 to 5 minutes',
        's_42': 'chest pain, exacerbating during movement',
        's_1272': 'allen-cleckley sign',
        's_1273': "cornell's sign",
        's_48': 'chest pain subsides during rest',
        's_582': 'anxiety (panic) attack',
        's_584': 'change in shape of a mole',
        's_585': 'change in color of a mole',
        's_588': 'alcohol tolerance',
        's_589': 'ceasing or limiting alcohol consumption',
        's_612': 'bone pain',
        's_610': 'coated tonsills',
        's_1084': 'atrophy of the interosseous muscles of the feet',
        's_1083': 'atrophy of the interosseous muscles of the hands',
        's_295': 'convulsions or headache preceded by olfactory hallucinations',
        's_429': 'clicking, popping, or grating sounds in the jaw joint when opening or closing th' +
                'e mouth',
        's_1072': 'absence of deep reflexes',
        's_1073': 'bilateral absence of achilles tendon reflex',
        's_1178': 'chest pain worsens on palpation',
        's_1170': 'bleeding into joints',
        's_833': 'agnosia',
        's_831': 'confabulation',
        's_1370': 'amenorrhea for at least 12 months',
        's_534': 'bradycardia',
        's_106': 'cough lasting over 8 weeks',
        's_329': 'constipation',
        's_103': 'cough lasting less than 3 weeks',
        's_240': 'constant severe toothache',
        's_1292': 'arthropathy',
        's_1293': 'abdominal tumor after pregnancy or the removal of molar pregnancy',
        's_1291': 'bilateral muscle paralysis',
        's_196': 'cigarette smoking during illness',
        's_1456': 'chorea',
        's_1457': 'amenorrhea',
        's_1458': 'amenorrhea, primary',
        's_1459': 'amenorrhea, secondary',
        's_1514': 'abdominal tenderness',
        's_884': 'agoraphobia',
        's_734': 'claudication in buttocks and/or thighs',
        's_736': 'ankle brachial index',
        's_635': 'contentiousness',
        's_402': 'blisters recurring after sun exposure, when lips are chapped, during infections ' +
                'or menstrual period',
        's_408': 'cold hands or fingers and feet',
        's_37': 'chest pain radiating between shoulder blades',
        's_1204': 'chest pain lasting at least a few hours',
        's_35': 'chest pain appearing during exertion',
        's_1206': 'back pain, subsides during rest',
        's_1200': 'chest pain, sudden',
        's_31': "chest pain doesn't subside after rest",
        's_30': 'chest pain increasing with deep breath or cough',
        's_499': 'contact lenses',
        's_817': 'alcohol craving',
        's_1': 'aphthous ulcers',
        's_3': 'activity related to sex despite negative consequences',
        's_1190': 'back pain',
        's_1192': 'back pain, severe',
        's_102': 'cough',
        's_1198': 'back pain, sudden',
        's_641': 'bowel incontinence',
        's_309': 'bloating',
        's_81': 'chills',
        's_303': 'compulsive behavior',
        's_1120': 'atonic bladder, flaccid bladder',
        's_1123': 'anhidrosis',
        's_1549': 'constipation, long lasting',
        's_869': 'club-foot',
        's_719': "avoiding eating in someone's presence",
        's_718': 'avoiding eating and drinking in public',
        's_717': 'avoiding public appearances',
        's_867': 'chvostek sign',
        's_710': 'avoiding actions, places or people that bring back memories of trauma',
        's_391': 'aggravated by humidity, heat',
        's_1330': 'cafe au lait macules',
        's_1546': 'cheyne-stokes respiration',
        's_18': 'abdominal pain, chronic',
        's_1228': 'convergent strabismus',
        's_15': 'abdominal pain, exacerbating during coughing or movement',
        's_14': 'abdominal pain, exacerbating on an empty stomach',
        's_17': 'abdominal pain, before menstrual period, cycle',
        's_1224': 'bone deformation',
        's_13': 'abdominal pain',
        's_12': 'abdominal pain, sudden',
        's_145': 'agitation',
        's_669': 'anhidrosis, face, unilateral',
        's_260': 'convulsions or headache accompanied or preceded by buzzing or whistling',
        's_368': 'burning during urination',
        's_1419': 'abnormal foveal avascular zone',
        's_1386': 'bleeding into muscles',
        's_1387': 'abdominal pain, epigastric',
        's_1028': 'auditory verbal agnosia',
        's_1026': 'bowel and bladder incontinence',
        's_1023': 'babinski sign',
        's_843': 'behavioral changes',
        's_842': 'behavior ignoring consequences and social norms',
        's_567': 'abdominal pain, right upper quadrant, exacerbated by deep inhalation',
        's_561': 'belching',
        's_211': 'childbirth',
        's_1310': 'brown nail discoloration',
        's_694': 'blisters and sores in the mouth',
        's_78': 'choking during sleep',
        's_71': 'black stools',
        's_1091': 'chemosis',
        's_1094': 'clearing the throat',
        's_609': 'breast tightness or pain',
        's_608': 'angular cheilitis',
        's_1197': 'chest pain, severe',
        's_288': 'close family or friends pointing out excessive drinking',
        's_769': 'bizarre delusion'
    };
    var diseases = [
        'calcification of the tympanic membrane',
        'constant need for sex',
        'burning skin',
        'alcohol-related amnesia',
        'abdominal pain, sharp, stabbing',
        'abdominal pain, increasing after a meal',
        'chest pain radiating to left shoulder',
        'cold sensitivity',
        'bleeding from anus',
        'blurred vision',
        'breast tenderness',
        'bleeding gums',
        'blood in urine',
        'blood in stool',
        'chest pain, diffuse',
        'chest pain',
        'back pain, lumbar',
        'carbohydrate consumption',
        'abdominal pain, reduced by defecation or relieving flatulence',
        'bruises or petechiae',
        'aponeurotic reflex',
        'corneal reflex weak or absent',
        'cold foods ease toothache',
        'chest pain, substernal',
        'achilles tendon hyper-reflexia',
        'anterior drawer sign',
        'ascending muscle weakness',
        'blood pressure fluctuation',
        'anorectal pain',
        'bladder not emptying completely',
        'change in handwriting',
        'change in color of a tooth',
        'change in behavior, personality or mood',
        'consciousness disturbances',
        'ascending paresthesias',
        'articular edema and pain of both hands or feet',
        'conjunctival pallor',
        'absent or decreased knee reflex',
        'confusion',
        'abdominal pain, flare-ups and remissions',
        'coating on tongue',
        'back pain, flare-ups and remissions',
        'binge eating attacks',
        'cough, attacks',
        'clasp-knife spasticity',
        'abdominal pain, right upper quadrant',
        'cogwheel muscle rigidity',
        'bladder sphincter dysfunction',
        'aphasia',
        'ascites',
        'adenoid face',
        'alcohol withdrawal syndrome',
        'avoiding talking to authority figures',
        'chest pain radiating to neck',
        'abdominal pain, exacerbating after caffeine consumption',
        'anisocoria',
        'cataract',
        'aggravated by emotional stress',
        'axillary or inguinal freckles',
        'cafe au lait macules are 15mm in diameter or larger',
        'color blindness',
        'abdominal pain, exacerbating during deep breath',
        'compensatory head tilt (in order to avoid diplopia)',
        'bleeding after intercourse',
        'back pain, exacerbating after physical exertion',
        'anhedonia',
        'ataxia',
        'abdominal pain, severe',
        'blisters fester or dry to form honey-colored crust',
        'blisters usually appearing around mouth or nose',
        'amusia',
        'calf muscle spasms',
        'anomic aphasia',
        'apathy',
        'avoiding thoughts, feelings, conversations related to traumatic experience',
        'change in skin lesion (enlargement, darkening, bleeding, itching)',
        'appetite for salty foods',
        'bony lumps near the affected joints',
        'back pain, lasting at least a few hours',
        'aphonia',
        'burning tongue',
        'auscultative crackles over the thorax',
        'broken capillaries',
        'chaddock sign',
        'bowel sounds, hyperactive, high-pitched',
        'abdominal guarding',
        'cough, coughing ...',
        'bing sign',
        'cold hands or fingers',
        'clogged ear',
        'abdominal distension',
        'blunted affect',
        'cigarette smoking',
        'blisters or erosion on penis',
        'abdominal tenderness, lower',
        'blepharoptosis',
        'allelomimetic behavior, allomimetic behavior',
        'auscultative rales over the thorax',
        'apraxia',
        'bilateral limb apraxia',
        'agraphia',
        'buccofacial or orofacial apraxia',
        'chest pain radiating to left arm',
        'chest pain lasting longer than 30 minutes',
        'chest pain lasting 2 to 5 minutes',
        'chest pain, exacerbating during movement',
        'allen-cleckley sign',
        "cornell's sign",
        'chest pain subsides during rest',
        'anxiety (panic) attack',
        'change in shape of a mole',
        'change in color of a mole',
        'alcohol tolerance',
        'ceasing or limiting alcohol consumption',
        'bone pain',
        'coated tonsills',
        'atrophy of the interosseous muscles of the feet',
        'atrophy of the interosseous muscles of the hands',
        'convulsions or headache preceded by olfactory hallucinations',
        'clicking, popping, or grating sounds in the jaw joint when opening or closing th' +
                'e mouth',
        'absence of deep reflexes',
        'bilateral absence of achilles tendon reflex',
        'chest pain worsens on palpation',
        'bleeding into joints',
        'agnosia',
        'confabulation',
        'amenorrhea for at least 12 months',
        'bradycardia',
        'cough lasting over 8 weeks',
        'constipation',
        'cough lasting less than 3 weeks',
        'constant severe toothache',
        'arthropathy',
        'abdominal tumor after pregnancy or the removal of molar pregnancy',
        'bilateral muscle paralysis',
        'cigarette smoking during illness',
        'chorea',
        'amenorrhea',
        'amenorrhea, primary',
        'amenorrhea, secondary',
        'abdominal tenderness',
        'agoraphobia',
        'claudication in buttocks and/or thighs',
        'ankle brachial index',
        'contentiousness',
        'blisters recurring after sun exposure, when lips are chapped, during infections ' +
                'or menstrual period',
        'cold hands or fingers and feet',
        'chest pain radiating between shoulder blades',
        'chest pain lasting at least a few hours',
        'chest pain appearing during exertion',
        'back pain, subsides during rest',
        'chest pain, sudden',
        "chest pain doesn't subside after rest",
        'chest pain increasing with deep breath or cough',
        'contact lenses',
        'alcohol craving',
        'aphthous ulcers',
        'activity related to sex despite negative consequences',
        'back pain',
        'back pain, severe',
        'cough',
        'back pain, sudden',
        'bowel incontinence',
        'bloating',
        'chills',
        'compulsive behavior',
        'atonic bladder, flaccid bladder',
        'anhidrosis',
        'constipation, long lasting',
        'club-foot',
        "avoiding eating in someone's presence",
        'avoiding eating and drinking in public',
        'avoiding public appearances',
        'chvostek sign',
        'avoiding actions, places or people that bring back memories of trauma',
        'aggravated by humidity, heat',
        'cafe au lait macules',
        'cheyne-stokes respiration',
        'abdominal pain, chronic',
        'convergent strabismus',
        'abdominal pain, exacerbating during coughing or movement',
        'abdominal pain, exacerbating on an empty stomach',
        'abdominal pain, before menstrual period, cycle',
        'bone deformation',
        'abdominal pain',
        'abdominal pain, sudden',
        'agitation',
        'anhidrosis, face, unilateral',
        'convulsions or headache accompanied or preceded by buzzing or whistling',
        'burning during urination',
        'abnormal foveal avascular zone',
        'bleeding into muscles',
        'abdominal pain, epigastric',
        'auditory verbal agnosia',
        'bowel and bladder incontinence',
        'babinski sign',
        'behavioral changes',
        'behavior ignoring consequences and social norms',
        'abdominal pain, right upper quadrant, exacerbated by deep inhalation',
        'belching',
        'childbirth',
        'brown nail discoloration',
        'blisters and sores in the mouth',
        'choking during sleep',
        'black stools',
        'chemosis',
        'clearing the throat',
        'breast tightness or pain',
        'angular cheilitis',
        'chest pain, severe',
        'close family or friends pointing out excessive drinking',
        'bizarre delusion'
    ];

    /** Can add probablility Models Later to determine best diseases*/
    function findPossibleDiseases(keywords) {

        var possibleDiseases = [];

        diseases.forEach((disease)=>{
            keywords.forEach((word)=>{
                if( disease.includes(word) > 0){
                    if( possibleDiseases.includes(disease) <= 0 )
                        possibleDiseases.push(disease);
                }
            });
        });
        if (possibleDiseases.length > 0) {
            possibleDiseases = possibleDiseases.filter(function (item, index, inputArray) {
                return inputArray.indexOf(item) == index;
            });
        }
        return possibleDiseases;
    }

    function getSymptomId(possibleDiseases) {
        var symptomId = [];
        let i = 0;
        possibleDiseases.forEach((disease)=>{
            //if disease == symptom[key]
            //then push
            for(var id in symptoms){
                if(symptoms[id].includes(disease) > 0)
                    symptomId.push(id);
            }
        });
        return symptomId;
    }

    function extractKeyword(sentence) {
        // console.log(`Sentancewa: ${sentence}`);
        let keywords = [];
        //split space here!
        sentence = sentence.split(' ');
        //filter stop list
        sentence.forEach((parsed_word)=>{
            if(stopList.includes(parsed_word) <= 0)
                keywords.push(parsed_word)
        });
        //check for diseases
        let finalKeyWords = [];
        keywords.forEach((word)=>{
            diseases.forEach((disease)=>{
                if(disease.includes(word) > 0){
                    if(finalKeyWords.includes(word) <= 0)
                        finalKeyWords.push(word);
                }      
            });
        });
        console.log(`final keywords: ${finalKeyWords}`);
        return finalKeyWords;
    }

    const generatePayload = (sids) => {
        if(sids !== undefined){
            let payload = {
                'sex': 'male',
                'age': '28'
            };
            let listOfSymptoms = [];
            sids.forEach((sid)=>{
                let temp = {
                    'choice_id': 'present' 
                };
                temp['id'] = sid;
                listOfSymptoms.push(temp);
            });
            payload['evidence'] = listOfSymptoms;
            return payload;
        }
    };

})();