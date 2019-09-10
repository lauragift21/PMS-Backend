import mongoose from 'mongoose';

const PopulationSchema = new mongoose.Schema({
    location: {
      type: String,
      trim: true,
    },
    maleResidents: {
      type:  Number,
    },
    femaleResidents: {
      type: Number
    },
    totalResidents: {
      type: Number
    }
  },
  { timestamps: { created_At: 'created_at' } }
);

const Population = mongoose.model('Population', PopulationSchema);

export default Population;

