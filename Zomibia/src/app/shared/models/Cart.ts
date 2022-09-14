import { Product } from 'src/app/shared/models/Product';

export interface Cart {
    userId?: string;
    products:  Array<Product>;
    amount: number;
    done?: boolean;
}