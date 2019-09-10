import mongoose from 'mongoose';

const PopulationSchema = new mongoose.Schema({
    location: {
      type: String,
    },
    maleResidents: {
      type:  Number,
    },
    femaleResidents: {
      type: Number
    },
    totalResidents: {
      type: Number
    },
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: ['active']
    }
  },
  { timestamps: { created_At: 'created_at' } }
);

const Population = mongoose.model('Population', PopulationSchema);

export default Population;

