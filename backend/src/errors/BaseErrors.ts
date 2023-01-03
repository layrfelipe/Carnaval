export enum HttpStatusCode {
    OK = 200,
    CREATED = 201,
    NO_CONTENT = 204,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    UNPROCESSABLE_ENTITY = 422,
    INTERNAL_SERVER = 500
}

export class BaseErrors extends Error {
    public readonly name: string;
    public readonly httpCode: HttpStatusCode;
    public readonly description: string;

    constructor(name: string, httpCode: HttpStatusCode, description: string) {
        super();
        Object.setPrototypeOf(this, new.target.prototype);
      
        this.name = name;
        this.httpCode = httpCode;
        this.description = description;
      
        Error.captureStackTrace(this);
    }
}

export class UserAlreadyExistsError extends BaseErrors {
    constructor() {
        super('UNPROCESSABLE_ENTITY', HttpStatusCode.UNPROCESSABLE_ENTITY, "User already exists");
    }
}

export class UserDoesNotExist extends BaseErrors {
    constructor() {
        super('NOT_FOUND', HttpStatusCode.NOT_FOUND, "User doesn't exist");
    }
}

export class IncorrectPassword extends BaseErrors {
    constructor() {
        super('UNPROCESSABLE_ENTITY', HttpStatusCode.UNPROCESSABLE_ENTITY, "Invalid password");
    }
}

export class InvalidID extends BaseErrors {
    constructor() {
        super('NOT_FOUND', HttpStatusCode.NOT_FOUND, "Invalid ID");
    }
}