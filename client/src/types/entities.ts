export type Filter = {
    id: number;
    name: string;
};

export type FiltersMap = {
    [key: string]: Filter[];
};

export type Employee = {
    "id": number,
    "first_name": string,
    "last_name": string,
    "role_id": number,
    "country_id": number,
    "department_id": number,
    "role": string,
    "country": string,
    "department": string
}