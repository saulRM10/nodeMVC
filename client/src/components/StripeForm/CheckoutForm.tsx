import { PaymentElement } from "@stripe/react-stripe-js";
import { useState, forwardRef, useImperativeHandle } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import styles from "./CheckoutForm.module.css";

const CheckoutForm = forwardRef((_props, ref) => {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState<string | null>(null);

  const handlePayment = async () => {
    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return false;
    }

    const stripeConfirmedPayment = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });

    if (stripeConfirmedPayment.error) {
      if (
        stripeConfirmedPayment.error.type === "card_error" ||
        stripeConfirmedPayment.error.type === "validation_error"
      ) {
        setMessage(stripeConfirmedPayment.error.message ?? "An error occurred");
      } else {
        setMessage("An unexpected error occurred.");
      }
      return false;
    }

    return true;
  };

  useImperativeHandle(ref, () => ({
    handlePayment,
  }));

  return (
    <>
      <PaymentElement />
      {message && <div id={styles.paymentMessage}>{message}</div>}
    </>
  );
});

CheckoutForm.displayName = "CheckoutForm";

export default CheckoutForm;
