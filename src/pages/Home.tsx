import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PetalAnimation from "@/components/PetalAnimation";

/**
 * @description Home 页面组件
 * 这是应用的主页，通常是用户访问时看到的第一个页面。
 * 它展示了应用的标题、标语以及主要功能的导航入口。
 */
export default function Home() {
  // 定义应用的主要功能特性列表
  // 每个特性包含名称 (name)、跳转路径 (path) 和一个图标类名 (icon)
  // 这些图标类名看起来像是 Font Awesome 图标库的类
  const features = [
    { name: "画像中心", path: "/profile", icon: "fa-regular fa-user" },
    { name: "智能匹配", path: "/matching", icon: "fa-solid fa-heart" },
    { name: "AI顾问", path: "/advisor", icon: "fa-solid fa-robot" },
    { name: "数据看板", path: "/dashboard", icon: "fa-solid fa-chart-line" },
  ];

  // 返回 JSX 结构，用于渲染 Home 页面的 UI
  return (
    // 根 div 元素，设置最小高度为屏幕高度，并应用渐变背景色
    // className 中的是 Tailwind CSS 类名
    // min-h-screen: 最小高度为100vh (视口高度)
    // bg-gradient-to-br: 背景从左上到右下渐变
    // from-[#FF9A9E] to-[#FAD0C4]: 渐变的起始颜色和结束颜色
    <div className="min-h-screen bg-gradient-to-br from-[#FF9A9E] to-[#FAD0C4]">
      {/* 渲染花瓣飘落动画组件 */}
      <PetalAnimation />
      {/* 渲染导航栏组件 */}
      <Navbar />
      
      {/* 主要内容区域 */}
      {/* container: Tailwind CSS 类，设置最大宽度并居中
          mx-auto: 水平居中
          px-4: 水平内边距
          py-20: 垂直内边距
          flex flex-col items-center justify-center: flex 布局，垂直排列，项目居中，内容居中
          min-h-[70vh]: 最小高度为视口高度的70% */}
      <main className="container mx-auto px-4 py-20 flex flex-col items-center justify-center min-h-[70vh]">
        {/* 使用 motion.div 创建一个带动画的 div 容器，用于包裹标题和标语 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} // 初始状态：透明，向下偏移20px
          animate={{ opacity: 1, y: 0 }}   // 动画到：完全不透明，回到原始位置
          transition={{ duration: 0.8 }} // 动画持续时间：0.8秒
          className="text-center mb-12" // 文本居中，下外边距
        >
          {/* 网站主标题 */}
          {/* style 属性内联定义了字体，这里使用了 'Alibaba PuHuiTi' 和一个通用无衬线字体作为备选 */}
          <h1 className="text-5xl font-bold mb-4" style={{ fontFamily: "'Alibaba PuHuiTi', sans-serif" }}>
            找到你的灵魂伴侣
          </h1>
          {/* 网站标语/副标题 */}
          {/* style 属性内联定义了字体，这里使用了 'Ma Shan Zheng' 和一个通用草书字体作为备选 */}
          <p className="text-2xl italic" style={{ fontFamily: "'Ma Shan Zheng', cursive" }}>
            AI驱动的智能匹配平台
          </p>
        </motion.div>

        {/* 功能特性展示区域 */}
        {/* grid: 使用 CSS Grid 布局
            grid-cols-1: 默认单列布局
            md:grid-cols-2: 中等屏幕 (md breakpoint) 及以上为两列
            lg:grid-cols-4: 大屏幕 (lg breakpoint) 及以上为四列
            gap-8: grid 子项之间的间距
            w-full: 宽度100%
            max-w-4xl: 最大宽度 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-4xl">
          {/* 遍历 features 数组，为每个特性创建一个可点击的卡片 */}
          {features.map((feature, index) => (
            // 为每个卡片使用 motion.div 实现入场动画和悬停效果
            <motion.div
              key={feature.name} // React 列表渲染需要的唯一 key
              initial={{ opacity: 0, y: 20 }} // 初始状态
              animate={{ opacity: 1, y: 0 }}   // 动画目标状态
              // transition: 定义动画过渡效果
              // delay: 延迟执行动画，通过 index 实现卡片依次出现的效果
              // duration: 动画持续时间
              transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.05 }} // 鼠标悬停时，卡片放大 1.05 倍
              // className: 卡片的样式
              // bg-white bg-opacity-30: 白色背景，30%透明度 (毛玻璃效果)
              // backdrop-blur-md: 背景模糊效果
              // rounded-xl: 圆角
              // p-6: 内边距
              // shadow-lg: 较大阴影
              // cursor-pointer: 鼠标指针为手型
              // hover:bg-opacity-50: 悬停时背景透明度变为 50%
              // transition-all: 所有CSS属性过渡平滑
              className="bg-white bg-opacity-30 backdrop-blur-md rounded-xl p-6 shadow-lg cursor-pointer hover:bg-opacity-50 transition-all"
              // onClick 事件处理：点击卡片时，跳转到 feature.path 指定的路径
              // window.location.href 用于页面跳转
              onClick={() => window.location.href = feature.path}
            >
              {/* 卡片内部内容 */}
              <div className="flex flex-col items-center text-center"> {/* Flex 布局，垂直排列，内容居中 */}
                {/* 特性图标，使用 <i> 标签和 Font Awesome 类名 */}
                <i className={`${feature.icon} text-4xl mb-4 text-pink-600`}></i>
                {/* 特性名称 */}
                <h3 className="text-xl font-semibold mb-2">{feature.name}</h3>
                {/* 提示文字 */}
                <p className="text-sm">点击进入</p>
              </div>
            </motion.div>
          ))}
        </div>
      </main>

      {/* 渲染页脚组件 */}
      <Footer />
    </div>
  );
}