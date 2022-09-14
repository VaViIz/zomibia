import { Component, OnInit } from '@angular/core';
import { UserCredential } from '@angular/fire/auth/firebase';
import { User } from 'src/app/shared/models/User';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  page: string = 'cart' ;
  

  constructor() { }

  ngOnInit(): void {
  }

  changePage(newPage: string){
      this.page = newPage;
  }

  
}
