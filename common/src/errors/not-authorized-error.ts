import { CustomError } from "./custom-error";

export class NotAuthorizedError extends CustomError {
    statusCode= 401;

    constructor(public message: string){
        super('not authorized');
    }

    generateErrors(){
        return [{ message: 'not authorized' }]
    }
}
