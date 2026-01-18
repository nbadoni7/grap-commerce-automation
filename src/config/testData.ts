

import { TestData } from '../models/testData';

export const testData: TestData = {
  products: [
    {
      name: "Fluffy Maracas",
      size: "36-40",
      price: 6.80
    },
     {
      name: "Super Squeaky",
      size: "36-40",
      price: 6.80
    }
  ],
  labels: {
    addToCart: "Add to Cart",
    cart: "Cart",
    viewShoppingCart: "View shopping cart",
    goBack: "Back",
    close: "Close",
    next: "Next",
    startCheckout: "Start Checkout",
    payment: "Payment",
    confirmationTrackTrace: "Confirmation + Track & trace",
    shippingAddress: "Shipping address",
    billingAddress: "Billing address",
    products: "Products",
    shippingFlatRateFixed: "Shipping ({method})",
    grandTotal: "Grand total",
  },
  categories: {
    women: "Women"
  },
  shipping: {
    default: "Flat Rate Fixed",
    methods: [
      {
        name: "Flat Rate Fixed",
        price: 8.50
      }
    ],
    address: {
      email: "test.user@example.com",
      firstName: "Test",
      lastName: "User",
      street: "Fusionopolis View",
      houseNumber: "01",
      postcode: "138577",
      city: "Singapore",
      country: "SG",
      telephone: "000-000-0000"
    }
  }
};