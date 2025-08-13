import React from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import { updateCurrentBuyerField, completeOnboarding } from "../redux/buyerSlice";
import GoalSelection from "../common/GoalSelection";
import IndustrySelector from "../common/IndustrySelector";
import DealSizeSlider from "../common/DealSizeSlider";
import LocationSelector from "../common/LocationSelector";
import TextInput from "../common/TextInput";
import TextArea from "../common/TextArea";

const BuyerOnboarding: React.FC = () => {
  const dispatch = useDispatch();
  const buyer = useSelector((state: RootState) => state.buyers.currentBuyer);

  const handleChange = <K extends keyof typeof buyer>(field: K, value: typeof buyer[K]) => {
    dispatch(updateCurrentBuyerField({ field, value }));
  };

  const handleSubmit = () => {
    dispatch(completeOnboarding());
    alert("Buyer Onboarding Complete!");
  };

  return (
    <div style={{ maxWidth: "600px", margin: "auto", padding: "1rem" }}>
      <h2>Buyer Onboarding</h2>

      {/* Buyer Name */}
      <TextInput
        label="Buyer Name"
        value={buyer.name}
        placeholder="Enter buyer name"
        onChange={(val) => handleChange("name", val)}
      />

      <TextArea
        label="Description"
        value={buyer.description}
        placeholder="Describe the buyer"
        onChange={(val) => handleChange("description", val)}
      />

      {/* Goal Selection */}
      <GoalSelection
        selectedGoals={buyer.goals}
        onChange={(goals) => handleChange("goals", goals)}
      />

      {/* Industry Selection */}
      <IndustrySelector
        selectedIndustries={buyer.industries}
        onChange={(industries) => handleChange("industries", industries)}
      />

      {/* Deal Size */}
      <DealSizeSlider
        value={buyer.dealSize}
        onChange={(dealSize) => handleChange("dealSize", dealSize)}
      />

      {/* Location */}
      <LocationSelector
        value={buyer.location}
        onChange={(location) => handleChange("location", location)}
      />

      {/* Submit */}
      <button onClick={handleSubmit} style={{ padding: "10px 15px", marginTop: "1rem" }}>
        Complete Onboarding
      </button>
    </div>
  );
};

export default BuyerOnboarding;
