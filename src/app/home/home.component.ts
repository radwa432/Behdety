import { Component, OnInit, HostListener, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SiteService } from '../services/site-2.service';
import { Site } from '../models/site';
import { GovernmentService } from '../services/government.service';
import { Government } from '../interface/government';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterLink],
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

  sites: Site[] = [];
  government: Government[] = [];
  currentPage: number = 1;

  constructor(
    private siteService: SiteService,
    private governrateService: GovernmentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getSite(this.currentPage);
    this.getGovernment();
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
        this.government = data;
      },
      error: (err) => {
        console.error('Error loading governments:', err);
      }
    });
  }
}
