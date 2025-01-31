
import express from 'express'
import  { join, resolve } from 'path'
import { bootstrap } from './src/bootstrap'
// import auth from './src/utils/auth';

const app = express()
const port = process.env.PORT||3000

//config env


//public file
app.use( express.static(join(resolve(), 'public')));


app.use('/views',express.static(join(resolve(), 'views')));
app.set("view engine", "ejs");
// bootstrap
bootstrap(app, express)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))