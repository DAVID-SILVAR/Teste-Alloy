<script setup>
defineProps({
    tasks: {
        type: Array,
        required: true,
    },
    loading: {
        type: Boolean,
        default: false,
    },
})

defineEmits(['edit', 'toggle', 'delete'])
</script>

<template>
    <section class="tasks" aria-live="polite" aria-busy="loading">
        <div v-if="loading" class="loading" role="status" aria-label="Carregando tarefas">
            Carregando tarefas...
        </div>

        <div v-else-if="tasks.length === 0" class="empty-state" role="region" aria-label="Nenhuma tarefa">
            Nenhuma tarefa encontrada. Clique no botão "+" para adicionar uma.
        </div>

        <ul v-else class="task-list">
            <li v-for="task in tasks" :key="task.id" class="task" :class="{ 'task-completed': task.finalizado }">
                <label class="checkbox-field" :for="'task-checkbox-' + task.id">
                    <input type="checkbox" :id="'task-checkbox-' + task.id" :checked="task.finalizado"
                        @change="$emit('toggle', task.id)" aria-checked="task.finalizado" />
                    <span class="checkbox-label">{{ task.nome }}</span>
                </label>

                <time v-if="task.data_limite" class="date" :datetime="new Date(task.data_limite).toISOString()"
                    aria-label="Data limite">
                    {{ new Date(task.data_limite).toLocaleDateString('pt-BR') }}
                </time>

                <p v-if="task.descricao" class="task-description">{{ task.descricao }}</p>

                <div class="task-actions">
                    <button @click="$emit('edit', task)" class="button edit" aria-label="Editar tarefa" title="Editar">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor"
                            stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
                            <path d="M12 20h9" />
                            <path d="M16.5 3.5a2.121 2.121 0 113 3L7 19l-4 1 1-4 12.5-12.5z" />
                        </svg>
                    </button>

                    <button @click="$emit('delete', task.id)" class="button delete" aria-label="Excluir tarefa"
                        title="Excluir">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor"
                            stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
                            <path d="M3 6h18" />
                            <path
                                d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6m5-3h4a2 2 0 012 2v1H8V5a2 2 0 012-2z" />
                            <path d="M10 11v6" />
                            <path d="M14 11v6" />
                        </svg>
                    </button>
                </div>
            </li>
        </ul>
    </section>
</template>

<style scoped>
.tasks {
    flex: 1;
    margin: 20px 0;
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    color: #333;
}

.loading,
.empty-state {
    text-align: center;
    padding: 20px;
    color: #666;
    font-style: italic;
}

.task-list {
    list-style: none;
    margin: 0;
    padding: 0;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 6px rgb(0 0 0 / 0.1);
}

.task {
    display: flex;
    align-items: flex-start;
    padding: 12px 16px;
    border-bottom: 1px solid #eee;
    gap: 1rem;
}

.task:last-child {
    border-bottom: none;
}

.task-completed {
    opacity: 0.6;
    text-decoration: line-through;
}

.checkbox-field {
    flex-grow: 1;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    user-select: none;
}

.checkbox-field input[type="checkbox"] {
    width: 18px;
    height: 18px;
    cursor: pointer;
}

.checkbox-label {
    font-weight: 600;
    font-size: 1rem;
    line-height: 1.2;
}

.date {
    background: #e0e7ff;
    color: #2c3e9e;
    border-radius: 6px;
    padding: 4px 8px;
    font-size: 0.85rem;
    font-weight: 600;
    white-space: nowrap;
    align-self: center;
}

.task-description {
    flex-basis: 100%;
    margin-top: 6px;
    font-size: 0.9rem;
    color: #555;
    user-select: text;
}

.task-actions {
    display: flex;
    gap: 8px;
    align-items: center;
    margin-left: auto;
}

.button {
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 6px;
    border-radius: 6px;
    transition: background-color 0.15s ease-in-out;
    color: #555;
    display: flex;
    align-items: center;
    justify-content: center;
}

.button:hover,
.button:focus-visible {
    background-color: #dde4ff;
    outline: none;
    color: #1a3dff;
}

.button.edit svg,
.button.delete svg {
    stroke: currentColor;
}

.button.edit:hover,
.button.edit:focus-visible {
    color: #0a74ff;
}

.button.delete:hover,
.button.delete:focus-visible {
    color: #ff3b3b;
}
</style>
