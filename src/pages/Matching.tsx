import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toast } from "sonner";

interface UserCard {
  id: string;
  name: string;
  age: number;
  matchScore: number;
  topInterest: string;
  personalityType: string;
  photo: string;
  location: string;
  job: string;
}

const personalityTypes = ["ENFP", "ISTJ", "INTP", "ESFJ", "ENTJ", "ISFP", "ENFJ", "ISTP"];

export default function Matching() {
  const [users, setUsers] = useState<UserCard[]>([]);
  const [filter, setFilter] = useState({
    personalityType: "",
    minScore: 0,
    maxAge: 100
  });

  useEffect(() => {
    const generateMockUsers = (count: number): UserCard[] => {
      const names = ["张", "李", "王", "刘", "陈", "杨", "赵", "黄", "周", "吴"];
      const surnames = ["明", "华", "芳", "强", "伟", "秀英", "娜", "磊", "静", "军"];
      const jobs = ["设计师", "工程师", "教师", "医生", "律师", "会计师", "作家", "摄影师", "厨师", "自由职业"];
      const locations = ["北京", "上海", "广州", "深圳", "杭州", "成都", "武汉", "南京", "西安", "重庆"];
      const interests = ["登山", "钢琴", "烘焙", "摄影", "阅读", "旅行", "健身", "绘画", "编程", "电影"];
      
      return Array.from({ length: count }, (_, i) => ({
        id: (i + 1).toString(),
        name: `${names[i % names.length]}${surnames[i % surnames.length]}`,
        age: Math.floor(Math.random() * 15) + 22,
        matchScore: Math.floor(Math.random() * 30) + 70,
        topInterest: interests[i % interests.length],
        personalityType: personalityTypes[Math.floor(Math.random() * personalityTypes.length)],
        photo: `https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=%24%7Bi&sign=be726a5eb7a3b529d30cd3b3503feea7 % 2 === 0 ? 'handsome asian man' : 'beautiful asian woman'}&sign=${Math.random().toString(36).substring(2)}`,
        location: locations[i % locations.length],
        job: jobs[i % jobs.length]
      }));
    };

    setUsers(generateMockUsers(30));
  }, []);

  const filteredUsers = users.filter(user => {
    return (
      (filter.personalityType === "" || user.personalityType === filter.personalityType) &&
      user.matchScore >= filter.minScore &&
      user.age <= filter.maxAge
    );
  });

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilter(prev => ({
      ...prev,
      [name]: name === "minScore" || name === "maxAge" ? Number(value) : value
    }));
  };

  const handleCardClick = (userId: string) => {
    toast.info(`查看用户 ${userId} 的详情`);
    // 实际应用中这里可以导航到用户详情页
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FF9A9E] to-[#FAD0C4]">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="bg-white bg-opacity-30 backdrop-blur-md rounded-xl p-4 shadow-lg sticky top-4 z-10 mb-6">
          <h2 className="text-xl font-bold mb-4">匹配筛选</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">性格类型</label>
              <select
                name="personalityType"
                value={filter.personalityType}
                onChange={handleFilterChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-pink-500 focus:border-pink-500"
              >
                <option value="">全部</option>
                {personalityTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">最低匹配分 ({filter.minScore})</label>
              <input
                type="range"
                name="minScore"
                min="0"
                max="100"
                value={filter.minScore}
                onChange={handleFilterChange}
                className="w-full"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">最大年龄 ({filter.maxAge})</label>
              <input
                type="range"
                name="maxAge"
                min="18"
                max="100"
                value={filter.maxAge}
                onChange={handleFilterChange}
                className="w-full"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredUsers.map((user, index) => (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => handleCardClick(user.id)}
              className="bg-white bg-opacity-50 backdrop-blur-md rounded-xl p-4 shadow-lg cursor-pointer hover:bg-opacity-70 transition-all"
            >
              <div className="flex items-start space-x-3">
                <img 
                  src={user.photo} 
                  alt={user.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold truncate">{user.name}, {user.age}</h3>
                  <p className="text-sm text-gray-600 truncate">{user.job} · {user.location}</p>
                  <div className="mt-1">
                    <span 
                      className="inline-block px-2 py-1 rounded-full text-xs font-medium"
                      style={{
                        background: `linear-gradient(to right, 
                          hsl(${(1 - user.matchScore/100) * 120}, 100%, 70%), 
                          hsl(${user.matchScore/100 * 120}, 100%, 70%))`,
                        color: user.matchScore > 50 ? 'white' : 'black'
                      }}
                    >
                      匹配度: {user.matchScore}%
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="mt-3">
                <p className="text-xs text-gray-600 truncate">
                  <i className="fa-solid fa-heart text-pink-500 mr-1"></i>
                  {user.topInterest}
                </p>
                <p className="text-xs text-gray-600 mt-1 truncate">
                  <i className="fa-solid fa-brain text-blue-500 mr-1"></i>
                  {user.personalityType}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
