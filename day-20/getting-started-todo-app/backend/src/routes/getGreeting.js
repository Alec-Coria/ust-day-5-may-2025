const GREETINGS = [
    "Whalecome!",
    "All hands on deck!",
    "Charting the course ahead!",
];

module.exports = async (req, res) => {
    res.send({
        greetings: GREETINGS,
    });
};
