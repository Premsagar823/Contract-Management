import { useState } from "react";
import API from "../services/api";

const CreateBlueprint = () => {
  const [name, setName] = useState("");
  const [fields, setFields] = useState([]);

  const addField = () => {
    setFields([
      ...fields,
      { type: "text", label: "", position: { x: 0, y: 0 } }
    ]);
  };

  const updateField = (index, key, value) => {
    const updated = [...fields];
    updated[index][key] = value;
    setFields(updated);
  };

  const submit = async () => {
    await API.post("/blueprints", { name, fields });
    alert("Blueprint created");
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Create Blueprint</h2>

      <input
        placeholder="Blueprint Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <br /><br />

      {fields.map((f, i) => (
        <div key={i}>
          <input
            placeholder="Label"
            onChange={(e) => updateField(i, "label", e.target.value)}
          />

          <select onChange={(e) => updateField(i, "type", e.target.value)}>
            <option value="text">Text</option>
            <option value="date">Date</option>
            <option value="signature">Signature</option>
            <option value="checkbox">Checkbox</option>
          </select>
        </div>
      ))}

      <br />
      <button onClick={addField}>Add Field</button>
      <button onClick={submit}>Save Blueprint</button>
    </div>
  );
};

export default CreateBlueprint;
