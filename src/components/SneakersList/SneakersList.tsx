import { collection } from "firebase/firestore";
import { FC, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useFirestoreCollectionData } from "reactfire";
import { firestore } from "../../firebaseConfig";

import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { useLocalStorage } from "../../hooks/useLocalStorage";

import { ISneaker } from "../../redux/sneakers/sneakers.model";
import {
   getSneakersItemsSelector,
   setSneakers,
} from "../../redux/sneakers/sneakersSlice";

import Sneaker from "./Sneaker/Sneaker";

const SneakersList: FC = () => {
   const [limit, setLimit] = useState(6);

   const dispatch = useAppDispatch();
   const sneakers: ISneaker[] = useAppSelector(getSneakersItemsSelector);

   const [sneakersStorage, setSneakersStorage] = useLocalStorage("sneakers");

   const sneakersCollection = collection(firestore, "sneakers");
   const sneakersFirestore = useFirestoreCollectionData(sneakersCollection);

   const updateSneakersLimit = (): void => {
      setLimit(limit + 5);

      setTimeout(() => {
         window.scrollTo({
            behavior: "smooth",
            top: document.body.scrollHeight,
         });
      }, 300);
   };

   useEffect(() => {
      if (sneakers.length === 0 && sneakersStorage) {
         dispatch(setSneakers(sneakersStorage as ISneaker[]));
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   useEffect(() => {
      if (sneakers.length === 0 && !sneakersStorage) {
         const sneakersItems = JSON.parse(
            JSON.parse(sneakersFirestore.data[0].sneakers)
         );
         dispatch(setSneakers(sneakersItems.items));
      }

      if (!sneakersStorage && sneakers.length) {
         setSneakersStorage(sneakers);
      }
   });

   return (
      <>
         <ul className="sneakers-list list-reset">
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
            onClick={() => updateSneakersLimit()}
            variant="outline-success"
            className="mt-5 w-100 load-more pt-2 pb-2"
            style={limit >= sneakers.length ? { display: "none" } : undefined}
         >
            Load more
         </Button>
      </>
   );
};

export default SneakersList;
