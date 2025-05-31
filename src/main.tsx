// 从 'react' 导入 StrictMode 组件
// StrictMode 是一个开发模式下的辅助工具，用于突出显示应用程序中潜在的问题。
// 它不会渲染任何可见的 UI，只对其后代元素进行额外的检查和警告。
import { StrictMode } from "react";

// 从 'react-dom/client' 导入 createRoot 方法
// createRoot 是 React 18 引入的新的根 API，用于在浏览器 DOM 中创建 React 应用的根节点。
import { createRoot } from "react-dom/client";

// 从 'react-router-dom' 导入 BrowserRouter 组件
// BrowserRouter 是一个使用 HTML5 history API (pushState, replaceState 和 popstate 事件)
// 来保持 UI 与 URL 同步的路由器组件。它是构建单页面应用路由的基础。
import { BrowserRouter } from "react-router-dom";

// 从 'sonner' 导入 Toaster 组件
// 'sonner' 可能是一个用于显示通知（toast notifications）的库。
// Toaster 组件通常是这些通知的容器，需要在应用的顶层某个地方渲染。
import { Toaster } from 'sonner';

// 导入应用的根组件 App
// './App.tsx' 表示从当前目录导入 App.tsx 文件。
import App from "./App.tsx";

// 导入全局 CSS 样式
// './index.css' 文件中通常包含应用的全局样式或者Tailwind CSS的基础指令。
import "./index.css";

// 使用 createRoot 创建应用的根节点
// document.getElementById("root")! 用于获取 HTML 文件 (通常是 index.html) 中 ID 为 "root" 的 DOM 元素。
// 感叹号 '!' 是 TypeScript 的非空断言操作符，告诉编译器这个表达式的结果不会是 null 或 undefined。
// 这是一个常见的模式，因为我们通常能确保 index.html 中存在 <div id="root"></div>。
createRoot(document.getElementById("root")!).render(
  // <StrictMode> 包裹整个应用或其一部分，以启用额外的开发时检查。
  <StrictMode>
    {/* <BrowserRouter> 包裹应用的主组件 App，使其内部可以使用 React Router 的路由功能。 */}
    <BrowserRouter>
      {/* 渲染应用的根组件 App */}
      <App />
      {/* 渲染 Toaster 组件，使其可以在应用的任何地方显示通知 */}
      {/* 将 Toaster 放在这里可以确保它在应用的顶层，并且能够覆盖其他内容。 */}
      <Toaster />
    </BrowserRouter>
  </StrictMode>
);
