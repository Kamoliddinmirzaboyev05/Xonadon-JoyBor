import React, { useState } from 'react';
import {
  Search,
  Send,
  Phone,
  MoreVertical,
  ArrowLeft,
  MessageCircle
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Helmet } from 'react-helmet-async';

interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  message: string;
  timestamp: Date;
  read: boolean;
}

interface Conversation {
  id: string;
  participantId: string;
  participantName: string;
  participantAvatar: string;
  lastMessage: string;
  lastMessageTime: Date;
  unreadCount: number;
  listingTitle?: string;
  listingImage?: string;
}

interface ChatProps {
  onBack?: () => void;
  onConversationChange?: (hasSelectedConversation: boolean) => void;
}

const Chat: React.FC<ChatProps> = ({ onBack, onConversationChange }) => {
  const { user } = useAuth();
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);

  const handleConversationSelect = (conversationId: string) => {
    setSelectedConversation(conversationId);
    if (onConversationChange) {
      onConversationChange(true);
    }
  };

  const handleBackToList = () => {
    setSelectedConversation(null);
    if (onConversationChange) {
      onConversationChange(false);
    }
    // Don't call onBack here - just go back to conversations list
  };
  const [messageText, setMessageText] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock conversations data
  const [conversations] = useState<Conversation[]>([
    {
      id: '1',
      participantId: '2',
      participantName: 'Aziza Karimova',
      participantAvatar: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      lastMessage: 'Xonadon hali bo\'shmi?',
      lastMessageTime: new Date('2024-01-22T14:30:00'),
      unreadCount: 2,
      listingTitle: 'Zamonaviy xonadon TATU yaqinida',
      listingImage: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
    },
    {
      id: '2',
      participantId: '3',
      participantName: 'Bekzod Alimov',
      participantAvatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      lastMessage: 'Rahmat, kelishib oldik',
      lastMessageTime: new Date('2024-01-21T16:45:00'),
      unreadCount: 0,
      listingTitle: 'Qulay xonadon NUUz yaqinida',
      listingImage: 'https://images.pexels.com/photos/1571470/pexels-photo-1571470.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
    },
    {
      id: '3',
      participantId: '4',
      participantName: 'Nilufar Saidova',
      participantAvatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      lastMessage: 'Ertaga ko\'rishib gaplashamizmi?',
      lastMessageTime: new Date('2024-01-20T10:15:00'),
      unreadCount: 1,
      listingTitle: 'Arzon xonadon TIQXMMI yaqinida',
      listingImage: 'https://images.pexels.com/photos/1571459/pexels-photo-1571459.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
    }
  ]);

  // Mock messages for selected conversation
  const [messages] = useState<ChatMessage[]>([
    {
      id: '1',
      senderId: '2',
      senderName: 'Aziza Karimova',
      message: 'Assalomu alaykum! Sizning e\'loningizni ko\'rdim.',
      timestamp: new Date('2024-01-22T14:00:00'),
      read: true
    },
    {
      id: '2',
      senderId: user?.id || '1',
      senderName: user?.name || 'Men',
      message: 'Vaalaykum assalom! Qanday yordam bera olaman?',
      timestamp: new Date('2024-01-22T14:05:00'),
      read: true
    },
    {
      id: '3',
      senderId: '2',
      senderName: 'Aziza Karimova',
      message: 'Xonadon hali bo\'shmi? Qachon ko\'rib chiqish mumkin?',
      timestamp: new Date('2024-01-22T14:30:00'),
      read: false
    }
  ]);

  const filteredConversations = conversations.filter(conv =>
    conv.participantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (conv.listingTitle && conv.listingTitle.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const selectedConv = conversations.find(c => c.id === selectedConversation);
  const conversationMessages = selectedConversation ? messages : [];

  const handleSendMessage = () => {
    if (!messageText.trim()) return;

    // TODO: Send message logic
    console.log('Sending message:', messageText);
    setMessageText('');
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) {
      return date.toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' });
    } else if (days === 1) {
      return 'Kecha';
    } else if (days < 7) {
      return `${days} kun oldin`;
    } else {
      return date.toLocaleDateString('uz-UZ');
    }
  };

  return (
    <main>
      <Helmet>
        <title>Xabarlar | Joy Bor</title>
        <meta name="description" content="Xabar almashuv va muloqot." />
        <link rel="canonical" href="https://xonadon.joyboronline.uz/chat" />
      </Helmet>

      <div className={`${selectedConversation ? 'h-[calc(100vh-4rem)]' : 'h-[calc(100vh-8rem)]'} lg:h-[calc(100vh-4rem)] flex bg-white dark:bg-gray-900`}>
        {/* Conversations List */}
        <div className={`w-full lg:w-1/3 border-r border-gray-200 dark:border-gray-700 flex flex-col ${selectedConversation ? 'hidden lg:flex' : 'flex'}`}>
          {/* Header */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">Xabarlar</h1>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" size={16} />
              <input
                type="text"
                placeholder="Suhbatlarni qidirish..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-sm border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Conversations */}
          <div className="flex-1 overflow-y-auto">
            {filteredConversations.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="w-8 h-8 text-gray-400 dark:text-gray-500" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Hech qanday suhbat yo'q</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  E'lonlarga xabar yuboring va suhbatlar shu yerda ko'rinadi
                </p>
              </div>
            ) : (
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredConversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    onClick={() => handleConversationSelect(conversation.id)}
                    className={`p-4 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors ${selectedConversation === conversation.id ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                      }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="relative">
                        <img
                          src={conversation.participantAvatar}
                          alt={conversation.participantName}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        {conversation.unreadCount > 0 && (
                          <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                            {conversation.unreadCount}
                          </div>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                            {conversation.participantName}
                          </h3>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {formatTime(conversation.lastMessageTime)}
                          </span>
                        </div>

                        {conversation.listingTitle && (
                          <div className="flex items-center gap-2 mb-1">
                            <img
                              src={conversation.listingImage}
                              alt=""
                              className="w-6 h-6 rounded object-cover"
                            />
                            <span className="text-xs text-gray-600 dark:text-gray-400 truncate">
                              {conversation.listingTitle}
                            </span>
                          </div>
                        )}

                        <p className={`text-sm truncate ${conversation.unreadCount > 0
                          ? 'text-gray-900 dark:text-gray-100 font-medium'
                          : 'text-gray-600 dark:text-gray-400'
                          }`}>
                          {conversation.lastMessage}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Chat Area */}
        <div className={`flex-1 flex flex-col ${selectedConversation ? 'flex' : 'hidden lg:flex'}`}>
          {selectedConversation && selectedConv ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={handleBackToList}
                      className="lg:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                    >
                      <ArrowLeft size={20} />
                    </button>
                    <img
                      src={selectedConv.participantAvatar}
                      alt={selectedConv.participantName}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                        {selectedConv.participantName}
                      </h2>
                      {selectedConv.listingTitle && (
                        <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                          {selectedConv.listingTitle}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors">
                      <Phone size={20} className="text-gray-600 dark:text-gray-400" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors">
                      <MoreVertical size={20} className="text-gray-600 dark:text-gray-400" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-900">
                {conversationMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.senderId === user?.id ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${message.senderId === user?.id
                        ? 'bg-blue-600 text-white'
                        : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700'
                        }`}
                    >
                      <p className="text-sm">{message.message}</p>
                      <p className={`text-xs mt-1 ${message.senderId === user?.id ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'
                        }`}>
                        {formatTime(message.timestamp)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    placeholder="Xabar yozing..."
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!messageText.trim()}
                    className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send size={20} />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center bg-gray-50 dark:bg-gray-900">
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="w-8 h-8 text-gray-400 dark:text-gray-500" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  Suhbatni tanlang
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Xabar almashuv uchun chap tarafdan suhbatni tanlang
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Chat;