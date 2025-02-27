import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { HttpService, useHttpRequestService } from "../service/HttpRequestService";

const httpService = new HttpService()
const staleTime = 1000 * 60 * 5 // 5 min

export const useGetMe = () => {
  const { data } = useSuspenseQuery({
    queryKey: ["me"], 
    queryFn: httpService.service.me,
    staleTime: staleTime
  });

  return data
};

export const useGetRecommendedUsers = (limit: number, skip: number) => {
  const { data } = useSuspenseQuery({
    queryKey: ["recommendedUsers", limit, skip], 
    queryFn:  () => httpService.service.getRecommendedUsers(limit,skip),
    staleTime: staleTime, 
  });
  return data
}

export const useGetProfile = (id: string) => {
  const { data } = useSuspenseQuery({
    queryKey: ["profile", id], 
    queryFn:  () => httpService.service.getProfile(id),
    staleTime: staleTime, 
  });
  return data
}



