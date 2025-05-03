import { Component, OnInit, HostListener, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SiteService } from '../services/site-2.service';
import { Site } from '../models/site';
import { GovernmentService } from '../services/government.service';
import { Government } from '../interface/government';
import { Router, RouterLink } from '@angular/router';

import { BlogService } from '../services/blog.service';
import { BlogPost, Category } from '../models/blog-post.model';
import { ContactComponent } from "../shared/contact/contact.component";
import { TripService } from '../services/Trip/trip.service';
import { TripGetDto } from '../models/trip.model';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterLink, ContactComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {
  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.revealMultiple();
    this.revealSingle();
  }
  
  // Animate multiple elements with class `.reveal-on-scroll`
  revealMultiple() {
    const reveals = document.querySelectorAll('.reveal-on-scroll');
    reveals.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 100) {
        el.classList.add('in-view');
      }
    });
  }
  
  // Animate one element with class `.scroll-section`
  revealSingle() {
    const section = document.querySelector('.scroll-section');
    if (!section) return;
  
    const rect = section.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      section.classList.add('in-view');
    }
  }
  


  ngAfterViewInit() {
    this.onWindowScroll();
  }
  trips: TripGetDto[] = [];
  sites: Site[] = [];
  government: Government[] = [];
  currentPage: number = 1;
  blogPosts: BlogPost[] = [];
  categories: Category[] = [];
  lastPosts: BlogPost[] = [];
  isLoading: boolean = false;
  errorMessage: string | null = null;
  constructor(
    private siteService: SiteService,
    private governrateService: GovernmentService,
    private router: Router,
    private blogService: BlogService,
    private tripService: TripService
  ) {}

  ngOnInit(): void {
    this.getSite(this.currentPage);
    this.getGovernment();
    this.loadPosts();
    this.loadCategories();
    this.loadLastPosts()
    this.loadTrips();
  }
  loadTrips(): void {
    this.isLoading = true;
    this.errorMessage = null;
    
    this.tripService.getTrips(this.currentPage).subscribe({
      next: (trips) => {
        this.trips = trips;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading trips:', err);
        this.errorMessage = 'Failed to load trips. Please try again later.';
        this.isLoading = false;
      }
    });
  }
  getMainImage(trip: TripGetDto): string {
    if (trip.tripImages && trip.tripImages.length > 0 && trip.tripImages[0].imageUrl) {
      // Handle both relative and absolute URLs
      const imageUrl = trip.tripImages[0].imageUrl.startsWith('http') 
        ? trip.tripImages[0].imageUrl
        : `/${trip.tripImages[0].imageUrl}`.replace('//', '/');
      
      return imageUrl;
    }
    return 'assets/images/1.jpg';
  }
  loadPosts() {
    this.isLoading = true;
    this.blogService
      .getPosts(1, 4, '',  undefined)
      .subscribe({
        next: (res) => {
          this.blogPosts = res.data;
        
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Error loading posts:', err);
          this.isLoading = false;
        }
      });
  }

  loadCategories() {
    this.blogService.getCategories().subscribe({
      next: (res) => (this.categories = res),
      error: (err) => console.error('Error loading categories:', err)
    });
  }
  loadLastPosts() {
    this.blogService.getLastPosts().subscribe({
      next: (res) => (this.lastPosts = res),
      error: (err) => console.error('Error loading last posts:', err)
    });
  }
  getSite(page: number): void {
    this.siteService.getSites(page).subscribe(data => {
      this.sites = data;
    });
  }

  nextPage(): void {
    this.currentPage++;
    this.getSite(this.currentPage);
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getSite(this.currentPage);
    }
  }

  scrollLeft(id: string): void {
    const container = document.getElementById(id);
    if (container) {
      container.scrollBy({ left: -300, behavior: 'smooth' });
    }
  }

  scrollRight(id: string): void {
    const container = document.getElementById(id);
    if (container) {
      container.scrollBy({ left: 300, behavior: 'smooth' });
    }
  }

  goToGovernment(id: number | undefined) {
    
    this.router.navigate(['../site-by-government/sites-by-government.component', id]);
  }
  
   

  getGovernment(): void {
    this.governrateService.getGovernments().subscribe({
      next: (data) => {
        this.government = data.map((gov: any) => ({
          governmentId: gov.governmentId,
          name: gov.name,
          image: gov.image, 
          sites: gov.sites
        }));
      },
      error: (err) => {
        console.error('Error loading governments:', err);
      }
    });

   
  }


 
}
