import axios from 'axios'

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || '/api',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
})

export const useApi = () => {
    return {
        getTasks: async () => {
            const response = await api.get('/tasks')
            return response.data
        },
        createTask: async (task) => {
            const response = await api.post('/tasks', task)
            return response.data
        },
        updateTask: async (id, task) => {
            const response = await api.put(`/tasks/${id}`, task)
            return response.data
        },
        deleteTask: async (id) => {
            await api.delete(`/tasks/${id}`)
        },
        toggleTask: async (id) => {
            const response = await api.patch(`/tasks/${id}/toggle`)
            return response.data
        }
    }
}