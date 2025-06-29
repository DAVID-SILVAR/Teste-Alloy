<script setup>
import { ref, watch, computed } from 'vue'

const props = defineProps({
    task: {
        type: Object,
        default: null
    }
})

const emit = defineEmits(['close', 'save'])

const form = ref({
    nome: '',
    descricao: '',
    data_limite: '',
    finalizado: false
})

const errors = ref({
    nome: null,
})

const resetForm = () => {
    form.value = {
        nome: '',
        descricao: '',
        data_limite: '',
        finalizado: false
    }
    errors.value = { nome: null }
}

watch(() => props.task, (newTask) => {
    if (newTask) {
        form.value = { ...newTask }
        if (form.value.data_limite) {
            const date = new Date(form.value.data_limite)
            const year = date.getFullYear()
            const month = String(date.getMonth() + 1).padStart(2, '0')
            const day = String(date.getDate()).padStart(2, '0')
            form.value.data_limite = `${year}-${month}-${day}`
        }
        errors.value = { nome: null }
    } else {
        resetForm()
    }
}, { immediate: true })


const validate = () => {
    let valid = true
    if (!form.value.nome.trim()) {
        errors.value.nome = 'O título é obrigatório'
        valid = false
    } else {
        errors.value.nome = null
    }
    return valid
}

const isValid = computed(() => {
    return form.value.nome.trim() !== ''
})

const submit = () => {
    if (validate()) {
        emit('save', form.value)
    }
}
</script>

<template>
    <div class="modal-overlay" @click.self="emit('close')" role="dialog" aria-modal="true">
        <form class="modal-content" @submit.prevent="submit" novalidate>
            <div class="top-modal">
                <h3>{{ task?.id ? 'Editar Tarefa' : 'Nova Tarefa' }}</h3>
                <button type="button" @click="emit('close')" class="close-modal" aria-label="Fechar modal">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17 7L7 17M7 7L17 17" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                            stroke-linejoin="round" />
                    </svg>
                </button>
            </div>

            <div class="content-modal">
                <div class="form-fields">
                    <div class="input-wrap" :class="{ error: errors.nome }">
                        <input v-model="form.nome" class="input" type="text" id="title" placeholder=" "
                            aria-describedby="nome-error" required autofocus />
                        <label for="title" class="field-label">Título *</label>
                        <span v-if="errors.nome" class="error-message" id="nome-error">{{ errors.nome }}</span>
                    </div>

                    <div class="input-wrap">
                        <textarea v-model="form.descricao" class="input" id="description" rows="3"
                            placeholder=" "></textarea>
                        <label for="description" class="field-label">Detalhes</label>
                    </div>

                    <div class="input-wrap">
                        <input v-model="form.data_limite" class="input" type="date" id="dueDate" placeholder=" " />
                        <label for="dueDate" class="field-label">Data Limite</label>
                    </div>
                </div>
            </div>

            <div class="bottom-modal">
                <div class="flex-block-horizontal-right-align">
                    <button type="button" @click="emit('close')" class="button outlined rounded">Fechar</button>
                    <button :disabled="!isValid" type="submit" class="button rounded">
                        {{ task?.id ? 'Salvar' : 'Adicionar' }}
                    </button>
                </div>
            </div>
        </form>
    </div>
</template>

<style scoped>
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.modal-content {
    background: white;
    border-radius: 8px;
    width: 90%;
    max-width: 500px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    outline: none;
}

.top-modal {
    padding: 16px;
    border-bottom: 1px solid #eee;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.close-modal {
    background: none;
    border: none;
    cursor: pointer;
    padding: 4px;
    line-height: 0;
}

.content-modal {
    padding: 16px;
}

.input-wrap {
    margin-bottom: 16px;
    position: relative;
}

.input-wrap.error .input {
    border-color: #e74c3c;
}

.error-message {
    color: #e74c3c;
    font-size: 0.85rem;
    margin-top: 4px;
    display: block;
}

.input {
    width: 100%;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 16px;
    background: transparent;
}

.field-label {
    position: absolute;
    left: 8px;
    top: 8px;
    color: #999;
    transition: all 0.2s;
    pointer-events: none;
    background: white;
    padding: 0 4px;
}

.input:focus+.field-label,
.input:not(:placeholder-shown)+.field-label {
    top: -10px;
    font-size: 12px;
    color: #333;
}

.bottom-modal {
    padding: 16px;
    border-top: 1px solid #eee;
}

.flex-block-horizontal-right-align {
    display: flex;
    justify-content: flex-end;
    gap: 8px;
}

.button.rounded {
    padding: 8px 16px;
    border-radius: 20px;
    cursor: pointer;
    border: none;
    font-weight: 600;
    font-size: 1rem;
    user-select: none;
}

.button.outlined {
    background: none;
    border: 1px solid #ddd;
    color: #333;
}

.button.rounded:not(.outlined) {
    background: #4caf50;
    color: white;
}

.button.rounded:disabled {
    background: #a5d6a7;
    cursor: not-allowed;
    color: #eee;
}
</style>
