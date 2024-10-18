// src/app/shared/bottom-navbar/bottom-navbar.component.ts

import { Component, OnInit } from '@angular/core';
import { faSearch, faCalendarAlt, faEnvelope, faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-bottom-navbar',
  templateUrl: './bottom-navbar.component.html',
  styleUrls: ['./bottom-navbar.component.scss']
})
export class BottomNavbarComponent implements OnInit {
  faSearch = faSearch;
  faCalendarAlt = faCalendarAlt;
  faEnvelope = faEnvelope;
  faUser = faUser;

  constructor() { }

  ngOnInit(): void {
  }
}
