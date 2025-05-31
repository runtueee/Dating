import { useState, useEffect } from "react";
import { z } from "zod";
import { motion } from "framer-motion";
import { toast } from "sonner";

const personalitySchema = z.object({
  personalityType: z.string().min(2),
  values: z.array(z.string()).min(3),
  communicationStyle: z.string().min(2),
  emotionalNeeds: z.string().min(2),
  conflictResolution: z.string().min(2),
});

type PersonalityData = z.infer<typeof personalitySchema>;

interface PersonalityFormProps {
  onUpdate: (rate: number) => void;
}

const personalityTypes = ["ENFP", "ISTJ", "INTP", "ESFJ", "ENTJ", "ISFP", "ENFJ", "ISTP"];
const coreValues = ["诚实", "忠诚", "家庭", "事业", "自由", "冒险", "稳定", "创造力", "独立", "合作"];
const communicationStyles = ["直接", "委婉", "理性", "感性", "幽默", "严肃"];
const emotionalNeeds = ["陪伴", "空间", "肯定", "挑战", "理解", "支持"];
const conflictResolutions = ["沟通", "冷静", "妥协", "坚持", "第三方调解"];

export default function PersonalityForm({ onUpdate }: PersonalityFormProps) {
  const [formData, setFormData] = useState<Partial<PersonalityData>>({});
  const [completedFields, setCompletedFields] = useState(0);
  const totalFields = 5;

  useEffect(() => {
    const count = Object.values(formData).filter(v => v !== undefined && v !== "" && (!Array.isArray(v) || v.length > 0)).length;
    setCompletedFields(count);
    onUpdate(Math.floor((count / totalFields) * 100));
  }, [formData, onUpdate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const toggleValue = (value: string) => {
    const currentValues = Array.isArray(formData.values) ? formData.values : [];
    const newValues = currentValues.includes(value)
      ? currentValues.filter(v => v !== value)
      : [...currentValues, value];
    
    setFormData(prev => ({ ...prev, values: newValues }));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold mb-6">性格价值观</h2>
      
      <div className="space-y-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium">性格类型</label>
          <select
            name="personalityType"
            value={formData.personalityType || ""}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-pink-500 focus:border-pink-500"
          >
            <option value="">请选择你的性格类型</option>
            {personalityTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">核心价值观 (选择3-5个)</label>
          <div className="flex flex-wrap gap-2">
            {coreValues.map(value => (
              <button
                key={value}
                type="button"
                onClick={() => toggleValue(value)}
                className={`px-3 py-1 rounded-full text-sm ${
                  formData.values?.includes(value)
                    ? "bg-pink-600 text-white"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                {value}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">沟通风格</label>
          <select
            name="communicationStyle"
            value={formData.communicationStyle || ""}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-pink-500 focus:border-pink-500"
          >
            <option value="">请选择你的主要沟通风格</option>
            {communicationStyles.map(style => (
              <option key={style} value={style}>{style}</option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">情感需求</label>
          <select
            name="emotionalNeeds"
            value={formData.emotionalNeeds || ""}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-pink-500 focus:border-pink-500"
          >
            <option value="">请选择你的主要情感需求</option>
            {emotionalNeeds.map(need => (
              <option key={need} value={need}>{need}</option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">冲突解决方式</label>
          <select
            name="conflictResolution"
            value={formData.conflictResolution || ""}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-pink-500 focus:border-pink-500"
          >
            <option value="">请选择你的主要冲突解决方式</option>
            {conflictResolutions.map(resolution => (
              <option key={resolution} value={resolution}>{resolution}</option>
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