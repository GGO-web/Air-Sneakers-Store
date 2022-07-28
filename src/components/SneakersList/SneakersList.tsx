import { FC, useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";

import { ISneaker } from "../../redux/sneakers/sneakers.model";
import {
   fetchSneakers,
   getSneakersItemsSelector,
} from "../../redux/sneakers/sneakersSlice";

import Sneaker from "./Sneaker/Sneaker";

const SneakersList: FC = () => {
   const dispatch = useAppDispatch();
   const sneakers: ISneaker[] = useAppSelector(getSneakersItemsSelector);

   useEffect(() => {
      dispatch(fetchSneakers());
   }, [dispatch]);

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
