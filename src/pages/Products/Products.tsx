import Header from "../../components/Header/Header";
import SneakersList from "../../components/SneakersList/SneakersList";

const Products = () => {
   return (
      <>
         <Header></Header>

         <section className="products section-offsets">
            <div className="products__inner container">
               <SneakersList></SneakersList>
            </div>
         </section>
      </>
   );
};

export default Products;
