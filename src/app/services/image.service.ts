// image.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private defaultImage = '/assets/images/default-tour.jpg';

  getSafeImageUrl(url: string | undefined): string {
    if (!url) return this.defaultImage;
    return url.startsWith('http') ? url : `${window.location.origin}/${url.replace(/^\//, '')}`;
  }

  handleImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    if (!img.src.endsWith(this.defaultImage)) {
      img.src = this.defaultImage;
      img.onerror = null; // Prevent infinite loop
    } else {
      img.style.display = 'none';
    }
  }
}