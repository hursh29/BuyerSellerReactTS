// components/MatchOutcomeFormWrapper.tsx
import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import MatchForm from "./MatchForm";
import type { RootState } from "../redux/store";

const MatchOutcomeFormWrapper: React.FC = () => {
  const { matchId } = useParams<{ matchId: string }>();
  const mode = useSelector((state: RootState) => state.appMode.mode);

  return (
    <MatchForm
      matchId={Number(matchId)}
      role={mode}
    />
  );
};

export default MatchOutcomeFormWrapper;
