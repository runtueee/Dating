import { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProfileNavigation from "@/components/profile/Navigation";
import BasicInfoForm from "@/components/profile/BasicInfoForm";
import InterestTags from "@/components/profile/InterestTags";
import ProgressBar from "@/components/profile/ProgressBar";
import PersonalityForm from "@/components/profile/PersonalityForm";
import CommunicationStyleForm from "@/components/profile/CommunicationStyleForm";
import RelationshipExpectationsForm from "@/components/profile/RelationshipExpectationsForm";
import DynamicBehaviorForm from "@/components/profile/DynamicBehaviorForm";
import { motion, AnimatePresence } from "framer-motion";

/**
 * @description Profile 页面组件
 * 用户可以在此页面查看和编辑自己的个人资料信息。
 * 页面通过标签页 (Tabs) 组织不同部分的信息，如基本信息、兴趣、个性等。
 */
export default function Profile() {
  // 使用 useState 管理当前激活的标签页，默认为 'basic' (基本信息)
  const [activeTab, setActiveTab] = useState("basic");
  // 使用 useState 管理资料的完成度百分比，默认为 45%
  const [completionRate, setCompletionRate] = useState(45);

  /**
   * @description 处理标签页切换的函数
   * @param tab - 被点击的标签页的标识符 (字符串)
   */
  const handleTabChange = (tab: string) => {
    setActiveTab(tab); // 更新当前激活的标签页状态
  };

  /**
   * @description 更新资料完成度的函数
   * @param rate - 新的完成度百分比 (数字)
   * 这个函数会被各个子表单组件调用，当用户在子表单中完成一部分信息时。
   */
  const updateCompletion = (rate: number) => {
    // 确保完成度在 0 到 100 之间
    setCompletionRate(Math.min(100, Math.max(0, rate)));
    // 如果完成度达到或超过 90%，显示一个成功的通知消息
    if (rate >= 90) {
      toast.success("完成率已达到90%以上！");
    }
  };

  // 定义 framer-motion 的动画变体 (variants) 对象，用于内容区域的切换动画
  const contentVariants = {
    hidden: { opacity: 0, x: 20 },    // 初始状态/进入前：透明，向右偏移 20px
    visible: { opacity: 1, x: 0 },   // 可见状态/进入后：完全不透明，回到原始位置
    exit: { opacity: 0, x: -20 }     // 退出状态/离开时：透明，向左偏移 20px
  };

  // 返回 JSX 结构，用于渲染 Profile 页面的 UI
  return (
    // DndProvider 包裹整个页面，为页面内的组件提供拖放功能的上下文
    // backend={HTML5Backend} 指定使用 HTML5 的拖放 API 作为后端
    <DndProvider backend={HTML5Backend}>
      {/* 页面根 div，设置最小高度为屏幕高度和渐变背景 */}
      <div className="min-h-screen bg-gradient-to-br from-[#FF9A9E] to-[#FAD0C4]">
        <Navbar /> {/* 渲染导航栏组件 */}
        
        {/* 主要内容区域 */}
        <main className="container mx-auto px-4 py-8">
          {/* Flex 布局容器，用于并排显示左侧导航和右侧内容区域
              flex-col: 手机等小屏幕上垂直排列
              md:flex-row: 中等屏幕及以上水平排列
              gap-6: 子元素之间的间距 */}
          <div className="flex flex-col md:flex-row gap-6">
            {/* 左侧区域：包含资料导航菜单和进度条 */}
            {/* w-full: 小屏幕上宽度占满
                md:w-1/3: 中等屏幕上宽度占 1/3
                lg:w-1/4: 大屏幕上宽度占 1/4 */}
            <div className="w-full md:w-1/3 lg:w-1/4">
              <ProfileNavigation 
                activeTab={activeTab}      // 将当前激活的标签页传递给导航组件
                onTabChange={handleTabChange} // 将标签页切换处理函数传递给导航组件
              />
              <ProgressBar rate={completionRate} /> {/* 渲染进度条并传递当前完成度 */}
            </div>
            
            {/* 右侧区域：显示当前激活标签页对应的内容表单 */}
            {/* w-full: 小屏幕上宽度占满
                md:w-2/3: 中等屏幕上宽度占 2/3
                lg:w-3/4: 大屏幕上宽度占 3/4
                bg-white bg-opacity-30 backdrop-blur-md: 毛玻璃效果背景
                rounded-xl p-6 shadow-lg: 圆角、内边距、阴影 */}
            <div className="w-full md:w-2/3 lg:w-3/4 bg-white bg-opacity-30 backdrop-blur-md rounded-xl p-6 shadow-lg">
              {/* AnimatePresence 用于在组件挂载和卸载时应用动画
                  mode="wait": 等待当前组件完全退出后再渲染新组件，避免重叠 */}
              <AnimatePresence mode="wait">
                {/* motion.div 是应用动画的容器，key={activeTab} 很重要，
                    当 key 改变时 (即 activeTab 改变时)，Framer Motion 会认为这是一个新的组件，
                    从而触发进入和退出动画。 */}
                <motion.div
                  key={activeTab}            // 关键属性：确保 activeTab 变化时触发动画
                  initial="hidden"           // 初始动画状态 (参照 contentVariants)
                  animate="visible"          // 激活时的动画状态 (参照 contentVariants)
                  exit="exit"                // 退出时的动画状态 (参照 contentVariants)
                  variants={contentVariants} // 应用预定义的动画变体
                  transition={{ duration: 0.3 }} // 动画持续时间
                >
                  {/* 根据 activeTab 的值条件渲染对应的表单组件 */}
                  {/* 每个表单组件都接收 onUpdate={updateCompletion} prop，
                      这样当表单内信息更新并影响完成度时，可以调用父组件的 updateCompletion 函数 */}
                  {activeTab === "basic" && (
                    <BasicInfoForm onUpdate={updateCompletion} />
                  )}
                  {activeTab === "interests" && (
                    <InterestTags onUpdate={updateCompletion} />
                  )}
                  {activeTab === "personality" && (
                    <PersonalityForm onUpdate={updateCompletion} />
                  )}
                  {activeTab === "communication" && (
                    <CommunicationStyleForm onUpdate={updateCompletion} />
                  )}
                  {activeTab === "expectations" && (
                    <RelationshipExpectationsForm onUpdate={updateCompletion} />
                  )}
                  {activeTab === "behavior" && (
                    <DynamicBehaviorForm onUpdate={updateCompletion} />
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </main>

        <Footer /> {/* 渲染页脚组件 */}
      </div>
    </DndProvider>
  );
}