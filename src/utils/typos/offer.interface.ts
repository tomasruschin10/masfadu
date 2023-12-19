export interface Offer {
    title: string;
    point?: number;
    offer_category_id: number | string;
    partner_id?: number | string;
    career_id?: number | string;
    description: string;
    url?: string;
    image?: any;
    name?:string;
    company?: string;
    phone?: string;
    email?: string;
    approved?: boolean
    id?: number 
} 