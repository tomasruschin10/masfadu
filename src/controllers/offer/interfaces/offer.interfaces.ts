export interface offerBody {
    title: string;
    point: number;
    offer_category_id: number;
    partner_id: number;
    description: string;
    url: string;
    image: Express.Multer.File
} 