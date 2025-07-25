import { useState, useEffect } from "react";
import { getDatabase, ref, set, onValue } from "firebase/database";
import { database } from "../lib/firebaseConfig";
import { useRouter } from "next/router";
import { getAuth, signOut } from "firebase/auth";

const db = database;
const auth = getAuth();

export default function Dashboard() {
  const [agentName, setAgentName] = useState("");
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("");
  const [agents, setAgents] = useState({});
  const router = useRouter();

  useEffect(() => {
    const agentsRef = ref(db, "CoordinationSystem/EliteHieraRace");
    const unsubscribe = onValue(agentsRef, (snapshot) => {
      const data = snapshot.val();
      setAgents(data || {});
    });

    return () => unsubscribe();
  }, []);

  const sanitizeAgentName = (name) => name.replace(/\s+/g, "");

  const handleAddAgent = () => {
    const sanitizedAgentName = sanitizeAgentName(agentName);
    if (sanitizedAgentName === "" || progress < 0 || progress > 8) {
      setMessage("Invalid input. Ensure agent name is not empty and progress is between 0 and 8.");
      return;
    }

    const agentRef = ref(db, `CoordinationSystem/EliteHieraRace/${sanitizedAgentName}`);
    set(agentRef, progress)
      .then(() => {
        setMessage("Agent added/updated successfully!");
        setAgentName("");
        setProgress(0);
      })
      .catch((error) => {
        setMessage(`Error: ${error.message}`);
      });
  };

  const handleUpdateProgress = (agent, change) => {
    const sanitizedAgentName = sanitizeAgentName(agent);
    const newProgress = Math.min(8, Math.max(0, (agents[sanitizedAgentName] || 0) + change));
    const agentRef = ref(db, `CoordinationSystem/EliteHieraRace/${sanitizedAgentName}`);
    set(agentRef, newProgress)
      .then(() => {
        setMessage(`${agent}'s progress updated successfully!`);
      })
      .catch((error) => {
        setMessage(`Error: ${error.message}`);
      });
  };

  const handleDeleteAgent = (agent) => {
    const sanitizedAgentName = sanitizeAgentName(agent);
    const agentRef = ref(db, `CoordinationSystem/EliteHieraRace/${sanitizedAgentName}`);
    set(agentRef, null)
      .then(() => {
        setMessage(`${agent} deleted successfully!`);
      })
      .catch((error) => {
        setMessage(`Error: ${error.message}`);
      });
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        router.push("/");
      })
      .catch((error) => {
        setMessage(`Error: ${error.message}`);
      });
  };

  return (
    <div className="container mt-5">
      <h1>Dashboard</h1>
      <button className="btn btn-secondary mb-3" onClick={handleLogout}>
        Logout
      </button>
      <div className="form-group">
        <label htmlFor="agentName">Agent Name:</label>
        <input
          type="text"
          id="agentName"
          className="form-control"
          value={agentName}
          onChange={(e) => setAgentName(e.target.value)}
        />
      </div>
      <div className="form-group mt-3">
        <label htmlFor="progress">Progress (0-8):</label>
        <input
          type="number"
          id="progress"
          className="form-control"
          value={progress}
          onChange={(e) => setProgress(Number(e.target.value))}
        />
      </div>
      <button className="btn btn-primary mt-3" onClick={handleAddAgent}>
        Add/Update Agent
      </button>
      {message && <p className="mt-3">{message}</p>}

      <h2 className="mt-5">Current Agents</h2>
      <ul className="list-group">
        {Object.entries(agents).map(([agent, progress]) => (
          <li key={agent} className="list-group-item d-flex justify-content-between align-items-center">
            <span>{agent}: {progress}</span>
            <div>
              <button
                className="btn btn-success btn-sm me-2"
                onClick={() => handleUpdateProgress(agent, 1)}
              >
                +1
              </button>
              <button
                className="btn btn-danger btn-sm me-2"
                onClick={() => handleUpdateProgress(agent, -1)}
              >
                -1
              </button>
              <button
                className="btn btn-warning btn-sm"
                onClick={() => handleDeleteAgent(agent)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}