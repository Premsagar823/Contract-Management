const mongoose = require("mongoose");

const contractSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    blueprintId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blueprint",
      required: true
    },
    blueprintName: {
      type: String,
      required: true
    },
    fields: [
      {
        type: {
          type: String,
          enum: ["text", "date", "signature", "checkbox"]
        },
        label: String,
        value: mongoose.Schema.Types.Mixed,
        position: {
          x: Number,
          y: Number
        }
      }
    ],
    status: {
      type: String,
      enum: ["CREATED", "APPROVED", "SENT", "SIGNED", "LOCKED", "REVOKED"],
      default: "CREATED"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Contract", contractSchema);
