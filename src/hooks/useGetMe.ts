import { useQuery } from "@tanstack/react-query";
import { axiosInstance, useHttpRequestService } from "../service/HttpRequestService";

const useGetMe = () => {
  const service = useHttpRequestService()
  const { data } = useQuery({
    queryKey: ["me"], // Clave única para el cache
    queryFn: service.me,
    staleTime: 1000 * 60 * 5, // Mantener los datos frescos por 5 minutos
  });

  return data
};

export { useGetMe };