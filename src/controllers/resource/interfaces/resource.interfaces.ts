export interface resourceBody {
    name: string
    user_id: number;
    subject_id: number;
    resource_category_id: number;
    image: Express.Multer.File
    url: string;
    html: string;
} 