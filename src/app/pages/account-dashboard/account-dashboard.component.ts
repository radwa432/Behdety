import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../services/account/account.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-account-dashboard',
  templateUrl: './account-dashboard.component.html',
  styleUrls: ['./account-dashboard.component.css'],
 
  imports: [CommonModule]
})
export class AccountDashboardComponent implements OnInit {
  account: any = null;
  isLoading: boolean = true;

  constructor(private accountService: AccountService) {}

  ngOnInit(): void {
    this.accountService.getAccount().subscribe({
      next: (data) => {
        this.account = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading account:', err);
        this.isLoading = false;
      }
    });
  }
  
}
