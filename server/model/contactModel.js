import mongoose from "mongoose";

const schema = new mongoose.Schema({
  name: { type: String, required: [true,"name is required"] },
  email: { type: String, required: [true,"email is required"] },
  company: { type: String, required: [true,"company is required"] },
  country: { type: String, required: [true,"country is required"] },
  message: { type: String, required: [true,"message is required"] },
});
const model = mongoose.model("contact", schema);

export default class Contact {
  static errorFormat(e){
      console.log(e);
  }
  static async add(object) {
    const contact = new model(object);
    try{
        await contact.save()
    }catch(err){
        this.errorFormat(err.message)
    }

  }
}
