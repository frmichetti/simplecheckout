import axios from 'axios';

const creditCard = (params: { items: { amount: number; description: string; quantity: number; }[];
        customer: { name: string; email: string; };
        payments: { payment_method: string;
        credit_card: { recurrence: boolean; installments: number; statement_descriptor: string;
        card: { number: string; holder_name: string; exp_month: number; exp_year: number; cvv: string;
        billing_address: { line_1: string; zip_code: string; city: string; state: string; country: string; }; }; }; }[]; }) => {
    // Set config defaults when creating the instance
    const instance = axios.create({
        baseURL: 'https://api.mundipagg.com/core/v1'
    });

    // Alter defaults after instance has been created
    instance.defaults.headers.common['Authorization'] = 'Basic ' + new Buffer("sk_test_9KvJyM8SXtJ4GlV2:").toString('base64');
    instance.defaults.headers.common['Content-Type'] = 'application/json';


    return instance.post('/orders', params);

}
export default {creditCard};