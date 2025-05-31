import { useState, useEffect } from "react";
import { z } from "zod";
import { motion } from "framer-motion";

const behaviorSchema = z.object({
  decisionMaking: z.string().min(1),
  stressResponse: z.string().min(1),
  socialBehavior: z.string().min(1),
  changeAdaptability: z.string().min(1),
  dailyRoutine: z.string().min(1),
});

type BehaviorData = z.infer<typeof behaviorSchema>;

interface DynamicBehaviorFormProps {
  onUpdate: (rate: number) => void;
}

const decisionMakingStyles = ["理性分析", "直觉判断", "咨询他人", "拖延决定"];
const stressResponses = ["积极应对", "情绪宣泄", "回避问题", "寻求支持"];
const socialBehaviors = ["外向活跃", "内向安静", "选择性社交", "独处偏好"];
const adaptabilityLevels = ["快速适应", "逐步适应", "抗拒变化", "视情况而定"];
const dailyRoutines = ["高度规律", "适度规律", "灵活安排", "随性而为"];

export default function DynamicBehaviorForm({ onUpdate }: DynamicBehaviorFormProps) {
  const [formData, setFormData] = useState<Partial<BehaviorData>>({});
  const [completedFields, setCompletedFields] = useState(0);
  const totalFields = 5;

  useEffect(() => {
    const count = Object.values(formData).filter(v => v !== undefined && v !== "").length;
    setCompletedFields(count);
    onUpdate(Math.floor((count / totalFields) * 100));
  }, [formData, onUpdate]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold mb-6">动态行为</h2>
      
      <div className="space-y-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium">决策风格</label>
          <select
            name="decisionMaking"
            value={formData.decisionMaking || ""}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-pink-500 focus:border-pink-500"
          >
            <option value="">请选择</option>
            {decisionMakingStyles.map(style => (
              <option key={style} value={style}>{style}</option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">压力反应</label>
          <select
            name="stressResponse"
            value={formData.stressResponse || ""}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-pink-500 focus:border-pink-500"
          >
            <option value="">请选择</option>
            {stressResponses.map(response => (
              <option key={response} value={response}>{response}</option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">社交行为</label>
          <select
            name="socialBehavior"
            value={formData.socialBehavior || ""}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-pink-500 focus:border-pink-500"
          >
            <option value="">请选择</option>
            {socialBehaviors.map(behavior => (
              <option key={behavior} value={behavior}>{behavior}</option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">变化适应能力</label>
          <select
            name="changeAdaptability"
            value={formData.changeAdaptability || ""}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-pink-500 focus:border-pink-500"
          >
            <option value="">请选择</option>
            {adaptabilityLevels.map(level => (
              <option key={level} value={level}>{level}</option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">日常生活习惯</label>
          <select
            name="dailyRoutine"
            value={formData.dailyRoutine || ""}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-pink-500 focus:border-pink-500"
          >
            <option value="">请选择</option>
            {dailyRoutines.map(routine => (
              <option key={routine} value={routine}>{routine}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-6 text-sm text-gray-600">
        已完成 {completedFields}/{totalFields} 项 ({Math.floor((completedFields / totalFields) * 100)}%)
      </div>
    </motion.div>
  );
}