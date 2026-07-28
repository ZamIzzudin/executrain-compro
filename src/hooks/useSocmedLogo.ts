import { type SocmedDataProps } from "@/utils/types/socmed";

import INSTAGRAM_ICON from "@/assets/icons/instagram.svg";
import FACEBOOK_ICON from "@/assets/icons/facebook.svg";
import DISCORD_ICON from "@/assets/icons/discord.svg";
import TIKTOK_ICON from "@/assets/icons/tiktok.svg";
import YOUTUBE_ICON from "@/assets/icons/youtube.svg";
import LINKEDIN_ICON from "@/assets/icons/linkedin.svg";
import TWITTER_ICON from "@/assets/icons/twitter.svg";

const socmedIcons: Record<string, any> = {
  INSTAGRAM: INSTAGRAM_ICON,
  FACEBOOK: FACEBOOK_ICON,
  DISCORD: DISCORD_ICON,
  TKTOK: TIKTOK_ICON,
  YOUTUBE: YOUTUBE_ICON,
  LINKEDIN: LINKEDIN_ICON,
  X: TWITTER_ICON,
};

export function useSocmedLogo(socmedData: SocmedDataProps[]){
    return socmedData
        .filter(
        (item: SocmedDataProps) =>
            item.socmed_link &&
            ![
            "GMAIL",
            "WHATSAPP",
            "GMAPS",
            "SALES_EMAIL",
            "LOCATION",
            "SHORT LOCATION",
            ].includes(item.socmed_name),
        )
        .map((item: SocmedDataProps) => {
        const iconKey = item.socmed_name;

        return {
            icon: socmedIcons[iconKey] || INSTAGRAM_ICON,
            url: item.socmed_link,
            name: item.socmed_name,
        };
        });
}