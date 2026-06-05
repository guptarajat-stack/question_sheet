"use client";

import { useEffect, useState } from 'react';
import { SAMPLE_QUESTIONS } from '@/data/sampleQuestions';
import { StorageService } from '@/services/storage';

interface DonutSegment {
  name: string;
  value: number;
  percentage: number;
  color: string;
  strokeColor: string;
}

export default function DashboardChart() {
  const [weeklyData, setWeeklyData] = useState<{ day: string; count: number }[]>([]);
  const [difficultyData, setDifficultyData] = useState<DonutSegment[]>([]);
  const [totalCompleted, setTotalCompleted] = useState(0);

  useEffect(() => {
    // Load weekly completion history
    setWeeklyData(StorageService.getWeeklyHistory());

    // Load progress map to calculate difficulty distribution
    const map = StorageService.getProgressMap();
    const activeTopics = StorageService.getTopicSettings();

    let easyCount = 0;
    let mediumCount = 0;
    let hardCount = 0;

    SAMPLE_QUESTIONS.forEach(q => {
      if (activeTopics[q.topic] !== false) {
        const prog = map[q.id];
        if (prog && prog.status === 'Done') {
          if (q.difficulty === 'Easy') easyCount++;
          else if (q.difficulty === 'Medium') mediumCount++;
          else if (q.difficulty === 'Hard') hardCount++;
        }
      }
    });

    const total = easyCount + mediumCount + hardCount;
    setTotalCompleted(total);

    setDifficultyData([
      { 
        name: 'Easy', 
        value: easyCount, 
        percentage: total > 0 ? (easyCount / total) * 100 : 0, 
        color: 'bg-emerald-500', 
        strokeColor: '#10b981' 
      },
      { 
        name: 'Medium', 
        value: mediumCount, 
        percentage: total > 0 ? (mediumCount / total) * 100 : 0, 
        color: 'bg-amber-500', 
        strokeColor: '#f59e0b' 
      },
      { 
        name: 'Hard', 
        value: hardCount, 
        percentage: total > 0 ? (hardCount / total) * 100 : 0, 
        color: 'bg-red-500', 
        strokeColor: '#ef4444' 
      }
    ]);
  }, []);

  // --- 1. SVG Area Chart (Weekly Activity) ---
  const width = 500;
  const height = 200;
  const padding = 35;
  const chartWidth = width - padding * 2;
  const chartHeight = height - padding * 2;

  const maxVal = Math.max(...weeklyData.map(d => d.count), 5); // Default min peak to 5 for aesthetics

  // Calculate points for the polyline and area path
  const points = weeklyData.map((d, index) => {
    const x = padding + (index / 6) * chartWidth;
    const y = padding + chartHeight - (d.count / maxVal) * chartHeight;
    return { x, y, val: d.count, day: d.day };
  });

  const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  const areaPath = points.length > 0 
    ? `${linePath} L ${points[points.length - 1].x} ${padding + chartHeight} L ${points[0].x} ${padding + chartHeight} Z`
    : '';

  // --- 2. SVG Donut Chart (Difficulty Distribution) ---
  const radius = 40;
  const circumference = 2 * Math.PI * radius; // 251.3
  let accumulatedPercentage = 0;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Activity Chart (Span 2) */}
      <div className="lg:col-span-2 p-6 rounded-2xl border border-slate-800 bg-slate-900/30 backdrop-blur-md flex flex-col justify-between">
        <div>
          <h3 className="text-white font-bold text-base">Weekly Activity</h3>
          <p className="text-xs text-slate-400">Questions solved per day over the last 7 days</p>
        </div>

        <div className="w-full overflow-x-auto mt-4">
          <svg viewBox={`0 0 ${width} ${height}`} className="w-full min-w-[400px] h-auto overflow-visible">
            <defs>
              <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Horizontal Grid Lines */}
            {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => {
              const y = padding + chartHeight * ratio;
              const label = Math.round(maxVal * (1 - ratio));
              return (
                <g key={i} className="opacity-40">
                  <line 
                    x1={padding} 
                    y1={y} 
                    x2={width - padding} 
                    y2={y} 
                    stroke="#334155" 
                    strokeWidth="1" 
                    strokeDasharray="4 4"
                  />
                  <text 
                    x={padding - 10} 
                    y={y + 4} 
                    fill="#94a3b8" 
                    fontSize="10" 
                    textAnchor="end"
                    className="font-semibold"
                  >
                    {label}
                  </text>
                </g>
              );
            })}

            {/* Filled Area */}
            {areaPath && (
              <path d={areaPath} fill="url(#areaGradient)" />
            )}

            {/* Path Line */}
            {linePath && (
              <path 
                d={linePath} 
                fill="none" 
                stroke="#8b5cf6" 
                strokeWidth="3.5" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
              />
            )}

            {/* Glowing Dots */}
            {points.map((p, i) => (
              <g key={i} className="group cursor-pointer">
                {/* Glow ring */}
                <circle 
                  cx={p.x} 
                  cy={p.y} 
                  r="7" 
                  fill="#8b5cf6" 
                  className="opacity-0 group-hover:opacity-40 transition-opacity duration-200"
                />
                {/* Core dot */}
                <circle 
                  cx={p.x} 
                  cy={p.y} 
                  r="4.5" 
                  fill="#ffffff" 
                  stroke="#8b5cf6" 
                  strokeWidth="3" 
                />
                {/* Tooltip value on top */}
                <text 
                  x={p.x} 
                  y={p.y - 12} 
                  fill="#c4b5fd" 
                  fontSize="11" 
                  fontWeight="bold" 
                  textAnchor="middle"
                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                >
                  {p.val}
                </text>
              </g>
            ))}

            {/* X Axis Labels */}
            {points.map((p, i) => (
              <text 
                key={i} 
                x={p.x} 
                y={height - 8} 
                fill="#64748b" 
                fontSize="11" 
                fontWeight="semibold"
                textAnchor="middle"
              >
                {p.day}
              </text>
            ))}
          </svg>
        </div>
      </div>

      {/* Difficulty Distribution Chart */}
      <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/30 backdrop-blur-md flex flex-col justify-between">
        <div>
          <h3 className="text-white font-bold text-base">Difficulty Profile</h3>
          <p className="text-xs text-slate-400">Distribution of solved questions</p>
        </div>

        <div className="flex flex-col items-center justify-center py-4 relative">
          {totalCompleted > 0 ? (
            <div className="relative w-36 h-36 flex items-center justify-center">
              <svg width="100%" height="100%" viewBox="0 0 100 100" className="-rotate-90">
                <circle 
                  cx="50" 
                  cy="50" 
                  r={radius} 
                  fill="none" 
                  stroke="#1e293b" 
                  strokeWidth="11" 
                />
                {difficultyData.map((seg, idx) => {
                  const strokeDashoffset = circumference - (circumference * seg.percentage) / 100;
                  const rotation = (accumulatedPercentage / 100) * 360;
                  accumulatedPercentage += seg.percentage;
                  
                  return (
                    <circle
                      key={idx}
                      cx="50"
                      cy="50"
                      r={radius}
                      fill="none"
                      stroke={seg.strokeColor}
                      strokeWidth="11"
                      strokeDasharray={circumference}
                      strokeDashoffset={strokeDashoffset}
                      strokeLinecap={seg.value > 0 ? "round" : "butt"}
                      className="transition-all duration-500 ease-out"
                      transform={`rotate(${rotation} 50 50)`}
                    />
                  );
                })}
              </svg>
              
              {/* Central text */}
              <div className="absolute text-center">
                <p className="text-2xl font-black text-white leading-none">{totalCompleted}</p>
                <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold mt-1">Solved</p>
              </div>
            </div>
          ) : (
            <div className="h-36 flex items-center justify-center text-slate-500 text-sm font-medium">
              No questions solved yet
            </div>
          )}

          {/* Legend */}
          <div className="w-full grid grid-cols-3 gap-2 mt-6">
            {difficultyData.map((d, i) => (
              <div key={i} className="flex flex-col items-center p-2 rounded-xl bg-slate-950/45 border border-slate-800/50">
                <div className="flex items-center gap-1.5">
                  <span className={`h-2.5 w-2.5 rounded-full ${d.color}`} />
                  <span className="text-xs text-slate-400 font-semibold">{d.name}</span>
                </div>
                <p className="text-sm font-bold text-white mt-1">{d.value}</p>
                <p className="text-[10px] text-slate-500 mt-0.5">{Math.round(d.percentage)}%</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
