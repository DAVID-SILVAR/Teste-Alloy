<script setup>
defineEmits(['add-task'])
</script>

<template>
    <header class="app-bar">
        <h2 class="app-title">Minhas Tarefas</h2>
        <button @click="$emit('add-task')" class="add-button" aria-label="Adicionar nova tarefa"
            title="Adicionar tarefa">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true">
                <path d="M12 5V19M5 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round" />
            </svg>
        </button>
    </header>
</template>

<style scoped>
.app-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 18px 24px;
    background-color: #ffffff;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    border-bottom: none;
    border-radius: 12px;
    margin-bottom: 20px;
}

.app-title {
    font-size: 1.8rem;
    font-weight: 700;
    color: #2c3e50;
    letter-spacing: -0.02em;
}

.add-button {
    background-image: linear-gradient(to right, #6DD5ED 0%, #2193B0 100%);
    color: white;
    border: none;
    border-radius: 50%;
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 10px rgba(33, 147, 176, 0.3);
}

.add-button:hover,
.add-button:focus-visible {
    background-image: linear-gradient(to right, #2193B0 0%, #6DD5ED 100%);
    outline: none;
    transform: translateY(-2px) scale(1.05);
    box-shadow: 0 6px 15px rgba(33, 147, 176, 0.4);
}

.add-button svg {
    pointer-events: none;
    stroke: white;
}

@media (max-width: 600px) {
    .app-bar {
        padding: 15px 20px;
        margin-bottom: 15px;
    }

    .app-title {
        font-size: 1.5rem;
    }

    .add-button {
        width: 44px;
        height: 44px;
    }
}
</style>