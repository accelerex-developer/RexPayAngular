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
  PayWithXpressPay() {
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
