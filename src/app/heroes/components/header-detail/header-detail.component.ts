import { Component, input, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-detail',
  imports: [],
  templateUrl: './header-detail.component.html',
  styleUrl: './header-detail.component.css',
})
export class HeaderDetailComponent implements OnInit {
  name = input<string | undefined>('No Name');
  description = input<string | undefined>('No Description');
  active = input<number>(0);
  img = input<string | null>('https://www.gravatar.com/avatar/?d=mp&s=200');
  imgUrl: string | null = '';

  constructor() {

  }

  ngOnInit() {
    if (!this.img() || this.img() === '') {
      this.imgUrl = 'https://www.gravatar.com/avatar/?d=mp&s=200';
    } else {
      this.imgUrl = this.img();
    }
  }

}
