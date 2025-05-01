// site.model.ts
export interface SiteImage {
  id: number;
  siteId: string;
  image: string;
}

export interface Site {
  id: string;
  name: string;
  description: string;
  governmentId: number;
  siteImages: SiteImage[];
}

export interface SiteAddDto {
  name: string;
  description: string;
  governmentId: number;
  images: File[];
}

export interface SiteUpdateDto {
  id: string;
  name: string;
  description: string;
  governmentId: number;
  siteImages?: SiteImage[];
  images?: File[];
}
