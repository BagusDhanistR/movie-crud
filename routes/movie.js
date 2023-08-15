const router = require("express").Router()
const movieController = require("../controllers/MovieController")

router.get("/Movies", movieController.getAll)
router.get("/Movies/:ID", movieController.getDetail)
router.get("/Movies/search/:search", movieController.getSearch)
router.patch("/Movies/:ID", movieController.update)
router.post("/Movies", movieController.add)
router.delete("/Movies/:ID", movieController.delete)

module.exports = router