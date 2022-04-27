import axios from 'axios';
import { creditCardPayment } from './types';

const creditCard = (params: creditCardPayment) => {
    // Set config defaults when creating the instance
    const instance = axios.create({
        baseURL: 'https://api.pagar.me/1'
    });

    // Alter defaults after instance has been created
    // @ts-ignore
    // instance.defaults.headers.common['Authorization'] = 'Basic ' + Buffer.from(process.env.PAGARME_KEY).toString('base64');
    // instance.defaults.headers.common['Content-Type'] = 'application/json';

    const config = {
        // headers: {'Content-Type': 'application/json', 'Authorization': 'Basic ' + Buffer.from(process.env.PAGARME_KEY!).toString('base64')},
    }


    return instance.post('/transactions', params, config);
}
export default { creditCard };