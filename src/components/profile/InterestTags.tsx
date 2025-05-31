import { useState, useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { toast } from "sonner";
import { cn } from "@/lib/utils";


interface Tag {
  id: string;
  category1: string;
  category2: string;
  category3: string;
  image?: string;
  starred: boolean;
}

interface TagCardProps {
  tag: Tag;
  index: number;
  moveTag: (dragIndex: number, hoverIndex: number) => void;
  toggleStar: (id: string) => void;
  onImageUpload: (id: string) => void;
}

const TagCard = ({ tag, index, moveTag, toggleStar, onImageUpload }: TagCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  
  const [{ isDragging }, drag] = useDrag({
    type: "TAG",
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: "TAG",
    hover: (item: { index: number }, monitor) => {
      if (!ref.current) return;
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) return;
      moveTag(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  drag(drop(ref));

  return (
    <div
      ref={ref}
      className={cn(
        "p-4 mb-3 rounded-xl bg-white bg-opacity-50 backdrop-blur-md shadow-md cursor-move",
        isDragging ? "opacity-50" : "opacity-100"
      )}
    >
      <div className="flex justify-between items-start">
        <div>
          <h4 className="font-medium">{tag.category1} &gt; {tag.category2} &gt; {tag.category3}</h4>
          {tag.image && (
            <div className="mt-2">
              <img 
                src={tag.image} 
                alt="兴趣图片" 
                className="w-20 h-20 object-cover rounded-lg"
              />
            </div>
          )}
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => onImageUpload(tag.id)}
            className="text-sm px-3 py-1 bg-pink-100 rounded-full"
          >
            {tag.image ? "更换图片" : "上传图片"}
          </button>
          <button
            onClick={() => toggleStar(tag.id)}
            className={cn(
              "text-xl",
              tag.starred ? "text-yellow-500" : "text-gray-400"
            )}
          >
            <i className="fa-solid fa-star"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

interface InterestTagsProps {
  onUpdate: (rate: number) => void;
}

export default function InterestTags({ onUpdate }: InterestTagsProps) {
  const [tags, setTags] = useState<Tag[]>([
    { id: "1", category1: "运动", category2: "户外", category3: "登山", starred: false },
    { id: "2", category1: "艺术", category2: "音乐", category3: "钢琴", starred: true },
    { id: "3", category1: "美食", category2: "烹饪", category3: "烘焙", starred: false },
  ]);

  const [newTag, setNewTag] = useState({
    category1: "",
    category2: "",
    category3: "",
  });

  const moveTag = (dragIndex: number, hoverIndex: number) => {
    const draggedTag = tags[dragIndex];
    const newTags = [...tags];
    newTags.splice(dragIndex, 1);
    newTags.splice(hoverIndex, 0, draggedTag);
    setTags(newTags);
  };

  const toggleStar = (id: string) => {
    setTags(tags.map(tag => 
      tag.id === id ? { ...tag, starred: !tag.starred } : tag
    ));
  };

  const onImageUpload = (id: string) => {
    // 模拟图片上传
    toast.info("模拟图片上传功能");
    setTags(tags.map(tag => 
      tag.id === id ? { ...tag, image: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=%E5%85%B4%E8%B6%A3%E5%9B%BE%E7%89%87&sign=bb5298e39429d959fb6788daf3134f7d" } : tag
    ));
    onUpdate(calculateCompletion());
  };

  const addTag = () => {
    if (!newTag.category1 || !newTag.category2 || !newTag.category3) {
      toast.error("请填写完整的兴趣标签");
      return;
    }
    setTags([
      ...tags,
      {
        id: Date.now().toString(),
        ...newTag,
        starred: false,
      },
    ]);
    setNewTag({ category1: "", category2: "", category3: "" });
    onUpdate(calculateCompletion());
  };

  const calculateCompletion = () => {
    const completedTags = tags.filter(tag => tag.image).length;
    return Math.min(100, Math.floor((completedTags / Math.max(1, tags.length)) * 100));
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">兴趣标签</h2>
      
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3">添加新标签</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
          <input
            type="text"
            placeholder="一级分类"
            value={newTag.category1}
            onChange={(e) => setNewTag({ ...newTag, category1: e.target.value })}
            className="px-4 py-2 rounded-lg border border-gray-300"
          />
          <input
            type="text"
            placeholder="二级分类"
            value={newTag.category2}
            onChange={(e) => setNewTag({ ...newTag, category2: e.target.value })}
            className="px-4 py-2 rounded-lg border border-gray-300"
          />
          <input
            type="text"
            placeholder="三级分类"
            value={newTag.category3}
            onChange={(e) => setNewTag({ ...newTag, category3: e.target.value })}
            className="px-4 py-2 rounded-lg border border-gray-300"
          />
        </div>
        <button
          onClick={addTag}
          className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700"
        >
          添加标签
        </button>
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-3">我的兴趣标签</h3>
        {tags.length === 0 ? (
          <p className="text-gray-500">暂无兴趣标签，请添加</p>
        ) : (
          <div>
            {tags.map((tag, index) => (
              <TagCard
                key={tag.id}
                index={index}
                tag={tag}
                moveTag={moveTag}
                toggleStar={toggleStar}
                onImageUpload={onImageUpload}
              />
            ))}
          </div>
        )}
      </div>

      <div className="text-sm text-gray-600">
        图片上传完成率: {calculateCompletion()}% (已上传 {tags.filter(t => t.image).length}/{tags.length})
      </div>
    </div>
  );
}