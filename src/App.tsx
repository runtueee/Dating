import { Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import Profile from "@/pages/Profile";
import Matching from "@/pages/Matching";
import Analytics from "@/pages/Analytics";
import Advisor from "@/pages/Advisor";
import { createContext, useState } from "react";

/**
 * @description 认证上下文 (Authentication Context)
 * 用于在应用的组件树中共享用户的认证状态和相关的操作函数。
 *
 * @property isAuthenticated - 布尔值，表示用户是否已认证。
 * @property setIsAuthenticated - 函数，用于更新用户的认证状态。
 * @property logout - 函数，用于执行用户登出操作。
 */
export const AuthContext = createContext({
  isAuthenticated: false, // 默认情况下，用户未认证
  // 定义 setIsAuthenticated 函数的类型，它接收一个布尔值并且不返回任何内容
  setIsAuthenticated: (value: boolean) => {},
  // 定义 logout 函数的类型，它不接收参数也不返回任何内容
  logout: () => {},
});

/**
 * @description 应用的根组件 (App Component)
 * 这个组件设置了应用的整体结构，包括路由和认证上下文的提供者。
 */
export default function App() {
  // 使用 useState Hook 来管理用户的认证状态
  // isAuthenticated: 当前的认证状态 (布尔值)
  // setIsAuthenticated: 更新认证状态的函数
  const [isAuthenticated, setIsAuthenticated] = useState(false); // 初始状态为未认证

  /**
   * @description 用户登出函数
   * 将用户的认证状态设置为 false。
   */
  const logout = () => {
    setIsAuthenticated(false); // 更新认证状态为未认证
  };

  // 返回 JSX 结构，用于渲染UI
  return (
    // AuthContext.Provider 用于将其 value 属性中提供的值（认证状态和相关函数）
    // 传递给其所有子组件，使得子组件可以通过 useContext Hook 来访问这些值。
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, logout }}
    >
      {/* Routes 组件是所有路由定义的容器 */}
      <Routes>
        {/* 定义应用的各个路由规则 */}
        {/* Route 组件用于定义单个路由 */}
        {/* path 属性指定 URL 路径 */}
        {/* element 属性指定当路径匹配时要渲染的组件 */}
        <Route path="/" element={<Home />} /> {/* 根路径，渲染 Home 组件 */}
        <Route path="/profile" element={<Profile />} /> {/* /profile 路径，渲染 Profile 组件 */}
        <Route path="/matching" element={<Matching />} /> {/* /matching 路径，渲染 Matching 组件 */}
        <Route path="/analytics" element={<Analytics />} /> {/* /analytics 路径，渲染 Analytics 组件 */}
        {/* 注意：/dashboard 和 /analytics 都渲染 Analytics 组件，这可能是故意的，也可能是一个可以优化的地方 */}
        <Route path="/dashboard" element={<Analytics />} />
        <Route path="/advisor" element={<Advisor />} /> {/* /advisor 路径，渲染 Advisor 组件 */}
      </Routes>
    </AuthContext.Provider>
  );
}
