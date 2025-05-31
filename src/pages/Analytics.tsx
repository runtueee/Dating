import { useState } from "react";
import { 
  calculateBasicInfoMatch,
  calculateInterestsMatch,
  calculatePersonalityMatch
} from "@/lib/matchingAlgorithm";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { 
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Tooltip, 
  ResponsiveContainer, LineChart, Line, PieChart, Pie, BarChart, Bar, 
  Legend, CartesianGrid, Cell, Treemap, XAxis, YAxis 
} from "recharts";
import { toast } from "sonner";

// 匹配维度
const dimensions = ["基础属性", "兴趣偏好", "性格价值观", "沟通风格", "关系期望", "动态行为"];

// 使用真实用户数据计算匹配度
const calculateMatchScores = () => {
  // 获取当前用户数据 (实际应用中应从状态管理或API获取)
  const currentUser = {
    basicInfo: {
      age: 28,
      height: 170,
      education: "本科",
      income: "20-50万",
      job: "工程师",
      marriageView: "追求稳定关系"
    },
    interests: ["登山", "钢琴"],
    personality: {
      personalityType: "ENFP",
      values: ["自由", "创造力"],
      communicationStyle: "直接",
      conflictResolution: "沟通",
      emotionalNeeds: "理解与支持"
    },
    // 其他数据...
  };
  
  // 计算各维度匹配度 (这里简化计算，实际应用会更复杂)
  return [
    { dimension: "基础属性", score: Math.floor(calculateBasicInfoMatch(currentUser.basicInfo, currentUser.basicInfo) * 100), completion: 92 },
    { dimension: "兴趣偏好", score: Math.floor(calculateInterestsMatch(currentUser.interests, currentUser.interests) * 100), completion: 85 },
    { dimension: "性格价值观", score: Math.floor(calculatePersonalityMatch(currentUser.personality, currentUser.personality) * 100), completion: 97 },
    // 其他维度...
  ].filter(item => dimensions.includes(item.dimension));
};

const radarData = calculateMatchScores();

const trendData = [
  { date: '1月', 匹配度: 65 },
  { date: '2月', 匹配度: 72 },
  { date: '3月', 匹配度: 78 },
  { date: '4月', 匹配度: 82 },
  { date: '5月', 匹配度: 88 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#FF6B6B'];

export default function Analytics() {
  const [activeDimension, setActiveDimension] = useState(0);

  const handleDimensionChange = (index: number) => {
    setActiveDimension(index);
  };

  const handleExport = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "维度,匹配度,完成度\n" 
      + radarData.map(d => `${d.dimension},${d.score},${d.completion}`).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "匹配度数据.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success("数据已导出为CSV文件");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FF9A9E] to-[#FAD0C4]">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="bg-white bg-opacity-30 backdrop-blur-md rounded-xl p-6 shadow-lg mb-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">数据看板</h1>
            <button 
              onClick={handleExport}
              className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700"
            >
              <i className="fa-solid fa-download mr-2"></i>导出数据
            </button>
          </div>
          
          {/* 维度选择器 */}
          <div className="flex flex-wrap gap-2 mb-8">
            {dimensions.map((dimension, index) => (
              <button
                key={dimension}
                onClick={() => handleDimensionChange(index)}
                className={`px-4 py-2 rounded-full transition-colors ${
                  activeDimension === index
                    ? "bg-pink-600 text-white"
                    : "bg-white bg-opacity-50 hover:bg-opacity-70"
                }`}
              >
                {dimension}
              </button>
            ))}
          </div>

          {/* 第一行图表 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* 雷达图 */}
            <div className="bg-white bg-opacity-50 rounded-xl p-4 h-96">
              <h2 className="text-xl font-semibold mb-4">维度匹配度雷达图</h2>
              <ResponsiveContainer width="100%" height="90%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="dimension" />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} />
                  <Radar
                    name="匹配度"
                    dataKey="score"
                    stroke="#F43F5E"
                    fill="#F43F5E"
                    fillOpacity={0.6}
                  />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            {/* 趋势图 */}
            <div className="bg-white bg-opacity-50 rounded-xl p-4 h-96">
              <h2 className="text-xl font-semibold mb-4">匹配度趋势</h2>
              <ResponsiveContainer width="100%" height="90%">
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="匹配度"
                    stroke="#8884d8"
                    strokeWidth={2}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* 第二行图表 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* 完成度饼图 */}
            <div className="bg-white bg-opacity-50 rounded-xl p-4 h-96">
              <h2 className="text-xl font-semibold mb-4">维度完成度</h2>
              <ResponsiveContainer width="100%" height="90%">
                <PieChart>
                  <Pie
                    data={radarData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="completion"
                    nameKey="dimension"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {radarData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* 详细数据表格 */}
            <div className="bg-white bg-opacity-50 rounded-xl p-4">
              <h2 className="text-xl font-semibold mb-4">详细数据</h2>
              <div className="overflow-auto max-h-96">
                <table className="w-full">
                  <thead className="sticky top-0 bg-white">
                    <tr>
                      <th className="p-2 text-left">维度</th>
                      <th className="p-2 text-right">匹配度</th>
                      <th className="p-2 text-right">完成度</th>
                    </tr>
                  </thead>
                  <tbody>
                    {radarData.map((item, index) => (
                      <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="p-2">{item.dimension}</td>
                        <td className="p-2 text-right">{item.score}</td>
                        <td className="p-2 text-right">{item.completion}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        
        {/* 匹配算法说明 */}
        <div className="bg-white bg-opacity-50 rounded-xl p-6 mt-6">
          <h2 className="text-xl font-semibold mb-4">匹配算法说明</h2>
          <div className="prose">
            <h3>匹配值计算逻辑：</h3>
            <ul>
              <li><strong>基础属性(20%)</strong>: 年龄、身高、教育程度、收入等</li>
              <li><strong>兴趣偏好(15%)</strong>: 共同兴趣标签数量占比</li>
              <li><strong>性格价值观(25%)</strong>: MBTI类型、核心价值观匹配</li>
              <li><strong>沟通风格(15%)</strong>: 沟通方式和冲突处理方式</li>
              <li><strong>关系期望(15%)</strong>: 未来计划和承诺程度</li>
              <li><strong>动态行为(10%)</strong>: 日常行为模式和适应能力</li>
            </ul>
            <p>综合匹配度 = Σ(各维度匹配分 × 权重)</p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}