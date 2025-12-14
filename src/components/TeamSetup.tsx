import { useState } from "react";
import { motion } from "framer-motion";
import { Rocket, Star, Zap, Trophy, Crown, Heart, Flame, Target, Shield, Gem } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const TEAM_ICONS = [
  { id: "rocket", Icon: Rocket, label: "Rocket" },
  { id: "star", Icon: Star, label: "Star" },
  { id: "zap", Icon: Zap, label: "Lightning" },
  { id: "trophy", Icon: Trophy, label: "Trophy" },
  { id: "crown", Icon: Crown, label: "Crown" },
  { id: "heart", Icon: Heart, label: "Heart" },
  { id: "flame", Icon: Flame, label: "Flame" },
  { id: "target", Icon: Target, label: "Target" },
  { id: "shield", Icon: Shield, label: "Shield" },
  { id: "gem", Icon: Gem, label: "Gem" },
];

const TEAM_COLORS = [
  "bg-team-1",
  "bg-team-2",
  "bg-team-3",
  "bg-team-4",
  "bg-team-5",
];

export interface Team {
  id: number;
  name: string;
  iconId: string;
  score: number;
}

interface TeamSetupProps {
  onStartGame: (teams: Team[]) => void;
}

const TeamSetup = ({ onStartGame }: TeamSetupProps) => {
  const [teams, setTeams] = useState<{ name: string; iconId: string }[]>([
    { name: "", iconId: "rocket" },
  ]);

  const addTeam = () => {
    if (teams.length < 5) {
      const availableIcons = TEAM_ICONS.filter(
        (icon) => !teams.some((t) => t.iconId === icon.id)
      );
      setTeams([
        ...teams,
        { name: "", iconId: availableIcons[0]?.id || "star" },
      ]);
    }
  };

  const removeTeam = (index: number) => {
    if (teams.length > 1) {
      setTeams(teams.filter((_, i) => i !== index));
    }
  };

  const updateTeam = (
    index: number,
    field: "name" | "iconId",
    value: string
  ) => {
    const newTeams = [...teams];
    newTeams[index] = { ...newTeams[index], [field]: value };
    setTeams(newTeams);
  };

  const handleStartGame = () => {
    const validTeams = teams.filter((t) => t.name.trim() !== "");
    if (validTeams.length === 0) {
      return;
    }
    const gameTeams: Team[] = validTeams.map((t, i) => ({
      id: i + 1,
      name: t.name.trim(),
      iconId: t.iconId,
      score: 0,
    }));
    onStartGame(gameTeams);
  };

  const hasValidTeam = teams.some((t) => t.name.trim() !== "");

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl"
      >
        <div className="text-center mb-8">
          <motion.h1
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="text-4xl md:text-5xl font-display font-bold text-foreground mb-3"
          >
            🎮 Game Scoreboard
          </motion.h1>
          <p className="text-muted-foreground font-body text-lg">
            Set up your teams and let the games begin!
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-card rounded-2xl shadow-card p-6 md:p-8"
        >
          <h2 className="font-display font-semibold text-xl text-foreground mb-6">
            Create Your Teams
          </h2>

          <div className="space-y-4">
            {teams.map((team, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-4 rounded-xl border-2 border-border ${
                  TEAM_COLORS[index]
                }/10`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <span
                    className={`w-8 h-8 rounded-full ${TEAM_COLORS[index]} flex items-center justify-center text-primary-foreground font-bold text-sm`}
                  >
                    {index + 1}
                  </span>
                  <span className="font-display font-medium text-foreground">
                    Team {index + 1}
                  </span>
                  {teams.length > 1 && (
                    <button
                      onClick={() => removeTeam(index)}
                      className="ml-auto text-muted-foreground hover:text-destructive transition-colors text-sm"
                    >
                      Remove
                    </button>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Input
                    placeholder="Enter team name..."
                    value={team.name}
                    onChange={(e) => updateTeam(index, "name", e.target.value)}
                    className="flex-1 font-body"
                  />

                  <div className="flex gap-2">
                    {TEAM_ICONS.map(({ id, Icon }) => {
                      const isSelected = team.iconId === id;
                      const isUsedByOther = teams.some(
                        (t, i) => i !== index && t.iconId === id
                      );

                      return (
                        <button
                          key={id}
                          onClick={() =>
                            !isUsedByOther && updateTeam(index, "iconId", id)
                          }
                          disabled={isUsedByOther}
                          className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${
                            isSelected
                              ? `${TEAM_COLORS[index]} text-primary-foreground shadow-button`
                              : isUsedByOther
                              ? "bg-muted text-muted-foreground cursor-not-allowed opacity-40"
                              : "bg-muted hover:bg-muted/80 text-muted-foreground"
                          }`}
                        >
                          <Icon size={20} />
                        </button>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {teams.length < 5 && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={addTeam}
              className="w-full mt-4 p-3 border-2 border-dashed border-border rounded-xl text-muted-foreground font-body hover:border-primary hover:text-primary transition-colors"
            >
              + Add Another Team
            </motion.button>
          )}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8"
          >
            <Button
              onClick={handleStartGame}
              disabled={!hasValidTeam}
              size="lg"
              className="w-full font-display font-semibold text-lg py-6 gradient-primary hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              🚀 Start Game
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>

      <footer className="text-center mt-8 pb-4">
        <p className="text-muted-foreground font-body text-sm">
          created by <span className="font-semibold text-primary">ifwad</span>
        </p>
      </footer>
    </div>
  );
};

export default TeamSetup;
