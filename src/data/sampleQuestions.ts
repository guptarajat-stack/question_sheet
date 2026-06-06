import { Question } from '../types';
import { STRIVER_QUESTIONS } from './striverA2Z';

const topicSet = new Set<string>(STRIVER_QUESTIONS.map(q => q.topic));

export const SAMPLE_QUESTIONS: Question[] = STRIVER_QUESTIONS;
export const TOPICS = Array.from(topicSet);
export const TOPICS_DEFAULT_CONFIG = TOPICS.reduce((acc, topic) => {
  acc[topic] = true;
  return acc;
}, {} as Record<string, boolean>);
