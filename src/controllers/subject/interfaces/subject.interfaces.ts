export interface subjectBody {
    data: Array<subBody>;
} 

export interface subjectUpdateBody {
    data: Array<subBody>;
    deleteData: Array<number>;
} 

interface subBody {
    name: string
    subject_category_id: number
    subject_id: number
    subject_key: number
}