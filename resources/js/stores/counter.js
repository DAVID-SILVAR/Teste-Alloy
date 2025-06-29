import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useApi } from '@/services/taskService'

export const useTaskStore = defineStore('tasks', () => {
    const tasks = ref([])
    const loading = ref(false)
    const error = ref(null)

    const fetchTasks = async () => {
        try {
            loading.value = true
            tasks.value = await useApi().getTasks()
        } catch (err) {
            error.value = err.message
            console.error('Erro ao buscar tarefas:', err)
        } finally {
            loading.value = false
        }
    }

    const createTask = async (taskData) => {
        try {
            loading.value = true
            const newTask = await useApi().createTask(taskData)
            tasks.value.unshift(newTask)
            return newTask
        } catch (err) {
            error.value = err.message
            console.error('Erro ao criar tarefa:', err)
            throw err
        } finally {
            loading.value = false
        }
    }

    const updateTask = async (id, taskData) => {
        try {
            loading.value = true
            const updatedTask = await useApi().updateTask(id, taskData)
            const index = tasks.value.findIndex(t => t.id === id)
            if (index !== -1) {
                tasks.value.splice(index, 1, updatedTask)
            }
            return updatedTask
        } catch (err) {
            error.value = err.message
            console.error('Erro ao atualizar tarefa:', err)
            throw err
        } finally {
            loading.value = false
        }
    }

    const deleteTask = async (id) => {
        try {
            loading.value = true
            await useApi().deleteTask(id)
            tasks.value = tasks.value.filter(t => t.id !== id)
        } catch (err) {
            error.value = err.message
            console.error('Erro ao excluir tarefa:', err)
            throw err
        } finally {
            loading.value = false
        }
    }

    const toggleTask = async (id) => {
        try {
            loading.value = true
            const task = tasks.value.find(t => t.id === id)
            if (task) {
                const updatedTask = await useApi().updateTask(id, {
                    finalizado: !task.finalizado
                })
                const index = tasks.value.findIndex(t => t.id === id)
                if (index !== -1) {
                    tasks.value.splice(index, 1, updatedTask)
                }
                return updatedTask
            }
        } catch (err) {
            error.value = err.message
            console.error('Erro ao alternar tarefa:', err)
            throw err
        } finally {
            loading.value = false
        }
    }

    return {
        tasks,
        loading,
        error,
        fetchTasks,
        createTask,
        updateTask,
        deleteTask,
        toggleTask
    }
})