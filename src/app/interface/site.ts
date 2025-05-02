<<<<<<< HEAD
// import { Trip } from "../models/trip.model";
import { SiteImage } from "../services/site-2.service";
=======

>>>>>>> faa0dc6464799fe1b3deca3604ae1f5c87749945
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
