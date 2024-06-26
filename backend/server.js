import express from "express"
import cors from "cors"
import { connectDb } from "./config/db.js"
import foodRoutes from "./routes/foodRoutes.js"
import userRoutes from './routes/userRoutes.js';
import 'dotenv/config'
import cartRouter from "./routes/cartRoutes.js";
import orderRouter from "./routes/orderRoutes.js";

// app config
const app = express()
const port = 4000

// middleware
app.use(express.json())
app.use(cors())

// connection 
connectDb();

// api endpoint
app.use('/api/users',userRoutes)
app.use("/api/food",foodRoutes)
app.use("/images", express.static('uploads'))
app.use('/api/cart',cartRouter)
app.use('/api/order',orderRouter)


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

// mongodb+srv://<username>:<password>@cluster0.9fsr0cr.mongodb.net/?