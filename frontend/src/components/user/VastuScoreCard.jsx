import { motion } from "framer-motion";
import { Compass, TrendingUp, Shield, Award } from "lucide-react";

const VastuScoreCard = () => {
  const score = 82;
  const directionScore = 92;
  const energyScore = 78;
  const balanceScore = 85;

  const getScoreColor = (score) => {
    if (score >= 90) return "text-green-600 bg-green-50 border-green-200";
    if (score >= 80) return "text-secondary bg-secondary/10 border-secondary/30";
    if (score >= 70) return "text-amber-600 bg-amber-50 border-amber-200";
    return "text-red-600 bg-red-50 border-red-200";
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ 
        duration: 0.4,
        ease: "easeOut"
      }}
      className="bg-white rounded-xl border border-muted overflow-hidden"
    >
      {/* Header */}
      <div className="p-5 border-b border-muted bg-light/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Compass className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-neutral">Vastu Score</h3>
              <p className="text-sm text-gray-500 mt-0.5">Property harmony analysis</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-sm text-gray-500">
            <TrendingUp className="h-4 w-4" />
            <span>+3 this month</span>
          </div>
        </div>
      </div>

      {/* Main Score */}
      <div className="p-5">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-3xl font-bold text-neutral">{score}</span>
              <span className="text-sm text-gray-500">/ 100</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-green-500" />
              <span className="text-sm font-medium text-green-600">Good Compliance</span>
            </div>
          </div>
          
          {/* Circular Score Indicator */}
          <div className="relative w-20 h-20">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              {/* Background circle */}
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#CBD5E1"
                strokeWidth="8"
                strokeLinecap="round"
              />
              {/* Score circle */}
              <motion.circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#E3B04B"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray="283"
                initial={{ strokeDashoffset: 283 }}
                animate={{ strokeDashoffset: 283 - (283 * score) / 100 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                transform="rotate(-90 50 50)"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <Award className="h-8 w-8 text-secondary" />
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Overall Score</span>
            <span className="font-medium">{score}%</span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${score}%` }}
              transition={{ duration: 1.2, delay: 0.2 }}
              className="h-full bg-gradient-to-r from-secondary to-secondary/70 rounded-full"
            />
          </div>
        </div>

        {/* Breakdown */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-sm text-gray-700">Direction</span>
            </div>
            <div className={`text-sm font-medium px-2 py-1 rounded border ${getScoreColor(directionScore)}`}>
              {directionScore}%
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-700">Energy</span>
            </div>
            <div className={`text-sm font-medium px-2 py-1 rounded border ${getScoreColor(energyScore)}`}>
              {energyScore}%
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span className="text-sm text-gray-700">Balance</span>
            </div>
            <div className={`text-sm font-medium px-2 py-1 rounded border ${getScoreColor(balanceScore)}`}>
              {balanceScore}%
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-muted bg-light/30">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-2.5 text-sm font-medium bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
        >
          View Detailed Report
        </motion.button>
      </div>
    </motion.div>
  );
};

export default VastuScoreCard;