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
    CustomerName: string;
    CustomerEmail: string;
    CustomerPhone: string;
    CustomerAddress: string;
    CustomerCity: string;
    CustomerCountry: string;
    CustomerPostalCode: string;
    CustomerTaxID: string | null;
}
export interface Service {
    id: number;
    name: string;
    description: string;
    quantity: number;
    price_tax: number;

}
export interface Provider {
    id: number;
    ProviderName: string;
    ProviderEmail: string;
    ProviderPhone: string;
    ProviderAddress: string;
    ProviderCity: string;
    ProviderCountry: string;
    ProviderPostalCode: string;
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
