import { useEffect } from "react";
import { Offcanvas, Stack } from "react-bootstrap";
import { useSigninCheck } from "reactfire";

import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { ICartItem } from "../../redux/cart/cart.model";
import {
   getCartItemsSelector,
   getCartTotalItemsSelector,
   getCartTotalPriceSelector,
   setCartItems,
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

   const dispatch = useAppDispatch();

   const { status, data: signInCheckResult } = useSigninCheck();

   const [cartStore, setCartStore] = useLocalStorage<ICartItem[]>(
      `cart-${signInCheckResult.user?.email}`
   );

   useEffect(() => {
      if (cartItems.length === 0 && cartStore) {
         dispatch(setCartItems(cartStore));
      }
   }, []);

   useEffect(() => {
      setCartStore(cartItems);
   }, [cartItems]);

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
