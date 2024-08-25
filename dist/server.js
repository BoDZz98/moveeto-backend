"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const auth_1 = __importDefault(require("./routes/auth"));
const reviews_1 = __importDefault(require("./routes/reviews"));
// import cors from "cors";
const app = (0, express_1.default)();
dotenv_1.default.config(); // to be able to use data in .env
// app.use(bodyParser.urlencoded()); // x-www-form-urlencoded <form> , to extract data from forms in views, using MVC architecture
app.use(body_parser_1.default.json()); // application/json, usind in rest API's to extract data from fetch functions on client side
// app.use(cors());
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*"); // To allow accessing this API from all domains
    res.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET, POST, PUT, PATCH, DELETE" // Allowed methods
    );
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization"); // Allowed coniguration options in fetch functions
    next(); // continue to the next middlware/function
});
app.use("/auth", auth_1.default);
app.use("/reviews", reviews_1.default);
mongoose_1.default
    .connect("mongodb+srv://boudy1q1q:boudy1q1q@cluster0.m2fmta0.mongodb.net/moveeto?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => {
    app.listen(process.env.PORT, () => {
        console.log("server is running on port", process.env.PORT);
    });
})
    .catch((err) => console.log("error in server.js", err));
