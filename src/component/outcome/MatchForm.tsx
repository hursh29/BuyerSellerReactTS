import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { submitBuyerForm, submitSellerForm } from "../../component/redux/matchOutcomeSlice";
import styles from "../../style/MatchOutcome.module.css";
import type { RootState } from "../redux/store";

interface Props {
  matchId: number;
  role: "buyer" | "seller";
}

const steps = [
  "Basic Terms",
  "Verification & Trust",
  "Logistics",
  "Review & Confirm",
];

const MatchForm: React.FC<Props> = ({ matchId, role }) => {
  const dispatch = useDispatch();

  const storedData = useSelector((state: RootState) =>
    role === "buyer"
      ? state.matchOutcomes.matchOutcomes.find(outcomes => outcomes.id === matchId)?.buyerForm
      : state.matchOutcomes.matchOutcomes.find(outcomes => outcomes.id === matchId)?.sellerForm
  );

  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    quantity: "",
    deliveryTime: "",
    budgetRange: "",
    verificationDoc: "",
    gstin: "",
    logisticsMethod: "",
    pickupPoint: "",
  });

  useEffect(() => {
    if (storedData) {
      setForm(storedData);

      const allFilled = Object.values(storedData).every((val) => val && val !== "");
      if (allFilled) {
        setStep(3); // Jump to Review step
      }
    }
  }, [storedData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (role === "buyer") {
      dispatch(submitBuyerForm({ matchId, data: form }));
    } else {
      dispatch(submitSellerForm({ matchId, data: form }));
    }
    alert("Form submitted successfully!");
  };

  const isReadOnly = step === 3 && storedData && Object.values(storedData).every((v) => v && v !== "");

  return (
    <div className={styles.container}>
      {/* Stepper */}
      <div className={styles.stepper}>
        <h2 className={styles.roleTitle}>
          {role === "buyer" ? "Buyer" : "Seller"} Agreement
        </h2>
        <ul>
          {steps.map((label, index) => (
            <li
              key={index}
              className={`${styles.step} ${index === step ? styles.active : ""} ${
                index < step ? styles.completed : ""
              }`}
            >
              <span className={styles.stepNumber}>{index + 1}</span>
              <span>{label}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Form */}
      <div className={styles.formPanel}>
        {step === 0 && (
          <>
            <h3>Basic Terms</h3>
            <input name="quantity" placeholder="Quantity" value={form.quantity} onChange={handleChange} />
            <input name="deliveryTime" placeholder="Delivery Time" value={form.deliveryTime} onChange={handleChange} />
            <input name="budgetRange" placeholder="Budget Range" value={form.budgetRange} onChange={handleChange} />
            <div className={styles.buttonRow}>
              <button className={styles.nextButton} onClick={() => setStep(1)}>Next →</button>
            </div>
          </>
        )}

        {step === 1 && (
          <>
            <h3>Verification & Trust</h3>
            <input name="verificationDoc" placeholder="Business Verification Doc" value={form.verificationDoc} onChange={handleChange} />
            <input name="gstin" placeholder="GSTIN or ID" value={form.gstin} onChange={handleChange} />
            <div className={styles.buttonRow}>
              <button onClick={() => setStep(0)}>← Prev</button>
              <button className={styles.nextButton} onClick={() => setStep(2)}>Next →</button>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <h3>Logistics</h3>
            <input name="logisticsMethod" placeholder="Preferred Shipping Method" value={form.logisticsMethod} onChange={handleChange} />
            <input name="pickupPoint" placeholder="Pickup Point" value={form.pickupPoint} onChange={handleChange} />
            <div className={styles.buttonRow}>
              <button onClick={() => setStep(1)}>← Prev</button>
              <button className={styles.nextButton} onClick={() => setStep(3)}>Review →</button>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <h3>Review & Confirm</h3>
            <pre className={styles.reviewBox}>
              {JSON.stringify(form, null, 2)}
            </pre>
            <div className={styles.buttonRow}>
              {!isReadOnly && <button onClick={() => setStep(2)}>← Edit</button>}
              {!isReadOnly && (
                <button className={styles.submitButton} onClick={handleSubmit}>
                  ✅ Submit
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MatchForm;
