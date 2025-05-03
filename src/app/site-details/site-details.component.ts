import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';  // Import CommonModule
import { RouterModule } from '@angular/router';  // Import RouterModule
import { environment } from '../../environments/environment';
import { Site } from '../models/site';
import { SiteService } from '../services/site-2.service';

@Component({
  selector: 'app-site-details',
  standalone: true,
  imports: [CommonModule, RouterModule],  // Ensure these modules are imported
  templateUrl: './site-details.component.html',
  styleUrls: ['./site-details.component.css']
})
export class SiteDetailsComponent implements OnInit {
trip: any;
navigateToOverview(arg0: any) {
throw new Error('Method not implemented.');
}
  sites:Site[] = [];
  site: any;
  private apiUrl = `${environment.apiUrl}/api/Site`;
  siteService: any;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    // Get the 'id' from the route parameters
    const siteId = this.route.snapshot.paramMap.get('id');
    
    // Fetch the site details using the ID
    this.siteService.getSiteById(siteId).subscribe((data: any) => {
      this.site = data;
    });
  }

  getSiteById(id: string) {
    const apiUrl = `http://localhost:44334/api/sites/${id}`; // Replace with your API URL
  return this.http.get(apiUrl);
    };
  }
  
  

