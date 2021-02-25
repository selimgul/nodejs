module.exports = () => {

    function getenv(req, res) {
        res.send(process.env);
    }

    return {
        getenv
    };
}