(function($) {

    function toggleChatWindow() {
      var chatWindow = document.getElementById("openai-chat-window");
      chatWindow.style.display = chatWindow.style.display === "none" ? "block" : "none";
    }
    
    // Load Font Awesome icons
    function loadFontAwesomeIcons() {
      $('<link>').appendTo('head').attr({
          type: 'text/css',
          rel: 'stylesheet',
          href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css'
      });
    }   
    
    loadFontAwesomeIcons(); // Load icons
    
    var icon_src = 'https://rso-amsterdam.com/wp-content/uploads/2023/06/rsoamsterdam_logo.png';
    
    // // Create chat icon.
    // var icon = $('<div id="openai-chat-icon"><img src="/img/rsoamsterdam_logo.jpg" alt="Chat Icon"></div>');
    // $('body').append(icon);
    
    
    // // Create chat icon.
    var icon = $('<div id="openai-chat-icon"></div>');
    $('body').append(icon);
    
    // Set the chat window icon
    $('#openai-chat-icon').css({
    'background-image': 'url(' + icon_src + ')',
    'background-repeat': 'no-repeat',
    'background-position': 'center center',
    'background-size': 'cover'
    });
    
    // Create chat window.
    var chatWindowElement = $('<div id="openai-chat-window">' +
    '<div id="openai-chat-header">' + 'Chat' +'  </div>' +
    '<button id="back-button">Go Back</button>' +
    // '<p id="category-title6" style="margin-block-start:0px;margin-top:0px;font-size:80%;"><i>(Takes a few seconds, please be patient)</i></p>' +
    '<div id="language-buttons">'+
        '<button class="language-button" data-lang="en">English</button>'+
        '<button class="language-button" data-lang="fr">FRA</button>'+
        '<button class="language-button" data-lang="de">DE</button>'+
        '<button class="language-button" data-lang="pl">PL</button>'+
        '<button class="language-button" data-lang="it">ITA</button>'+
        '<button class="language-button" data-lang="hr">HR</button>'+
        '<button class="language-button" data-lang="swe">SWE</button>'+
        '<button class="language-button" data-lang="nor">NOR</button>'+
        '<button class="language-button" data-lang="es">ES</button>'+
        '<button class="language-button" data-lang="pt">PT</button>'+
        '<button class="language-button" data-lang="bg">BG</button>'+
        '<button class="language-button" data-lang="ro">RO</button>'+
    '</div>'+
    // '<div id="openai-chat-body"><button id="back-button">Go Back</button><b>   Select a category:</b> </div>' +
    '<div id="openai-chat-body"></div>' +
    
    '<div id="openai-chat-input-container">' +
    
    '<input type="text" id="openai-chat-input" placeholder='+'"' + 'Type your question...' +'"'+ '>' +
    '<button id="openai-chat-submit"><i class="fas fa-angle-right"></i></button>' +
    '</div>' +
    '</div>');
    $('body').append(chatWindowElement);
    
    $('#openai-chat-window').hide(); // Hide chat window initially
    
    
    
    
    // Add an event listener for the Enter key.
    $("#openai-chat-input").on("keydown", function(event) {
      if (event.key === "Enter" || event.keyCode === 13) {
          event.preventDefault();
          $("#openai-chat-submit").click();
      }
    });
    
    
    // Change window header color
    const headerElement = document.getElementById('openai-chat-header');
    // headerElement.style.backgroundColor = windowheadercolor;
    
    
    // Create close button.
    // var closeButton = $('<div id="openai-chat-close"><img src="close-icon.png" alt="Close"></div>');
    var closeButton = $('<div id="openai-chat-close"><i class="far fa-window-close"></i></div>');
    $('#openai-chat-header').after(closeButton);
    
    
    
    
    
    
    // Show chat window when chat icon is clicked.
    $('#openai-chat-icon').click(function() {
      $('#openai-chat-window').show(); // Show chat window
      $(this).hide(); // Hide the chat icon
    });
    
    // Hide chat window when close button is clicked.
    $('#openai-chat-close').click(function() {
      $('#openai-chat-window').hide(); // Hide chat window
      $('#openai-chat-icon').show(); // Show the chat icon
    });
    
    /// message notification element
    var notification = $('<div id="openai-chat-notification">1</div>');
    $('#openai-chat-icon').append(notification);
    
    /// TIMER CHAT POPUP
    setTimeout(function() {
      $('#openai-chat-icon').css('display', 'block');
    }, 1000); 
    
    $('#openai-chat-icon').click(function() {
      $('#openai-chat-window').show(); // Show chat window
      $(this).hide(); // Hide the chat icon
      $('#openai-chat-notification').hide(); // Hide the new message notification
    });
    
    
    function addChatbotMessage(message) {
      var chatBody = $("#openai-chat-body");
    //   chatBody.append('<div class="chatbot-message message-item"><strong>Chatbot:</strong> ' + message + '</div>'    
        chatBody.append('<div class="chatbot-message message-item">' + message + '</div>'    
      );
    }
    
    // Back button2
    $('#openai-chat-window').on('click', '#back-button', function() {
        $(".message-item").remove();
        // selectedCategory ='';
        $('#openai-question2').hide(); // Hide the input
        $('#openai-chat-input-container').hide();
        // $('#shorcode_input_block').hide();
        $('#openai-category-container').show(); // Show the category container
        $(this).hide(); // Hide the back button
      });
      
    
    
    
    
    
    ///
    /// CATEGORY MENU -----------------------------------
    ///
    
    // Create category container.
    var categoryContainer = $('<div id="openai-category-container" class="category-container"><b>   Select a category:</b></div>');
    // Create unordered list for the buttons.
    var categoryList = $('<ul class="category-list"></ul>');
    
    // Create buttons for each category.
    // var generalButton = $('<button class="category-button" value="knowledge_uk.txt">General Product Inquiry</button>');
    // var dosageButton = $('<button class="category-button" value="knowledge_dosage.txt">Dosage</button>');
    // var upsButton = $('<button class="category-button" value="knowledge_ups.txt">UPS Shipping</button>');
    // var payButton = $('<button class="category-button" value="knowledge_payment.txt">Payment</button>');
    // var parcelButton = $('<button class="category-button" value="knowledge_parcel.txt">Parcel Status</button>');
    // var humanButton = $('<button id="live-chat-button" class="category-button" value="human">Chat with human</button>');
    // var whatsappButton = $('<button id="live-chat-button2" class="category-button" value="whatsapp">WhatsApp</button>');
    
    // Append buttons to the category container.
    // categoryContainer.append(generalButton, dosageButton, upsButton, payButton, parcelButton, humanButton, whatsappButton);
    
    
    // Create list items for each category button.
    var generalButton = $('<li><button class="category-button" value="knowledge_uk.txt">General Product Inquiry</button></li>');
    var dosageButton = $('<li><button class="category-button" value="knowledge_dosage.txt">Dosage</button></li>');
    var upsButton = $('<li><button class="category-button" value="knowledge_ups.txt">UPS Shipping</button></li>');
    var payButton = $('<li><button class="category-button" value="knowledge_payment.txt">Payment</button></li>');
    var parcelButton = $('<li><button class="category-button" value="knowledge_parcel.txt">Parcel Status</button></li>');
    var humanButton = $('<li><button id="live-chat-button" class="category-button" value="human">Chat with human</button></li>');
    var whatsappButton = $('<li><button id="live-chat-button2" class="category-button" value="whatsapp">WhatsApp</button></li>');
    
    
    // Append list items to the category list.
    categoryList.append(generalButton, dosageButton, upsButton, payButton, parcelButton, humanButton, whatsappButton);
    
    // Append the category list to the category container.
    categoryContainer.append(categoryList);
    
    
    // Append the category container to the chat window.
    $('#openai-chat-body').append(categoryContainer);
    
    
    
    // // Initially hide the chat input
    $('#openai-chat-input-container').hide();
    $('#shorcode_input_block').hide();
    
    
    var selectedCategory; // Declare a global variable to hold the selected category
    
    // When a category button is clicked...
    $('.category-button').click(function() {
      selectedCategory = $(this).val(); // Store the value of the clicked button
      $('#openai-chat-input-container').show(); // Show the chat input
      $('#openai-question2').show(); // Show the input
      $('#shorcode_input_block').show();
      categoryContainer.hide();
      $('#back-button').show(); // Show the back button
    
      $('.category-button').removeClass('highlighted-category'); // Remove the class from all category buttons
      $(this).addClass('highlighted-category'); // Add the class to the clicked button
    
    
      conversationHistory = []; // Reset the conversation history
    
      if (selectedCategory === 'human') { // Don't send a message to chatbot if "Chat with human" was selected
          addChatbotMessage("You will be connected to a human operator");
          window.open('https://tawk.to/chat/57e298eb0814cc34e16e28f7/default', '_blank');
      }
      if (selectedCategory === 'whatsapp') { // Don't send a message to chatbot if "Chat with human" was selected
        addChatbotMessage("You will be connected to WhatsApp");
        window.open("https://wa.me/31645800130?text=I'm%20interested%20in%20your%20products,%20can%20I%20receive%20more%20information?", '_blank');
        }
      else {
    //   addChatbotMessage('<p id="category-title5">Please ask your question to our AI assistent (It can take a few seconds, please be patient)</p>');
      addChatbotMessage('<p id="category-title5">' + translations[currentLanguage]['categoryTitle5'] + '</p>');
    }
    });
    
    
    
    // $('#live-chat-button').click(function() {
    //   window.open('https://tawk.to/chat/57e298eb0814cc34e16e28f7/default', '_blank');
    //   $("#back-button").click();
    // });
    
    
    
    
    let conversationHistory = [];
    
    
    
    
    //
    // LANGUAGUE
    //
    const translations = {
        en: {
            'knowledge_uk.txt': 'General Product Inquiry',
            'knowledge_dosage.txt': 'Dosage',
            'knowledge_ups.txt':'UPS Shipping',
            'knowledge_payment.txt':'Payment',
            'knowledge_parcel.txt':'Parcel Status',
            'human':'Chat with human',
            'whatsapp':'Whatsapp',
            "categoryTitle": "Select a category:",
            "categoryTitle2": "(This allows for best results)",
            "categoryTitle3": "Ask a question:",
            "categoryTitle4": "(It can take a few seconds, please be patient)",
            "categoryTitle5": "Please ask your question to our AI assistent (It can take a few seconds, please be patient)",
            "placeholderText": "Type your question...",
            "askButton": "Ask"
        },
        fr: {
            'knowledge_uk.txt': 'Demande de produit générale',
            'knowledge_dosage.txt': 'Posologie',
            'knowledge_ups.txt':'Expédition UPS',
            'knowledge_payment.txt':'Paiement',
            'knowledge_parcel.txt':'Statut du colis',
            'human':'Chatter avec une personne',
            'whatsapp':'Whatsapp',
            "categoryTitle": "Choisissez une catégorie :",
            "categoryTitle2": "(Cela permet d'obtenir les meilleurs résultats)",
            "categoryTitle3": "Posez une question :",
            "categoryTitle4": "(Cela peut prendre quelques secondes, veuillez patienter)",
            "categoryTitle5": "Veuillez poser votre question à notre assistant AI (Cela peut prendre quelques secondes, veuillez patienter)",
            "placeholderText": "Tapez votre question...",
            "askButton": "Demander"
        },
        de: {
            'knowledge_uk.txt': 'Allgemeine Produktanfrage',
            'knowledge_dosage.txt': 'Dosierung',
            'knowledge_ups.txt':'UPS Versand',
            'knowledge_payment.txt':'Zahlung',
            'knowledge_parcel.txt':'Paketstatus',
            'human':'Chat mit Mensch',
            'whatsapp':'Whatsapp',
            "categoryTitle": "Wählen Sie eine Kategorie:",
            "categoryTitle2": "(Es ermöglicht die besten Ergebnisse)",
            "categoryTitle3": "Stellen Sie eine Frage:",
            "categoryTitle4": "(Es kann einige Sekunden dauern, bitte haben Sie Geduld)",
            "categoryTitle5": "Bitte stellen Sie Ihre Frage an unseren AI-Assistenten (Es kann einige Sekunden dauern, bitte haben Sie Geduld)",
            "placeholderText": "Geben Sie Ihre Frage ein...",
            "askButton": "Fragen"
        },
        pl: {
            'knowledge_uk.txt': 'Ogólne zapytanie o produkt',
            'knowledge_dosage.txt': 'Dawkowanie',
            'knowledge_ups.txt': 'Wysyłka UPS',
            'knowledge_payment.txt': 'Płatność',
            'knowledge_parcel.txt': 'Status przesyłki',
            'human': 'Czat z człowiekiem',
            'whatsapp': 'WhatsApp',
            "categoryTitle": "Wybierz kategorię:",
            "categoryTitle2": "(To pozwala na uzyskanie najlepszych wyników)",
            "categoryTitle3": "Zadaj pytanie:",
            "categoryTitle4": "(Może to zająć kilka sekund, proszę o cierpliwość)",
            "categoryTitle5": "Zadaj pytanie naszemu asystentowi AI (Może to zająć kilka sekund, proszę o cierpliwość)",
            "placeholderText": "Wpisz swoje pytanie...",
            "askButton": "Zapytaj"
        },
        it: {
            'knowledge_uk.txt': 'Richiesta generale sul prodotto',
            'knowledge_dosage.txt': 'Dosaggio',
            'knowledge_ups.txt':'Spedizione UPS',
            'knowledge_payment.txt':'Pagamento',
            'knowledge_parcel.txt':'Stato del pacco',
            'human':'Chat con un umano',
            'whatsapp':'Whatsapp',
            "categoryTitle": "Seleziona una categoria:",
            "categoryTitle2": "(Questo permette di ottenere i migliori risultati)",
            "categoryTitle3": "Fai una domanda:",
            "categoryTitle4": "(Potrebbe richiedere qualche secondo, per favore sii paziente)",
            "categoryTitle5": "Fai la tua domanda al nostro assistente AI (Potrebbe richiedere qualche secondo, per favore sii paziente)",
            "placeholderText": "Scrivi la tua domanda...",
            "askButton": "Chiedi"
        },
        hr: {
            'knowledge_uk.txt': 'Opća upit o proizvodu',
            'knowledge_dosage.txt': 'Doziranje',
            'knowledge_ups.txt':'Slanje putem UPS-a',
            'knowledge_payment.txt':'Plaćanje',
            'knowledge_parcel.txt':'Status paketa',
            'human':'Razgovarajte sa pravim čovjekom',
            'whatsapp':'Whatsapp',
            "categoryTitle": "Odaberite kategoriju:",
            "categoryTitle2": "(Ovo omogućuje najbolje rezultate)",
            "categoryTitle3": "Postavite pitanje:",
            "categoryTitle4": "(Može potrajati nekoliko sekundi, molimo budite strpljivi)",
            "categoryTitle5": "Postavite svoje pitanje našem AI-asistentu (Može potrajati nekoliko sekundi, molimo budite strpljivi)",
            "placeholderText": "Upišite svoje pitanje...",
            "askButton": "Pitaj"
        },
        swe: {
            'knowledge_uk.txt': 'Allmän produktförfrågan',
            'knowledge_dosage.txt': 'Dosering',
            'knowledge_ups.txt':'UPS Frakt',
            'knowledge_payment.txt':'Betalning',
            'knowledge_parcel.txt':'Paketstatus',
            'human':'Chatta med en person',
            'whatsapp':'Whatsapp',
            "categoryTitle": "Välj en kategori:",
            "categoryTitle2": "(Detta ger bäst resultat)",
            "categoryTitle3": "Ställ en fråga:",
            "categoryTitle4": "(Det kan ta några sekunder, ha tålamod)",
            "categoryTitle5": "Ställ gärna din fråga till vår AI-assistent (Det kan ta några sekunder, ha tålamod)",
            "placeholderText": "Skriv din fråga...",
            "askButton": "Fråga"
        },
        nor: {
            'knowledge_uk.txt': 'Generelle produktforespørsler',
            'knowledge_dosage.txt': 'Dosering',
            'knowledge_ups.txt':'UPS-frakt',
            'knowledge_payment.txt':'Betaling',
            'knowledge_parcel.txt':'Pakkestatus',
            'human':'Chat med et menneske',
            'whatsapp':'Whatsapp',
            "categoryTitle": "Velg en kategori:",
            "categoryTitle2": "(Dette gir best resultat)",
            "categoryTitle3": "Still et spørsmål:",
            "categoryTitle4": "(Det kan ta noen sekunder, vær tålmodig)",
            "categoryTitle5": "Vennligst still spørsmålet ditt til vår AI-assistent (Det kan ta noen sekunder, vær tålmodig)",
            "placeholderText": "Skriv spørsmålet ditt...",
            "askButton": "Spør"
        },
        es: {
            'knowledge_uk.txt': 'Consulta general sobre el producto',
            'knowledge_dosage.txt': 'Dosis',
            'knowledge_ups.txt':'Envío por UPS',
            'knowledge_payment.txt':'Pago',
            'knowledge_parcel.txt':'Estado del paquete',
            'human':'Chatear con un representante',
            'whatsapp':'WhatsApp',
            "categoryTitle": "Seleccione una categoría:",
            "categoryTitle2": "(Esto permite obtener mejores resultados)",
            "categoryTitle3": "Realizar una pregunta:",
            "categoryTitle4": "(Puede tardar unos segundos, por favor, tenga paciencia)",
            "categoryTitle5": "Por favor, haga su pregunta a nuestro asistente de AI (Puede tardar unos segundos, por favor, tenga paciencia)",
            "placeholderText": "Escriba su pregunta...",
            "askButton": "Enviar"
        },
        pt: {
            'knowledge_uk.txt': 'Consulta geral de produtos',
            'knowledge_dosage.txt': 'Dosagem',
            'knowledge_ups.txt':'Envio UPS',
            'knowledge_payment.txt':'Pagamento',
            'knowledge_parcel.txt':'Status do Pacote',
            'human':'Chat com atendente',
            'whatsapp':'WhatsApp',
            "categoryTitle": "Selecione uma categoria:",
            "categoryTitle2": "(Isso permite obter melhores resultados)",
            "categoryTitle3": "Faça uma pergunta:",
            "categoryTitle4": "(Pode levar alguns segundos, por favor, seja paciente)",
            "categoryTitle5": "Por favor, faça sua pergunta ao nosso assistente de IA (Pode levar alguns segundos, por favor, seja paciente)",
            "placeholderText": "Digite sua pergunta...",
            "askButton": "Enviar"
        },
        bg: {
            'knowledge_uk.txt': 'Общи въпроси за продукта',
            'knowledge_dosage.txt': 'Дозировка',
            'knowledge_ups.txt':'Доставка с UPS',
            'knowledge_payment.txt':'Плащане',
            'knowledge_parcel.txt':'Статус на пратката',
            'human':'Разговор с оператор',
            'whatsapp':'WhatsApp',
            "categoryTitle": "Изберете категория:",
            "categoryTitle2": "(Това осигурява най-добри резултати)",
            "categoryTitle3": "Задайте въпрос:",
            "categoryTitle4": "(Може да отнеме няколко секунди, моля, бъдете търпеливи)",
            "categoryTitle5": "Моля, задайте въпроса си на нашия AI асистент (Може да отнеме няколко секунди, моля, бъдете търпеливи)",
            "placeholderText": "Въведете своя въпрос...",
            "askButton": "Задай"
        },
        ro: {
            'knowledge_uk.txt': 'Informații generale despre produs',
            'knowledge_dosage.txt': 'Dozare',
            'knowledge_ups.txt':'Livrare UPS',
            'knowledge_payment.txt':'Plată',
            'knowledge_parcel.txt':'Stare colet',
            'human':'Discută cu un operator',
            'whatsapp':'Whatsapp',
            "categoryTitle": "Selectați o categorie:",
            "categoryTitle2": "(Aceasta permite obținerea celor mai bune rezultate)",
            "categoryTitle3": "Puneți o întrebare:",
            "categoryTitle4": "(Procesarea poate dura câteva secunde, vă rugăm să aveți răbdare)",
            "categoryTitle5": "Vă rugăm să puneți întrebarea dumneavoastră asistentului nostru AI (Procesarea poate dura câteva secunde, vă rugăm să aveți răbdare)",
            "placeholderText": "Tastați întrebarea dumneavoastră...",
            "askButton": "Întreabă"
            },
    };
    
    let currentLanguage = 'bg'; // Set a default language
    
    
    $('.language-button').click(function() {
        currentLanguage = $(this).data('lang');
        updateTranslations();
    });
    
    function updateTranslations() {
        // Update the category buttons
        $('.category-button').each(function() {
            const category = $(this).val();
            $(this).text(translations[currentLanguage][category]);
        });
    
        $('#category-title').text(translations[currentLanguage]['categoryTitle']);
        $('#category-title2').text(translations[currentLanguage]['categoryTitle2']);
        $('#category-title3').text(translations[currentLanguage]['categoryTitle3']);
        $('#category-title4').text(translations[currentLanguage]['categoryTitle4']);
        $('#category-title5').text(translations[currentLanguage]['categoryTitle5']);
        $('#openai-question2').attr("placeholder", translations[currentLanguage]['placeholderText']);
        $('#openai-chat-input').attr("placeholder", translations[currentLanguage]['placeholderText']);
        $('.ask-button').text(translations[currentLanguage]['askButton']);
        
    
    }
    
    $('.language-button').click(function() {
        // Remove 'selected' class from all language buttons
        $('.language-button').removeClass('selected');
    
        // Add 'selected' class to the clicked button
        $(this).addClass('selected');
    
        // Switch the language
        currentLanguage = $(this).attr('data-lang');
        updateTranslations();
    });
    
    
    
    
    
    
    
    async function handleQuestion(questionElement, answerElement) {
        var question = $(questionElement).val();
        if (question.trim() === '') {
            return;
        }
        
        // Check if the selected language is French
        if (currentLanguage === 'fr') {
            // Append "answer in french" to the question
            question += " (answer in french)";
        }
        if (currentLanguage === 'de') {
            // Append "answer in french" to the question
            question += " (answer in german)";
        }
        if (currentLanguage === 'pl') {
            // Append "answer in french" to the question
            question += " (answer in polish)";
        }
        if (currentLanguage === 'it') {
            // Append "answer in french" to the question
            question += " (answer in italian)";
        }
        if (currentLanguage === 'hr') {
            // Append "answer in french" to the question
            question += " (answer in croatian)";
        }
        if (currentLanguage === 'swe') {
            // Append "answer in french" to the question
            question += " (answer in swedish)";
        }
        if (currentLanguage === 'es') {
            // Append "answer in french" to the question
            question += " (answer in spanish)";
        }
        if (currentLanguage === 'pt') {
            // Append "answer in french" to the question
            question += " (answer in portuguese)";
        }
        if (currentLanguage === 'nor') {
            // Append "answer in french" to the question
            question += " (answer in Norweigian)";
        }
        if (currentLanguage === 'bg') {
            // Append "answer in french" to the question
            question += " (answer in Bulgarian)";
        }
        if (currentLanguage === 'ro') {
            // Append "answer in french" to the question
            question += " (answer in Romanian)";
        }
    
        // Clear the textarea
        $(questionElement).val('');
    
        // Append user's question to chat window
        $(answerElement).append('<div class="user-question message-item"><strong>You:</strong> ' + question + '</div>');
        
        // Append the new question to the conversation history and keep only the last 4 messages
        conversationHistory.push('\n\nCustomer: ' + question);
        if (conversationHistory.length > 4) {
            conversationHistory.shift(); // Remove the oldest message
        }
        // console.log("After adding user's message: ", conversationHistory);
    
        if (selectedCategory === 'human') {
    
            '<a href="https://tawk.to/chat/57e298eb0814cc34e16e28f7/default" target="_blank">Open Chat</a>'
            
            return;
        }
    
    
    
    
        var userIPAddress; // Declare variable here
    
        var ipifyURL = 'https://api.ipify.org/?format=json';
        try {
            let response = await fetch(ipifyURL);
            let data = await response.json();
            userIPAddress = data.ip; // Assign value here
            // console.log("User's IP address: " + userIPAddress);
        } catch (error) {
            console.error('Error getting IP address:', error);
        }
    
        var knowledgeURL = 'https://raw.githubusercontent.com/medanticancerbelievescotland/knowledge/main/' + selectedCategory;
        
        
    
    
        // console.log(knowledgeURL)
        
        function submitFormWithIframe(formData) {
            var iframeId = 'hidden-iframe';
            var iframe = document.getElementById(iframeId);
        
            if (!iframe) {
                iframe = document.createElement('iframe');
                iframe.setAttribute('id', iframeId);
                iframe.setAttribute('name', iframeId);
                iframe.setAttribute('style', 'display:none;');
                document.body.appendChild(iframe);
            }
        
            var form = document.createElement('form');
            form.setAttribute('action', 'https://docs.google.com/forms/d/e/1FAIpQLScKCWB7vjUtmDysnlzWTnb-GPlW9v7J2T6e6np5YzIUAaksXQ/formResponse');
            form.setAttribute('method', 'post');
            form.setAttribute('target', iframeId);
        
            for (var key in formData) {
                var input = document.createElement('input');
                input.setAttribute('type', 'hidden');
                input.setAttribute('name', key);
                input.setAttribute('value', formData[key]);
                form.appendChild(input);
            }
        
            document.body.appendChild(form);
            form.submit();
            document.body.removeChild(form);
        }
    
    
        // Default max tokens
        let max_tokens = 250;
    
        switch(selectedCategory){
            case "knowledge_dosage.txt":
            max_tokens = 400;
            break;
            case "knowledge_ups.txt":
            max_tokens = 400;
            break;
            case "knowledge_payment.txt":
            max_tokens = 300;
            break;
            default:
            max_tokens = 250;
        }
    
    
        $.get(knowledgeURL)
            .then(function(data) {
                var knowledge = data;
    
                    // Add the knowledge to the start of the conversation history
                    conversationHistory.unshift('Knowledge: ' + knowledge);
                    if (conversationHistory.length > 4) {
                        conversationHistory.shift(); // Remove the oldest message if limit is exceeded
                    }
                    console.log("After adding knowledge: ", conversationHistory);
    
                    // AWS Lambda function
                    axios.get('https://645mpywm55.execute-api.us-east-2.amazonaws.com/default/openai')
                        .then(response => {
                            const api_key = response.data.apiKey; 

                    

                            var prompt = conversationHistory.join('\n') + '\n\n###\n\n';
                            prompt = conversationHistory.join('\n') + "\n\n###\n\n";
            
                            if (prompt.length > 10000) {
                                conversationHistory = [];
                                // prompt = '';
                                prompt = knowledge + "\n\nCustomer: " + question + "\n\n###\n\n";
                                console.log('Prompt length exceeded 10000, conversation history cleared');
                                
                            }
            
                            $.ajax({
                                url: 'https://api.openai.com/v1/completions',
                                type: 'POST',
                                dataType: 'json',
                                contentType: 'application/json',
                                data: JSON.stringify({
                                    model: 'text-davinci-003',
                                    // prompt: knowledge + "\n\nCustomer: " + question + "\n\n###\n\n",
                                    // prompt: conversationHistory.join('\n') + "\n\n###\n\n",
                                    prompt: prompt,
                                    // max_tokens: 200,
                                    max_tokens: max_tokens,
                                    n: 1,
                                    stop: ["###"],
                                    temperature: 0.7,
                                }),
                                beforeSend: function(xhr) {
                                    xhr.setRequestHeader('Authorization', 'Bearer ' + api_key);
                                    // $(answerElement).append('<div class="loading">Fetching answer...</div>');
                                    $(answerElement).append('<div class="loading"><img src="https://rso-amsterdam.com/wp-content/uploads/2023/06/Spinner-1s-54px.gif"> Fetching answer...</div>');
            
                                },
                                success: function(response) {
                                    
                                    // Append chatbot's answer to the conversation history
                                    // conversationHistory.push('Chatbot: ' + response.choices[0].text);
                                    conversationHistory.push(response.choices[0].text);
                                    if (conversationHistory.length > 5) {
                                        conversationHistory.shift(); // Remove the oldest message if limit is exceeded
                                    }
                                    console.log("After adding bot's message: ", conversationHistory);
                                    
                                    $('.loading').remove();
                                    if (response.choices && response.choices[0] && response.choices[0].text) {
                                        // $(answerElement).append('<div class="question-answer"><strong>Question:</strong> ' + question + '<br><strong>Answer:</strong> ' + response.choices[0].text + '</div><hr>');
                                        $(answerElement).append('<div class="question-answer"><strong>Answer:</strong> ' + response.choices[0].text + '</div><hr>');
            
                                        // Submit the form
                                        var googleFormUrl = 'https://docs.google.com/forms/d/e/1FAIpQLScKCWB7vjUtmDysnlzWTnb-GPlW9v7J2T6e6np5YzIUAaksXQ/formResponse';
                                        var formData = {
                                            'entry.1756074812': userIPAddress,
                                            'entry.1730721760': 'BG',
                                            'entry.1671179205': question,
                                            'entry.247513797': response.choices[0].text
                                        };
                                        
                                        /// submit forms
                                        submitFormWithIframe(formData);
                                    } else {
                                        $(answerElement).append('<div class="error"><strong>Error:</strong> Unable to fetch answer.</div><hr>');
                                    }
                                },
                                error: function() {
                                    $('.loading').remove();
                                    $(answerElement).append('<div class="error"><strong>Error:</strong> Unable to fetch answer.</div><hr>');
                                },
                            });

                        })
                        .catch(error => {
                            console.error("Error fetching API key: ", error);
                        });



                        
                    // });
                        
                })
    
    
    }
    
    jQuery(document).ready(function($) {
    
        
        
    
      // Upper chatbox
      $('#openai-submit').on('click', function() {
        $('#openai-chat-body').append('<div class="loading"><img src="https://rso-amsterdam.com/wp-content/uploads/2023/06/Spinner-1s-54px.gif"> Fetching answer...</div>');
        handleQuestion('#openai-question', '#openai-answer');
      });
    
      // Chat window
      $("#openai-chat-input").on("keydown", function(event) {
          if (event.keyCode === 13) {
              event.preventDefault();
              $("#openai-chat-submit").click();
          }
      });
    
      $("#openai-chat-submit").on("click", function() {
          handleQuestion('#openai-chat-input', '#openai-chat-body');
      });
      
    
    
        // Shortcode chat window
        $("#openai-submit2").on("click", function() {
            $('#openai-chat-body').append('<div class="loading"><img src="https://rso-amsterdam.com/wp-content/uploads/2023/06/Spinner-1s-54px.gif"> Fetching answer...</div>');
            handleQuestion('#openai-question2', '#openai-answer2');
        });
    
    
    
    
        updateTranslations();
    
    
    });
    
    
    })( jQuery ); // End of use strict
    
    
    
    
    
    
    
    
