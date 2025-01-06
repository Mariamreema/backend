const mongoose = require("mongoose");

const SurveySchema = new mongoose.Schema({
  name: { type: String, required: true },
  gender: { type: String, required: true },
  nationality: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  message: { type: String },
});
const Survey = mongoose.model('Survey', SurveySchema);//creating the survey model
module.exports = mongoose.model("Survey", SurveySchema);
