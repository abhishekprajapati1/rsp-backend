const { parse_json } = require("../utils");

const validate = (schema) => {
    return async (req, res, next) => {
        const prisma = req.prisma;
        const body = req.body?.json_payload || req.body;

        const { error } = schema.validate(
            typeof body === "string" ? parse_json(body) : body
        );

        if (error) {
            // upload_cleanup(req);
            prisma.$disconnect();
            return res
                .status(400)
                .json({ success: false, message: error.details[0].message });
        }
        next();
    };
};

module.exports = validate;