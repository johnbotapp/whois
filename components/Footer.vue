<template>
  <div>
    <footer class="flex flex-wrap items-center justify-center gap-2 p-2 text-sm text-black dark:text-white">
      <a
        href="https://github.com/johnbotapp/whois"
        target="_blank"
        class="hover:underline"
      >
        {{ $t('footer.source') }}
      </a>
      <div class="h-1 w-1 rounded-full bg-black dark:bg-white"></div>
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
          class="font-semibold hover:underline"
        >
          johnbot.app
        </a>
      </span>
      <div class="h-1 w-1 rounded-full bg-black dark:bg-white"></div>
      {{ $t('footer.disclaimer') }}
    </footer>
  </div>
</template>
