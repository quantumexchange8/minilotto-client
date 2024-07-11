<script setup>
import { computed } from 'vue';

const props = defineProps({
    errors: Object,
    selectedRecord: {
        type: Object,
        required: true,
    },
});

const emit = defineEmits(['close'])

const formattedMessage = computed(() => {
  return props.selectedRecord.message.replace(/<p><\/p>/g, '<p class="empty-paragraph"></p>');
});
</script>

<template>
    <div class="flex flex-col py-5 px-4 gap-6 min-h-full max-h-screen">
        <div class="flex flex-col gap-6 overflow-y-auto max-h-[450px]">
            <div v-html="props.selectedRecord.subject_title" class="font-bold text-md dark:text-white break-words"></div>
            <div v-html="formattedMessage" class="text-sm dark:text-white break-words"></div>
        </div>
    </div>
</template>