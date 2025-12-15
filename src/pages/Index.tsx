import { useState } from "react";
import TeamSetup, { Team } from "@/components/TeamSetup";
import Scoreboard from "@/components/Scoreboard";

const Index = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [teams, setTeams] = useState<Team[]>([]);
  const [gameName, setGameName] = useState("");

  const handleStartGame = (newTeams: Team[], newGameName: string) => {
    setTeams(newTeams);
    setGameName(newGameName);
    setGameStarted(true);
  };

  const handleResetGame = () => {
    setGameStarted(false);
    setTeams([]);
    setGameName("");
  };

  if (!gameStarted) {
    return <TeamSetup onStartGame={handleStartGame} />;
  }

  return <Scoreboard initialTeams={teams} gameName={gameName} onReset={handleResetGame} />;
};

export default Index;
