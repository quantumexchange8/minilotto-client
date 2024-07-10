<script setup>
import { toRefs, computed } from 'vue'
import { Link } from '@inertiajs/vue3'

const props = defineProps({
    variant: {
        type: String,
        default: 'primary',
        validator(value) {
            return ['primary', 'secondary', 'destructive', 'icon'].includes(value)
        },
    },
    type: {
        type: String,
        default: 'submit',
    },
    squared: {
        type: Boolean,
        default: false,
    },
    pill: {
        type: Boolean,
        default: false,
    },
    href: {
        type: String,
    },
    disabled: {
        type: Boolean,
        default: false,
    },
    srText: {
        type: String || undefined,
        default: undefined,
    },
    external: {
        type: Boolean,
        default: false,
    }
})

const emit = defineEmits(['click'])

const { type, variant, squared, pill, href, iconPosition, srText, external } = props

const { disabled } = toRefs(props)

const baseClasses = [
    'inline-flex items-center justify-center self-center whitespace-nowrap transition-colors font-medium text-sm select-none disabled:cursor-not-allowed focus:outline-none ',
]

const variantClasses = (variant) => ({
    'bg-blue-1 text-white hover:bg-blue-2': variant == 'primary',
    'bg-gray-1 text-gray-5 hover:bg-gray-2 dark:bg-gray-6 dark:text-white dark:hover:bg-gray-5': variant == 'secondary',
    'bg-red-1 text-white hover:bg-red-2': variant == 'destructive',
    'bg-transparent text-gray-5 hover:bg-gray-1 dark:text-white dark:hover:bg-gray-7': variant == 'icon',
})

const classes = computed(() => [
    ...baseClasses,
    variantClasses(variant),
    variant === 'icon' ? 'p-3 rounded-full w-fit' : 'py-3 px-6 rounded w-full',
    // {
    //     'rounded-md': !squared && !pill,
    //     'rounded-full': pill,
    // },
    {
        'pointer-events-none': href && disabled.value,
    },
    {
        '!bg-gray-1 !text-gray-3 dark:!bg-gray-6 dark:!text-gray-5': disabled.value === true && (variant === 'primary' || variant === 'secondary' || variant === 'destructive'),
        '!bg-transparent !text-gray-3 dark:!bg-gray6': disabled.value === true && variant === 'icon',
    },
])

const handleClick = (e) => {
    if (disabled.value) {
        e.preventDefault()
        e.stopPropagation()
        return
    }
    emit('click', e)
}

const Tag = external ?  'a' : Link
</script>

<style scoped>
/* Add styles for the slot container */
.icon-slot-container {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
}

.margin-right {
  margin-right: 6px;
}

.margin-left {
  margin-left: 6px;
}

</style>

<template>
    <component
        :is="Tag"
        v-if="href"
        :href="!disabled ? href : null"
        :class="classes"
        :aria-disabled="disabled.toString()"
    >
        <span
            v-if="srText"
            class="sr-only"
        >
            {{ srText }}
        </span>

        <slot />
    </component>

    <button
        v-else
        :type="type"
        :class="classes"
        @click="handleClick"
        :disabled="disabled"
    >
        <span
            v-if="srText"
            class="sr-only"
        >
            {{ srText }}
        </span>

        <span 
            class="flex items-center justify-center"
        >
            <slot />
        </span>
    </button>
</template>
