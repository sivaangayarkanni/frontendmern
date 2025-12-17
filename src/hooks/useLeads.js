import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { apiClient } from '../utils/api'

export const useLeads = () => {
  return useQuery({
    queryKey: ['leads'],
    queryFn: () => apiClient.get('/leads')
  })
}

export const useCreateLead = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (leadData) => apiClient.post('/leads', leadData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leads'] })
    }
  })
}

export const useUpdateLead = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ id, ...data }) => apiClient.put(`/leads/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leads'] })
    }
  })
}

export const useDeleteLead = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (id) => apiClient.delete(`/leads/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leads'] })
    }
  })
}