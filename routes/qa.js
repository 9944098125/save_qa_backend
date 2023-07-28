const router = require("express").Router();

const {
  createQA,
  getQA,
  updateQA,
  deleteQA,
  getAllQA,
} = require("../controllers/qa");
const verifyToken = require("../middleware/verifyToken");

router.route("/post-qa").post(verifyToken, createQA);

router.route("/get-qa/:userId/:toolId").get(verifyToken, getQA);

router.route("/update-qa/:qaId").put(verifyToken, updateQA);

router.route("/get-all").get(getAllQA);

router.route("/delete-qa/:qaId").delete(verifyToken, deleteQA);

module.exports = router;
