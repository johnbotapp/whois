<template>
  <img
    v-if="data.user.banner"
    :src="`https://cdn.discordapp.com/banners/${data.user.id}/${data.user.banner}?size=512`"
    class="max-h-52 w-full relative -bottom-4 rounded-t-md object-cover object-center border-t-2 border-l-2 border-r-2 border-black dark:border-white"
  />
  <div
    class="flex sm:grid grid-cols-2 grid-rows-1 border-2 text-black dark:text-white bg-white dark:bg-black border-black dark:border-white p-3 px-5 w-full justify-between flex-col gap-3 sm:gap-0 sm:flex-row sm:h-36"
    :class="data.user.banner ? 'rounded-b-md border-t-0' : 'rounded-md'"
  >
    <div class="flex justify-start sm:justify-center gap-4 items-center w-full">
      <div class="flex justify-center items-center">
        <img
          v-if="data.user?.avatar_decoration_data?.asset"
          :src="`https://cdn.discordapp.com/avatar-decoration-presets/${data.user.avatar_decoration_data.asset}?size=128`"
          class="max-w-[calc(80px*1.2)] max-h-[calc(80px*1.2)] absolute pointer-events-none"
        />
        <Preview
          :src="data.user.avatar ? `https://cdn.discordapp.com/avatars/${data.user.id}/${data.user.avatar}?size=128` : defaultAvatarURL(data.user)"
          :width="80"
          :height="80"
          :rounded="true"
        />
      </div>
      <div
        class="flex flex-col justify-center gap-4 overflow-hidden w-full"
      >
        <div class="flex flex-col gap-0">
          <div class="flex gap-2 items-center truncate">
            <span class="truncate">{{ data.user.global_name ?? data.user.username }}</span>
            <span
              v-if="data.user.bot"
              class="flex bg-[#5865f2] rounded-[3px] px-1 h-4 leading-none text-[11px] text-white uppercase aling-center items-center font-semibold tracking-wider"
              :title="(data.user.verified_bot || data.user.system) ? 'Verified Bot' : 'Bot'"
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
              <span v-if="data.user.bot && !data.user.system">Bot</span>
              <span v-if="data.user.system">System</span>
            </span>
          </div>
          <span class="opacity-75 truncate">
            {{ data.user.discriminator === '0' ? `@${data.user.username}` : `${data.user.username}#${data.user.discriminator}` }}
          </span>
        </div>
      </div>
    </div>
    <div
      class="flex flex-col justify-between items-start sm:items-end gap-3 sm:gap-0 w-full"
    >
      <div class="flex flex-col items-start sm:items-end gap-2 sm:gap-0 leading-none sm:leading-6">
        <div class="flex">
          <span class="opacity-75">Created:&nbsp;</span>
          <NuxtTime
            :datetime="getTimestamp(data.user.id)"
            second="numeric"
            month="long"
            day="numeric"
            hour="numeric"
            minute="numeric"
            year="numeric"
            class="text-black dark:text-white h-fit text-right w-[max-content]"
          />
        </div>
        <div>
          <span class="opacity-75">ID:&nbsp;</span>
          <span>{{ data.user.id }}</span>
        </div>
      </div>
      <div class="flex gap-2 flex-wrap justify-start sm:justify-end sm:max-w-[250px]">
        <div
          v-for="flag in data.user.user_flags"
          :key="flag"
          class="relative group h-fit"
          :title="flagsName[flag]"
        >
          <img :src="`/img/icons/${flag}.svg`" class="h-5 max-w-[24px]" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import flagsName from '~/utils/flagsName.json';

  defineProps({
    data: {
      type: Object,
      required: true
    },
  });

  const getTimestamp = function(snowflake) {
    return snowflake / 4194304 + 1420070400000;
  }

  const defaultAvatarURL = function(user) {
    const index = parseInt(user.discriminator === '0' ? user.id / 1000 : user.discriminator) % 5;
    return `https://cdn.discordapp.com/embed/avatars/${index}.png`;
  }

</script>
