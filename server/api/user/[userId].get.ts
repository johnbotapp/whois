import type { H3Event } from 'h3';
import NodeCache from 'node-cache';

const cache = new NodeCache({
  stdTTL: 60
});

interface DiscordUser {
  id: string;
  username: string;
  discriminator: string;
  avatar: string | null;
  bot?: boolean;
  system?: boolean;
  mfa_enabled?: boolean;
  banner?: string | null;
  accent_color?: number | null;
  locale?: string;
  verified?: boolean;
  email?: string | null;
  flags?: number;
  premium_type?: number;
  public_flags?: number;
  user_flags?: string[];
  verified_bot?: boolean;
  guild_count?: number;
}

interface ErrorResponse {
  code: number;
  message: string;
}

const flags: Record<number, string> = {
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
  4194304: "ActiveDeveloper",
};

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  const userId = getRouterParam(event as H3Event, 'userId');
  if (!userId) {
    throw createError({
      message: 'userId is required'
    });
  }

  const cachedData = cache.get<DiscordUser>(userId);
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

  const data = await response.json() as DiscordUser | ErrorResponse;

  if ('code' in data) {
    throw createError({
      statusCode: data.code,
      message: data.message
    });
  }

  const userFlags: string[] = [];
  for (const [flag, flagName] of Object.entries(flags)) {
    if (data.public_flags && (data.public_flags & Number(flag)) !== 0) {
      userFlags.push(flagName);
    }
  }
  data.user_flags = userFlags;

  if (data.user_flags.includes('VerifiedBot')) {
    data.verified_bot = true;
    userFlags.splice(userFlags.indexOf('VerifiedBot'), 1);
  }

  cache.set(userId, data);

  return {
    statusCode: 200,
    user: data
  };
});
