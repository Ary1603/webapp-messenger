export interface RegisterUserUsecaseInput {
    email: string;
    password: string;
    username: string;
    name: string;
    last_name_father: string;
    last_name_mother?: string;
    birthday: string;
}