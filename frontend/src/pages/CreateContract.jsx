import { useEffect, useState } from "react";
import API from "../services/api";

const CreateContract = () => {
  const [blueprints, setBlueprints] = useState([]);
  const [blueprintId, setBlueprintId] = useState("");
  const [values, setValues] = useState({});
  const [name, setName] = useState("");

  useEffect(() => {
    API.get("/blueprints").then((res) => setBlueprints(res.data));
  }, []);

  const selected = blueprints.find((b) => b._id === blueprintId);

  const submit = async () => {
    await API.post("/contracts", {
      name,
      blueprintId,
      fieldValues: values
    });
    alert("Contract created");
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Create Contract</h2>

      <input
        placeholder="Contract Name"
        onChange={(e) => setName(e.target.value)}
      />

      <br /><br />

      <select onChange={(e) => setBlueprintId(e.target.value)}>
        <option>Select Blueprint</option>
        {blueprints.map((b) => (
          <option key={b._id} value={b._id}>
            {b.name}
          </option>
        ))}
      </select>

      <br /><br />

      {selected?.fields.map((f, i) => (
        <div key={i}>
          <label>{f.label}</label>
          <input
            onChange={(e) =>
              setValues({ ...values, [f.label]: e.target.value })
            }
          />
        </div>
      ))}

      <br />
      <button onClick={submit}>Create Contract</button>
    </div>
  );
};

export default CreateContract;
