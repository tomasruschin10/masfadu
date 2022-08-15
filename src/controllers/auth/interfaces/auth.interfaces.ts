export interface IRegisterBody {
    username: string;
    email: string;
    password: string;
    name: string;
    lastname: string;
    phone: string;
    instagram: string;
    web: string;
    uid: string;
    career_id: number;
    image: Express.Multer.File;
    device_token: string;
} 

export interface IUpdateBody {
    username: string;
    email: string;
    password: string;
    newpassword: string;
    name: string;
    lastname: string;
    phone: string;
    instagram: string;
    web: string;
    uid: string;
    career_id: number;
    image: Express.Multer.File;
    device_token: string;
} 