        // Toggle Chat Widget
        function toggleChat() {
            const widget = document.getElementById('chatWidget');
            const btn = document.getElementById('chatToggleBtn');
            const icon = btn.querySelector('i');
            
            widget.classList.toggle('active');
            btn.classList.toggle('active');
            
            if (widget.classList.contains('active')) {
                icon.className = 'fas fa-times';
                document.getElementById('messageInput').focus();
            } else {
                icon.className = 'fas fa-comments';
            }
        }

        // Knowledge Base
        const knowledgeBase = {
            name: "Zusive Pikelela",
            role: "Web Developer & Aspiring Ethical Hacker",
            location: "Khayelitsha, Cape Town",
            
            skills: {
                webDev: ["HTML5", "CSS3", "JavaScript (ES6+)", "React", "Responsive Design", "Git & GitHub"],
                tools: ["Zoho CRM", "Zoho People", "Zoho Mail", "Zoho Workplace", "Zoho Sheet", "Zoho Drive", "VS Code"],
                soft: ["Critical Thinking", "Problem Solving", "Team Leadership", "Communication", "Time Management", "Patience", "Curiosity"],
                security: ["Cybersecurity Fundamentals", "Ethical Hacking", "Network Security", "Penetration Testing"]
            },
            
            education: [
                {
                    name: "BabesGotBytes",
                    year: "2023-2025",
                    status: "Current",
                    description: "Advanced web development and tech skills training"
                },
                {
                    name: "codeX Bootcamp",
                    year: "2025",
                    status: "Completed",
                    description: "Software development certification"
                },
                {
                    name: "Zoho Bootcamp",
                    year: "2025",
                    status: "Completed",
                    description: "Enhanced digital skills and business tools proficiency"
                },
                {
                    name: "Nkumbulo Secondary School",
                    year: "2023",
                    status: "Completed",
                    description: "Secondary education"
                }
            ],
            
            aspirations: {
                immediate: [
                    "Secure internships or junior developer roles",
                    "Complete foundational cybersecurity certifications (CompTIA Security+, CEH)",
                    "Build portfolio of security-focused web applications"
                ],
                longterm: [
                    "Transition into penetration testing and security analysis roles",
                    "Contribute to bug bounty programs and responsible disclosure",
                    "Become a trusted cybersecurity professional"
                ]
            },
            
            contact: {
                email: "pikelelazusive7@gmail.com",
                phone: "062 975 0922",
                linkedin: "https://www.linkedin.com/in/zusive-pikelela-681bb135a"
            },
            
            philosophy: "To defend effectively, you must understand deeply. My development background gives me insight into how systems are built, which will make me a more effective ethical hacker."
        };

        // Initialize
        document.getElementById('welcomeTime').textContent = getCurrentTime();

        function getCurrentTime() {
            return new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
        }

        function sendMessage() {
            const input = document.getElementById('messageInput');
            const message = input.value.trim();
            
            if (!message) return;
            
            addMessage(message, 'user');
            input.value = '';
            
            // Show typing indicator
            showTyping();
            
            // Generate response
            setTimeout(() => {
                hideTyping();
                const response = generateResponse(message);
                addMessage(response, 'bot');
            }, 1000 + Math.random() * 1000);
        }

        function sendSuggestion(text) {
            document.getElementById('messageInput').value = text;
            sendMessage();
        }

        function handleKeyPress(event) {
            if (event.key === 'Enter') {
                sendMessage();
            }
        }

        function addMessage(text, sender) {
            const messagesDiv = document.getElementById('chatMessages');
            const messageDiv = document.createElement('div');
            messageDiv.className = `message ${sender}`;
            
            const avatar = sender === 'bot' 
                ? '<i class="fas fa-robot"></i>'
                : '<i class="fas fa-user"></i>';
            
            messageDiv.innerHTML = `
                <div class="message-avatar">${avatar}</div>
                <div>
                    <div class="message-content">${text}</div>
                    <div class="message-time">${getCurrentTime()}</div>
                </div>
            `;
            
            messagesDiv.appendChild(messageDiv);
            messagesDiv.scrollTop = messagesDiv.scrollHeight;
        }

        function showTyping() {
            const messagesDiv = document.getElementById('chatMessages');
            const typingDiv = document.createElement('div');
            typingDiv.className = 'message bot';
            typingDiv.id = 'typingIndicator';
            typingDiv.innerHTML = `
                <div class="message-avatar">
                    <i class="fas fa-robot"></i>
                </div>
                <div class="message-content typing-indicator active">
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                </div>
            `;
            messagesDiv.appendChild(typingDiv);
            messagesDiv.scrollTop = messagesDiv.scrollHeight;
        }

        function hideTyping() {
            const typing = document.getElementById('typingIndicator');
            if (typing) typing.remove();
        }

        function generateResponse(message) {
            const msg = message.toLowerCase();
            
            // Greetings
            if (msg.match(/\b(hi|hello|hey|greetings)\b/)) {
                return `Hello! 👋 I'm here to tell you about ${knowledgeBase.name}. What would you like to know?`;
            }
            
            // Skills
            if (msg.match(/\b(skill|skills|technology|technologies|programming|code|coding)\b/)) {
                const skills = knowledgeBase.skills;
                return `${knowledgeBase.name} has expertise in:\n\n💻 Web Development: ${skills.webDev.join(', ')}\n\n🛠️ Tools: ${skills.tools.slice(0, 4).join(', ')}, and more\n\n🔒 Security: ${skills.security.join(', ')}\n\n✨ Soft Skills: ${skills.soft.slice(0, 4).join(', ')}, and more`;
            }
            
            // Education
            if (msg.match(/\b(education|study|learn|school|bootcamp|training|qualification)\b/)) {
                let response = `${knowledgeBase.name}'s educational journey:\n\n`;
                knowledgeBase.education.forEach(edu => {
                    response += `🎓 ${edu.name} (${edu.year}) - ${edu.status}\n${edu.description}\n\n`;
                });
                return response.trim();
            }
            
            // Career Goals / Aspirations
            if (msg.match(/\b(goal|goals|aspiration|aspirations|future|career|plan)\b/)) {
                const asp = knowledgeBase.aspirations;
                return `${knowledgeBase.name}'s career vision:\n\n🎯 Immediate Goals:\n${asp.immediate.map(g => `• ${g}`).join('\n')}\n\n🚀 Long-term Vision:\n${asp.longterm.map(g => `• ${g}`).join('\n')}\n\n💭 Philosophy: ${knowledgeBase.philosophy}`;
            }
            
            // Contact
            if (msg.match(/\b(contact|email|phone|linkedin|reach|connect|touch)\b/)) {
                const contact = knowledgeBase.contact;
                return `You can reach ${knowledgeBase.name} through:\n\n📧 Email: ${contact.email}\n📱 Phone: ${contact.phone}\n💼 LinkedIn: ${contact.linkedin}\n\nShe's based in ${knowledgeBase.location} and is open to internships and junior developer roles!`;
            }
            
            // About / Who
            if (msg.match(/\b(who|about|tell me about|introduce)\b/)) {
                return `${knowledgeBase.name} is a ${knowledgeBase.role} based in ${knowledgeBase.location}. She's a hardworking and curious individual with a web development certification from BabesGotBytes. While she excels in web development, her passion extends into cybersecurity. She's driven by the challenge of understanding systems deeply enough to protect them. Her key strengths include patience, curiosity, and a commitment to continuous learning.`;
            }
            
            // Ethical Hacking / Security
            if (msg.match(/\b(hacking|hacker|security|cybersecurity|penetration|ethical)\b/)) {
                return `${knowledgeBase.name} is passionate about cybersecurity and ethical hacking! 🔒\n\nShe believes that to defend effectively, you must understand deeply. Her development background gives her insight into how systems are built, which will make her a more effective ethical hacker.\n\nShe's currently learning: ${knowledgeBase.skills.security.join(', ')}\n\nHer goal is to transition into penetration testing and security analysis roles, contributing to bug bounty programs and becoming a trusted cybersecurity professional.`;
            }
            
            // Experience
            if (msg.match(/\b(experience|work|job|project)\b/)) {
                return `${knowledgeBase.name} is currently building her professional experience through:\n\n• Ongoing training at BabesGotBytes (2023-2025)\n• Completed codeX Bootcamp certification in 2025\n• Enhanced digital skills through Zoho Bootcamp\n\nShe's actively seeking internships or junior developer roles to gain industry experience and build a portfolio of security-focused web applications. Would you like to know more about her skills or contact information?`;
            }
            
            // Thanks
            if (msg.match(/\b(thank|thanks|appreciate)\b/)) {
                return `You're welcome! 😊 Is there anything else you'd like to know about ${knowledgeBase.name}?`;
            }
            
            // Default
            return `I can tell you about ${knowledgeBase.name}'s:\n\n💻 Skills & Technologies\n🎓 Education & Training\n🎯 Career Goals & Aspirations\n🔒 Cybersecurity Journey\n📧 Contact Information\n\nWhat would you like to know more about?`;
        }
   