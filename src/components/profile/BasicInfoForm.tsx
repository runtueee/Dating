import { useState, useEffect } from "react";
import { z } from "zod";

const basicInfoSchema = z.object({
  age: z.number().min(18).max(100),
  job: z.string().min(2),
  education: z.string().min(2),
  marriageView: z.string().min(2),
  income: z.string().min(2),
  height: z.number().min(140).max(220),
});

type BasicInfo = z.infer<typeof basicInfoSchema>;

interface BasicInfoFormProps {
  onUpdate: (rate: number) => void;
}

export default function BasicInfoForm({ onUpdate }: BasicInfoFormProps) {
  const [formData, setFormData] = useState<Partial<BasicInfo>>({});
  const [completedFields, setCompletedFields] = useState(0);
  const totalFields = 6;

  useEffect(() => {
    const count = Object.values(formData).filter(v => v !== undefined && v !== "").length;
    setCompletedFields(count);
    onUpdate(Math.floor((count / totalFields) * 100));
  }, [formData, onUpdate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === "age" || name === "height" ? Number(value) : value
    }));
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">基础信息</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium">年龄</label>
          <input
            type="number"
            name="age"
            value={formData.age || ""}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-pink-500 focus:border-pink-500"
            min="18"
            max="100"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">职业</label>
          <input
            type="text"
            name="job"
            value={formData.job || ""}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-pink-500 focus:border-pink-500"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">教育程度</label>
          <select
            name="education"
            value={formData.education || ""}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-pink-500 focus:border-pink-500"
          >
            <option value="">请选择</option>
            <option value="高中">高中</option>
            <option value="本科">本科</option>
            <option value="硕士">硕士</option>
            <option value="博士">博士</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">婚育观</label>
          <input
            type="text"
            name="marriageView"
            value={formData.marriageView || ""}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-pink-500 focus:border-pink-500"
            placeholder="例如：希望2年内结婚"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">年收入</label>
          <select
            name="income"
            value={formData.income || ""}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-pink-500 focus:border-pink-500"
          >
            <option value="">请选择</option>
            <option value="10万以下">10万以下</option>
            <option value="10-20万">10-20万</option>
            <option value="20-50万">20-50万</option>
            <option value="50万以上">50万以上</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">身高(cm)</label>
          <input
            type="number"
            name="height"
            value={formData.height || ""}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-pink-500 focus:border-pink-500"
            min="140"
            max="220"
          />
        </div>
      </div>

      <div className="mt-6 text-sm text-gray-600">
        已完成 {completedFields}/{totalFields} 项 ({Math.floor((completedFields / totalFields) * 100)}%)
      </div>
    </div>
  );
}