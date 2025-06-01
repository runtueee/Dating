// api/coze-chat.js
// 注意：在 Vercel Serverless 环境中，dotenv 通常不需要手动 require().config()，环境变量会自动加载。
// 保留这行可以用于本地开发测试，但在 Vercel 上它可能不起作用或被忽略。
// require('dotenv').config();

// 不再需要 express
// const express = require('express');
// const app = express();

const axios = require('axios'); // 或者使用 fetch，根据你的实际代码选择保留哪个
const fetch = require('node-fetch');
// 不再需要 cors，Vercel 会处理 CORS 或你可以在函数内部设置 header
// const cors = require('cors');

// Serverless Function 导出一个异步请求处理函数 (req, res)
module.exports = async (req, res) => {

  // --- 设置 CORS Headers ---
  // 尽管 Vercel 可能会处理，显式设置更保险
  res.setHeader('Access-Control-Allow-Origin', '*'); // 允许所有来源，生产环境应限制为你的前端域名
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS'); // 允许的 HTTP 方法
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type'); // 允许的请求头

  // 处理 OPTIONS 请求 (CORS 预检请求)
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // 只接受 POST 请求
  if (req.method !== 'POST') {
    res.status(405).send('Method Not Allowed');
    return;
  }

  // --- 解析请求体 ---
  // Vercel @vercel/node builder 会尝试解析 JSON, Form, etc.
  // 请求体数据通常在 req.body 中可用
  const userMessage = req.body.message;

  // --- 新增的调试日志 ---
  console.log("--- DEBUGGING ENVIRONMENT VARIABLES ---");
  console.log("Raw process.env.COZE_BOT_ID:", process.env.COZE_BOT_ID);
  console.log("Type of process.env.COZE_BOT_ID:", typeof process.env.COZE_BOT_ID);
  console.log("Raw process.env.COZE_API_KEY:", process.env.COZE_API_KEY);
  console.log("Type of process.env.COZE_API_KEY:", typeof process.env.COZE_API_KEY);
  console.log("--- END DEBUGGING ---");
  // --- 结束新增的调试日志 ---


  // 如果用户消息为空，就返回错误
  if (!userMessage) {
    res.status(400).json({ error: '消息内容不能为空' });
    return; // Serverless Function 中需要返回或结束响应
  }

  // 从环境变量中获取 Coze Bot ID 和 API Key
  const cozeBotId = process.env.COZE_BOT_ID;
  const cozeApiKey = process.env.COZE_API_KEY;

  // 检查环境变量是否配置正确
  if (!cozeBotId || !cozeApiKey) {
    console.error('Coze Bot ID 或 API Key 未在环境变量中配置。');
    res.status(500).json({ error: '服务器配置错误：AI服务密钥未设置' });
    return; // Serverless Function 中需要返回或结束响应
  }

  try {
    // 在服务器的控制台打印日志，方便调试
    console.log(`准备发送给 Coze：用户说 - "${userMessage}"`);

    // 使用 fetch 或 axios 向 Coze API 发送 POST 请求
    // 保留你后端实际使用的库（fetch 或 axios），移除另一个
    const cozeResponse = await fetch(`https://api.coze.com/open_api/v0.1/chat/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${cozeApiKey}`,
        'Accept': '*/*', // Coze 文档中的 Accept 头
        'Host': 'api.coze.com' // Coze 文档中的 Host 头
      },
      body: JSON.stringify({
        bot_id: cozeBotId,
        user_id: "user123", // 可以使用动态的用户ID
        stream: false, // 这里设置为 false，获取完整回复
        additional_messages: [
          {
            role: "user",
            content: userMessage
          }
        ]
      }),
    });


    if (!cozeResponse.ok) {
      const errorData = await cozeResponse.json().catch(() => ({ error: 'Coze API returned invalid response' }));
      console.error('Coze API error details:', errorData); // 打印更多错误详情
      res.status(cozeResponse.status).json({ error: `Coze API 错误: ${errorData.msg || errorData.message || cozeResponse.statusText}` });
      return; // Serverless Function 中需要返回或结束响应
    }

    // 处理 Coze API 响应
    const cozeData = await cozeResponse.json();

    // 根据 Coze API 非流式响应的文档来提取回复内容
    // 假设回复在 data.messages 数组中的某个元素的 content 字段
    // 你需要根据实际的 Coze API 响应结构来调整这里
    // 例如，如果响应是 { "messages": [{ "content": "...", "type": "answer" }] }
    const aiReply = cozeData.messages
      ?.filter(msg => msg.type === 'answer' || msg.type === 'message') // 过滤出回复类型
      ?.map(msg => msg.content) // 提取内容
      ?.join('\\n') // 如果有多个消息内容，用换行符连接
      || 'AI 未能提供回复。';


    console.log(`从 Coze 提取并准备回复：AI 说 - "${aiReply}"`);
    res.status(200).json({ reply: aiReply }); // 向前端返回 AI 回复

  } catch (error) {
    // 如果调用 Coze API 或处理过程中出错了
    console.error('调用 Coze API 或处理响应出错:', error);
    // 向前端返回一个错误信息
    res.status(500).json({
      error: '从AI获取回复失败',
      details: error.message
    });
  }
  // Serverless Function 不需要 app.listen()
  // app.listen(PORT, () => { ... });
};