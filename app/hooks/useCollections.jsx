"use client";

import useSWR from "swr";
import { getCollectionsSlider } from "../lib/firestore/collections/read";

const fetcher = async () => {
  const products = await getCollectionsSlider();
  return products;
};

export function useCollections() {
  const { dataSLider, errorSlider } = useSWR("featured-collections", fetcher);

  return {
    dataSLider,
    errorSlider,
    isLoading: !data && !error,
  };
}
