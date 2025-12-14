import { motion } from "framer-motion";
import { Rocket, Star, Zap, Trophy, Crown, Plus } from "lucide-react";

const TEAM_ICONS: Record<string, typeof Rocket> = {
  rocket: Rocket,
  star: Star,
  zap: Zap,
  trophy: Trophy,
  crown: Crown,
};

const TEAM_COLORS = [
  { bg: "bg-team-1", light: "team-1-light", border: "border-team-1" },
  { bg: "bg-team-2", light: "team-2-light", border: "border-team-2" },
  { bg: "bg-team-3", light: "team-3-light", border: "border-team-3" },
  { bg: "bg-team-4", light: "team-4-light", border: "border-team-4" },
  { bg: "bg-team-5", light: "team-5-light", border: "border-team-5" },
];

interface TeamCardProps {
  id: number;
  name: string;
  iconId: string;
  score: number;
  teamIndex: number;
  onScore: (id: number) => void;
  isLeading: boolean;
}

const TeamCard = ({
  id,
  name,
  iconId,
  score,
  teamIndex,
  onScore,
  isLeading,
}: TeamCardProps) => {
  const Icon = TEAM_ICONS[iconId] || Star;
  const colors = TEAM_COLORS[teamIndex % TEAM_COLORS.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: teamIndex * 0.1 }}
      className={`relative bg-card rounded-2xl shadow-card overflow-hidden ${
        isLeading ? "ring-4 ring-primary/30 animate-pulse-glow" : ""
      }`}
    >
      {isLeading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute top-3 right-3 bg-primary text-primary-foreground text-xs font-display font-bold px-2 py-1 rounded-full"
        >
          👑 Leading
        </motion.div>
      )}

      <div className={`${colors.light} p-4 md:p-6`}>
        <div className="flex items-center gap-3 mb-4">
          <motion.div
            whileHover={{ rotate: 10 }}
            className={`w-12 h-12 md:w-14 md:h-14 ${colors.bg} rounded-xl flex items-center justify-center text-primary-foreground shadow-soft`}
          >
            <Icon size={28} />
          </motion.div>
          <h3 className="font-display font-bold text-lg md:text-xl text-foreground truncate">
            {name}
          </h3>
        </div>

        <motion.div
          key={score}
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          className="text-center mb-4"
        >
          <span className="font-display text-5xl md:text-6xl font-bold text-foreground">
            {score}
          </span>
          <p className="text-muted-foreground font-body text-sm mt-1">points</p>
        </motion.div>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => onScore(id)}
          className={`w-full ${colors.bg} text-primary-foreground font-display font-semibold py-3 md:py-4 rounded-xl shadow-button flex items-center justify-center gap-2 transition-all hover:opacity-90`}
        >
          <Plus size={20} />
          <span>+1 Point</span>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default TeamCard;
