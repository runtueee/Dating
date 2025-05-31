import { useContext } from "react";
import { AuthContext } from "@/App";

/**
 * @description Navbar 组件 (导航栏)
 * 这个组件负责显示应用的顶部导航栏，包括 Logo/应用名称以及用户认证相关的操作。
 */
export default function Navbar() {
  // 使用 useContext Hook 来获取 AuthContext 的当前值。
  // 解构赋值获取 isAuthenticated (布尔值，表示用户是否已认证) 和 logout (登出函数)。
  const { isAuthenticated, logout } = useContext(AuthContext);

  // 返回 JSX 结构，用于渲染导航栏的 UI
  return (
    // <nav> HTML 语义化标签，表示导航链接的区域
    // className: 使用 Tailwind CSS 设置样式
    // bg-white bg-opacity-20: 白色背景，20% 透明度，实现毛玻璃效果
    // backdrop-blur-md: 背景模糊效果
    // p-4: 内边距
    // shadow-sm: 较小的阴影
    <nav className="bg-white bg-opacity-20 backdrop-blur-md p-4 shadow-sm">
      {/* container: Tailwind CSS 类，设置最大宽度并居中
          mx-auto: 水平居中
          flex: 启用 Flexbox 布局
          justify-between: 子元素在主轴上两端对齐（Logo/名称在左，按钮在右）
          items-center: 子元素在交叉轴上居中对齐 */}
      <div className="container mx-auto flex justify-between items-center">
        {/* 左侧区域：Logo 和应用名称 */}
        {/* flex items-center: 使得 Logo 和名称在同一行并垂直居中 */}
        <div className="flex items-center">
          {/* Logo 占位符：一个粉色的圆形 div */}
          {/* w-10 h-10: 宽度和高度
              rounded-full: 完全圆形
              bg-pink-500: 粉色背景
              mr-3: 右外边距 */}
          <div className="w-10 h-10 rounded-full bg-pink-500 mr-3"></div>
          {/* 应用名称 */}
          {/* text-xl: 字体大小
              font-bold: 字体加粗 */}
          <span className="text-xl font-bold">青鸾</span>
        </div>

        {/* 右侧区域：认证按钮 */}
        <div>
          {/* 条件渲染：根据 isAuthenticated 的状态显示不同的按钮 */}
          {isAuthenticated ? (
            // 如果用户已认证 (isAuthenticated 为 true)，显示"退出登录"按钮
            <button 
              onClick={logout} // 点击按钮时调用从 AuthContext 获取的 logout 函数
              // className: 按钮样式
              // px-4 py-2: 水平方向和垂直方向的内边距
              // rounded-full: 完全圆形
              // bg-pink-600: 粉色背景
              // text-white: 文字颜色为白色
              // hover:bg-pink-700: 鼠标悬停时背景颜色变深
              // transition-colors: 颜色变化时有过渡效果
              className="px-4 py-2 rounded-full bg-pink-600 text-white hover:bg-pink-700 transition-colors"
            >
              退出登录
            </button>
          ) : (
            // 如果用户未认证 (isAuthenticated 为 false)，显示"登录/注册"按钮
            // 注意：这个按钮目前没有绑定 onClick 事件，点击它不会有实际操作。
            // 在实际应用中，这里应该导航到登录/注册页面或弹出一个登录/注册模态框。
            <button className="px-4 py-2 rounded-full bg-pink-600 text-white hover:bg-pink-700 transition-colors">
              登录/注册
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}