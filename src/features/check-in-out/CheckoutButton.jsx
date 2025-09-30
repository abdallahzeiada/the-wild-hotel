/* eslint-disable react/prop-types */
import { useDemoUser } from "../../hooks/useDemoUser";
import Button from "../../ui/Button";
import { useCheckout } from "./useCheckout";
function CheckoutButton({ bookingId }) {
  const {isDemoUser} = useDemoUser();
  const { checkout, isCheckingOut } = useCheckout();
  return (
    <Button
      variation="primary"
      size="small"
      onClick={() => checkout(bookingId)}
      disabled={isCheckingOut|| isDemoUser}
    >
      Check Out
    </Button>
  );
}

export default CheckoutButton;
