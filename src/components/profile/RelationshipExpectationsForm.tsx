import { useState, useEffect } from "react";
import { z } from "zod";
import { motion } from "framer-motion";

const expectationsSchema = z.object({
  commitmentLevel: z.string().min(1),
  futurePlans: z.string().min(1),
  dealBreakers: z.array(z.string()).min(1).max(5),
  relationshipGoals: z.string().min(1),
  financialExpectations: z.string().min(1),
});

type ExpectationsData = z.infer<typeof expectationsSchema>;

interface RelationshipExpectationsFormProps {
  onUpdate: (rate: number) => void;
}

const commitmentLevels = ["短期关系", "长期关系", "婚姻导向", "开放关系"];
const futurePlansOptions = ["2年内结婚", "3-5年内结婚", "暂无结婚计划", "不打算结婚"];
const dealBreakersOptions = ["吸烟", "酗酒", "不诚实", "不忠诚", "财务问题", "家庭观念不合", "生活方式差异", "宗教信仰不同"];
const relationshipGoals = ["情感支持", "共同成长", "组建家庭", "事业伙伴", "生活伴侣"];
const financialExpectations = ["AA制", "男方承担更多", "女方承担更多", "共同账户", "各自独立"];

export default function RelationshipExpectationsForm({ onUpdate }: RelationshipExpectationsFormProps) {
  const [formData, setFormData] = useState<Partial<ExpectationsData>>({});
  const [completedFields, setCompletedFields] = useState(0);
  const totalFields = 5;

  useEffect(() => {
    const count = Object.values(formData).filter(v => 
      v !== undefined && v !== "" && (!Array.isArray(v) || v.length > 0)
    ).length;
    setCompletedFields(count);
    onUpdate(Math.floor((count / totalFields) * 100));
  }, [formData, onUpdate]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const toggleDealBreaker = (value: string) => {
    const currentBreakers = Array.isArray(formData.dealBreakers) ? formData.dealBreakers : [];
    const newBreakers = currentBreakers.includes(value)
      ? currentBreakers.filter(v => v !== value)
      : [...currentBreakers, value];
    
    setFormData(prev => ({ ...prev, dealBreakers: newBreakers }));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold mb-6">关系期望</h2>
      
      <div className="space-y-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium">承诺程度</label>
          <select
            name="commitmentLevel"
            value={formData.commitmentLevel || ""}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-pink-500 focus:border-pink-500"
          >
            <option value="">请选择</option>
            {commitmentLevels.map(level => (
              <option key={level} value={level}>{level}</option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">未来计划</label>
          <select
            name="futurePlans"
            value={formData.futurePlans || ""}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-pink-500 focus:border-pink-500"
          >
            <option value="">请选择</option>
            {futurePlansOptions.map(plan => (
              <option key={plan} value={plan}>{plan}</option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">不能接受的行为 (选择1-5项)</label>
          <div className="flex flex-wrap gap-2">
            {dealBreakersOptions.map(breaker => (
              <button
                key={breaker}
                type="button"
                onClick={() => toggleDealBreaker(breaker)}
                className={`px-3 py-1 rounded-full text-sm ${
                  formData.dealBreakers?.includes(breaker)
                    ? "bg-pink-600 text-white"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                {breaker}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">关系目标</label>
          <select
            name="relationshipGoals"
            value={formData.relationshipGoals || ""}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-pink-500 focus:border-pink-500"
          >
            <option value="">请选择</option>
            {relationshipGoals.map(goal => (
              <option key={goal} value={goal}>{goal}</option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">财务期望</label>
          <select
            name="financialExpectations"
            value={formData.financialExpectations || ""}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-pink-500 focus:border-pink-500"
          >
            <option value="">请选择</option>
            {financialExpectations.map(expectation => (
              <option key={expectation} value={expectation}>{expectation}</option>
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