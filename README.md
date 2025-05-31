# AI婚恋平台 - 智能匹配你的灵魂伴侣

这是一个基于React + TypeScript + Tailwind CSS构建的AI婚恋平台前端应用，提供智能匹配、用户画像分析和恋爱建议等功能。

## 本地运行指南

### 系统要求
- Node.js 18+
- npm 9+ 或 pnpm 8+
- 现代浏览器(Chrome/Firefox/Edge最新版)

### 安装步骤

1. 克隆项目代码
```bash
git clone https://your-repo-url.git
cd project-directory
```

2. 安装依赖
```bash
pnpm install
# 或使用npm
npm install
```

### 开发模式
```bash
pnpm dev
# 或使用npm
npm run dev
```
开发服务器将启动在 http://localhost:3000

### 生产构建
```bash
pnpm build
# 或使用npm
npm run build
```
构建完成后，静态文件将生成在 `dist/static` 目录

### 测试账号
- 用户名: test@example.com
- 密码: test123

## 功能模块
- 用户画像中心
- 智能匹配系统
- AI恋爱顾问
- 数据分析看板

## 技术栈
- React 18
- TypeScript 5
- Tailwind CSS 3
- React Router 7
- Recharts 2
- Framer Motion 12

## 常见问题
1. 如果遇到依赖安装问题，请尝试删除node_modules后重新安装
2. 开发模式下热更新不工作？尝试重启开发服务器
3. 生产构建失败？检查Node.js版本是否符合要求
