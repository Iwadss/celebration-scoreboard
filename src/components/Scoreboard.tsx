import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReactConfetti from "react-confetti";
import { RotateCcw, PartyPopper } from "lucide-react";
import TeamCard from "./TeamCard";
import { Team } from "./TeamSetup";
import { Footer } from "./Footer";
import { Button } from "@/components/ui/button";

interface ScoreboardProps {
  initialTeams: Team[];
  onReset: () => void;
}

const Scoreboard = ({ initialTeams, onReset }: ScoreboardProps) => {
  const [teams, setTeams] = useState<Team[]>(initialTeams);
  const [showConfetti, setShowConfetti] = useState(false);
  const [scoringTeam, setScoringTeam] = useState<string | null>(null);

  const handleScore = useCallback((teamId: number) => {
    setTeams((prev) =>
      prev.map((team) =>
        team.id === teamId ? { ...team, score: team.score + 1 } : team
      )
    );

    const team = teams.find((t) => t.id === teamId);
    if (team) {
      setScoringTeam(team.name);
    }

    setShowConfetti(true);
    setTimeout(() => {
      setShowConfetti(false);
      setScoringTeam(null);
    }, 2500);
  }, [teams]);

  const maxScore = Math.max(...teams.map((t) => t.score));
  const leadingTeams = teams.filter((t) => t.score === maxScore && maxScore > 0);

  const getGridCols = () => {
    switch (teams.length) {
      case 1:
        return "grid-cols-1 max-w-md mx-auto";
      case 2:
        return "grid-cols-1 sm:grid-cols-2 max-w-2xl mx-auto";
      case 3:
        return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";
      case 4:
        return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4";
      case 5:
        return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5";
      default:
        return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      {showConfetti && (
        <ReactConfetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={200}
          gravity={0.3}
          colors={["#8B5CF6", "#06B6D4", "#EC4899", "#F59E0B", "#10B981"]}
        />
      )}

      <AnimatePresence>
        {scoringTeam && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: -50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: -50 }}
            className="fixed top-1/4 left-1/2 -translate-x-1/2 z-50 bg-card shadow-card rounded-2xl px-8 py-6 text-center"
          >
            <PartyPopper className="w-12 h-12 text-primary mx-auto mb-2 animate-bounce" />
            <h2 className="font-display font-bold text-2xl text-foreground">
              {scoringTeam} scores!
            </h2>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">
            🏆 Scoreboard
          </h1>
          <p className="text-muted-foreground font-body">
            Tap +1 to score for your team!
          </p>
        </motion.div>

        <div className={`grid ${getGridCols()} gap-4 md:gap-6 mb-8`}>
          {teams.map((team, index) => (
            <TeamCard
              key={team.id}
              {...team}
              teamIndex={index}
              onScore={handleScore}
              isLeading={leadingTeams.some((t) => t.id === team.id)}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <Button
            onClick={onReset}
            variant="outline"
            size="lg"
            className="font-display gap-2 border-2 hover:bg-destructive hover:text-destructive-foreground hover:border-destructive transition-all"
          >
            <RotateCcw size={18} />
            Reset Game
          </Button>
        </motion.div>

        {maxScore > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 text-center"
          >
            <div className="inline-block bg-card rounded-2xl shadow-soft px-6 py-4">
              <p className="text-muted-foreground font-body text-sm mb-1">
                Total Points
              </p>
              <p className="font-display font-bold text-3xl text-foreground">
                {teams.reduce((sum, t) => sum + t.score, 0)}
              </p>
            </div>
          </motion.div>
        )}


      </div>
      <Footer />
    </div>
  );
};

export default Scoreboard;
