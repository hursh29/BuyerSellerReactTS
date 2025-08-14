import React from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import IndustrySelector from "../common/IndustrySelector";
import {
  completeSellerOnboarding,
  updateCurrentSellerField,
} from "../redux/sellerSlice";
import RangeSlider from "../common/RangeSlider";
import TextArea from "../common/TextArea";
import LocationSelector from "../common/LocationSelector";

const SellerOnboarding: React.FC = () => {
  const dispatch = useDispatch();
  const seller = useSelector((state: RootState) => state.sellers.currentSeller);

  const handleChange = <K extends keyof typeof seller>(
    field: K,
    value: (typeof seller)[K]
  ) => {
    dispatch(updateCurrentSellerField({ field, value }));
  };

  const handleSubmit = () => {
    dispatch(completeSellerOnboarding());
    alert("Seller Onboarding Complete!");
  };

  return (
    <div style={{ maxWidth: "600px", margin: "auto", padding: "1rem", fontFamily:'Inter, sans-serif' }}>
      <h2>Seller Onboarding</h2>

      {/* Business Name */}
      <div style={{ marginBottom: "1rem" }}>
        <label style={{ display: "block", fontWeight: "bold" }}>
          Business Name
        </label>
        <input
          type="text"
          value={seller.name}
          onChange={(e) => handleChange("name", e.target.value)}
          style={{ width: "100%", padding: "8px" }}
        />
      </div>

      <TextArea
        label="Description"
        value={seller.description}
        placeholder="Short Description"
        onChange={(val: string) => handleChange("description", val)}
      />

      <TextArea
        label="Reason for Selling"
        value={seller.reasonForSelling}
        placeholder="Short Description"
        onChange={(val: string) => handleChange("reasonForSelling", val)}
      />

      {/* Industry */}
      <IndustrySelector
        selectedIndustries={seller.industries}
        onChange={(industries) => handleChange("industries", industries)}
      />

      <RangeSlider
        label="Revenue Range"
        min={0}
        max={1000000}
        step={50000}
        value={seller.revenueRange}
        onChange={(revenue) => handleChange("revenueRange", revenue)}
        isRange
        unit="$"
      />

      <RangeSlider
        label="Profit Margin"
        min={0}
        max={100}
        value={seller.profitMargin}
        onChange={(margin) => handleChange("profitMargin", margin)}
        isRange
        unit="%"
      />

      <RangeSlider
        label="Expected Deal Size"
        min={50000}
        max={10000000}
        step={10000}
        value={seller.expectedDealSize}
        onChange={(dealSize) => {
          return handleChange("expectedDealSize", dealSize);
        }}
        isRange
        unit="$"
      />

      <LocationSelector
        value={seller.location}
        onChange={(location) => handleChange("location", location)}
      />

      {/* Submit */}
      <button
        onClick={handleSubmit}
        style={{ padding: "10px 15px", marginTop: "1rem" }}
      >
        Complete Onboarding
      </button>
    </div>
  );
};

export default SellerOnboarding;
