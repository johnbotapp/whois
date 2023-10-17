<template>
  <div>
    <LegoPreview
      :maxWidth="500"
      class="transition-transform ease-in-out duration-500 outline-none"
    >
      <LegoPreviewDialog
        class="fixed z-800 left-0 top-0 w-screen h-screen bg-white dark:bg-black bg-opacity-50 backdrop-blur-md"
      />
      <img
        :class="{ 'rounded-full': rounded }"
        :style="`min-width: ${width}px; min-height: ${height}px;`"
        :src="src"
        :alt="alt"
        :width="width"
        :height="height"
      />
    </LegoPreview>
  </div>
</template>

<script setup>
  defineProps({
    src: {
      type: String,
      default: '',
    },
    alt: {
      type: String,
      default: '',
    },
    width: {
      type: [String, Number],
      default: undefined,
    },
    height: {
      type: [String, Number],
      default: undefined,
    },
    rounded: {
      type: Boolean,
      default: true,
    },
  })

</script>
