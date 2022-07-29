import { FC, useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { useLocalStorage } from "../../hooks/useLocalStorage";

import { ISneaker } from "../../redux/sneakers/sneakers.model";
import {
   fetchSneakers,
   getSneakersItemsSelector,
} from "../../redux/sneakers/sneakersSlice";

import Sneaker from "./Sneaker/Sneaker";

const SneakersList: FC = () => {
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
      <ul className="sneakers-list list-reset">
         {sneakers.map((sneaker: ISneaker) => {
            return (
               <Sneaker
                  key={sneaker.productId}
                  sneaker={{ ...sneaker }}
               ></Sneaker>
            );
         })}
      </ul>
   );
};

export default SneakersList;
