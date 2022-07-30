import { Button, Card } from "react-bootstrap";
import { NavLink } from "react-router-dom";

import { useAppDispatch } from "../../../hooks/reduxHooks";
import { addCartItem } from "../../../redux/cart/cartSlice";
import { ISneaker } from "../../../redux/sneakers/sneakers.model";

import { formatCurrency } from "../../../utilities/formatCurrency";
import { priceWithTaxToDollars } from "../../../utilities/priceWithTaxToDollars";

const Sneaker = ({ sneaker }: { sneaker: ISneaker }) => {
   const dispatch = useAppDispatch();

   function addToCart(event: any) {
      dispatch(addCartItem(sneaker));
   }

   return (
      <li className="sneakers-list__item">
         <Card className="h-100">
            <Card.Link as={NavLink} to={`/products/:${sneaker.productId}`}>
               <Card.Img
                  className="sneakers-list__item-img"
                  variant="top"
                  src={sneaker.productAsset.preview}
               />
            </Card.Link>

            <Card.Body className="d-flex flex-column">
               <Card.Title className="mb-4">
                  <span className="d-block mb-2 fs-4">
                     {formatCurrency(
                        priceWithTaxToDollars(sneaker.priceWithTax.min)
                     )}
                  </span>

                  <Card.Link
                     as={NavLink}
                     to={`/products/:${sneaker.productId}`}
                  >
                     <h2>{sneaker.productName}</h2>
                  </Card.Link>
               </Card.Title>

               <Card.Text
                  className="sneakers-list__item-description mb-4"
                  dangerouslySetInnerHTML={{ __html: sneaker.description }}
               ></Card.Text>

               <div className="mt-auto">
                  <div className="d-flex gap-3 align-items-center flex-column">
                     <NavLink
                        to={`/products/:${sneaker.productId}`}
                        className="button-style text-center btn-reset w-100"
                     >
                        Read More
                     </NavLink>

                     <Button
                        onClick={(e) => addToCart(e)}
                        className="w-100 text-white pt-2 pb-2 px-3"
                        variant="primary"
                        size="sm"
                     >
                        Add to cart
                     </Button>
                  </div>
               </div>
            </Card.Body>
         </Card>
      </li>
   );
};

export default Sneaker;
