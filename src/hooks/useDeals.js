import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { apiClient } from '../utils/api'

export const useDeals = () => {
  return useQuery({
    queryKey: ['deals'],
    queryFn: () => apiClient.get('/deals')
  })
}

export const useCreateDeal = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (dealData) => apiClient.post('/deals', dealData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['deals'] })
    }
  })
}

export const useUpdateDeal = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ id, ...data }) => apiClient.put(`/deals/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['deals'] })
    }
  })
}

export const useDeleteDeal = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (id) => apiClient.delete(`/deals/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['deals'] })
    }
  })
}