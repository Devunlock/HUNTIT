import express from "express";
import cors from "cors";
import http from "http";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8001;

//DB
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes

app.get("/", (req, res) => {
    res.send("API LIT🔥!");
})

const server = http.createServer(app);
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});