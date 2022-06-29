import { Application, Router } from "https://deno.land/x/oak@v10.2.1/mod.ts";
import { oakCors } from "https://deno.land/x/cors@v1.2.2/mod.ts";
import { initDb } from './data/data.ts'

import { getAllEmployees, getEmployeeById, updateEmployee, addEmployee, deleteEmployee } from './api/employeeApis.ts';

const port = 8280;
const app = new Application();


const router = new Router();

router
  .get('/employees', getAllEmployees)
  .get('/employees/:id', getEmployeeById)
  .put('/employees/:id', updateEmployee)
  .post('/employees', addEmployee)
  .delete('/employees/:id', deleteEmployee);

app.use(oakCors());
app.use(router.routes());
app.use(router.allowedMethods());

app.addEventListener("listen", ({ hostname, port, secure }) => {
  console.log(`--- Listening on: ${secure ? "https://" : "http://"}${hostname ?? "localhost"
    }:${port} ---`
  );

  console.log(`--> You can now navigate to http://${hostname ?? "localhost"}:${port}/employees`);
});

// Init in-memory DB
initDb();

await app.listen({ port });
