import Header from "./components/Header";
import SimpleSlider from "./components/SimpleSlider";
import CollectionsSlider from "./components/CollectionsSlider";
import CategoriesSlider from "./components/CategoriesSlider";
import ProductsGridView from "./components/ProductsGridView";
import CustomerReviews from "./components/CustomerReviews";

import { getCollections } from "./lib/firestore/collections/read_server";
import {
  getFeaturedProducts,
  getProducts,
} from "./lib/firestore/products/read_server";
import { getCategories } from "./lib/firestore/categories/read_server";
import BrandsSlider from "./components/BrandsSlider";
import { getBrands } from "./lib/firestore/brands/read_server";
import Footer from "./components/Footer";

const Home = async () => {
  const [featuredProducts, collections, categories, products, brands] =
    await Promise.all([
      getFeaturedProducts(),
      getCollections(),
      getCategories(),
      getProducts(),
      getBrands(),
    ]);

  return (
    <main className="h-screen w-screen overflow-y-auto overflow-x-hidden">
      <Header />
      <SimpleSlider featuredProducts={featuredProducts} />
      <CollectionsSlider collections={collections} />
      <CategoriesSlider categories={categories} />
      <ProductsGridView products={products} />
      <CustomerReviews />
      <BrandsSlider brands={brands} />
      <Footer />
    </main>
  );
};

export default Home;
