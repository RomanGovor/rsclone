const express = require('express');
const userRouter = require('./routers/user');
const port = process.env.PORT;
const cors = require('cors');
require('./db/db');

const app = express();
app.use(cors());
app.use(express.json({ extended: true }));
app.use(userRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
