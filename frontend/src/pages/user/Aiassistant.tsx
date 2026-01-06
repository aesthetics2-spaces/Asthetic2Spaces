import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, Sparkles, Plus, Mic, Home, Palette, TrendingUp, MapPin, MessageCircle, Clock, X, Users, Shield, Award } from 'lucide-react';

const AIChatAssistant = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your A2S AI Assistant. I can help you find properties, suggest room designs, and answer questions about real estate. What can I help you with today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [showRecentChats, setShowRecentChats] = useState(false);
  const messagesEndRef = useRef(null);

  const quickSuggestions = [
    { text: 'Find 2BHK in Bangalore under ₹80L', icon: Home },
    { text: 'Design a minimalist bedroom', icon: Palette },
    { text: 'Best areas for investment in Hyderabad', icon: TrendingUp },
    { text: 'Commercial plots near Vizag beach', icon: MapPin }
  ];

  const recentConversations = [
    { id: 1, title: 'Property Search - Vizag', preview: 'Commercial plots for sweet shop', time: '2 hours ago', unread: false },
    { id: 2, title: 'Room Design Help', preview: 'Teal & wood living room theme', time: '5 hours ago', unread: true },
    { id: 3, title: 'Investment Advice', preview: 'Best areas in Bangalore for ROI', time: '1 day ago', unread: false },
    { id: 4, title: 'Vastu Consultation', preview: 'Office space vastu guidelines', time: '2 days ago', unread: false }
  ];

  const bannerFeatures = [
    { icon: Users, text: "1000+ Happy Clients" },
    { icon: Shield, text: "Certified Experts" },
    { icon: Award, text: "Quality Guaranteed" }
  ];

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        text: "I understand you're looking for information about properties. Let me help you with that. I can provide details about available properties, design suggestions, or investment opportunities. Could you please specify your requirements in more detail?",
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsLoading(false);
    }, 1500);
  };

  const handleQuickSuggestion = (text) => {
    setInputMessage(text);
  };

  const handleNewChat = () => {
    setMessages([
      {
        id: 1,
        text: "Hello! I'm your A2S AI Assistant. I can help you find properties, suggest room designs, and answer questions about real estate. What can I help you with today?",
        sender: 'bot',
        timestamp: new Date()
      }
    ]);
    setShowRecentChats(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleVoiceRecord = () => {
    setIsRecording(!isRecording);
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="min-h-screen bg-light">
      {/* Banner Section */}
      <div className="relative py-16 px-4 bg-primary">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Your AI Real Estate Assistant
          </h1>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Get intelligent property recommendations, design suggestions, and expert advice powered by AI
          </p>
          
          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {bannerFeatures.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div key={index} className="flex flex-col items-center text-white">
                  <div className="p-3 rounded-full mb-3 bg-accent">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <span className="text-sm font-medium">{feature.text}</span>
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-32 h-32 opacity-10">
          <Home className="w-full h-full" />
        </div>
        <div className="absolute bottom-0 right-0 w-32 h-32 opacity-10">
          <Palette className="w-full h-full" />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header Navigation */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary rounded-lg">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-neutral">AI Assistant</h2>
                <p className="text-sm text-muted">Get intelligent property & design suggestions</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowRecentChats(!showRecentChats)}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-muted rounded-lg hover:bg-light transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span className="text-sm font-medium text-neutral">Recent Chats</span>
              </button>
              
              <button
                onClick={handleNewChat}
                className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span className="text-sm font-medium">New Chat</span>
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          
          {/* Quick Suggestions Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="relative">
                  <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
                </div>
                <div>
                  <h3 className="font-semibold text-neutral">A2S AI Assistant</h3>
                  <p className="text-xs text-green-600">Online • Ready to help</p>
                </div>
              </div>

              <h3 className="font-semibold text-neutral mb-4">Quick suggestions</h3>
              <div className="space-y-3">
                {quickSuggestions.map((suggestion, index) => {
                  const IconComponent = suggestion.icon;
                  return (
                    <button
                      key={index}
                      onClick={() => handleQuickSuggestion(suggestion.text)}
                      className="w-full text-left p-3 rounded-lg border border-muted hover:border-accent hover:bg-accent/5 transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-accent/20 transition-colors">
                          <IconComponent className="w-4 h-4 text-primary group-hover:text-accent" />
                        </div>
                        <span className="text-sm text-neutral font-medium flex-1">
                          {suggestion.text}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Main Chat Area */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-lg h-[600px] flex">
              
              {/* Recent Chats Sidebar - Collapsible */}
              {showRecentChats && (
                <div className="w-80 border-r border-muted flex flex-col">
                  <div className="p-4 border-b border-muted flex items-center justify-between">
                    <h3 className="font-semibold text-neutral">Recent Conversations</h3>
                    <button 
                      onClick={() => setShowRecentChats(false)}
                      className="p-1 hover:bg-light rounded"
                    >
                      <X className="w-4 h-4 text-muted" />
                    </button>
                  </div>
                  
                  <div className="flex-1 overflow-y-auto">
                    {recentConversations.map((conversation) => (
                      <div
                        key={conversation.id}
                        className="p-4 border-b border-muted hover:bg-light cursor-pointer transition-colors"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-medium text-neutral text-sm flex items-center gap-2">
                            {conversation.title}
                            {conversation.unread && (
                              <span className="w-2 h-2 bg-accent rounded-full"></span>
                            )}
                          </h4>
                          <span className="text-xs text-muted">{conversation.time}</span>
                        </div>
                        <p className="text-xs text-muted line-clamp-2">
                          {conversation.preview}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Chat Messages */}
              <div className={`flex-1 flex flex-col ${showRecentChats ? 'border-l border-muted' : ''}`}>
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex gap-3 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      {message.sender === 'bot' && (
                        <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
                          <Bot className="w-4 h-4 text-white" />
                        </div>
                      )}
                      
                      <div className={`max-w-[70%] ${message.sender === 'user' ? 'order-first' : ''}`}>
                        <div className={`rounded-2xl p-4 ${
                          message.sender === 'user' 
                            ? 'bg-primary text-white rounded-br-none' 
                            : 'bg-light text-neutral rounded-bl-none'
                        }`}>
                          <p className="text-sm leading-relaxed">{message.text}</p>
                        </div>
                        <div className={`text-xs text-muted mt-1 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}>
                          {formatTime(message.timestamp)}
                        </div>
                      </div>

                      {message.sender === 'user' && (
                        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                          <User className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </div>
                  ))}

                  {isLoading && (
                    <div className="flex gap-3 justify-start">
                      <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                      <div className="bg-light rounded-2xl rounded-bl-none p-4">
                        <div className="flex space-x-2">
                          <div className="w-2 h-2 bg-muted rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-muted rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          <div className="w-2 h-2 bg-muted rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="border-t border-muted p-6">
                  <div className="flex gap-3">
                    <button
                      onClick={handleVoiceRecord}
                      className={`p-3 rounded-lg transition-colors ${
                        isRecording 
                          ? 'bg-red-100 text-red-600 hover:bg-red-200' 
                          : 'bg-light text-muted hover:bg-muted'
                      }`}
                    >
                      <Mic className="w-5 h-5" />
                    </button>
                    
                    <div className="flex-1">
                      <textarea
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Ask me anything about properties or design..."
                        className="w-full p-4 border border-muted rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                        rows="2"
                      />
                    </div>
                    
                    <button
                      onClick={handleSendMessage}
                      disabled={!inputMessage.trim() || isLoading}
                      className={`p-4 rounded-lg transition-colors flex items-center justify-center ${
                        inputMessage.trim() && !isLoading
                          ? 'bg-primary text-white hover:bg-primary/90'
                          : 'bg-muted text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mt-3">
                    {quickSuggestions.slice(0, 3).map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => handleQuickSuggestion(suggestion.text)}
                        className="px-3 py-2 text-xs bg-accent/10 text-accent rounded-full hover:bg-accent/20 transition-colors border border-accent/20"
                      >
                        {suggestion.text}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIChatAssistant;