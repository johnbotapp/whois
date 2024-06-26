<template>
  <div>
    <LegoPreview
      :maxWidth="500"
      class="outline-none transition-transform duration-500 ease-in-out"
    >
      <LegoPreviewDialog class="fixed left-0 top-0 z-[800] h-screen w-screen bg-white/50 backdrop-blur-md dark:bg-black" />
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
    }
  });

</script>
