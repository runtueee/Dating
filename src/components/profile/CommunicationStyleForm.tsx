import { useState, useEffect } from "react";
import { z } from "zod";
import { motion } from "framer-motion";

const communicationSchema = z.object({
  preferredMethod: z.string().min(1),
  frequency: z.string().min(1),
  responseTime: z.string().min(1),
  conflictStyle: z.string().min(1),
  emotionalExpression: z.string().min(1),
});

type CommunicationData = z.infer<typeof communicationSchema>;

interface CommunicationStyleFormProps {
  onUpdate: (rate: number) => void;
}

const communicationMethods = ["文字", "语音", "视频", "面对面"];
const frequencyOptions = ["每天多次", "每天一次", "每周几次", "每周一次"];
const responseTimeOptions = ["立即", "1小时内", "几小时内", "24小时内"];
const conflictStyles = ["主动沟通", "冷静后再谈", "回避冲突", "寻求第三方帮助"];
const emotionalExpressions = ["直接表达", "委婉表达", "理性分析", "情感共鸣"];

export default function CommunicationStyleForm({ onUpdate }: CommunicationStyleFormProps) {
  const [formData, setFormData] = useState<Partial<CommunicationData>>({});
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
      <h2 className="text-2xl font-bold mb-6">沟通风格</h2>
      
      <div className="space-y-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium">偏好的沟通方式</label>
          <select
            name="preferredMethod"
            value={formData.preferredMethod || ""}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-pink-500 focus:border-pink-500"
          >
            <option value="">请选择</option>
            {communicationMethods.map(method => (
              <option key={method} value={method}>{method}</option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">期望的沟通频率</label>
          <select
            name="frequency"
            value={formData.frequency || ""}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-pink-500 focus:border-pink-500"
          >
            <option value="">请选择</option>
            {frequencyOptions.map(freq => (
              <option key={freq} value={freq}>{freq}</option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">期望的回复时间</label>
          <select
            name="responseTime"
            value={formData.responseTime || ""}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-pink-500 focus:border-pink-500"
          >
            <option value="">请选择</option>
            {responseTimeOptions.map(time => (
              <option key={time} value={time}>{time}</option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">冲突处理风格</label>
          <select
            name="conflictStyle"
            value={formData.conflictStyle || ""}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-pink-500 focus:border-pink-500"
          >
            <option value="">请选择</option>
            {conflictStyles.map(style => (
              <option key={style} value={style}>{style}</option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">情感表达方式</label>
          <select
            name="emotionalExpression"
            value={formData.emotionalExpression || ""}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-pink-500 focus:border-pink-500"
          >
            <option value="">请选择</option>
            {emotionalExpressions.map(expr => (
              <option key={expr} value={expr}>{expr}</option>
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