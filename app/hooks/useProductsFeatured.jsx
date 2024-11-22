"use client";
import useSWR from "swr";
import { getFeaturedProducts } from "../lib/firestore/products/read";

const fetcher = async () => {
  const products = await getFeaturedProducts();
  return products;
};

export function useFeaturedProducts() {
  const { data, error } = useSWR("featured-products", fetcher);

  return {
    data,
    error,
    isLoading: !data && !error,
  };
}
