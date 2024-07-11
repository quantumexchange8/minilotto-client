<script setup>
import { Link } from '@inertiajs/vue3';
import { useDarkMode, currentSelection } from '@/Composables'
import { SunIcon, MoonIcon, LanguageIcon } from '@/Components/Icons/outline';
import Button from '@/Components/Button.vue'

const { isDarkMode, toggleDarkMode } = useDarkMode();
</script>

<template>
    <div class="min-h-screen flex justify-center bg-white dark:bg-gray-8">
        <div class="flex justify-center w-full sm:max-w-[360px]">
            <div class="w-full">
                <nav>
                    <!-- Primary Navigation Menu -->
                    <div class="mx-auto px-4 py-3.5">
                        <div class="flex justify-between">
                            <div class="flex">
                                <!-- Website title -->
                                <div class="shrink-0 flex items-center">
                                    <Link :href="route('dashboard')">
                                        <span class="text-lg font-bold text-gray-8 dark:text-white">Minilotto.info</span>
                                    </Link>
                                </div>
                            </div>

                            <div class="flex items-center">
                                <div class="relative flex gap-4">
                                    <!-- Dark mode toggle -->
                                    <Button
                                        :type="'button'"
                                        :variant="'icon'"
                                        aria-label="Toggle dark mode"
                                        @click="toggleDarkMode"
                                        >
                                        <SunIcon v-show="isDarkMode" class="w-5 h-5 text-gray-5 dark:text-white"/>
                                        <MoonIcon v-show="!isDarkMode" class="w-5 h-5 text-gray-5 dark:text-white"/>
                                    </Button>

                                    <Button
                                        :type="'button'"
                                        :variant="'icon'"
                                        aria-label="Toggle translation"
                                        @click="currentSelection.switchLanguage()"
                                    >
                                        <LanguageIcon class="w-5 h-5 text-gray-5 dark:text-white"/>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
                <main>
                    <slot />
                </main>
            </div>
        </div>
    </div>
</template>
