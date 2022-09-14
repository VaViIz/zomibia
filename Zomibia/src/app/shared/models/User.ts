export interface User {
    id: string;
    email: string;
    username: string;
    name: {
        firstname?: string;
        lastname?: string;
    };
    mobileNumber?: string;
    city?: string;
    postalCode?: string;
    street?: string;
    houseNumber?: string;
}