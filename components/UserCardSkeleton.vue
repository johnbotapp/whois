<template>
  <div class="rounded-md flex border-2 text-black dark:text-white bg-white dark:bg-black border-black dark:border-white p-3 px-5 w-full justify-center flex-col gap-3 h-36">
    <div class="flex justify-center gap-4 items-center w-full">
      <div class="flex justify-center items-center">
        <div class="animate-pulse bg-zinc-300 dark:bg-zinc-700 rounded-full h-[80px] w-[80px] pointer-events-none"></div>
      </div>
      <div class="flex flex-col justify-center gap-4 overflow-hidden w-full">
        <div class="flex flex-col gap-2">
          <span class="animate-pulse bg-zinc-300 dark:bg-zinc-700 rounded-[3px] h-4 w-2/3 sm:w-1/3"></span>
          <span class="animate-pulse bg-zinc-300 dark:bg-zinc-700 rounded-[3px] h-4 w-3/4 sm:w-2/4"></span>
        </div>
      </div>
    </div>
  </div>
</template>
