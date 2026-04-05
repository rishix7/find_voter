const mongoose = require("mongoose");

const voterSchema = new mongoose.Schema(
  {
    serial_no: { type: Number },
    voter_id: {
      type: String,
      uppercase: true,
      trim: true
    },
    name: { type: String },
    relation_type: { type: String },
    relation_name: { type: String },
    house_no: { type: String },
    age: { type: Number },
    gender: { type: String },
    gender_en: { type: String },
    section: { type: mongoose.Schema.Types.Mixed },
    flag: { type: mongoose.Schema.Types.Mixed },
    constituency_no: { type: Number },
    part_no: { type: Number },
    state: { type: String },
    _collection: { type: String }
  },
  {
    timestamps: false,
    versionKey: false
  }
);

voterSchema.index({ voter_id: 1 });
voterSchema.index({ part_no: 1 });
voterSchema.index({ serial_no: 1 });
voterSchema.index({ name: "text" });

const boothCollectionMap = {
  52: "voters_52",
  53: "voters_53",
  54: "voters_54"
};

const modelCache = {};

const getBoothModel = (boothNo) => {
  const collectionName = boothCollectionMap[boothNo];
  if (!collectionName) return null;

  if (!modelCache[boothNo]) {
    modelCache[boothNo] = mongoose.model(`Voter_${boothNo}`, voterSchema, collectionName);
  }

  return modelCache[boothNo];
};

const getAllBoothModels = () => [52, 53, 54].map((boothNo) => ({ boothNo, model: getBoothModel(boothNo) }));

module.exports = {
  getBoothModel,
  getAllBoothModels
};
