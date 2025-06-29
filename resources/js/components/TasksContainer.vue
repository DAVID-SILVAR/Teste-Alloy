<script setup>
import { ref, onMounted } from 'vue'
import { useTaskStore } from '@/stores/counter'
import AppBar from '@/components/AppBar.vue'
import Footer from '@/components/Footer.vue'
import TaskList from '@/components/tasks/TaskList.vue'
import TaskModal from '@/components/tasks/TaskModal.vue'

const taskStore = useTaskStore()
const showModal = ref(false)
const currentTask = ref(null)
const loading = ref(true)

onMounted(async () => {
    await taskStore.fetchTasks()
    loading.value = false
})

const openModal = (task = null) => {
    currentTask.value = task
    showModal.value = true
}

const closeModal = () => {
    showModal.value = false
    currentTask.value = null
}

const handleSaveTask = async (taskData) => {
    if (taskData.id) {
        await taskStore.updateTask(taskData.id, taskData)
    } else {
        await taskStore.createTask(taskData)
    }
    closeModal()
}
</script>

<template>
    <div class="content-tasks">
        <AppBar @add-task="openModal" />

        <TaskList :tasks="taskStore.tasks" :loading="loading" @edit="openModal" @toggle="taskStore.toggleTask"
            @delete="taskStore.deleteTask" />

        <Footer />

        <TaskModal v-if="showModal" :task="currentTask" @close="closeModal" @save="handleSaveTask" />
    </div>
</template>

<style scoped>
.content-tasks {
    width: 100%;
    padding: 20px;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
}
</style>