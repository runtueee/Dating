import { z } from "zod";
import { 
  BasicInfo, 
  CommunicationData, 
  BehaviorData, 
  PersonalityData, 
  ExpectationsData 
} from "@/components/profile/types";


// 权重配置
const WEIGHTS = {
  basicInfo: 0.2,
  interests: 0.15,
  personality: 0.25,
  communication: 0.15,
  expectations: 0.15,
  behavior: 0.1
};

// 基础信息匹配计算
export function calculateBasicInfoMatch(user1: BasicInfo, user2: BasicInfo): number {
  const ageDiff = Math.min(1, Math.abs(user1.age - user2.age) / 10);
  const heightDiff = Math.min(1, Math.abs(user1.height - user2.height) / 30);
  const educationScore = user1.education === user2.education ? 1 : 0.5;
  const incomeScore = user1.income === user2.income ? 1 : 0.7;
  
  return 1 - (ageDiff * 0.3 + heightDiff * 0.2 + (1 - educationScore) * 0.2 + (1 - incomeScore) * 0.3);
}

// 兴趣标签匹配计算
export function calculateInterestsMatch(tags1: string[], tags2: string[]): number {
  if (tags1.length === 0 || tags2.length === 0) return 0;
  const commonTags = tags1.filter(tag => tags2.includes(tag));
  return commonTags.length / Math.max(tags1.length, tags2.length);
}

// 性格价值观匹配计算
export function calculatePersonalityMatch(user1: PersonalityData, user2: PersonalityData): number {
  let score = 0;
  if (user1.personalityType === user2.personalityType) score += 0.3;
  
  const commonValues = user1.values.filter(value => user2.values.includes(value));
  score += commonValues.length * 0.1;
  
  if (user1.communicationStyle === user2.communicationStyle) score += 0.2;
  if (user1.conflictResolution === user2.conflictResolution) score += 0.2;
  
  return Math.min(1, score);
}

// 综合匹配度计算
export function calculateOverallMatch(
  user1: {
    basicInfo: BasicInfo;
    interests: string[];
    personality: PersonalityData;
    communication: CommunicationData;
    expectations: ExpectationsData;
    behavior: BehaviorData;
  },
  user2: {
    basicInfo: BasicInfo;
    interests: string[];
    personality: PersonalityData;
    communication: CommunicationData;
    expectations: ExpectationsData;
    behavior: BehaviorData;
  }
): number {
  const basicScore = calculateBasicInfoMatch(user1.basicInfo, user2.basicInfo) * WEIGHTS.basicInfo;
  const interestsScore = calculateInterestsMatch(user1.interests, user2.interests) * WEIGHTS.interests;
  const personalityScore = calculatePersonalityMatch(user1.personality, user2.personality) * WEIGHTS.personality;
  
  // 其他维度计算...
  
  const totalScore = basicScore + interestsScore + personalityScore;
  return Math.min(1, totalScore) * 100; // 转换为百分比
}