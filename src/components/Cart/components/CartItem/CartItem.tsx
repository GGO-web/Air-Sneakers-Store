import { Button, Stack } from "react-bootstrap";
import { useAppDispatch } from "../../../../hooks/reduxHooks";
import {
   removeCartItem,
   updateCartItem,
} from "../../../../redux/cart/cartSlice";
import { ISneaker } from "../../../../redux/sneakers/sneakers.model";
import { formatCurrency } from "../../../../utilities/formatCurrency";

const CartItem = ({
   price,
   quantity,
   sneaker,
}: {
   price: number;
   quantity: number;
   sneaker: ISneaker;
}) => {
   const dispatch = useAppDispatch();

   const updateSneaker = () => {
      if (quantity === 1) {
         dispatch(removeCartItem({ id: sneaker.productId }));
      } else {
         dispatch(
            updateCartItem({
               id: sneaker.productId,
               type: "descrease",
            })
         );
      }
   };

   return (
      <Stack
         direction="horizontal"
         gap={2}
         className="d-flex align-items-start gap-3"
      >
         <img
            src={sneaker.productAsset.preview}
            style={{ width: "125px", height: "75px", objectFit: "contain" }}
            alt=""
         />

         <div className="d-flex flex-column gap-3 w-100">
            <h3>{sneaker.productName}</h3>

            <div className="d-flex align-items-center justify-content-between">
               <div className="text-muted fz-5">{formatCurrency(price)}</div>

               <div
                  className="d-flex align-items-center justify-content-center"
                  style={{ gap: ".5rem" }}
               >
                  <Button onClick={() => updateSneaker()}>-</Button>

                  <div>
                     <span className="text-muted fs-3">{quantity}</span>
                  </div>

                  <Button
                     onClick={() =>
                        dispatch(
                           updateCartItem({
                              id: sneaker.productId,
                              type: "increase",
                           })
                        )
                     }
                  >
                     +
                  </Button>
               </div>
            </div>

            <div className="d-flex ms-auto">
               <div> {formatCurrency(price * quantity)}</div>
            </div>
         </div>

         <Button
            onClick={() => dispatch(removeCartItem({ id: sneaker.productId }))}
            variant="danger"
            size="sm"
         >
            <img src="/images/cross.svg" alt="X" />
         </Button>
      </Stack>
   );
};

export default CartItem;
