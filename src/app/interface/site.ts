
import { Government } from "./government";
import { SiteImage } from "./site-image";

export interface Site {
  siteId: string;
  siteName: string;
  siteDescription: string;
  governmentId: number;
  government?: Government;
  siteImages?: SiteImage[];
}
