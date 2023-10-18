<template>
  <div
    class="h-full w-full flex justify-center items-center"
  >
    <div
      class="flex flex-col justify-center items-start gap-4 max-w-xl w-full p-4"
    >
      <div
        v-if="error"
        class="flex flex-col border-2 text-red-500 border-red-500 rounded-md p-3 px-5 w-full justify-center h-28"
      >
        <h1 class="text-xl font-semibold">Error</h1>
        <span>Oops! That user ID doesn't seem to be valid.</span>
      </div>
      <UserCard
        v-if="!error"
        :data="data"
      />
      <div class="flex flex-col sm:flex-row gap-2 w-full">
        <a
          v-if="!error"
          :href="`https://discord.com/users/${userIdRoute}`"
          target="_blank"
          class="border-2 bg-white dark:bg-black dark:border-white text-black dark:text-white border-black dark:border-whit hover:bg-black dark:hover:bg-white rounded-md p-2 w-full text-center hover:text-white dark:hover:text-black transition duration-150 ease-in-out"
        >View on Discord
        </a>
        <a
          v-if="!error && data?.user?.bot && !data?.user?.system"
          :href="`https://discord.com/oauth2/authorize?client_id=${data.user.id}&scope=applications.commands%20bot`"
          target="_blank"
          class="border-2 bg-white dark:bg-black dark:border-white text-black dark:text-white border-black dark:border-whit hover:bg-black dark:hover:bg-white rounded-md p-2 w-full text-center hover:text-white dark:hover:text-black transition duration-150 ease-in-out"
        >Invite this bot
        </a>
      </div>
      <div
        class="flex flex-col sm:flex-row justify-center items-center gap-2 w-full"
      >
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
        >Lookup
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
  definePageMeta({
    alias: ['/u/:userId', '/users/:userId'],
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

  const { data: data, error } = await useFetch(`/api/user/${route.params.userId}`);
  
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
    return navigateTo(`/u/${userId.value.toLowerCase()}`);
  };

</script>
