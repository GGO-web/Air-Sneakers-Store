import { FC, useEffect, useState } from "react";
import { Button } from "react-bootstrap";

import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { useLocalStorage } from "../../hooks/useLocalStorage";

import { ISneaker } from "../../redux/sneakers/sneakers.model";
import {
   fetchSneakers,
   getSneakersItemsSelector,
} from "../../redux/sneakers/sneakersSlice";

import Sneaker from "./Sneaker/Sneaker";

const SneakersList: FC = () => {
   const [limit, setLimit] = useState(6);

   const dispatch = useAppDispatch();
   const sneakers: ISneaker[] = useAppSelector(getSneakersItemsSelector);

   const [sneakersStorage, setSneakersStorage] = useLocalStorage(
      "sneakers",
      sneakers
   );

   useEffect(() => {
      if (sneakers.length === 0) {
         dispatch(fetchSneakers());
      }

      if (!sneakersStorage && sneakers.length) {
         setSneakersStorage(sneakers);
      }
   });

   return (
      <>
         <ul className="sneakers-list list-reset mb-5">
            {sneakers.slice(0, limit).map((sneaker: ISneaker) => {
               return (
                  <Sneaker
                     key={sneaker.productId}
                     sneaker={{ ...sneaker }}
                  ></Sneaker>
               );
            })}
         </ul>

         <Button
            onClick={() => setLimit(limit + 5)}
            variant="outline-success"
            className="w-100 load-more pt-2 pb-2"
            style={limit >= sneakers.length ? { display: "none" } : undefined}
         >
            Load more
         </Button>
      </>
   );
};

export default SneakersList;
