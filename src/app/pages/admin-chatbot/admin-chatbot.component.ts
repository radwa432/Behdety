import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {ElementRef, ViewChild, AfterViewChecked } from '@angular/core';
interface Message {
  role: 'user' | 'assistant' | 'error';
  message: string;
}

@Component({
  selector: 'app-admin-chatbot',
 imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './admin-chatbot.component.html',
  styleUrl: './admin-chatbot.component.css'
})

export class AdminChatbotComponent implements OnInit{
  isLoading: boolean = false;
  chatForm: FormGroup;
  messages: Message[] = [];

  constructor(private fb: FormBuilder, private http:HttpClient) {
    this.chatForm = this.fb.group({
      message: ['',[ Validators.required ,  Validators.pattern(/^(?!\s*$).+/)] ]
    });
  }

  ngOnInit() {
    const saved = sessionStorage.getItem('chat');
    if (saved) this.messages = JSON.parse(saved);
  }

  sendMessage() {
    if (this.chatForm.invalid) return;
    const userMessage: Message = {
      role: 'user',
      message: this.chatForm.value.message
    };
    this.messages.push(userMessage);
    // to remove error messages
    const filteredMessages = this.messages.filter(msg => msg.role !== 'error');
    this.saveToSession();
    this.chatForm.reset();
    this.isLoading = true;
    this.http.post<Message>('https://localhost:44334/api/Chat', filteredMessages).subscribe({
      next: (response) => {
        // Response is one message from assistant
        this.messages.push(response);
        this.saveToSession();
        this.isLoading = false;
      },
      error: (err) => {
        const errorMessage = err?.error?.message || 'Something went wrong, please try again later.';
        const errorResponse: Message = {
          role: 'error',
          message: errorMessage
        };
        this.messages.push(errorResponse);
        this.isLoading = false;
      }
    });
  }

  newChat() {
    this.messages = [];
    sessionStorage.removeItem('chat');
  }

  saveToSession() {
    sessionStorage.setItem('chat', JSON.stringify(this.messages));
  }


  @ViewChild('chatContainer') private chatContainer!: ElementRef;

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
    } catch (err) {
      console.error('Scroll failed', err);
    }
  }
}