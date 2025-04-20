
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, computed, signal, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [CommonModule,CurrencyPipe,ReactiveFormsModule],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.css'
})
export class OverviewComponent implements AfterViewInit {
  @ViewChild('mainImageContainer') mainImageContainer!: ElementRef;
  mainImageHeight = 0;
  bookingForm:FormGroup
  currentImageIndex = 0;
  showAllThumbnails = signal(false);
  maxVisibleThumbnails = 4; // Number of thumbnails to show before adding +X

  constructor() {
    this.bookingForm = new FormGroup({});
  }
  images = [
    { main: 'assets/images/1.jpg', thumb: 'assets/images/1.jpg' },
    { main: 'assets/images/tour.jpg', thumb: 'assets/images/tour.jpg' },
    { main: 'assets/images/1.jpg', thumb: 'assets/images/1.jpg' },
    { main: 'assets/images/1.jpg', thumb: 'assets/images/1.jpg' },
    { main: 'assets/images/tour.jpg', thumb: 'assets/images/tour.jpg' },
    { main: 'assets/images/1.jpg', thumb: 'assets/images/1.jpg' },
    { main: 'assets/images/1.jpg', thumb: 'assets/images/1.jpg' },
    { main: 'assets/images/tour.jpg', thumb: 'assets/images/tour.jpg' },
    { main: 'assets/images/1.jpg', thumb: 'assets/images/1.jpg' },

  ];

  ngAfterViewInit() {
    this.updateMainImageHeight();
    window.addEventListener('resize', this.updateMainImageHeight.bind(this));
  }

  updateMainImageHeight() {
    if (this.mainImageContainer?.nativeElement) {
      this.mainImageHeight = this.mainImageContainer.nativeElement.offsetHeight;
    }
  }

  visibleThumbnails = computed(() => {
    return this.showAllThumbnails()
      ? this.images
      : this.images.slice(0, this.maxVisibleThumbnails);
  });

  hiddenThumbnailsCount = computed(() => {
    return Math.max(0, this.images.length - this.maxVisibleThumbnails);
  });

  get currentImage() {
    return this.images[this.currentImageIndex];
  }

  nextImage(): void {
    this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
  }

  prevImage(): void {
    this.currentImageIndex = (this.currentImageIndex - 1 + this.images.length) % this.images.length;
  }

  selectImage(index: number): void {
    this.currentImageIndex = index;
    if (!this.showAllThumbnails() && index >= this.maxVisibleThumbnails) {
      this.showAllThumbnails.set(true);
    }
  }
  onSubmit(){

  }
  bookingSuccess(){}
  bookingError(){}
}
