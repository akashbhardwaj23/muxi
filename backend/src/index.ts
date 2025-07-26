import express, { type Request, type Response } from "express";
import dotenv from "dotenv"
import cors from "cors"
import router from "./routes/route"
import cluster from "cluster"
import { songUpload } from "./scripts/songs";

dotenv.config();

if (cluster.isPrimary) {
  const app = express();

  app.use(express.json())
  app.use(cors())

  app.use("/api/v1", router);
  const worker =  cluster.fork()


  app.get("/health", (req: Request, res: Response) => {
    res.status(200).json({
      message: "All Ok",
    });
  });



  app.listen(process.env.PORT, () => {
    console.log(`Server Running at Port ${process.env.PORT}`)
  })
} else {
  async function upload(){
    await songUpload()
    console.log("here in worker")
    process.exit(0)
  }
  upload()
}