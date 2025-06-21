const mongoose = require("mongoose");

const theatreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",

    //moongoose.schema mean i want to acces the schema of another mongoose
    //Types.ObjectId shows that i want to access the object ID  (_id: ObjectId('685501485f88949c9ecal112'))
    //ref points to which schema i want to access
    //you send this from the client side
  },
  isActive: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("theatres", theatreSchema);
