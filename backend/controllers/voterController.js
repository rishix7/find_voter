const { getBoothModel, getAllBoothModels } = require("../models/Voter");

const findVoterAcrossBooths = async (id) => {
  const booths = getAllBoothModels();
  const results = await Promise.all(
    booths.map(async ({ model }) => {
      const voter = await model.findOne({ voter_id: id });
      return voter;
    })
  );

  return results.find(Boolean);
};

const getVoterById = async (req, res, next) => {
  try {
    // Legacy URL-based lookup endpoint (kept for backward compatibility).
    const id = req.params.voterId?.toUpperCase().trim();

    if (!id) {
      return res.status(400).json({
        found: false,
        message: "Voter ID is required."
      });
    }

    const voter = await findVoterAcrossBooths(id);

    if (!voter) {
      return res.status(404).json({
        found: false,
        message: "Voter not found. Please check the Voter ID."
      });
    }

    return res.json({ found: true, voter });
  } catch (error) {
    return next(error);
  }
};

const lookupVoter = async (req, res, next) => {
  try {
    const id = req.body?.voterId?.toUpperCase().trim();

    if (!id) {
      return res.status(400).json({
        found: false,
        message: "Voter ID is required."
      });
    }

    const voter = await findVoterAcrossBooths(id);

    if (!voter) {
      return res.status(404).json({
        found: false,
        message: "Voter not found. Please check the Voter ID."
      });
    }

    return res.json({ found: true, voter });
  } catch (error) {
    return next(error);
  }
};

const getBoothVoters = async (req, res, next) => {
  try {
    const boothNo = Number.parseInt(req.params.boothNo, 10);
    const validBooths = [52, 53, 54];

    if (!validBooths.includes(boothNo)) {
      return res.status(400).json({
        success: false,
        message: "Invalid booth number. Use 52, 53, or 54."
      });
    }

    const Voter = getBoothModel(boothNo);
    const page = Math.max(1, Number.parseInt(req.query.page, 10) || 1);
    const pageSize = 50;
    const query = {};

    if (req.query.section !== undefined && req.query.section !== "") {
      const section = Number(req.query.section);
      if (Number.isNaN(section)) {
        return res.status(400).json({
          success: false,
          message: "section query param must be a number."
        });
      }
      query.section = section;
    }

    const [voters, total] = await Promise.all([
      Voter.find(query)
        .sort({ serial_no: 1 })
        .skip((page - 1) * pageSize)
        .limit(pageSize),
      Voter.countDocuments(query)
    ]);

    const pages = Math.ceil(total / pageSize) || 1;

    return res.json({
      booth: boothNo,
      total,
      page,
      pages,
      voters
    });
  } catch (error) {
    return next(error);
  }
};

const getStats = async (req, res, next) => {
  try {
    const [booth52, booth53, booth54] = await Promise.all([
      getBoothModel(52).countDocuments({}),
      getBoothModel(53).countDocuments({}),
      getBoothModel(54).countDocuments({})
    ]);

    return res.json({
      booth52,
      booth53,
      booth54,
      total: booth52 + booth53 + booth54
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getVoterById,
  lookupVoter,
  getBoothVoters,
  getStats
};
