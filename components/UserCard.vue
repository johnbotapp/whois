<template>
  <img
    v-if="data.user.banner"
    :src="`https://cdn.discordapp.com/banners/${data.user.id}/${data.user.banner}?size=512`"
    class="relative -bottom-4 h-48 max-h-48 w-full rounded-t-md border-x-2 border-t-2 border-black object-cover object-center dark:border-white"
  />
  <div
    class="flex w-full grid-cols-2 grid-rows-1 flex-col justify-between gap-3 border-2 border-black bg-white p-3 px-5 text-black dark:border-white dark:bg-black dark:text-white sm:grid sm:h-36 sm:flex-row sm:gap-0"
    :class="data.user.banner ? 'rounded-b-md border-t-0' : 'rounded-md'"
  >
    <div class="flex w-full items-center justify-start gap-4 sm:justify-center">
      <div class="flex items-center justify-center">
        <img
          v-if="data.user?.avatar_decoration_data?.asset"
          :src="`https://cdn.discordapp.com/avatar-decoration-presets/${data.user.avatar_decoration_data.asset}?size=128`"
          class="pointer-events-none absolute max-h-[calc(80px*1.2)] max-w-[calc(80px*1.2)]"
        />
        <Preview
          :src="data.user.avatar ? `https://cdn.discordapp.com/avatars/${data.user.id}/${data.user.avatar}?size=128` : defaultAvatarURL(data.user)"
          :width="80"
          :height="80"
          :rounded="true"
        />
      </div>
      <div class="flex w-full flex-col justify-center gap-4 overflow-hidden">
        <div class="flex flex-col gap-0">
          <div class="flex items-center gap-2 truncate">
            <span class="truncate">{{ data.user.global_name ?? data.user.username }}</span>
            <span
              v-if="data.user.bot"
              class="flex h-4 items-center rounded-[3px] bg-[#5865f2] px-1 text-[11px] font-semibold uppercase leading-none tracking-wider text-white"
              :title="(data.user.verified_bot || data.user.system) ? flagNames[locale]['VerifiedBot'] : 'Bot'"
            >
              <svg
                v-if="data.user.verified_bot || data.user.system"
                width="16"
                height="16"
                viewBox="0 0 16 15.2"
                class="-ml-1"
              >
                <path
                  d="M7.4,11.17,4,8.62,5,7.26l2,1.53L10.64,4l1.36,1Z"
                  fill="currentColor"
                />
              </svg>
              <span v-if="data.user.bot && !data.user.system">App</span>
              <span v-if="data.user.system">{{ $t('user.system') }}</span>
            </span>
          </div>
          <span class="truncate opacity-75">
            {{ data.user.discriminator === '0' ? `@${data.user.username}` : `${data.user.username}#${data.user.discriminator}` }}
          </span>
        </div>
      </div>
    </div>
    <div class="flex w-full flex-col items-start justify-between gap-3 sm:items-end sm:gap-0">
      <div class="flex flex-col items-start gap-2 leading-none sm:items-end sm:gap-0 sm:leading-6">
        <div class="flex w-max">
          <span class="opacity-75">{{ $t('user.created') }}&nbsp;</span>
          <NuxtTime
            :datetime="getTimestamp(data.user.id)"
            second="numeric"
            month="long"
            day="numeric"
            hour="numeric"
            minute="numeric"
            year="numeric"
            class="h-fit text-black dark:text-white"
          />
        </div>
        <div class="w-max">
          <span class="opacity-75">{{ $t('user.id') }}&nbsp;</span>
          <span>{{ data.user.id }}</span>
        </div>
      </div>
      <div class="flex flex-wrap justify-start gap-2 sm:max-w-[250px] sm:justify-end">
        <div
          v-for="flag in data.user.user_flags"
          :key="flag"
          class="group relative h-fit"
          :title="flagNames[locale][flag]"
        >
          <img :src="`/img/icons/${flag}.svg`" class="h-5 max-w-[24px]" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import flagNames from '~/utils/flagNames.json';
  import {
    getTimestamp
  } from '@/utils/functions';

  defineProps({
    data: {
      type: Object,
      required: true
    }
  });

  const {
    locale
  } = useI18n();

  function defaultAvatarURL(user) {
    const index = parseInt(user.discriminator === '0' ? user.id / 1000 : user.discriminator) % 5;
    return `https://cdn.discordapp.com/embed/avatars/${index}.png`;
  }

</script>
