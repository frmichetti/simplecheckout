angular.module('app', [])
    .controller('AppController', ['$http', function ($http) {
        var controller = this;

        controller.items = [
            {qty: 2, description: "Large Mocha Latte", price: 4.25},
            {qty: 1, description: "Banana Nut Muffin", price: 2.15},
        ];

        controller.months = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        controller.years = ["", "2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023", "2024", "2025"];

        const myClonedArray = Object.assign([], controller.items);

        controller.tax = 0.0;
        controller.total = 0.0;

        controller.totalArray = myClonedArray.map(function (i) {
            return i['price'];
        });

        var total = 0;
        angular.forEach(controller.totalArray, function (i) {
            total += i;
        });

        controller.tax = total * 0.25;
        controller.total = total + controller.tax;
        controller.selectedMonth = "";
        controller.selectedYear = "";


        var payload = {items: []};

        angular.forEach(controller.items, function (i) {
            payload.items.push({amount: i['price'] * 1000, description: i['description'], quantity: i['qty']});
        });

        payload.items.push({amount: controller.tax * 1000, description: "taxes", quantity: 1});

        controller.number1 = "", controller.number2 = "", controller.number3 = "", controller.number4 = "";
        controller.holderName = "";
        controller.cvv = "";


     function payNow() {
         controller.cardNumber = controller.number1 + controller.number2 + controller.number3 + controller.number4;

         payload.customer = {
             "name": "Tony Stark",
             "email": "avengerstark@ligadajustica.com.br"
         };

         payload.payments = [
             {
                 "payment_method": "credit_card",
                 "credit_card": {
                     "recurrence": false,
                     "installments": 1,
                     "statement_descriptor": "AVENGERS",
                     "card": {
                         "number": controller.cardNumber,
                         "holder_name": controller.holderName,
                         "exp_month": controller.months.indexOf(controller.selectedMonth),
                         "exp_year": parseInt(controller.selectedYear[2] + controller.selectedYear[3]),
                         "cvv": controller.cvv,
                         "billing_address": {
                             "line_1": "10880, Malibu Point, Malibu Central",
                             "zip_code": "90265",
                             "city": "Malibu",
                             "state": "CA",
                             "country": "US"
                         }
                     }
                 }
             }
         ];

         var debugParams = {
             "items": [
                 {
                     "amount": 2990,
                     "description": "Chaveiro do Tesseract",
                     "quantity": 1
                 },
                 {
                     "amount": 3990,
                     "description": "Chaveiro do Tesseract 2",
                     "quantity": 1
                 },
                 {
                     "amount": 5990,
                     "description": "Chaveiro do Tesseract 3",
                     "quantity": 1
                 }
             ],
             "customer": {
                 "name": "Tony Stark",
                 "email": "avengerstark@ligadajustica.com.br"
             },
             "payments": [
                 {
                     "payment_method": "credit_card",
                     "credit_card": {
                         "recurrence": false,
                         "installments": 1,
                         "statement_descriptor": "AVENGERS",
                         "card": {
                             "number": "4000000000000010",
                             "holder_name": "Tony Stark",
                             "exp_month": 1,
                             "exp_year": 30,
                             "cvv": "3531",
                             "billing_address": {
                                 "line_1": "10880, Malibu Point, Malibu Central",
                                 "zip_code": "90265",
                                 "city": "Malibu",
                                 "state": "CA",
                                 "country": "US"
                             }
                         }
                     }
                 }
             ]
         };

         $http.post("http://localhost:8000/pay", debugParams).then(function (resp){
             console.log(resp);
             debugger;
         }).catch(function (error){
             console.log(error);
             debugger;
         });
     }



     controller.payNow = payNow;
    }]);