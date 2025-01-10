export type JobItem = {
    id: number;
    title: string;
    badgeLetters: string;
    company: string;
    daysAgo: number;
    relevanceScore: number;
}

export type JobItemDetails = JobItem & {
    description: string;
    location: string;
    salary: string;
    companyURL: string;
    coverImgURL: string;
    duration: string;
    qualifications: string[];
    reviews: string[];
}

export type SortByValue = 'relevant' | 'recent';