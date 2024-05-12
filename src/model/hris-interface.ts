export interface Employee {
    id: string;
    name: string;
    email: string;
}

export interface EmployeeService {
    getEmployees(): Promise<Employee[]>;
    getEmployee(id: string): Promise<Employee>;
    createEmployee(employee: Employee): Promise<void>;
}