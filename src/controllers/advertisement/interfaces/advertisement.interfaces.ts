export interface advertisementBody {
    image: Express.Multer.File
    url: string
    career_id: number;
    partner_id: number;
    date_start: Date;
    date_end: Date;
} 