import express from "express";
const port = 9999;
const app = express();
app.get("/", async (req, res) => {
    res.send("Server is working great!");
});
import User from './routes/user.route.mjs';
app.use('/api/v1/user', User);
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
