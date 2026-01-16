import React, { useState } from "react";

export default function Test() {
  const [step, setStep] = useState(1);

  const [client, setClient] = useState(null);
  const [hasActiveSubscription, setHasActiveSubscription] = useState(false);
  const [type, setType] = useState("monthly");
  const [duration, setDuration] = useState(1);

  const PRICES = {
    monthly: 100,
    yearly: 1000,
  };

  const unitPrice = PRICES[type];
  const totalPrice = unitPrice * duration;
  
  const next = () => setStep(step + 1);
  const back = () => setStep(step - 1);

  return (
    <div style={styles.container}>
      <h2>Create New Subscription</h2>

      {/* STEP 1 */}
      {step === 1 && (
        <div style={styles.card}>
          <h3>Step 1: Select Client</h3>

          <button
            onClick={() =>
              setClient({ id: 1, name: "Ali Ahmed", email: "ali@mail.com" })
            }
          >
            Select Demo Client
          </button>

          {client && (
            <div style={styles.info}>
              <p><b>Name:</b> {client.name}</p>
              <p><b>Email:</b> {client.email}</p>
            </div>
          )}

          <button disabled={!client} onClick={next}>
            Next
          </button>
        </div>
      )}

      {/* STEP 2 */}
      {step === 2 && (
        <div style={styles.card}>
          <h3>Step 2: Subscription Status</h3>

          <label>
            <input
              type="checkbox"
              checked={hasActiveSubscription}
              onChange={(e) => setHasActiveSubscription(e.target.checked)}
            />
            Client has active subscription
          </label>

          <div style={styles.actions}>
            <button onClick={back}>Back</button>
            <button onClick={next}>Next</button>
          </div>
        </div>
      )}

      {/* STEP 3 */}
      {step === 3 && (
        <div style={styles.card}>
          <h3>Step 3: Type & Duration</h3>

          <div>
            <label>
              <input
                type="radio"
                value="monthly"
                checked={type === "monthly"}
                onChange={(e) => setType(e.target.value)}
              />
              Monthly
            </label>

            <label style={{ marginLeft: 20 }}>
              <input
                type="radio"
                value="yearly"
                checked={type === "yearly"}
                onChange={(e) => setType(e.target.value)}
              />
              Yearly
            </label>
          </div>

          <div>
            <label>Duration:</label>
            <input
              type="number"
              min="1"
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
            />
          </div>

          <div style={styles.actions}>
            <button onClick={back}>Back</button>
            <button onClick={next}>Next</button>
          </div>
        </div>
      )}

      {/* STEP 4 */}
      {step === 4 && (
        <div style={styles.card}>
          <h3>Step 4: Price</h3>

          <p>Unit Price: <b>{unitPrice} DH</b></p>
          <p>Total Price: <b>{totalPrice} DH</b></p>

          <div style={styles.actions}>
            <button onClick={back}>Back</button>
            <button onClick={next}>Next</button>
          </div>
        </div>
      )}

      {/* STEP 5 */}
      {step === 5 && (
        <div style={styles.card}>
          <h3>Step 5: Confirmation</h3>

          <ul>
            <li>Client: {client.name}</li>
            <li>Type: {type}</li>
            <li>Duration: {duration}</li>
            <li>Total: {totalPrice} DH</li>
            <li>Status: Active</li>
          </ul>

          <button
            style={styles.confirm}
            onClick={() => {
              console.log({
                client_id: client.id,
                type,
                duration,
                unitPrice,
                totalPrice,
                ancien_abonnement_id: hasActiveSubscription ? 99 : null,
              });
              alert("Subscription created!");
            }}
          >
            Confirm Subscription
          </button>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: 500,
    margin: "auto",
    fontFamily: "Arial",
  },
  card: {
    padding: 20,
    border: "1px solid #ddd",
    borderRadius: 8,
    marginTop: 20,
  },
  info: {
    marginTop: 10,
    background: "#f5f5f5",
    padding: 10,
  },
  actions: {
    marginTop: 20,
    display: "flex",
    justifyContent: "space-between",
  },
  confirm: {
    marginTop: 20,
    background: "#2563eb",
    color: "white",
    padding: 10,
    border: "none",
    borderRadius: 5,
    cursor: "pointer",
  },
};