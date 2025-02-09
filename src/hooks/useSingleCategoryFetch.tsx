import { useQuery } from "@tanstack/react-query";
import { getSingleCategory } from "../http/apiCalls";
import { useEffect, useState } from "react";
import { Category } from "../pages/products/types";

export const useSingleCategoryFetch = (id: string) => {

  //console.log(id,"inside id")
  const [categoryData, setCategoryData] = useState<Category>()
  const { error, isLoading,refetch: categoryDataFetch } = useQuery({
    queryKey: ["singleCategory", id],
    queryFn: async () => {
      const res = await getSingleCategory(id);
      if (res.status === 200) {
        return res.data;
      } else {
        throw new Error("Error fetching category data");
      }
    }
  });


  useEffect(() => {
    const fetchRestaurantData = async () => {
      const promise = await categoryDataFetch()
    
      setCategoryData(promise?.data?.data);
    }
    fetchRestaurantData()
  }, [id,categoryDataFetch])
  return { categoryData, error, isLoading };
}