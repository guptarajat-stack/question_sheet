import { Question } from '../types';
import { STRIVER_CSV } from './striverA2Z_raw';

function parseCSV(text: string): string[][] {
  const rows: string[][] = [];
  let cur: string[] = [];
  let curField = '';
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (ch === '"') {
      inQuotes = !inQuotes;
      continue;
    }
    if (ch === ',' && !inQuotes) {
      cur.push(curField);
      curField = '';
      continue;
    }
    if ((ch === '\n' || ch === '\r') && !inQuotes) {
      if (curField !== '' || cur.length > 0) {
        cur.push(curField);
        rows.push(cur.map(f => f.trim()));
        cur = [];
        curField = '';
      }
      // handle possible \r\n by skipping next char if it's part of newline
      continue;
    }
    curField += ch;
  }
  // last field
  if (curField !== '' || cur.length > 0) {
    cur.push(curField);
    rows.push(cur.map(f => f.trim()));
  }
  return rows;
}

function toDifficulty(s: string): 'Easy' | 'Medium' | 'Hard' {
  const t = (s || '').toLowerCase();
  if (t.includes('easy')) return 'Easy';
  if (t.includes('hard')) return 'Hard';
  return 'Medium';
}

export const STRIVER_QUESTIONS: Question[] = (() => {
  const rows = parseCSV(STRIVER_CSV);
  if (rows.length <= 1) return [];
  const header = rows[0].map(h => h.toLowerCase());
  const qNoIdx = header.indexOf('q.no');
  const topicIdx = header.indexOf('topic');
  const questionIdx = header.indexOf('question');
  const difficultyIdx = header.indexOf('difficulty');

  const out: Question[] = [];
  for (let i = 1; i < rows.length; i++) {
    const r = rows[i];
    if (!r || r.length === 0) continue;
    const qno = (r[qNoIdx] || '').replace(/\D/g, '');
    if (!qno) continue;
    const title = (r[questionIdx] || r[3] || '').trim();
    if (!title) continue;
    const topic = (r[topicIdx] || 'Misc').replace(/\s+/g, ' ').trim();
    const difficulty = toDifficulty(r[difficultyIdx] || 'Medium');
    out.push({
      id: `str_q${qno}`,
      title,
      difficulty,
      topic,
      problemUrl: '',
      platform: 'GeeksforGeeks'
    });
  }
  return out;
})();
