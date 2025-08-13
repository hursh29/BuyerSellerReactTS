import React from "react";

interface GoalSelectionProps {
  selectedGoals: string[];
  onChange: (goals: string[]) => void;
}

const goalsList = ["Expand", "Diversify", "Invest", "Optimize"];

const GoalSelection: React.FC<GoalSelectionProps> = ({ selectedGoals, onChange }) => {
  const toggleGoal = (goal: string) => {
    if (selectedGoals.includes(goal)) {
      onChange(selectedGoals.filter((g) => g !== goal));
    } else {
      onChange([...selectedGoals, goal]);
    }
  };

  return (
    <div>
      <h3>Goal Selection</h3>
      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
        {goalsList.map((goal) => (
          <button
            key={goal}
            onClick={() => toggleGoal(goal)}
            style={{
              padding: "0.5rem 1rem",
              borderRadius: "8px",
              border: selectedGoals.includes(goal) ? "2px solid blue" : "1px solid gray",
              backgroundColor: selectedGoals.includes(goal) ? "#E6F0FF" : "white",
            }}
          >
            {goal}
          </button>
        ))}
      </div>
    </div>
  );
};

export default GoalSelection;
