'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Send, X, Loader2 } from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';

type Message = {
  id: string;
  type: 'bot' | 'user';
  text: string;
  options?: string[];
};

type FormField = {
  name: string;
  value: string;
  validated: boolean;
};

const ChatBot = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [formData, setFormData] = useState<FormField[]>([
    { name: 'phone', value: '', validated: false },
    { name: 'name', value: '', validated: false },
    { name: 'email', value: '', validated: false },
    { name: 'contactType', value: '', validated: false },
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [inContactFlow, setInContactFlow] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Mensagem inicial
      const greeting = typeof t('chatbot.greeting') === 'string' 
        ? t('chatbot.greeting') 
        : 'Olá! Bem-vindo ao meu assistente virtual. 👋';
      
      addBotMessage(greeting);
      
      // Inicia imediatamente o fluxo de captura de dados
      setTimeout(() => {
        startContactForm();
      }, 800);
    }
  }, [isOpen]);

  const addBotMessage = (text: string, options?: string[]) => {
    setIsTyping(true);
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        { id: Date.now().toString(), type: 'bot', text, options }
      ]);
      setIsTyping(false);
    }, 600);
  };

  const addUserMessage = (text: string) => {
    setMessages(prev => [...prev, { id: Date.now().toString(), type: 'user', text }]);
    setInputValue('');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputValue.trim()) return;
    
    if (inContactFlow && currentStep < formData.length) {
      // Form flow
      const updatedFormData = [...formData];
      updatedFormData[currentStep].value = inputValue;
      
      // Basic validation
      let isValid = true;
      
      // Specific validations
      if (currentStep === 0) { // Phone validation
        const phoneRegex = /^[0-9()\-\s+]{8,}$/;
        isValid = phoneRegex.test(inputValue.trim());
      } else if (currentStep === 2) { // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        isValid = emailRegex.test(inputValue.trim());
      } else if (currentStep === 3) { // Contact type validation
        const lowerCaseInput = inputValue.toLowerCase().trim();
        isValid = lowerCaseInput.includes('falar') || 
                  lowerCaseInput.includes('direto') || 
                  lowerCaseInput.includes('mensagem') || 
                  lowerCaseInput.includes('deixar');
                  
        // Standardize the value
        if (lowerCaseInput.includes('falar') || lowerCaseInput.includes('direto')) {
          updatedFormData[currentStep].value = 'direct';
        } else {
          updatedFormData[currentStep].value = 'message';
        }
      } else {
        // Default validation (name)
        isValid = inputValue.trim().length >= 2;
      }
      
      updatedFormData[currentStep].validated = isValid;
      setFormData(updatedFormData);
      
      // Add user message
      addUserMessage(inputValue);
      
      if (!isValid) {
        // Show validation error
        const validationMessage = typeof t(`chatbot.validation.${formData[currentStep].name}`) === 'string'
          ? t(`chatbot.validation.${formData[currentStep].name}`)
          : 'Por favor, insira um valor válido.';
        
        addBotMessage(validationMessage);
        return;
      }
      
      // Move to next field
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      
      // If form is complete, submit data
      if (nextStep >= formData.length) {
        submitFormData(updatedFormData);
      } else {
        // Special case for contact type field - provide buttons
        if (nextStep === 3) {
          const contactTypeQuestion = typeof t('chatbot.ask.contactType') === 'string'
            ? t('chatbot.ask.contactType')
            : 'Você prefere falar diretamente comigo ou deixar uma mensagem?';
          
          addBotMessage(contactTypeQuestion);
          
          setTimeout(() => {
            // Add buttons for contact options
            setMessages(prev => {
              const last = prev[prev.length - 1];
              return [
                ...prev.slice(0, prev.length - 1),
                {
                  ...last,
                  options: ['direct-contact', 'leave-message'],
                }
              ];
            });
          }, 500);
        } else {
          // Ask for next field
          const nextFieldQuestion = typeof t(`chatbot.ask.${updatedFormData[nextStep].name}`) === 'string'
            ? t(`chatbot.ask.${updatedFormData[nextStep].name}`)
            : 'Por favor, preencha o próximo campo:';
          
          addBotMessage(nextFieldQuestion);
        }
      }
    } else {
      // Normal chat flow
      addUserMessage(inputValue);
      
      // Qualquer mensagem do usuário inicia o fluxo de contato
      if (!inContactFlow) {
        startContactForm();
      } else {
        handleChatbotResponse(inputValue);
      }
    }
  };

  const handleOptionClick = (option: string) => {
    if (option === 'direct-contact') {
      // Handle direct contact option
      if (currentStep === 3) {
        const updatedFormData = [...formData];
        updatedFormData[currentStep].value = 'direct';
        updatedFormData[currentStep].validated = true;
        setFormData(updatedFormData);
        
        const directMessage = typeof t('chatbot.contactOptions.direct') === 'string'
          ? t('chatbot.contactOptions.direct')
          : 'Falar diretamente';
        
        addUserMessage(directMessage);
        submitFormData(updatedFormData);
      }
    } else if (option === 'leave-message') {
      // Handle leave message option
      if (currentStep === 3) {
        const updatedFormData = [...formData];
        updatedFormData[currentStep].value = 'message';
        updatedFormData[currentStep].validated = true;
        setFormData(updatedFormData);
        
        const messageOption = typeof t('chatbot.contactOptions.message') === 'string'
          ? t('chatbot.contactOptions.message')
          : 'Deixar mensagem';
        
        addUserMessage(messageOption);
        submitFormData(updatedFormData);
      }
    }
  };

  const startContactForm = () => {
    // Ativar o modo de contato
    setInContactFlow(true);
    
    // Reset form state
    setCurrentStep(0);
    setFormData(formData.map(field => ({ ...field, value: '', validated: false })));
    
    // Pular a mensagem de "Vou precisar de algumas informações" e ir direto para o telefone
    const phoneQuestion = typeof t('chatbot.ask.phone') === 'string'
      ? t('chatbot.ask.phone')
      : 'Qual é o seu telefone para contato?';
    
    addBotMessage(phoneQuestion);
  };

  const handleChatbotResponse = (userMessage: string) => {
    // Se estiver no fluxo de contato, qualquer mensagem não tratada reinicia o fluxo
    startContactForm();
  };

  const submitFormData = async (data: FormField[]) => {
    setIsSubmitting(true);
    
    // Prepare data object
    const formattedData = {
      phone: data[0].value,
      name: data[1].value,
      email: data[2].value,
      contactType: data[3].value,
    };
    
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formattedData),
      });
      
      if (!response.ok) {
        throw new Error('Failed to send email');
      }
      
      // Show success message
      setIsSuccess(true);
      
      if (formattedData.contactType === 'direct') {
        const directSuccessMessage = typeof t('chatbot.success.direct') === 'string'
          ? t('chatbot.success.direct')
          : 'Obrigado! Entrarei em contato com você diretamente em breve pelo telefone fornecido.';
        
        addBotMessage(directSuccessMessage);
      } else {
        const messageSuccessMessage = typeof t('chatbot.success.message') === 'string'
          ? t('chatbot.success.message')
          : 'Obrigado! Sua solicitação foi registrada. Entrarei em contato em breve para discutirmos seu problema.';
        
        addBotMessage(messageSuccessMessage);
      }
      
      // Reset form
      setCurrentStep(0);
      setInContactFlow(false);
      setFormData(formData.map(field => ({ ...field, value: '', validated: false })));
      
    } catch (error) {
      console.error('Error sending email:', error);
      
      const errorMessage = typeof t('chatbot.error') === 'string'
        ? t('chatbot.error')
        : 'Desculpe, ocorreu um erro ao enviar sua mensagem. Por favor, tente novamente mais tarde.';
      
      addBotMessage(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
    }
  };

  // Renderização dos botões de opções
  const renderOptions = (options: string[]) => {
    return (
      <div className="flex flex-wrap gap-2 mt-2">
        {options.map((option) => {
          let buttonText = '';
          
          // Determine button text based on option
          if (option === 'direct-contact') {
            buttonText = typeof t('chatbot.contactOptions.direct') === 'string'
              ? t('chatbot.contactOptions.direct')
              : 'Falar diretamente';
          } else if (option === 'leave-message') {
            buttonText = typeof t('chatbot.contactOptions.message') === 'string'
              ? t('chatbot.contactOptions.message')
              : 'Deixar mensagem';
          }
          
          return (
            <button
              key={option}
              onClick={() => handleOptionClick(option)}
              className="bg-red-600 hover:bg-red-700 text-white text-sm px-3 py-1 rounded-full transition-all"
            >
              {buttonText}
            </button>
          );
        })}
      </div>
    );
  };
  
  return (
    <>
      {/* Botão flutuante do chatbot */}
      <button
        onClick={toggleChat}
        className="fixed bottom-5 right-5 bg-red-600 text-white p-4 rounded-full shadow-lg hover:bg-red-700 transition-all z-50"
        aria-label="Open chat"
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </button>
      
      {/* Container do chatbot */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-20 right-5 w-80 md:w-96 h-[500px] max-h-[80vh] bg-gray-900 rounded-xl shadow-2xl overflow-hidden flex flex-col z-50 border border-gray-800"
          >
            {/* Cabeçalho do chat */}
            <div className="bg-gradient-to-r from-red-700 to-red-500 p-4 flex items-center justify-between">
              <div className="flex items-center">
                <MessageSquare className="text-white mr-2" size={18} />
                <h3 className="text-white font-medium">
                  {typeof t('chatbot.title') === 'string' ? t('chatbot.title') : 'Assistente Virtual'}
                </h3>
              </div>
              <button 
                onClick={toggleChat} 
                className="text-white hover:text-gray-200"
                aria-label="Close chat"
              >
                <X size={18} />
              </button>
            </div>
            
            {/* Container das mensagens */}
            <div className="flex-1 p-4 overflow-y-auto bg-gray-900">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`mb-4 ${message.type === 'user' ? 'flex justify-end' : 'flex justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.type === 'user'
                        ? 'bg-red-600 text-white rounded-tr-none'
                        : 'bg-gray-800 text-white rounded-tl-none'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    {message.options && renderOptions(message.options)}
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start mb-4">
                  <div className="bg-gray-800 p-3 rounded-lg rounded-tl-none max-w-[80%]">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
            
            {/* Formulário de entrada */}
            <form onSubmit={handleSubmit} className="p-2 bg-gray-800 flex">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder={isSubmitting ? "Enviando..." : "Digite sua mensagem..."}
                disabled={isSubmitting}
                className="flex-1 bg-gray-700 border border-gray-600 text-white placeholder-gray-400 px-4 py-2 rounded-l-lg focus:outline-none focus:border-red-500"
              />
              <button
                type="submit"
                disabled={isSubmitting || !inputValue.trim()}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-r-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Send message"
              >
                {isSubmitting ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} />}
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;