import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useAppSelector } from "../../hooks/reduxHooks";
import { getSneakersItemsSelector } from "../../redux/sneakers/sneakersSlice";
import { ISneaker } from "../../redux/sneakers/sneakers.model";

import Header from "../../components/Header/Header";
import { Button, Card } from "react-bootstrap";
import { formatCurrency } from "../../utilities/formatCurrency";

const ProductInfo = () => {
   const sneakers = useAppSelector(getSneakersItemsSelector);
   const params = useParams<{ id: string }>();

   const [product, setProduct] = useState<ISneaker>();

   const getProductById = useCallback(() => {
      const id = params.id?.slice(1);

      setProduct(
         sneakers.find(
            (sneaker: ISneaker) => sneaker.productId === id
         ) as ISneaker
      );
   }, [params.id, sneakers]);

   useEffect(() => {
      getProductById();
   }, [getProductById]);

   return (
      <>
         <Header></Header>

         <article className="product-info section-offsets">
            <div className="product-info__inner container">
               <Card className="product-info__card">
                  <Card.Img
                     className="w-100"
                     src={product?.productAsset.preview || "#!"}
                  ></Card.Img>

                  <Card.Body>
                     <Card.Title className="mb-4">
                        <h2 className="product-info__title">
                           {product?.productName || ""}
                        </h2>

                        <div className="d-flex justify-content-between align-items-end gap-4 mb-2">
                           <span className="fs-5">{product?.styleCode}</span>

                           <span
                              className="product-info__price"
                              style={{ fontWeight: "bold" }}
                           >
                              {formatCurrency(
                                 (product?.priceWithTax.min as number) * 0.01
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
   );
};

export default ProductInfo;
