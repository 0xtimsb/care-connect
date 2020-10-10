import mongoose from 'mongoose';

const vitalSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  Heart_rate: mongoose.Schema.Types.Number,
  temp: mongoose.Schema.Types.Number,
  systolic_bp: mongoose.Schema.Types.Number,
  diastoli_bp: mongoose.Schema.Types.Number,
});

interface VITAL extends mongoose.Document {
  _id:string
  Heart_rate: number
  temp: number
  systolic_bp: number
  diastoli_bp: number
}

const vitalModel = mongoose.model<VITAL>('VitalModel', vitalSchema, 'vital_data');

export default module.exports = vitalModel;
