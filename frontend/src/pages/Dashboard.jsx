import { useEffect, useState } from "react";
import API from "../services/api";

const Dashboard = () => {
  const [contracts, setContracts] = useState([]);

  const fetchContracts = async () => {
    const res = await API.get("/contracts");
    setContracts(res.data);
  };

  const updateStatus = async (id, status) => {
    await API.patch(`/contracts/${id}/status`, { status });
    fetchContracts();
  };

  useEffect(() => {
    fetchContracts();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Contracts Dashboard</h2>

      <table border="1" cellPadding="10" width="100%">
        <thead>
          <tr>
            <th>Name</th>
            <th>Blueprint</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {contracts.map((c) => (
            <tr key={c._id}>
              <td>{c.name}</td>
              <td>{c.blueprintName}</td>
              <td>{c.status}</td>
              <td>
                {c.status === "CREATED" && (
                  <button onClick={() => updateStatus(c._id, "APPROVED")}>
                    Approve
                  </button>
                )}

                {c.status === "APPROVED" && (
                  <button onClick={() => updateStatus(c._id, "SENT")}>
                    Send
                  </button>
                )}

                {c.status === "SENT" && (
                  <>
                    <button onClick={() => updateStatus(c._id, "SIGNED")}>
                      Sign
                    </button>
                    <button onClick={() => updateStatus(c._id, "REVOKED")}>
                      Revoke
                    </button>
                  </>
                )}

                {c.status === "SIGNED" && (
                  <button onClick={() => updateStatus(c._id, "LOCKED")}>
                    Lock
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
