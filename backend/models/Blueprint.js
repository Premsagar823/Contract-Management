const mongoose = require("mongoose");

const blueprintSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    fields: [
      {
        type: {
          type: String,
          enum: ["text", "date", "signature", "checkbox"],
          required: true
        },
        label: {
          type: String,
          required: true
        },
        position: {
          x: { type: Number },
          y: { type: Number }
        }
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blueprint", blueprintSchema);
