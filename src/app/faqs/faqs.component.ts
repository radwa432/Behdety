import { Component } from '@angular/core';

@Component({
  selector: 'app-faqs',
  standalone: true,
  templateUrl: './faqs.component.html',
  styleUrls: ['./faqs.component.css']
})
export class FaqsComponent {
  faqs = [
    {
      question: 'What is included in the tour package?',
      answer: 'Our tour packages include accommodation, guided tours, transportation, and meals as specified.'
    },
    {
      question: 'Can I customize my tour?',
      answer: 'Absolutely! We offer fully customizable tours to match your preferences and schedule.'
    },
    {
      question: 'What is your cancellation policy?',
      answer: 'You can cancel up to 7 days before the tour for a full refund. Cancellations within 7 days may incur charges.'
    },
    {
      question: 'Are the tours suitable for children?',
      answer: 'Yes, most of our tours are family-friendly. We also offer specialized packages for families with kids.'
    }
  ];
}
