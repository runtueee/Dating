import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs = [
  { id: "basic", name: "基础属性", icon: "fa-solid fa-user" },
  { id: "interests", name: "兴趣标签", icon: "fa-solid fa-heart" },
  { id: "personality", name: "性格价值观", icon: "fa-solid fa-brain" },
  { id: "communication", name: "沟通风格", icon: "fa-solid fa-comments" },
  { id: "expectations", name: "关系期望", icon: "fa-solid fa-handshake" },
  { id: "behavior", name: "动态行为", icon: "fa-solid fa-chart-line" },
];

const tabVariants = {
  hover: { scale: 1.02 },
  tap: { scale: 0.98 },
};

export default function ProfileNavigation({ activeTab, onTabChange }: NavigationProps) {
  return (
    <motion.div 
      className="bg-white bg-opacity-30 backdrop-blur-md rounded-xl p-4 shadow-lg mb-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-lg font-semibold mb-4 text-center">用户画像中心</h3>
      <nav>
        <ul className="space-y-2">
          {tabs.map((tab) => (
            <motion.li 
              key={tab.id}
              variants={tabVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <button
                onClick={() => onTabChange(tab.id)}
                className={cn(
                  "w-full text-left px-4 py-2 rounded-lg transition-colors",
                  activeTab === tab.id
                    ? "bg-pink-600 text-white"
                    : "hover:bg-pink-100 hover:bg-opacity-50"
                )}
              >
                <i className={`${tab.icon} mr-2`}></i>
                {tab.name}
              </button>
            </motion.li>
          ))}
        </ul>
      </nav>
    </motion.div>
  );
}