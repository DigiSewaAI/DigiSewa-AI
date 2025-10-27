// ======================
// CHATBOT.JS - Chatbot Functionality
// ======================

document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const chatbotToggle = document.getElementById('chatbot-toggle');
    const chatbotContainer = document.getElementById('chatbot-container');
    const chatbotClose = document.getElementById('chatbot-close');
    const chatArea = document.getElementById('chat-area');
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-button');
    const faqToggle = document.getElementById('faq-toggle');
    const faqContainer = document.getElementById('faq-container');
    const contactFormContainer = document.getElementById('contact-form-container');
    const contactForm = document.getElementById('contact-form');
    const formLoadingChat = document.getElementById('form-loading-chat');
    const formSuccessChat = document.getElementById('form-success-chat');
    const formErrorChat = document.getElementById('form-error-chat');
    
    // Enhanced Q&A in both languages
    const qaPairs = {
        // English questions
        "what is digisewa ai?": "DigiSewa AI provides premium AI-powered technical solutions including web development, app creation, and digital transformation services tailored for businesses in Nepal.",
        "how can i contact you?": "You can contact our support team via email at regmiashish629@gmail.com, call us at +977 9761762036, or use our contact form below.",
        "how does your service work?": "We start with a free consultation to understand your needs, then create a customized solution using the latest technologies. Our process includes design, development, testing, and deployment.",
        "what services do you offer?": "We specialize in AI solutions, web development, mobile apps, e-commerce, digital marketing, and custom software solutions.",
        "do you offer free consultations?": "Yes! We offer free initial consultations to discuss your project requirements and provide recommendations.",
        "what industries do you serve?": "We serve various industries including hospitality, travel, e-commerce, education, healthcare, and more.",
        "do you provide maintenance?": "Yes, we offer ongoing maintenance and support packages to keep your digital solutions running smoothly.",
        "can you update my existing website?": "Absolutely! We specialize in website redesigns and modernizing legacy systems.",
        "do you create mobile apps?": "Yes, we develop both iOS and Android applications using native and cross-platform technologies.",
        "what is your expertise in ai?": "Our AI expertise includes machine learning, natural language processing, computer vision, and predictive analytics for business solutions.",
        "do you offer seo services?": "Yes, we provide comprehensive SEO services to improve your website's visibility and ranking.",
        "can you help with digital marketing?": "Absolutely! We offer social media marketing, PPC campaigns, content marketing, and email marketing services.",
        "what payment methods do you accept?": "We accept bank transfers, credit cards, and digital payment platforms.",
        "do you offer hosting services?": "Yes, we provide reliable hosting solutions with 99.9% uptime and 24/7 monitoring.",
        "can you migrate my existing site?": "Yes, we offer seamless website migration services with zero downtime.",
        "do you provide training?": "We offer training sessions to help your team manage and update your digital solutions.",
        "what technologies do you use?": "We use modern technologies including React, Angular, Vue, Node.js, Python, TensorFlow, and cloud platforms.",
        "are your websites responsive?": "All our websites are fully responsive and optimized for all devices.",
        
        // Nepali questions
        "bhaat khaayou?": "हजुर, म खाना खाइसकेको छु। तपाईंलाई कस्तो छ?",
        "aaja ghumna jaaney ho?": "हजुर, आज म काममा व्यस्त छु।",
        "timilaai kasto chha?": "म ठिक छु, धन्यवाद। तपाईंलाई कसरी सहयोग गर्न सक्छु?",
        "तपाईं कहाँ हुनुहुन्छ?": "हामी काठमाडौं, नेपालमा अवस्थित छौं। तपाईं हामीलाई +९७७ ९७६१७६२०३६ मा फोन गर्न सक्नुहुन्छ वा regmiashish629@gmail.com मा इमेल गर्न सक्नुहुन्छ।",
        "तपाईंको सेवा कस्तो छ?": "हामीले AI प्रविधि प्रयोग गरेर वेबसाइट, मोबाइल अनुप्रयोग, र डिजिटल समाधानहरू प्रदान गर्छौं। हाम्रो सेवा छिटो, विश्वसनीय र सान्दर्भिक छ।",
        "तपाईं कुन क्षेत्रमा सेवा प्रदान गर्नुहुन्छ?": "हामी होटल, यात्रा, इ-कमर्स, शिक्षा, स्वास्थ्य लगायत विभिन्न क्षेत्रहरूमा सेवा प्रदान गर्छौं।",
        "तपाईंले कस्तो प्रविधि प्रयोग गर्नुहुन्छ?": "हामी React, Angular, Node.js, Python, TensorFlow जस्ता आधुनिक प्रविधिहरू प्रयोग गर्छौं।",
        "वेबसाइट बनाउन कति खर्च लाग्छ?": "खर्च परियोजनाको जटिलतामा निर्भर गर्दछ। निशुल्क परामर्शबाट हामी सही अनुमान प्रदान गर्न सक्छौं।",
        "कति समयमा वेबसाइट बनाउन सक्नुहुन्छ?": "सामान्य वेबसाइटहरू २-४ सप्ताहमा बनाउन सकिन्छ। जटिल परियोजनाहरू अतिरिक्त समय लिन सक्छन्।",
        "तपाईं मोबाइल एप बनाउनुहुन्छ?": "हो, हामी iOS र Android दुवै प्लेटफर्मका लागि मोबाइल अनुप्रयोगहरू विकास गर्छौं।",
        "तपाईं SEO सेवा प्रदान गर्नुहुन्छ?": "हो, हामीले वेबसाइटको दृश्यता र र्याङ्किङ सुधार्न व्यापक SEO सेवाहरू प्रदान गर्छौं।",
        "तपाईं डिजिटल मार्केटिङ गर्नुहुन्छ?": "हो, हामी सोशल मिडिया मार्केटिङ, PPC अभियान, सामग्री मार्केटिङ र इमेल मार्केटिङ सेवाहरू प्रदान गर्छौं।",
        "भुक्तानीको लागि कुन विधि स्वीकार गर्नुहुन्छ?": "हामी बैंक हस्तान्तरण, क्रेडिट कार्ड, र डिजिटल भुक्तानी प्लेटफर्म स्वीकार गर्छौं।",
        "तपाईं होस्टिङ सेवा प्रदान गर्नुहुन्छ?": "हो, हामी ९९.९% अपटाइम र २४/७ मोनिटरिङको साथ विश्वसनीय होस्टिङ समाधानहरू प्रदान गर्छौं।",
        "तपाईं मेरो अवस्थित साइट स्थानान्तरण गर्न सक्नुहुन्छ?": "हो, हामी शून्य डाउनटाइमको साथ निर्बाध वेबसाइट स्थानान्तरण सेवाहरू प्रदान गर्छौं।",
        "तपाईं प्रशिक्षण प्रदान गर्नुहुन्छ?": "हामी तपाईंको टोलीलाई तपाईंको डिजिटल समाधानहरू व्यवस्थापन र अद्यावधिक गर्न मद्दत गर्न प्रशिक्षण सत्रहरू प्रदान गर्छौं।",
        "तपाईंको वेबसाइटहरू उत्तरदायी छन्?": "हाम्रा सबै वेबसाइटहरू पूर्ण रूपमा उत्तरदायी छन् र सबै उपकरणहरूका लागि अनुकूलित छन्।",
        "तपाईं AI मा कस्तो विशेषज्ञता राख्नुहुन्छ?": "हाम्रो AI विशेषज्ञतामा व्यवसाय समाधानहरूका लागि मेसिन सिक्ने, प्राकृतिक भाषा प्रशोधन, कम्प्युटर दृष्टि, र भविष्यवाणी विश्लेषण समावेश छ।",
        "तपाईं मेरो अवस्थित वेबसाइट अद्यावधिक गर्न सक्नुहुन्छ?": "निश्चित रूपमा! हामी वेबसाइट पुनर्डिजाइन र पुरानो प्रणालीहरू आधुनिकीकरण गर्न विशेषज्ञता राख्छौं।",
        "तपाईं निशुल्क परामर्श प्रदान गर्नुहुन्छ?": "हो! हामी तपाईंको परियोजना आवश्यकताहरू छलफल गर्न र तपाईंको विशिष्ट आवश्यकताहरूको आधारमा सिफारिसहरू प्रदान गर्न निशुल्क प्रारम्भिक परामर्शहरू प्रदान गर्छौं।",
        
        // Enhanced location queries
        "location": "We are based in Kathmandu, Nepal.",
        "timro location?": "We are based in Kathmandu, Nepal.",
        "hajurko location": "We are based in Kathmandu, Nepal.",
        "kaha chhau?": "We are based in Kathmandu, Nepal.",
        "where is your office?": "We are based in Kathmandu, Nepal.",
        "address k ho?": "Our office is in Kathmandu, Nepal.",
        "kata chha?": "हाम्रो कार्यालय काठमाडौंमा छ।",
        "location kaha ho?": "हामी काठमाडौं, नेपालमा छौं।",
        
        // Enhanced pricing/cost queries
        "cost?": "Pricing depends on project scope. Simple websites start at $500.",
        "price kati ho?": "परियोजनाको दायरामा निर्भर गर्दछ। साधारण वेबसाइटहरू $500 बाट सुरु हुन्छन्।",
        "kati parchha?": "परियोजनाको दायरामा निर्भर गर्दछ। साधारण वेबसाइटहरू $500 बाट सुरु हुन्छन्।",
        "how much?": "Pricing depends on project scope. Simple websites start at $500.",
        "services ko rate?": "सेवाहरूको दर परियोजनाको जटिलतामा निर्भर गर्दछ।",
        "price kati?": "परियोजनाको दायरामा निर्भर गर्दछ। साधारण वेबसाइटहरू $500 बाट सुरु हुन्छन्।",
        "kharcha kati?": "परियोजनाको दायरामा निर्भर गर्दछ। साधारण वेबसाइटहरू $500 बाट सुरु हुन्छन्।",
        
        // Enhanced services queries
        "ke sewa dinchhau?": "हामी वेब विकास, AI एकीकरण, मोबाइल अनुप्रयोग र अधिक प्रदान गर्छौं।",
        "services?": "We provide Web Development, AI Integration, Mobile Apps, and more.",
        "tapaiharu le ke ke garchhau?": "हामी वेब विकास, AI एकीकरण, मोबाइल अनुप्रयोग र अधिक प्रदान गर्छौं।",
        "what do you offer?": "We provide Web Development, AI Integration, Mobile Apps, and more.",
        "ke services haru chha?": "हामी वेब विकास, AI एकीकरण, मोबाइल अनुप्रयोग र अधिक प्रदान गर्छौं।",
        "services list": "Our services include: Web Development, AI Solutions, Mobile Apps, E-commerce, Digital Marketing.",
        
        // Enhanced timeframe queries
        "kati samay lagchha?": "साधारण वेबसाइटहरूले २-४ सप्ताह लिन सक्छ। जटिल अनुप्रयोगहरूले बढी समय लिन सक्छ।",
        "how long?": "Simple websites take 2–4 weeks. Complex apps take longer.",
        "project time?": "Simple websites take 2–4 weeks. Complex apps take longer.",
        "samay kati?": "साधारण वेबसाइटहरूले २-४ सप्ताह लिन सक्छ। जटिल अनुप्रयोगहरूले बढी समय लिन सक्छ।",
        "time duration": "Simple websites take 2–4 weeks. Complex apps take longer.",
        "kati din lagchha?": "साधारण वेबसाइटहरूले २-४ सप्ताह लिन सक्छ। जटिल अनुप्रयोगहरूले बढी समय लिन सक्छ।",
        
        // Enhanced identity queries
        "timro naam ke ho?": "I'm DigiSewa AI Assistant, here to help you with digital services.",
        "who are you?": "I'm DigiSewa AI Assistant, your digital helper.",
        "your name?": "I'm DigiSewa AI Assistant, here to help you.",
        "parichaya dinus": "म डिजिसेवा AI सहायक हुँ, तपाईंलाई डिजिटल सेवाहरूमा सहयोग गर्न यहाँ छु।",
        "timro owner ko naam k ho?": "I'm DigiSewa AI Assistant, here to help you with services.",
        
        // Contact information queries
        "contact information": "You can contact us via email: regmiashish629@gmail.com or phone: +977 9761762036",
        "phone number": "Our phone number is +977 9761762036",
        "email address": "Our email is regmiashish629@gmail.com",
        "samparka jankari": "तपाईं हामीलाई इमेल regmiashish629@gmail.com वा फोन +९७७ ९७६१७६२०३६ मा सम्पर्क गर्न सक्नुहुन्छ।",
        "phone number k ho?": "हाम्रो फोन नम्बर +९७७ ९७६१७६२०३६ हो।",
        "email k ho?": "हाम्रो इमेल regmiashish629@gmail.com हो।",
        
        // Enhanced Nepali responses
        "project cost": "परियोजनाको जटिलतामा निर्भर गर्दछ। साधारण वेबसाइट $500 बाट सुरु हुन्छ।",
        "timeframe": "साधारण वेबसाइट २-४ सप्ताह, जटिल अनुप्रयोग ६-८ सप्ताह लाग्छ।",
        "portfolio": "हाम्रो काम हेर्न https://digisewa-ai.com/portfolio मा जानुहोस्।",
        "team": "हामी ५ जना अनुभवी डेभलपरहरूको टोली हौं।",
        "experience": "हामीसँग ५+ वर्षको अनुभव छ र १००+ परियोजना सफलतापूर्वक पूरा गरिसकेका छौं।",
        "technologies": "हामी React, Node.js, Python, AI/ML, र मोबाइल प्रविधिहरू प्रयोग गर्छौं।",
        
        // Casual/Fun inputs (fallback)
        "k khana khaayau?": "I'm here to help you with digital services. For more, contact us directly.",
        "ghumna jaaney?": "I'm here to help you with digital services. For more, contact us directly.",
        "hello": "Hello! How can I assist you today?",
        "hi": "Hi there! How can I help you?",
        "namaste": "नमस्ते! म तपाईंलाई कसरी सहयोग गर्न सक्छु?",
        "uffff": "I'm here to help you with digital services. For more, contact us directly."
    };
    
    // Fallback management
    let consecutiveFallbacks = 0;
    const MAX_CONSECUTIVE_FALLBACKS = 2;
    
    // Initialize chatbot with greeting
    setTimeout(() => {
        document.getElementById('current-time').textContent = getCurrentTime();
    }, 1000);
    
    // Toggle chatbot visibility
    chatbotToggle.addEventListener('click', function() {
        if (chatbotContainer.classList.contains('active')) {
            chatbotContainer.classList.remove('active');
        } else {
            chatbotContainer.classList.add('active');
            chatbotToggle.classList.remove('has-notification');
            setTimeout(scrollToBottom, 100);
        }
    });
    
    // Close chatbot
    chatbotClose.addEventListener('click', function() {
        chatbotContainer.classList.remove('active');
    });
    
    // Toggle FAQ container
    faqToggle.addEventListener('click', function() {
        faqContainer.classList.toggle('active');
        setTimeout(scrollToBottom, 100);
    });
    
    // Send message when button is clicked
    sendButton.addEventListener('click', sendMessage);
    
    // Send message when Enter key is pressed
    userInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    // Auto-scroll to bottom
    function scrollToBottom() {
        chatArea.scrollTop = chatArea.scrollHeight;
    }
    
    // Add user message to chat
    function addUserMessage(text) {
        const messageEl = document.createElement('div');
        messageEl.className = 'message user-message';
        messageEl.innerHTML = `
            ${escapeHtml(text)}
            <div class="message-time">${getCurrentTime()}</div>
        `;
        chatArea.appendChild(messageEl);
        scrollToBottom();
    }
    
    // Add bot message to chat
    function addBotMessage(text) {
        const messageEl = document.createElement('div');
        messageEl.className = 'message bot-message';
        messageEl.innerHTML = `
            ${text}
            <div class="message-time">${getCurrentTime()}</div>
        `;
        chatArea.appendChild(messageEl);
        scrollToBottom();
        
        // Add notification if chat is closed
        if (!chatbotContainer.classList.contains('active')) {
            chatbotToggle.classList.add('has-notification');
        }
    }
    
    // Get current time in HH:MM format
    function getCurrentTime() {
        const now = new Date();
        return now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');
    }
    
    // Escape HTML special characters
    function escapeHtml(unsafe) {
        return unsafe
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }
    
    // Typing indicator function
    function showTypingIndicator() {
        const typingEl = document.createElement('div');
        typingEl.className = 'message bot-message typing-indicator';
        typingEl.id = 'typing-indicator';
        typingEl.innerHTML = '<div class="typing-dots"><span></span><span></span><span></span></div>';
        chatArea.appendChild(typingEl);
        scrollToBottom();
        return typingEl;
    }

    function hideTypingIndicator() {
        const typingEl = document.getElementById('typing-indicator');
        if (typingEl) {
            typingEl.remove();
        }
    }
    
    // Send message function
    function sendMessage() {
        const message = userInput.value.trim();
        if (message) {
            addUserMessage(message);
            userInput.value = '';
            faqContainer.classList.remove('active');
            processMessage(message);
        }
    }
    
    // Process user message and generate response
    function processMessage(message) {
        const lowerMessage = message.toLowerCase();
        let response = null;
        
        const typingIndicator = showTypingIndicator();
        
        setTimeout(() => {
            hideTypingIndicator();
            
            // Check for direct matches in qaPairs
            for (const [key, value] of Object.entries(qaPairs)) {
                if (lowerMessage.includes(key)) {
                    response = value;
                    break;
                }
            }
            
            // Context-based matching if direct match not found
            if (!response) {
                // Location context
                if (/(location|kaha|office|address|kata)/i.test(lowerMessage)) {
                    response = "We are based in Kathmandu, Nepal.";
                } 
                // Pricing context
                else if (/(cost|price|kati|parchha|rate|kharcha)/i.test(lowerMessage)) {
                    response = "Pricing depends on project scope. Simple websites start at $500.";
                }
                // Services context
                else if (/(service|sewa|offer|garchhau|provide|services)/i.test(lowerMessage)) {
                    response = "We provide Web Development, AI Integration, Mobile Apps, and more.";
                }
                // Timeframe context
                else if (/(time|samay|lagchha|long|duration|din|deadline)/i.test(lowerMessage)) {
                    response = "Simple websites take 2–4 weeks. Complex apps take longer.";
                }
                // Identity context
                else if (/(name|naam|who|parichaya|timro|owner)/i.test(lowerMessage)) {
                    response = "I'm DigiSewa AI Assistant, your digital helper.";
                }
                // Contact context
                else if (/(contact|call|email|phone|samparka|jankari)/i.test(lowerMessage)) {
                    response = "You can contact us via email: regmiashish629@gmail.com or phone: +977 9761762036";
                }
            }
            
            // Fallback handling
            if (!response) {
                if (consecutiveFallbacks < MAX_CONSECUTIVE_FALLBACKS) {
                    response = "I'm here to help you with digital services. For more, contact us directly.";
                    consecutiveFallbacks++;
                } else if (consecutiveFallbacks === MAX_CONSECUTIVE_FALLBACKS) {
                    response = "I'm still having trouble understanding. For immediate assistance, please call us at +977 9761762036 or email regmiashish629@gmail.com.";
                    consecutiveFallbacks++;
                } else {
                    return;
                }
            } else {
                consecutiveFallbacks = 0;
            }
            
            // Check if it's a contact request
            if (/(contact|call|email|phone|सम्पर्क|फोन|इमेल)/i.test(lowerMessage)) {
                contactFormContainer.classList.add('active');
                setTimeout(() => {
                    addBotMessage(response);
                    scrollToBottom();
                }, 300);
                return;
            }
            
            addBotMessage(response);
            
        }, 1000 + Math.random() * 1000);
    }
    
    // Send predefined question
    function sendQuestion(text) {
        userInput.value = text;
        sendMessage();
    }
    
    // Contact form submission handling with Netlify Forms
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            formLoadingChat.style.display = 'block';
            formSuccessChat.style.display = 'none';
            formErrorChat.style.display = 'none';
            
            // Netlify Forms will handle the submission automatically
            // We just need to show the appropriate states
            
            // Show success state after a short delay
            setTimeout(() => {
                formLoadingChat.style.display = 'none';
                formSuccessChat.style.display = 'block';
                
                setTimeout(() => {
                    contactFormContainer.classList.remove('active');
                    addBotMessage("Thank you! We'll contact you shortly.");
                    contactForm.reset();
                }, 2000);
            }, 1000);
        });
    }
});