import { Employee } from '../model/employee.ts';

const employeeInitialData: Employee[] = [
  { id:  "32b1eac1-68b2-4006-8057-af0d0511e68f", firstname: 'Max', lastname: 'Derick', email: 'max.derick@mail.com' },
  { id:  "5336d688-d176-4888-a91d-ede9fbdca572", firstname: 'Lara', lastname: 'Seller' },
  { id:  "563d5393-0cfd-402a-a6ba-da99e74516cb", firstname: 'Thomas', lastname: 'Ross', email: 'thomas.ross@mail.com' },
  { id:  "5efc1144-d418-401e-9290-1dd98d37cf5a", firstname: 'Lisa', lastname: 'Portland' },
  { id:  "682d081b-9246-4fdc-8a76-013572aedd76", firstname: 'Francesco', lastname: 'Leardini', email: 'francesco.leardini@mail.com' },
];

export function initDb() {
    localStorage.clear();
    employeeInitialData.forEach((empl) => {
        localStorage.setItem(empl.id, JSON.stringify(empl));
    });

    console.log(`Local DB initialized with ${employeeInitialData.length} entries`);
}

export function getAllRecords(): Employee[] {
    const storedEmployees = Object.values(localStorage);
    const mappedItems: Employee[] = [];
    storedEmployees.forEach((val) => {
        mappedItems.push(JSON.parse(val));
    });

    return mappedItems;
}

export function getById(id: string): Employee | null {
    if (!id) {
        return null;
    }

    const record = localStorage.getItem(id);
    return record ? JSON.parse(record) : null;
}

export function addRecord(employee: Employee): boolean {
    try {
        if (!hasValidId(employee)) {
            return false;
        }

        localStorage.setItem(employee.id, JSON.stringify(employee));
        return true;
    } catch (err) {
        console.error(err);
        return false;
    }
}
export function deleteRecord(id: string): boolean {
    try {
        if (!id || !recordExists(id)) {
            return false;
        }

        localStorage.removeItem(id);
        return true;
    } catch (err) {
        console.error(err);
        return false;
    }
}

export function updateRecord(id: string, employee: Employee): boolean {
    try {
        if (!id) {
            return false;
        }

        const storedEmployee = getById(id);
        if (!storedEmployee) {
            return false;
        }

        const updatedRecord = { ...storedEmployee, ...employee };
        localStorage.removeItem(id);
        localStorage.setItem(id, JSON.stringify(updatedRecord));

        return true;
    } catch (err) {
        console.error(err);
        return false;
    }
}

// Private Methods
const hasValidId = (targetEmployee: Employee): boolean => {
    return Object.hasOwn(targetEmployee, 'id');
};

const recordExists = (id: string): string | null => {
    return localStorage.getItem(id);
};
