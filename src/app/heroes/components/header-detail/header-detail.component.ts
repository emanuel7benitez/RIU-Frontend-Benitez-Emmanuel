import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-detail',
  imports: [],
  templateUrl: './header-detail.component.html',
  styleUrl: './header-detail.component.css',
})
export class HeaderDetailComponent implements OnInit{
  @Input() name?: string = 'No Name';
  @Input() description?: string = 'No Description';
  @Input() active?: number = 0;
  @Input() img?: string | null = 'https://www.gravatar.com/avatar/?d=mp&s=200';
  constructor() {
    
  }

  ngOnInit() {
    this.img = this.img === '' || this.img === null ? 'https://www.gravatar.com/avatar/?d=mp&s=200' : this.img;
  }

 }
