<script setup>
import GuestLayout from '@/Layouts/GuestLayout.vue';
import { Head } from '@inertiajs/vue3';
import { ref, onMounted, computed } from 'vue'
import { useDarkMode, currentSelection } from '@/Composables'
import Modal from '@/Components/Modal.vue';
import ViewRecordDetails from './Partials/ViewRecordDetails.vue';
import { DashboardLightIcon, DashboardDarkIcon, NotFoundLightIcon, NotFoundDarkIcon } from '@/Components/Icons/outline.jsx';

const props = defineProps({
    toastOption: {
		type: [Object, String, Array],
	}
});

const { isDarkMode } = useDarkMode();
const records = ref([]);
const recordDetailsModalIsOpen = ref(false);
const selectedRecord = ref(null);

const getData = async () => {
    try {
        const recordsResponse = await axios.get(`/records/getAllRecords/`);
        records.value = recordsResponse.data;

        records.value.forEach(record => {
            const newDate = new Date(record.updated_at);
            record.updated_at = (newDate.getDate()  < 10 ? '0' + newDate.getDate() : newDate.getDate()) + '/' + ((newDate.getMonth() + 1) < 10 ? '0' + (newDate.getMonth() + 1) : (newDate.getMonth() + 1)) + '/' + (newDate.getFullYear() < 10 ? '0' + newDate.getFullYear() : newDate.getFullYear());
        });
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

onMounted(() => {
    getData();
});

const isDark = computed(() => {
    return isDarkMode;
});

const showRecordDetailsModal = (record) => {
    selectedRecord.value = record;
    recordDetailsModalIsOpen.value = true;
}

const hideRecordDetailsModal = () => {
    recordDetailsModalIsOpen.value = false;
    setTimeout(() => {
        selectedRecord.value = null;
    }, 300);
}

</script>

<template>
    <Head title="Minilotto - Dashboard" />

    <GuestLayout>
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Dashboard</h2>
        </template>

        <div class="p-4">
            <div class="flex flex-col items-center justify-center gap-5 flex-shrink-0">
                <div class="relative w-full flex items-start justify-between gap-3">
                    <div class="flex flex-col justify-center items-center gap-1">
                        <span class="self-stretch text-sm text-gray-8 dark:text-white font-bold">{{ currentSelection.language === 'ENG' ? 'Welcome to Minilotto.info!' : '歡迎來到 Minilotto.info！' }}</span>
                        <span class="self-stretch text-xs text-gray-4 dark:text-gray-3">{{ currentSelection.language === 'ENG' ? 'Check the latest winning numbers and good luck!' : '查看最新的開獎號碼，祝您好運！' }}</span>
                    </div>
                    <component :is="isDark ? DashboardDarkIcon : DashboardLightIcon" class="flex-shrink-0"></component>
                </div>
                <div class="overflow-hidden scrollbar-0 w-full flex flex-col items-center gap-3">
                    <div 
                        v-if="records.length > 0"
                        v-for="(record, index) in records" :key="index"
                        class="w-full flex flex-col self-stretch p-4 gap-1 rounded bg-gray-1 dark:bg-gray-7" 
                        @click="showRecordDetailsModal(record)"
                    >
                        <span class="self-stretch text-gray-4 text-xs">{{ record.updated_at }}</span>
                        <div v-html="record.subject_title" class="break-all line-clamp-1 text-ellipsis self-stretch text-gray-8 dark:text-white text-sm font-bold"></div>
                        <div v-html="record.message" class="break-all line-clamp-1 text-ellipsis text-gray-5 dark:text-gray-3 text-sm"></div>
                        <!-- <span class="break-all line-clamp-1 text-ellipsis self-stretch text-gray-8 dark:text-white text-sm font-bold">{{ record.subject_title }}</span>
                        <span class="break-all line-clamp-1 text-ellipsis text-gray-5 dark:text-gray-3 text-sm">{{ record.message }}</span> -->
                    </div>
                    <div class="w-full flex flex-col items-center justify-center gap-5" v-else>
                        <component :is="isDark ? NotFoundDarkIcon : NotFoundLightIcon"></component>
                        <span class="self-stretch text-center text-gray-4 text-xs">{{ currentSelection.language === 'ENG' ? 'No Records Found' : '暫無紀錄' }}</span>
                    </div>
                </div>
                <Modal 
                    v-if="selectedRecord"
                    :title="currentSelection.language === 'ENG' ? 'View Details' : '查看詳情'"
                    :show="recordDetailsModalIsOpen" 
                    :closeable="true" 
                    @close="hideRecordDetailsModal"
                >
                    <template v-if="selectedRecord">
                        <ViewRecordDetails :selectedRecord="selectedRecord" @close="hideRecordDetailsModal" />
                    </template>
                </Modal>
            </div>
        </div>
    </GuestLayout>
</template>
