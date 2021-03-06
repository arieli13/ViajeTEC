import { Component, Input } from '@angular/core';

@Component ({
  selector: 'header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  @Input() title:String = '';
  @Input() subTitle:String = '';
}