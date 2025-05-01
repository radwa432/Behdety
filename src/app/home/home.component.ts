import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SiteService } from '../services/site-2.service';
import { Site } from '../services/site-2.service';
import { GovernmentService } from '../services/government.service';
import { Government } from '../interface/government';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  sites: Site[] = [];
  government: Government[] = [];
  currentPage: number = 1; // Set default page number to 1

  constructor(
    private siteService: SiteService,
    private governrateService: GovernmentService
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
