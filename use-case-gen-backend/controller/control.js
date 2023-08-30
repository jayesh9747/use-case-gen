const logOut = (req, res) => {
    req.logOut(function (err) {
        if (err) {
            console.log(err);
        } else {
            res.redirect(process.env.CLIENT_URL);
        }
    });
};

module.exports = {
    logOut,
}