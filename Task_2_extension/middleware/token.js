module.exports = function (req, res, next) {
    console.log('hello');

    const cookies = req.cookies;
    if (cookies.token) {
        next();
    } else {
        res.send(401);
    }
}