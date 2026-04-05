const express = require("express");
const {
  getVoterById,
  lookupVoter,
  getBoothVoters,
  getStats
} = require("../controllers/voterController");

const router = express.Router();

// Preferred endpoint: voter ID is sent in request body, not URL.
router.post("/voter/lookup", lookupVoter);

// Legacy endpoint kept temporarily for backward compatibility.
router.get("/voter/:voterId", getVoterById);

router.get("/booth/:boothNo", getBoothVoters);
router.get("/stats", getStats);

module.exports = router;
