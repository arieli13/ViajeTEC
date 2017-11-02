import { menuLinks } from '../common/values.common';
import { Component } from '@angular/core';

@Component ({
  selector: 'dashboard',
  templateUrl: 'dashboard.component.html'
})

export class DashboardComponent {
  private active = menuLinks[0].links[0];
  private menuLinks = menuLinks;
}
