<template>
  <div class="flex justify-center items-center">
    <div class="flex flex-col justify-center items-start gap-4 max-w-xl w-full p-4">
      <div
        v-if="error"
        class="flex flex-col border-2 text-red-500 border-red-500 rounded-md p-3 px-5 w-full justify-center h-28"
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
        class="flex flex-col sm:flex-row gap-2 w-full"
        v-if="!error && data?.user"
      >
        <a
          v-if="!error"
          :href="`https://discord.com/users/${userIdRoute}`"
          target="_blank"
          class="border-2 bg-white dark:bg-black dark:border-white text-black dark:text-white border-black dark:border-whit hover:bg-black dark:hover:bg-white rounded-md p-2 w-full text-center hover:text-white dark:hover:text-black transition duration-150 ease-in-out"
        >
          {{ $t('user.cta.view') }}
        </a>
        <a
          v-if="!error && data?.user.bot && !data?.user.system"
          :href="`https://discord.com/oauth2/authorize?client_id=${data.user.id}&scope=applications.commands%20bot`"
          target="_blank"
          class="border-2 bg-white dark:bg-black dark:border-white text-black dark:text-white border-black dark:border-whit hover:bg-black dark:hover:bg-white rounded-md p-2 w-full text-center hover:text-white dark:hover:text-black transition duration-150 ease-in-out"
        >
          {{ $t('user.cta.invite') }}
        </a>
      </div>
      <div class="flex flex-col sm:flex-row justify-center items-center gap-2 w-full">
        <input
          v-model="userId"
          type="text"
          :placeholder="userIdRoute"
          data-form-type="other"
          class="border-2 text-black dark:text-white bg-white dark:bg-black border-black dark:border-white rounded-md p-2 w-full focus:outline-none"
          @keyup.enter="openUser"
        />
        <button
          @click="openUser"
          class="w-full sm:w-fit border-2 border-black bg-black text-white dark:text-black dark:bg-white dark:border-white rounded-md p-2 px-4 hover:bg-white hover:text-black dark:hover:bg-black dark:hover:text-white transition duration-150 ease-in-out"
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
