<template>
  <div>
    <footer class="flex flex-wrap justify-center items-center text-black dark:text-white text-sm gap-2 p-2">
      <a
        href="https://github.com/johnbotapp/whois"
        target="_blank"
        class="hover:underline"
      >
        {{ $t('footer.source') }}
      </a>
      <div class="h-1 w-1 bg-black dark:bg-white rounded-full"></div>
      <span>
        {{ $t('footer.madeWith') }} <a 
          href="https://en.wikipedia.org/wiki/Heart"
          target="_blank"
        >
          ❤️
        </a>
        {{ $t('footer.by') }} <a 
          href="https://johnbot.app"
          target="_blank"
          class="hover:underline font-semibold"
        >
          johnbot.app
        </a>
      </span>
      <div class="h-1 w-1 bg-black dark:bg-white rounded-full"></div>
      {{ $t('footer.disclaimer') }}
    </footer>
  </div>
</template>
