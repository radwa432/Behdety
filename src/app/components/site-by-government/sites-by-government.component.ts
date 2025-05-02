import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-sites-by-government',
  imports: [CommonModule],
  templateUrl: './sites-by-government.component.html',
  styleUrl: './sites-by-government.component.css'
})

export class SitesByGovernmentComponent implements OnInit {
  governmentId!: number;
  constructor(private route: ActivatedRoute) {}
  
  http = inject(HttpClient);
  sites: any[] = [];
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    console.log('Received Government ID:', id);
    
  }
}



