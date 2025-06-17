import express, { type Request, type Response } from "express";
import dotenv from "dotenv"
import cors from "cors"
import router from "./routes/route"

dotenv.config();
const app = express();

app.use(express.json())
app.use(cors())


app.use("/api/v1", router);


app.get("/health", (req: Request, res: Response) => {
    res.status(200).json({
      message: "All Ok",
    });
  });
  


app.listen(process.env.PORT, () => {
    console.log(`Server Running at Port ${process.env.PORT}`)
})