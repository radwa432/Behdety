
import { TripService } from "../services/Trip/trip.service";
// import { SiteImage } from "../services/site-2.service";n

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
