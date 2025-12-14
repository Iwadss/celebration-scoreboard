import { useState } from "react";
import TeamSetup, { Team } from "@/components/TeamSetup";
import Scoreboard from "@/components/Scoreboard";

const Index = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [teams, setTeams] = useState<Team[]>([]);

  const handleStartGame = (newTeams: Team[]) => {
    setTeams(newTeams);
    setGameStarted(true);
  };

  const handleResetGame = () => {
    setGameStarted(false);
    setTeams([]);
  };

  if (!gameStarted) {
    return <TeamSetup onStartGame={handleStartGame} />;
  }

  return <Scoreboard initialTeams={teams} onReset={handleResetGame} />;
};

export default Index;
