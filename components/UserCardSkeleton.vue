<template>
  <div class="flex h-36 w-full flex-col justify-center gap-3 rounded-md border-2 border-black bg-white p-3 px-5 text-black dark:border-white dark:bg-black dark:text-white">
    <div class="flex w-full items-center justify-center gap-4">
      <div class="flex items-center justify-center">
        <div class="pointer-events-none size-[80px] animate-pulse rounded-full bg-zinc-300 dark:bg-zinc-700" />
      </div>
      <div class="flex w-full flex-col justify-center gap-4 overflow-hidden">
        <div class="flex flex-col gap-2">
          <span class="h-4 w-2/3 animate-pulse rounded-[3px] bg-zinc-300 dark:bg-zinc-700 sm:w-1/3" />
          <span class="h-4 w-3/4 animate-pulse rounded-[3px] bg-zinc-300 dark:bg-zinc-700 sm:w-2/4" />
        </div>
      </div>
    </div>
  </div>
</template>
