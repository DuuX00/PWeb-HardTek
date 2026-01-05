document.addEventListener('DOMContentLoaded', () => {
   
    const chatBubble = document.getElementById('chat-bubble');
    const chatWindow = document.getElementById('chat-window');
    const closeChatBtn = document.getElementById('close-chat');
    const chatMessages = document.getElementById('chat-messages');
    const chatInput = document.getElementById('chat-input');
    const sendChatBtn = document.getElementById('send-chat-btn');

   
    if (!chatBubble || !chatWindow || !closeChatBtn || !chatMessages || !chatInput || !sendChatBtn) {
        return;
    }

    let conversationStep = 0;

    
    const originalTitle = document.title;
    const favicon = document.querySelector("link[rel*='icon']");
    const originalFavicon = favicon ? favicon.href : '';
    
    const notificationFavicon = 'img/favicon-notif.png'; 
    let notificationActive = false;

    function setTabNotification() {
        if (!notificationActive && favicon) {
            document.title = '(1) Mensaje Nuevo | HARDTEK';
            favicon.href = notificationFavicon;
            notificationActive = true;
        }
    }

    function clearTabNotification() {
        if (notificationActive && favicon) {
            document.title = originalTitle;
            favicon.href = originalFavicon;
            notificationActive = false;
        }
    }

    

    /**
     * 
     * @param {string} text 
     * @param {string} sender 
     */
    function addMessage(text, sender) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('chat-message', `chat-message-${sender}`);
        messageElement.innerHTML = text; 
        chatMessages.appendChild(messageElement);
       
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function simulateAgentResponse() {
        setTimeout(() => {
            let agentResponse = '';
            switch (conversationStep) {
                case 0:
                    agentResponse = "¡Hola! Soy Hard-Bot, tu asistente virtual. ¿En qué puedo ayudarte hoy? ";
                    break;
                case 1:
                    agentResponse = "Entendido. Para darte una respuesta más precisa y personalizada, te recomiendo contactar a uno de nuestros asesores expertos.";
                    break;
                case 2:
                    
                    const whatsappLink = 'https://wa.me/946549124?text=Hola,%20necesito%20asesoramiento.';
                    agentResponse = `Puedes hacerlo a través de nuestro WhatsApp. <a href="${whatsappLink}" target="_blank">Haz clic aquí para iniciar una conversación</a>.`;
                    break;
                default:
                    agentResponse = "Si tienes alguna otra consulta, no dudes en preguntar o contactar a un asesor.";
                    conversationStep = 1; 
                    break;
            }
            addMessage(agentResponse, 'agent');
            conversationStep++;

            
            if (document.hidden) {
                setTabNotification();
            }
        }, 1200); 
    }

    
    function handleUserMessage() {
        const userText = chatInput.value.trim();
        if (userText) {
            addMessage(userText, 'user');
            chatInput.value = '';
            simulateAgentResponse();
        }
    }

    
    chatBubble.addEventListener('click', () => {
        chatWindow.classList.toggle('active');
        if (chatWindow.classList.contains('active') && conversationStep === 0) {
            
            simulateAgentResponse();
        }
    });

    closeChatBtn.addEventListener('click', () => {
        chatWindow.classList.remove('active');
    });

   
    document.addEventListener('visibilitychange', () => {
        if (!document.hidden) {
            clearTabNotification();
        }
    });

  
    sendChatBtn.addEventListener('click', handleUserMessage);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleUserMessage();
        }
    });
});