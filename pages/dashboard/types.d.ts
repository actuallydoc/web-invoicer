export enum InvoiceStatus {
    PAID = "PAID",
    UNPAID = "UNPAID",
}
export interface User {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    country: string;
    postalCode: string;
    invoices: Invoice[];
    services: Service[];
    customers: Customer[];
    providers: Provider[];
}
export interface Customer {
    id: number;
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    country: string;
    postalCode: string;
    tax_id: string | null;
}
export interface Service {
    id: number;
    name: string;
    description: string;
    price_tax: number;

}
export interface Provider {
    id: number;
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    country: string;
    postalCode: string;
    services: Service[];
}
export interface Invoice {
    id: number;
    user: User;
    invoiceDate: string;
    invoiceNumber: string;
    invoiceAmount: string;
    invoiceStatus: InvoiceStatus;
    provider: Provider;
    customer: Customer;
    services: Service[];
    vat_rate: number;
    price_tax: number;
}
