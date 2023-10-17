import type { H3Event } from 'h3';
import NodeCache from 'node-cache';

const cache = new NodeCache({ stdTTL: 60 });

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const userId = getRouterParam(event as H3Event<any>, 'userId');
  if (!userId) throw createError({ message: 'userId is required' });

  const cachedData = cache.get(userId);
  if (cachedData) {
    return {
      statusCode: 200,
      user: cachedData
    };
  }

  const response = await fetch(`https://discord.com/api/v9/users/${userId}`, {
    headers: {
      'Authorization': `Bot ${config.discord.bot_token}`,
      'Content-Type': 'application/json'
    }
  });

  const data = await response.json();

  if (response.status !== 200) {
    throw createError({ statusCode: data.code, message: data.message });
  }

  const flags = {
    1: "DiscordStaff",
    2: "PartneredServerOwner",
    4: "HypesquadEvents",
    8: "BugHunter",
    64: "HypesquadHouseOfBravery",
    128: "HypesquadHouseOfBrilliance",
    256: "HypesquadHouseOfBalance",
    512: "EarlySupporter",
    16384: "BugHunterGolden",
    65536: "VerifiedBot",
    131072: "EarlyVerifiedBotDeveloper",
    262144: "ModeratorProgramsAlumni",
    4194304 : "ActiveDeveloper",
  };

  const userFlags = [];
  for (const flag in flags) {
    if (data.public_flags & flag as any) {
      // @ts-ignore
      userFlags.push(flags[flag]);
    }
  }

  if ((userFlags as Array<string>).includes('VerifiedBot')) {
    data.verified_bot = true;
    userFlags.splice(userFlags.indexOf('VerifiedBot'), 1);
  }

  data.user_flags = userFlags;

  cache.set(userId, data);

  return {
    statusCode: 200,
    user: data
  };
});
