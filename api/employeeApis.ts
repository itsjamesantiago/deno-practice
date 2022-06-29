import { Employee } from '../model/employee.ts';
import * as dataLayer from '../data/data.ts';

export const getAllEmployees = ({ response }: { response: any }) => {
  response.body = dataLayer.getAllRecords();
};

export const getEmployeeById = ({ params, response }: { params: { id: string }; response: any }) => {
  const selectedEmployee = dataLayer.getById(params.id);
  if (selectedEmployee) {
    response.status = 200;
    response.body = selectedEmployee;
  } else {
    response.status = 404;
    response.body = [];
  }
};

export const addEmployee = async ({ request, response }: { request: any; response: any }) => {
  if (!request.hasBody) {
    response.status = 400;
  } else {

    const body = request.body();
    const newEmployee: Employee = await body.value;

    newEmployee.id = crypto.randomUUID();
    const success = dataLayer.addRecord(newEmployee);
    const responseCode = success ? 201 : 500;
    response.status = responseCode;
  }
};

export const deleteEmployee = ({ params, response }: { params: { id: string }; response: any }) => {
  if (params.id) {
    const storedEmployee = dataLayer.getById(params.id);
    if (storedEmployee) {
      const success = dataLayer.deleteRecord(params.id);
      const responseCode = success ? 201 : 500;
      response.status = responseCode;
    } else {
      response.status = 404;
    }
  } else {
    response.status = 400;
  }
};

export const updateEmployee = async ({
  params,
  request,
  response,
}: {
  params: { id: string };
  request: any;
  response: any;
}) => {
  const employeeToUpdate = dataLayer.getById(params.id);
  if (employeeToUpdate) {
    const body = request.body();
    const newEmployeeData: Employee = await body.value;

    const success = dataLayer.updateRecord(params.id, newEmployeeData);
    const responseCode = success ? 201 : 500;
    response.status = responseCode;
  } else {
    response.status = 404;
  }
};
