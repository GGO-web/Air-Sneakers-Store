import { Offcanvas, Stack } from "react-bootstrap";

import { useAppSelector } from "../../hooks/reduxHooks";
import {
   getCartItemsSelector,
   getCartTotalItemsSelector,
   getCartTotalPriceSelector,
} from "../../redux/cart/cartSlice";
import { formatCurrency } from "../../utilities/formatCurrency";

import CartItem from "./components/CartItem/CartItem";

const Cart = ({
   cartIsOpen,
   setCartIsOpen,
}: {
   cartIsOpen: boolean;
   setCartIsOpen: Function;
}) => {
   const cartItems = useAppSelector(getCartItemsSelector);
   const totalPrice = useAppSelector(getCartTotalPriceSelector);
   const cartTotalItems = useAppSelector(getCartTotalItemsSelector);

   return (
      <Offcanvas
         show={cartIsOpen}
         onHide={() => setCartIsOpen(false)}
         placement="end"
      >
         <Offcanvas.Header closeButton>
            <Offcanvas.Title>Cart</Offcanvas.Title>
         </Offcanvas.Header>

         <Offcanvas.Body>
            {cartTotalItems > 0 ? (
               <Stack gap={3}>
                  {cartItems.map((item) => (
                     <CartItem
                        key={item.sneaker.productId}
                        price={item.price}
                        quantity={item.count}
                        sneaker={item.sneaker}
                     />
                  ))}
                  <div className="ms-auto fw-bold fs-5">
                     Total {formatCurrency(totalPrice)}
                  </div>
               </Stack>
            ) : (
               <div className="fs-2">
                  There is nothing to show, add sneaker from the store first
               </div>
            )}
         </Offcanvas.Body>
      </Offcanvas>
   );
};

export default Cart;
