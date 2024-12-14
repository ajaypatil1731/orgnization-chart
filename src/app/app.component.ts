import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'Orgnization Chart';
  selectedValue = 'graph-view';
  router = inject(Router);

  ngOnInit(): void {
    console.log(this.router.url);
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd) // Filter only NavigationStart events
    ).subscribe(event => {
      // Detect when navigation starts
      console.log('Navigation started');
      this.selectedValue = this.router.url.indexOf('grid-view') !== -1 ? 'grid-view' : 'graph-view';
    });
  }

  changeView() {
    console.log(this.selectedValue);
    this.router.navigateByUrl(this.selectedValue);
  }

}
