import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface ChatMessage {
  sender: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

/**
 * @description Advisor (AI恋爱顾问) 页面组件
 * 提供一个聊天机器人界面，用户可以与AI顾问进行交流，获取恋爱建议。
 */
export default function Advisor() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      sender: 'ai',
      content: '你好！我是你的AI恋爱顾问，可以为你提供关系建议和聊天指导。有什么我可以帮你的吗？',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoadingAI, setIsLoadingAI] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  /**
   * @description 处理发送消息的函数
   * 当用户点击发送按钮或在输入框中按回车时调用。
   */
  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoadingAI) return;

    const userInput = inputValue;
    const userMessage: ChatMessage = {
      sender: 'user',
      content: userInput,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoadingAI(true);

    try {
      const response = await fetch('https://dating-b62r.vercel.app/api/coze-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userInput }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'AI服务返回了无效的响应' }));
        console.error('AI service error:', errorData);
        const aiErrorMessage: ChatMessage = {
          sender: 'ai',
          content: `抱歉，AI服务暂时遇到问题：${errorData.error || response.statusText}`,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, aiErrorMessage]);
        toast.error(`AI服务错误: ${errorData.error || response.statusText}`);
        return;
      }

      const data = await response.json();
      
      if (data.reply) {
        const aiMessage: ChatMessage = {
          sender: 'ai',
          content: data.reply,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, aiMessage]);
      } else {
        console.error('AI response missing reply field:', data);
        const aiErrorMessage: ChatMessage = {
          sender: 'ai',
          content: '抱歉，AI未能提供有效的回复。',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, aiErrorMessage]);
        toast.error('AI未能提供有效回复');
      }

    } catch (error) {
      console.error('Error sending message to backend:', error);
      const aiErrorMessage: ChatMessage = {
        sender: 'ai',
        content: '抱歉，连接AI顾问时发生网络错误，请稍后再试。',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiErrorMessage]);
      toast.error('连接AI顾问失败');
    } finally {
      setIsLoadingAI(false);
    }
  };

  /**
   * @description 处理语音输入按钮点击的函数 (目前为模拟功能)
   */
  const handleVoiceInput = () => {
    toast.info("语音输入功能需要浏览器授权麦克风权限");
    const mockVoiceText = "我想知道如何改善我们的沟通";
    setInputValue(mockVoiceText);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FF9A9E] to-[#FAD0C4]">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 min-h-[calc(100vh-140px)]">
        <div className="bg-white bg-opacity-30 backdrop-blur-md rounded-xl p-6 shadow-lg mb-8">
          <h1 className="text-3xl font-bold mb-6">AI恋爱顾问</h1>
          <p className="mb-6">
            请在下方与AI恋爱顾问进行交流，获取专业的恋爱建议和沟通指导。
          </p>
        </div>

        {/* 嵌入式聊天界面开始 */}
        <div className="w-full bg-white bg-opacity-70 backdrop-blur-lg rounded-xl shadow-xl overflow-hidden">
          <div className="p-4 bg-pink-600 bg-opacity-80 text-white">
            <h3 className="font-semibold">与AI恋爱顾问对话</h3>
          </div>
          
          <div className="h-[500px] overflow-y-auto p-4 space-y-3"> {/* 可以调整高度 h-80 */}
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-pink-500 text-white rounded-br-none'
                      : 'bg-white bg-opacity-80 rounded-bl-none'
                  }`}
                >
                  {message.content}
                  <div className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="p-3 border-t border-gray-200 flex">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="输入你的问题..."
              className="flex-1 px-3 py-2 rounded-l-lg border focus:outline-none focus:ring-1 focus:ring-pink-500"
            />
            <button
              onClick={handleVoiceInput}
              className="px-3 bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
            >
              <i className="fa-solid fa-microphone"></i>
            </button>
            <button
              onClick={handleSendMessage}
              className="px-4 py-2 bg-pink-600 text-white rounded-r-lg hover:bg-pink-700"
            >
              发送
            </button>
            {isLoadingAI && <p className="text-sm text-gray-500 ml-2">AI 正在思考中...</p>}
          </div>
        </div>
        {/* 嵌入式聊天界面结束 */}
      </main>

      <Footer />
    </div>
  );
}
