<script setup>
import { useForm, router } from '@inertiajs/vue3';
import { computed, onMounted, onUnmounted, watch } from 'vue';
import { XIcon, TrashIcon } from '@/Components/Icons/outline.jsx';
import Button from './Button.vue';
import { currentSelection } from '@/Composables'
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from '@headlessui/vue'

const props = defineProps({
    title: String,
    show: {
        type: Boolean,
        default: false,
    },
    maxWidth: {
        type: String,
        default: '2xl',
    },
    withHeader: {
        type: Boolean,
        default: true,
    },
    deleteConfirmation: {
        type: Boolean,
        default: false,
    },
    confirmationTitle: {
        type: String,
        default: '',
    },
    confirmationMessage: {
        type: String,
        default: '',
    },
    deleteUrl: {
        type: String,
        default: '',
    },
    closeable: {
        type: Boolean,
        default: true,
    },
});

const emit = defineEmits(['close']);

watch(
    () => props.show,
    () => {
        if (props.show) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = null;
        }
    }
);

const close = () => {
    if (props.closeable) {
        emit('close');
    }
};

const closeOnEscape = (e) => {
    if (e.key === 'Escape' && props.show) {
        close();
    }
};

onMounted(() => document.addEventListener('keydown', closeOnEscape));

onUnmounted(() => {
    document.removeEventListener('keydown', closeOnEscape);
    document.body.style.overflow = null;
});

const maxWidthClass = computed(() => {
    return {
        'sm': 'sm:max-w-[328px]',
        'md': 'sm:max-w-[746px]',
        'lg': 'sm:max-w-[1080px]',
    }[props.maxWidth];
});

const deleteRecord = (url) => {
    router.delete(url, {
        preserveScroll: true,
        preserveState: 'errors',
        onSuccess: () => close(),
    });
};
</script>

<template>
    <TransitionRoot appear :show="show" as="template">
        <Dialog as="div" @close="close" class="relative z-20">
            <TransitionChild
                as="template"
                enter="duration-300 ease-out"
                enter-from="opacity-0"
                enter-to="opacity-100"
                leave="duration-200 ease-in"
                leave-from="opacity-100"
                leave-to="opacity-0"
            >
                <div class="fixed inset-0 bg-black/25" />
            </TransitionChild>

            <div class="fixed inset-0 overflow-y-auto">
                <div
                    class="flex min-h-dvh items-center justify-center p-4 text-center"
                >
                    <TransitionChild
                        as="template"
                        enter="duration-300 ease-out"
                        enter-from="opacity-0 scale-95"
                        enter-to="opacity-100 scale-100"
                        leave="duration-200 ease-in"
                        leave-from="opacity-100 scale-100"
                        leave-to="opacity-0 scale-95"
                    >
                        <DialogPanel
                            class="transform w-full fixed rounded-2xl bg-white dark:bg-gray-8 text-left align-middle shadow-xl transition-all"
                            :class="[
                                'w-full sm:max-w-[360px] max-h-[98%]',
                                !props.deleteConfirmation ? 'min-h-[98%]' : 'flex flex-col gap-6 px-4 pt-5 pb-4',
                            ]"
                        >
                            <template v-if="!props.deleteConfirmation">
                                <DialogTitle
                                    :as="'div'"
                                    class="flex justify-between items-center self-stretch p-4 border-b border-gray-2 dark:border-gray-7"
                                    v-if="props.withHeader"
                                >
                                    <p class="text-gray-8 dark:text-white text-md font-bold">{{ title }}</p>
                                    <div class="flex gap-3">
                                        <slot name="deleteOption"></slot>
                                        <XIcon
                                            class="w-4 h-4 m-2.5 text-gray-5 dark:text-white hover:text-gray-3 dark:hover:text-gray-1 hover:cursor-pointer"
                                            @click="close"
                                        />
                                    </div>
                                </DialogTitle>
                                <slot></slot>
                            </template>
                            <template v-else>
                                <DialogTitle
                                    :as="'div'"
                                    class="flex flex-col justify-center items-center self-stretch gap-4"
                                >
                                    <span class="inline-flex bg-[rgba(217,45,32,0.10)] w-fit p-2 rounded-full">
                                        <TrashIcon
                                            class="w-6 h-6 text-red-1" 
                                        />
                                    </span>
                                    <div class="flex flex-col gap-1">
                                        <span class="text-center text-gray-8 dark:text-white text-md font-bold self-stretch">{{ props.confirmationTitle }}</span>
                                        <span class="text-center whitespace-pre text-gray-4 dark:text-gray-3 text-sm font-normal self-stretch">{{ props.confirmationMessage }}</span>
                                    </div>
                                </DialogTitle>
                                <div class="flex flex-col justify-center items-end gap-3 self-stretch">
                                    <Button
                                        :type="'button'"
                                        :variant="'destructive'"
                                        @click="deleteRecord(props.deleteUrl)"
                                    >
                                        {{ currentSelection.language === 'ENG' ? 'Delete' : '刪除' }}
                                    </Button>
                                    <Button
                                        :type="'button'"
                                        :variant="'secondary'"
                                        @click="close"
                                    >
                                        {{ currentSelection.language === 'ENG' ? 'Cancel' : '取消' }}
                                    </Button>
                                </div>
                            </template>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>
