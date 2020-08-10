const { model, Schema } = require('mongoose');

const roomSchema = new Schema(
  {
    host: {
      type: String, required: true, minlength: 1, maxlength: 12,
    },
    code: {
      type: String, required: true, minlength: 4, maxlength: 4,
    },
    password: { type: String, minlength: 6, maxlength: 6 },
    members: [
      {
        name: { type: String, required: true },
        wins: { type: Number, default: 0 },
      },
    ],
  },
  {
    timestamps: true,
  },
);

module.exports = model('rooms', roomSchema);
