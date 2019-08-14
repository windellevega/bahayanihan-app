export interface IUser {
    id?: number;
    firstname: string;
    middlename: string;
    lastname: string;
    email_address: string;
    username: string;
    password: string;
    address: string;
    current_long: string;
    current_lat: string;
    is_worker: boolean;
    profile_picture_url: string;
    mobile_number: string;
    skills: any[];
}
