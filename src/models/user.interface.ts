import { Response, Request } from 'express';
export interface IUsers {
    fullName: string;
    email: string;
    role: string;
    password: string;
    mobile: string;
    image?: string;
    state?: string;
    city?: string;
    active?: boolean;
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface IRequest extends Request {
    decoded?: { 
        id?: string
    }
}