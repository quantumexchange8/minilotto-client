<script setup>
import Button from '@/Components/Button.vue'
import { currentSelection } from '@/Composables'

const props = defineProps({
    errors: Object,
    selectedRecord: {
        type: Object,
        required: true,
    },
});

const emit = defineEmits(['close'])

</script>

<template>
    <div class="flex flex-col py-5 px-4 gap-6 min-h-full max-h-screen">
        <div class="flex flex-col gap-6 overflow-y-auto max-h-[450px]">
            <div v-html="props.selectedRecord.subject_title" class="font-bold text-md dark:text-white break-words"></div>
            <div v-html="props.selectedRecord.message" class="text-sm dark:text-white break-wordssm"></div>
            <!-- <span class="font-bold text-md dark:text-white break-words">{{ props.selectedRecord.subject_title }}</span>
            <span class="text-sm dark:text-white break-words" v-html="selectedRecord.message">{{ props.selectedRecord.message }}</span> -->
        </div>
    </div>
</template>