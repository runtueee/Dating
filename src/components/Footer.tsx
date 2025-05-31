/**
 * @description Footer 组件 (页脚)
 * 这个组件负责显示应用的底部页脚区域，通常包含版权信息等。
 */
export default function Footer() {
  // 返回 JSX 结构，用于渲染页脚的 UI
  return (
    // <footer> HTML 语义化标签，表示页脚区域
    // className: 使用 Tailwind CSS 设置样式
    // bg-white bg-opacity-20: 白色背景，20% 透明度，实现毛玻璃效果
    // backdrop-blur-md: 背景模糊效果
    // py-6: 垂直内边距
    // mt-auto: 此类通常用于 Flexbox 或 Grid 布局的子元素，
    //          如果父容器是 flex 容器且方向为 column，它可以将页脚推到底部。
    //          需要确保其父容器有足够的空间且正确设置了 flex 属性。
    <footer className="bg-white bg-opacity-20 backdrop-blur-md py-6 mt-auto">
      {/* container: Tailwind CSS 类，设置最大宽度并居中
          mx-auto: 水平居中
          px-4: 水平内边距
          text-center: 文本居中 */}
      <div className="container mx-auto px-4 text-center">
        {/* 版权信息文本 */}
        {/* text-sm: 较小字体 */}
        <p className="text-sm">
          {/* 使用 JavaScript 的 Date 对象动态获取当前年份 */}
          © {new Date().getFullYear()} 青鸾. 保留所有权利.
        </p>
      </div>
    </footer>
  );
}