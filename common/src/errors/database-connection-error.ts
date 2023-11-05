import { CustomError } from "./custom-error";

export class DatabaseConnectionError extends CustomError {
    statusCode= 500;

    constructor(public message: string){
        super('db connection error');
    }

    generateErrors(){
        return [{ message: 'db connection error' }]
    }
}
