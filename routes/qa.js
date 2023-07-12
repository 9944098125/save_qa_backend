const router = require("express").Router();

const {
  createQA,
  getQA,
  updateQA,
  deleteQA,
  getAllQA,
} = require("../controllers/qa");
const verifyToken = require("../middleware/verifyToken");

router.route("/post-qa").post(createQA);

router.route("/get-qa/:userId/:toolId").get(verifyToken, getQA);

router.route("/update-qa/:qaId").put(updateQA);

router.route("/get-all").get(getAllQA);

router.route("/delete-qa/:qaId").delete(deleteQA);

module.exports = router;
