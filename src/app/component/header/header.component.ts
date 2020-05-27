import { Component, OnInit, Input, Output } from '@angular/core';
import { EventEmitter } from 'events';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {
  @Input() isCollapsed: boolean;
  @Output() collapseClick = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  collapsedChange() {
    this.isCollapsed = !this.isCollapsed;
    this.collapseClick.emit('collapsedChange');
  }

}
