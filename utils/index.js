const parseJson = (jsonString) => {
    try {
        const parsedJSON = JSON.parse(jsonString);
        return parsedJSON;
    } catch (error) {
        return null;
    }
};

module.exports = {
    parseJson
}