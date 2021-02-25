module.exports = (req, res, next) => {
    console.log(`Method: ${req.method}, Url: ${req.url}`);
    next();
};