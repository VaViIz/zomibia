import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-menu2',
  templateUrl: './menu2.component.html',
  styleUrls: ['./menu2.component.scss']
})
export class Menu2Component implements OnInit {



  @Output()
  selectedPage: EventEmitter<string> = new EventEmitter();

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
  }

  menuSwitch(pageName: string) {
    this.selectedPage.emit(pageName);
  }


  logout() {
    this.authService.logout().then(() => {
      this.router.navigateByUrl('/index');
      console.log('Logged out successfully.');
    }).catch(error => {
      console.error(error);
    });
  }
}
