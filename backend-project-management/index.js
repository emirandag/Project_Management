const express = require('express');
const dotenv = require('dotenv');
const connect = require('./src/utils/db');
const { configCloudinary } = require('./src/middlewares/files.middleware');

dotenv.config();

const PORT = process.env.PORT;

configCloudinary();

const app = express();

connect();

const cors = require('cors');

app.use(cors());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');

  res.header(
    'Access-Control-Allow-Headers',
    'Authorization, X-API-KEY, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method'
  );

  res.header(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, PATCH, DELETE, OPTIONS'
  );

  res.header('Allow', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');

  next();
});

app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ limit: '5mb', extended: false }));

const UserRoutes = require('./src/api/routes/users.routes');
const ProjectRoutes = require('./src/api/routes/projects.routes');
const TaskRoutes = require('./src/api/routes/tasks.routes')

app.use("/api/v1/users", UserRoutes)
app.use("/api/v1/projects", ProjectRoutes)
app.use("/api/v1/tasks", TaskRoutes)
app.use('*', (req, res, next) => {
  const error = new Error('Route not found');
  error.status = 404;
  next(error);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
