<template>
  <div class="flex items-center justify-center">
    <div class="flex w-full max-w-xl flex-col items-start justify-center gap-2.5 p-4">
      <div
        v-if="error"
        class="flex h-28 w-full flex-col justify-center rounded-md border-2 border-red-500 p-3 px-5 text-red-500"
      >
        <h1 class="text-xl font-semibold">{{ $t('user.error.title') }}</h1>
        <span>{{ $t('user.error.description') }}</span>
      </div>
      <UserCard
        v-if="!error && data?.user"
        :data="data"
      />
      <UserCardSkeleton
        v-if="!error && !data?.user"
      />
      <div
        class="flex w-full flex-col gap-2 sm:flex-row"
        v-if="!error && data?.user"
      >
        <a
          v-if="!error"
          :href="`https://discord.com/users/${userIdRoute}`"
          target="_blank"
          class="w-full rounded-md border-2 border-black bg-white p-2 text-center text-black transition duration-150 ease-in-out hover:bg-black hover:text-white dark:border-white dark:bg-black dark:text-white dark:hover:bg-white dark:hover:text-black"
        >
          {{ $t('user.cta.view') }}
        </a>
        <a
          v-if="!error && data?.user.bot && !data?.user.system"
          :href="`https://discord.com/oauth2/authorize?client_id=${data.user.id}&scope=applications.commands%20bot`"
          target="_blank"
          class="w-full rounded-md border-2 border-black bg-white p-2 text-center text-black transition duration-150 ease-in-out hover:bg-black hover:text-white dark:border-white dark:bg-black dark:text-white dark:hover:bg-white dark:hover:text-black"
        >
          {{ $t('user.cta.invite') }}
        </a>
      </div>
      <div class="flex w-full flex-col items-center justify-center gap-2.5 sm:flex-row">
        <input
          v-model="userId"
          type="text"
          :placeholder="userIdRoute"
          data-form-type="other"
          class="w-full rounded-md border-2 border-black bg-white p-2 text-black focus:outline-none dark:border-white dark:bg-black dark:text-white"
          @keyup.enter="openUser"
        />
        <button
          @click="openUser"
          class="w-full rounded-md border-2 border-black bg-black p-2 px-4 text-white transition duration-150 ease-in-out hover:bg-white hover:text-black dark:border-white dark:bg-white dark:text-black dark:hover:bg-black dark:hover:text-white sm:w-fit"
        >
          {{ $t('index.cta.search') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
  const localePath = useLocalePath();

  definePageMeta({
    middleware: (to) => {
      if (to.path !== to.path.toLowerCase()) {
        return to.path.toLowerCase()
      }
    }
  });

  const getTimestamp = function(snowflake) {
    return snowflake / 4194304 + 1420070400000;
  }

  const defaultAvatarURL = function(user) {
    const index = parseInt(user.discriminator === '0' ? user.id / 1000 : user.discriminator) % 5;
    return `https://cdn.discordapp.com/embed/avatars/${index}.png`;
  }

  const route = useRoute();
  const userIdRoute = ref(route.params.userId);

  const { data: data, error } = await useFetch(`/api/user/${route.params.userId}`, {
    lazy: true,
  });
  
  if (data?.value?.user) {
    const username = data.value.user.discriminator === "0" ? `@${data.value.user.username}` : `${data.value.user.username}#${data.value.user.discriminator}`;
    useSeoMeta({
      title: `Whois / John-Bot - ${username}`,
      description: `Username: ${data.value.user.username}`
        + `\nID: ${data.value.user.id}`
        + `\nCreated at: ${new Date(getTimestamp(data.value.user.id)).toLocaleString('en-US', { timeZone: 'UTC' })} (UTC)`
        + `\nThis user is ${data.value.user.bot ? '' : 'not'} a bot`,
      twitterTitle: `Whois / John-Bot - ${username}`,
      twitterImage: data.value.user.avatar ? `https://cdn.discordapp.com/avatars/${data.value.user.id}/${data.value.user.avatar}` : defaultAvatarURL(data.value.user),
      twitterCard: "summary",
      twitterDescription:  `Username: ${data.value.user.username}`
        + `\nID: ${data.value.user.id}`
        + `\nCreated at: ${new Date(getTimestamp(data.value.user.id)).toLocaleString('en-US', { timeZone: 'UTC' })} (UTC)`
        + `\nThis user is ${data.value.user.bot ? '' : 'not'} a bot`,
        themeColor: data.value.user.banner_color ?? '#2b2d31',
    });
  }

  const userId = ref('');

  const openUser = function() {
    if (!userId.value || userId.value === route.params.userId) return;
    return navigateTo(localePath(`/user/${userId.value.toLowerCase()}`));
  };

</script>
