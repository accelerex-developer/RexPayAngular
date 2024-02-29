# rexpay

This is a JavaScript library for implementing RexPay payment gateway

## Demo

![Demo](rexpay.png?raw=true "Demo Image")

## Get Started

This Javascript library provides a wrapper to add RexPay to your React application


### Install

```sh
npm install i rexpay
Typescript installation: npm install --save-dev @types/rexpay
```

or with `yarn`

```sh
yarn add rexpay
```

### Usage

This library can be implemented into any Javascript framework application


###  Using Angular
app.component.ts
```javascript
import { Component } from '@angular/core';
import RexPay from 'rexpay';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'demoapp';
  paymentDescription = this.GetPaymentDescription();
  PayWithRexPay() {
    const transactionId = 'Test' + Math.floor(Math.random() * 1000000);
    const rex = new RexPay();
    rex
      .initializePayment({
        reference: transactionId,
        amount: 100,
        currency: "NGN",
        userId: "test@gmail.com",
        callbackUrl: "google.com",
        mode: "Debug",
        metadata: {
          email: "test@gmail.com",
          customerName: "Test User",
        },
      })
      .then((response: any) => {
        if (response.success) {
          sessionStorage.setItem('tranId', transactionId); // it can be saved to Database.
          sessionStorage.setItem('reference', response.data?.reference); // it can be saved to Database
          window.location.href = response.data?.authorizeUrl;
        } else {
          window.location.href = response.data?.authorizeUrl;
        }
      });
  }
  GetPaymentDescription(): string {
    const params = new URLSearchParams(window.location.search);
    const transactionId = params.get('transactionid');
    const rex = new RexPay();
    rex
      .VerifyPayment({
        transactionReference: transactionId,
      })
      .then((response: any) => {
        let amount = response?.data?.amount;
        if (amount) {
          sessionStorage.setItem('transactionHistory', response.data.history);
          return 'You have paid ' + amount;
        } else {
          return '';
        }
      });
    return '';
  }
}

```
 #### Request for calling InitialisePayment function.

To initialize the transaction, you'll need to pass information such as email, first name, last name amount, publicKey, etc. Email and amount are required. You can also pass any other additional information in the metadata object field. Here is the full list of parameters you can pass:
|Param       | Type                 | Default    | Required | Description                      
| :------------ | :------------------- | :--------- | :------- | :-------------------------------------------------
| amount	| `number`			   | undefined      | `true`  | Amount you want to debit customer e.g 1000.00, 10.00...
| reference      | `string`             | undefined   | `true`  | Unique case sensitive transaction identification
| userId | `string`             | undefined       | `true`  | Email address of customer or any user identification
| currency      | `string`  |  `NGN`    | `true`   | Currency charge should be performed in. Allowed only `NGN`.
| mode      | `string`  |  `Debug or Live`    | `Debug`   | Allowed values are `Debug` or `Live`.
| callBackUrl      | `string`  |  your current url page    | `false`   | CallbackUrl is the url you want your customer to be redirected to when payment is successful. The default url is the page url where customer intialized payment.
| metadata      | `object`  |  empty `object`    | `false`   | Object containing any extra information you want recorded with the transaction.

Please checkout [RexPay Documentation](https://github.com) other ways you can integrate with our plugin

## How can I thank you?

Why not star the github repo? I'd love the attention! Why not share the link for this repository on Twitter or Any Social Media? Spread the word!

Don't forget to [follow me on twitter](https://twitter.com/muyiTechBadtGuy)!

Thanks!
Olumuyiwa Aro.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
