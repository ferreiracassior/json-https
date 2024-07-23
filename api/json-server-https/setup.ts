import * as jsonServer from 'json-server';
import * as https from 'https';
import * as path from 'path'
import * as fs from 'fs'

const server = jsonServer.create();
const router = jsonServer.router(path.resolve(__dirname, '../../api/db.json'));
const middlewares = jsonServer.defaults();
server.use(jsonServer.rewriter({
  "/api/*": "/$1"
}))

server.use(router)
server.use(middlewares);

https
  .createServer(
    {
      key: readFile('./cert/localhost.key'),
      cert: readFile('./cert/localhost.crt'),
      ca: readFile('./cert/RootCA.crt')
    },
    server
  )
  .listen(5001, () => {
    console.log(
      'json server iniciado: https://localhost:5001/'
    );
  })

function readFile(pathFile: string)  {
  let content = fs.readFileSync(path.resolve(__dirname, pathFile)).toString()
  return content
}