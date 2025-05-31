import { z } from "zod";

const basicInfoSchema = z.object({
  age: z.number().min(18).max(100),
  height: z.number().min(140).max(220),
  education: z.string().min(2),
  income: z.string().min(2),
  job: z.string().min(2),
  marriageView: z.string().min(2),
});

const communicationSchema = z.object({
  preferredMethod: z.string().min(1),
  frequency: z.string().min(1),
  responseTime: z.string().min(1),
  conflictStyle: z.string().min(1),
  emotionalExpression: z.string().min(1),
});

const behaviorSchema = z.object({
  decisionMaking: z.string().min(1),
  stressResponse: z.string().min(1),
  socialBehavior: z.string().min(1),
  changeAdaptability: z.string().min(1),
  dailyRoutine: z.string().min(1),
});

const personalitySchema = z.object({
  personalityType: z.string().min(2),
  values: z.array(z.string()).min(3),
  communicationStyle: z.string().min(2),
  emotionalNeeds: z.string().min(2),
  conflictResolution: z.string().min(2),
});

const expectationsSchema = z.object({
  commitmentLevel: z.string().min(1),
  futurePlans: z.string().min(1),
  dealBreakers: z.array(z.string()).min(1).max(5),
  relationshipGoals: z.string().min(1),
  financialExpectations: z.string().min(1),
});

export type BasicInfo = z.infer<typeof basicInfoSchema>;
export type CommunicationData = z.infer<typeof communicationSchema>;
export type BehaviorData = z.infer<typeof behaviorSchema>;
export type PersonalityData = z.infer<typeof personalitySchema>;
export type ExpectationsData = z.infer<typeof expectationsSchema>;
