import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  @Input() loggedInUser?: firebase.default.User | null;
  @Output() onLogout: EventEmitter<boolean> = new EventEmitter();
  @Output() onCloseSidenav: EventEmitter<boolean> = new EventEmitter();



  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
  }

  close() {
    this.onCloseSidenav.emit(true);
  }

  logout() {
    this.close();
    this.authService.logout().then(() => {
      this.router.navigateByUrl('/index');
      console.log('Logged out successfully.');
    }).catch(error => {
      console.error(error);
    });
  }

}
