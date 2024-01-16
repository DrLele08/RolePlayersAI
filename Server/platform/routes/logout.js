module.exports = app => {
    const router = require("express").Router();
    const logout = require("../controllers/logout");

    router.get("/", logout.Logout);

    app.use("/logout", router);
}