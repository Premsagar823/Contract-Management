const Contract = require("../models/Contract");
const Blueprint = require("../models/Blueprint");

const allowedTransitions = {
  CREATED: ["APPROVED", "REVOKED"],
  APPROVED: ["SENT"],
  SENT: ["SIGNED", "REVOKED"],
  SIGNED: ["LOCKED"],
  LOCKED: [],
  REVOKED: []
};

// Create Contract from Blueprint
exports.createContract = async (req, res) => {
  try {
    const { name, blueprintId, fieldValues } = req.body;

    const blueprint = await Blueprint.findById(blueprintId);
    if (!blueprint) {
      return res.status(404).json({ message: "Blueprint not found" });
    }

    const fields = blueprint.fields.map((field) => ({
      type: field.type,
      label: field.label,
      position: field.position,
      value: fieldValues?.[field.label] || null
    }));

    const contract = await Contract.create({
      name,
      blueprintId,
      blueprintName: blueprint.name,
      fields
    });

    res.status(201).json(contract);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get All Contracts
exports.getContracts = async (req, res) => {
  try {
    const contracts = await Contract.find().sort({ createdAt: -1 });
    res.json(contracts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Contract Status
exports.updateContractStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const contract = await Contract.findById(req.params.id);

    if (!contract) {
      return res.status(404).json({ message: "Contract not found" });
    }

    if (!allowedTransitions[contract.status].includes(status)) {
      return res.status(400).json({
        message: `Invalid transition from ${contract.status} to ${status}`
      });
    }

    contract.status = status;
    await contract.save();

    res.json(contract);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
