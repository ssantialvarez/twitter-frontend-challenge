import { useEffect, useState } from "react";
import { useHttpRequestService } from "../service/HttpRequestService";
import { setLength, updateFeed } from "../redux/user";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { useQuery } from "@tanstack/react-query";
import { isEqual } from "lodash";

export const useGetFeed = () => {
  const posts = useAppSelector((state) => state.user.feed);
  const query = useAppSelector((state) => state.user.query);
  const dispatch = useAppDispatch();

  const service = useHttpRequestService();
  const { data, isLoading, isError } = useQuery({
    queryKey: ['posts', query],
    queryFn: async () => service.getPosts(query),
    staleTime: 1000 * 60 * 5
  })
  
  useEffect(() => {
    if (data && !isEqual(data, posts)) {
      dispatch(updateFeed(data)); // Solo actualiza Redux si los datos son diferentes
      dispatch(setLength(data.length));
    }
  }, [data, dispatch]); // Eliminamos `posts` de las dependencias para evitar el bucle infinito
  
  
  return { posts, isLoading, isError };
};
