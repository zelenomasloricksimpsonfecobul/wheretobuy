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

var icon_src = 'https://static.vecteezy.com/system/resources/previews/018/764/128/original/chatgpt-logo-open-ai-icon-with-chatbot-artificial-intelligence-openai-chatbot-icon-chatgpt-openai-icon-artificial-intelligence-smart-ai-virtual-smart-assistant-bot-free-vector.jpg';

// Create chat icon.
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
'<div id="openai-chat-header">' + 'Chat' +'</div>' +
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

setTimeout(function() {
    $('#openai-chat-icon').css('display', 'block');
}, 10000);

$('#openai-chat-icon').click(function() {
    $('#openai-chat-window').show(); // Show chat window
    $(this).hide(); // Hide the chat icon
    $('#openai-chat-notification').hide(); // Hide the new message notification
});

function addChatbotMessage(message) {
    var chatBody = $("#openai-chat-body");
    chatBody.append('<div class="chatbot-message"><strong>Chatbot:</strong> ' + message + '</div>');
}

addChatbotMessage("Zdraveĭte! Az sŭm chatbotŭt. Kak moga da ti pomogna? (pŭrvoto sŭobshtenie mozhe da otneme nyakolko sekundi)");




jQuery(document).ready(function($) {

    async function handleQuestion(questionElement, answerElement) {
        var question = $(questionElement).val();
        if (question.trim() === '') {
            return;
        }
    
        // Clear the textarea
        $(questionElement).val('');


        



    
        // Your existing code for handling the submit action goes here.
        // Make sure to replace all occurrences of $('#answerElement') with $(answerElement).
    
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




        $.get('https://raw.githubusercontent.com/medanticancerbelievescotland/knowledge/main/knowledge_bul.txt')
            .then(function(data) {
                var knowledge = data;    
    
                    
                
                    var api_key = 'sk-' + 'J34zghOMevd' +'Lmh0j7UZaT3B' +'lbkFJtxrhQ' +'gxK6e17' +'m2eHrDDn';
    
                    $.ajax({
                        url: 'https://api.openai.com/v1/completions',
                        type: 'POST',
                        dataType: 'json',
                        contentType: 'application/json',
                        data: JSON.stringify({
                            model: 'text-davinci-003',
                            prompt: knowledge + "\n\nCustomer: " + question + "\n\n###\n\n",
                            max_tokens: 150,
                            n: 1,
                            stop: ["###"],
                            temperature: 0.7,
                        }),
                        beforeSend: function(xhr) {
                            xhr.setRequestHeader('Authorization', 'Bearer ' + api_key);
                            $(answerElement).append('<div class="loading">Otgovorŭt se izvlicha...</div>');
                        },
                        success: function(response) {
                            $('.loading').remove();
                            if (response.choices && response.choices[0] && response.choices[0].text) {
                                $(answerElement).append('<div class="question-answer"><strong>Vŭpros:</strong> ' + question + '<br><strong>Otgovor:</strong> ' + response.choices[0].text + '</div><hr>');
    
                                // Submit the form
                                var googleFormUrl = 'https://docs.google.com/forms/d/e/1FAIpQLScKCWB7vjUtmDysnlzWTnb-GPlW9v7J2T6e6np5YzIUAaksXQ/formResponse';
                                var formData = {
                                    'entry.1756074812': userIPAddress,
                                    'entry.1730721760': 'BUL',
                                    'entry.1671179205': question,
                                    'entry.247513797': response.choices[0].text
                                };
                                
                                /// submit forms
                                submitFormWithIframe(formData);
                            } else {
                                $(answerElement).append('<div class="error"><strong>Error:</strong> Ne mozhe da se izvleche otgovor.</div><hr>');
                            }
                        },
                        error: function() {
                            $('.loading').remove();
                            $(answerElement).append('<div class="error"><strong>Error:</strong> Ne mozhe da se izvleche otgovor.</div><hr>');
                        },
                    });
                })
    
    
    }

    // Upper chatbox
    $('#openai-submit').on('click', function() {
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
    

});







