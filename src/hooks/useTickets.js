import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { apiClient } from '../utils/api'

export const useTickets = () => {
  return useQuery({
    queryKey: ['tickets'],
    queryFn: () => apiClient.get('/tickets')
  })
}

export const useCreateTicket = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (ticketData) => apiClient.post('/tickets', ticketData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tickets'] })
    }
  })
}

export const useUpdateTicket = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ id, ...data }) => apiClient.put(`/tickets/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tickets'] })
    }
  })
}

export const useDeleteTicket = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (id) => apiClient.delete(`/tickets/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tickets'] })
    }
  })
}