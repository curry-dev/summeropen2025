import { CommonModule, isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, Inject, PLATFORM_ID } from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements AfterViewInit {
  title = 'summeropen2025';

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        const safemapButton = document.getElementById('safemap');
        const planTripButton = document.getElementById('plantrip');
        const feelingLuckyButton = document.getElementById('feelinglucky');

        const officerImage = document.getElementById('officer');
        const touristyImage = document.getElementById('touristy');
        const gamblerImage = document.getElementById('gambler');

        const moveUpFunc = (characterImage: any) => {
          // console.log('hello1');
          characterImage?.classList.remove('officer-bottom');
          characterImage?.classList.add('officer-top');
          // console.log('hello2');
        };

        const moveDownFunc = (characterImage: any) => {
          // console.log('hello3');
          characterImage?.classList.remove('officer-top');
          characterImage?.classList.add('officer-bottom');
          // console.log('hello3');
        };

        safemapButton?.addEventListener('mouseenter', () =>
          moveUpFunc(officerImage)
        );
        safemapButton?.addEventListener('mouseleave', () =>
          moveDownFunc(officerImage)
        );

        planTripButton?.addEventListener('mouseenter', () =>
          moveUpFunc(touristyImage)
        );
        planTripButton?.addEventListener('mouseleave', () =>
          moveDownFunc(touristyImage)
        );

        feelingLuckyButton?.addEventListener('mouseenter', () =>
          moveUpFunc(gamblerImage)
        );
        feelingLuckyButton?.addEventListener('mouseleave', () =>
          moveDownFunc(gamblerImage)
        );
      }, 2000);
    }
  }
}
