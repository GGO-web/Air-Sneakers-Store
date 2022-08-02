/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { Breadcrumb, Button, Card } from "react-bootstrap";

import { useAppSelector } from "../../hooks/reduxHooks";
import {
   getSneakersItemsSelector,
   setSneakers,
} from "../../redux/sneakers/sneakersSlice";
import { ISneaker } from "../../redux/sneakers/sneakers.model";
import { formatCurrency } from "../../utilities/formatCurrency";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { addCartItem } from "../../redux/cart/cartSlice";

import Header from "../../components/Header/Header";

const ProductInfo = () => {
   const sneakers = useAppSelector(getSneakersItemsSelector);
   const { id } = useParams<{ id: string }>();

   const [product, setProduct] = useState<ISneaker>();

   const dispatch = useDispatch();

   const [sneakersStore] = useLocalStorage("sneakers");

   const getProductById = useCallback(() => {
      if (!product && sneakersStore) {
         setProduct(
            sneakers.find(
               (sneaker: ISneaker) => sneaker.productId === id
            ) as ISneaker
         );
      }
   }, [product, sneakers, sneakersStore]);

   useEffect(() => {
      if (sneakers.length === 0 && sneakersStore) {
         dispatch(setSneakers(sneakersStore as unknown as ISneaker[]));
      }
   }, []);

   useEffect(() => {
      if (sneakers) getProductById();
   }, [dispatch, sneakers, sneakersStore, getProductById]);

   return (
      <>
         <Header></Header>

         {product ? (
            <>
               <article className="product-info section-offsets">
                  <div className="product-info__inner container">
                     <Breadcrumb>
                        <li className="breadcrumb-item">
                           <NavLink
                              className="text-decoration-underline"
                              to="/products"
                           >
                              Store
                           </NavLink>
                        </li>

                        <Breadcrumb.Item active>
                           {product.productName}
                        </Breadcrumb.Item>
                     </Breadcrumb>

                     <Card className="product-info__card">
                        <Card.Img
                           className="w-100 product-info__card-img"
                           src={product?.productAsset.preview || "#!"}
                        ></Card.Img>

                        <Card.Body>
                           <Card.Title className="mb-4">
                              <h2 className="product-info__title">
                                 {product?.productName || ""}
                              </h2>

                              <div className="d-flex justify-content-between align-items-end gap-4 mb-2">
                                 <span className="fs-5">
                                    {product?.styleCode}
                                 </span>

                                 <span
                                    className="product-info__price"
                                    style={{ fontWeight: "bold" }}
                                 >
                                    {formatCurrency(
                                       (product?.priceWithTax.min as number) *
                                          0.01
                                    )}
                                 </span>
                              </div>
                           </Card.Title>

                           <Card.Text
                              className="product-info__description"
                              dangerouslySetInnerHTML={{
                                 __html: product?.description || "",
                              }}
                           ></Card.Text>

                           <Button
                              onClick={() => dispatch(addCartItem(product))}
                              className="w-100 text-white pt-2 pb-2 px-3"
                              variant="primary"
                              size="sm"
                           >
                              Add to cart
                           </Button>
                        </Card.Body>
                     </Card>
                  </div>
               </article>
            </>
         ) : (
            <div className="section-offsets">
               <p>Oooopsss something went wrong...</p>

               <NavLink
                  to="/products"
                  className="button-style btn-reset d-block text-center"
               >
                  View all sneakers
               </NavLink>
            </div>
         )}
      </>
   );
};

export default ProductInfo;
