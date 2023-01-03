// 3rd PART IMPORTS
import mongoose from "mongoose"
import express from "express"
import cors from "cors"
import "dotenv/config"

// MY IMPORTS
import UserRoutes from "./routes/UserRoutes";
import AuthRoutes from "./routes/AuthRoutes";

// SETTING ENV VARIABLES
const { PORT, DB_USER, DB_PASSWORD } = require("./config").development

// CREATING APP WITH EXPRESS 
const app = express();

// SETTING BUILT-IN MIDDLEWARES
app.use(
    express.urlencoded({
        extended: true, // app will use `qs` lib instead of `querystring` lib
    })
)
app.use(cors()); // app will handle preflight requests
app.use(express.json()); // app will parse requests with json payloads

// SETTING APP ENDPOINTS
app.get("/", (req, res) => { // root
    res.json({msg: "Server is running on port 3004"})
});
app.use("/users", UserRoutes);
app.use("/auth", AuthRoutes);

// SETTING DATABASE CONNECTION
mongoose.set('strictQuery', false);
mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.lavxu7q.mongodb.net/?retryWrites=true&w=majority`)
    .then( () => {
        console.log("Conectamos ao MongoDB");
        app.listen(PORT);
    })
    .catch( (err) => {
        console.log("Erro ao conectar com o MongoDB: ", err);
    });
