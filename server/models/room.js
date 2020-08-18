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
        connected: { type: Boolean, default: true },
      },
    ],
    messages: [
      {
        name: { type: String, required: true },
        content: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
      },
    ],
    typing: [{ type: String, default: [] }],
  },
  {
    timestamps: true,
  },
);

roomSchema.index({ createdAt: 1 }, { expireAfterSeconds: 21600 });

module.exports = model('rooms', roomSchema);
