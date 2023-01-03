import mongoose from "mongoose"
import express from "express"
import cors from "cors"
import "dotenv/config"

import UserRoutes from "./routes/UserRoutes";
import AuthRoutes from "./routes/AuthRoutes";

const { PORT, DB_USER, DB_PASSWORD } = require("./config").development

const app = express();

app.use(
    express.urlencoded({
        extended: true,
    })
)
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({msg: "Server is running on port 3004"})
});

app.use("/users", UserRoutes);
app.use("/auth", AuthRoutes);

mongoose.set('strictQuery', false);
mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.lavxu7q.mongodb.net/?retryWrites=true&w=majority`)
    .then( () => {
        console.log("Conectamos ao MongoDB");
        app.listen(PORT);
    })
    .catch( (err) => {
        console.log("Erro ao conectar com o MongoDB: ", err);
    });
