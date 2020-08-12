const { model, Schema } = require('mongoose');

const roomSchema = new Schema(
  {
    code: {
      type: String, required: true, minlength: 4, maxlength: 4, unique: true,
    },
    password: { type: String, minlength: 6, maxlength: 6 },
    members: [
      {
        name: { type: String, required: true },
        wins: { type: Number, default: 0 },
        host: { type: Boolean, default: false },
        socketId: { type: String, required: true },
      },
    ],
  },
  {
    timestamps: true,
  },
);

module.exports = model('rooms', roomSchema);
