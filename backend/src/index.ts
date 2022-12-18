import mongoose from "mongoose"
import express from "express"
import cors from "cors"
import "dotenv/config"

import userRoutes from "./routes/userRoutes"
import eventRoutes from "./routes/eventRoutes"

const app = express();

app.use(
    express.urlencoded({
        extended: true,
    })
)

app.use(cors())
app.use(express.json());

app.use("/user", userRoutes)
app.use("/event", eventRoutes)

app.get("/", (req, res) => {
    res.json({msg: "Server is running on port 3001"})
});

const DB_USER = encodeURIComponent(process.env.DB_USER!);
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD!);
const DEV_PORT = encodeURIComponent(process.env.PORT!);

mongoose.set('strictQuery', false)
mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.lavxu7q.mongodb.net/?retryWrites=true&w=majority`)
    .then( () => {
        console.log("Conectamos ao MongoDB");
        app.listen(DEV_PORT);
    })
    .catch( (err) => {
        console.log("Erro ao conectar com o MongoDB: ", err);
    })
