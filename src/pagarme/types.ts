export type creditCardPayment = {    
    payment_method: 'credit_card',
    amount: number,
    card_number: string,
    card_cvv: number,
    card_expiration_date: string,
    card_holder_name: string
    customer: customer,
    items: Array<item>
}

type customer = {
    id: number,
    name: string,
    type: clientType,
    email: string
}

type item = {
    id: string,
    description: string,
    amount: number,
    quantity: number
}

enum clientType {
    INDIVIDUAL = "individual",
    COMPANY = "company"
}