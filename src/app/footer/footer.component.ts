import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  ngOnInit(): void {
    const scrollBtn = document.getElementById("scrollTopBtn");
    window.addEventListener("scroll", () => {
      if (scrollBtn) {
        scrollBtn.style.display = window.scrollY > 200 ? "block" : "none";
      }
    });

    scrollBtn?.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
}
