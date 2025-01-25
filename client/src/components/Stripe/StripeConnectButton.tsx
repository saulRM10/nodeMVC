import { useState } from "react";
import { StripeConnectionIcon } from "../../assets/Icons";
import styles from "./Stripe.module.css";
import { connectStripe } from "../../api/stripe/service";
import { useAuth0 } from "@auth0/auth0-react";

const ConnectWithStripeButton = () => {
  const [isConnecting, setIsConnecting] = useState(false);
  const { user } = useAuth0();
  const currentUser = user;
  const handleClick = async () => {
    setIsConnecting(true);
    try {
      await connectStripe({
        id: currentUser?.id,
        group_id: currentUser?.group_id,
        email: currentUser?.email,
      });
    } catch (error) {
      console.error("error connecting to stripe:", error);
    } finally {
      setIsConnecting(false);
    }
  };
  return (
    <button disabled={isConnecting} onClick={handleClick}>
      <StripeConnectionIcon className={styles.connectLogo} />
    </button>
  );
};

export default ConnectWithStripeButton;
