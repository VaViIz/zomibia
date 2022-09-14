import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/models/User';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserService } from 'src/app/shared/services/user.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  hiba: boolean = false;
  emails: Array<String> = [];
  users: Array<User> = [];


  emailB: FormControl = new FormControl('', [Validators.required, Validators.email]);
  passwordB: FormControl = new FormControl('', [Validators.required, Validators.minLength(6)]);

  signUpForm = new FormGroup({
    emailR: new FormControl('', [Validators.required, Validators.email]) as FormControl,
    usernameR: new FormControl('', [Validators.required]) as FormControl,
    passwordR: new FormControl('', [Validators.required, Validators.minLength(6)]) as FormControl,
    passwordAR: new FormControl('', [Validators.required, Validators.minLength(6)]) as FormControl,
  });


  constructor(private snackBar: MatSnackBar, private router: Router, private authService: AuthService, private userService: UserService) { }

  ngOnInit(): void {

    const subscription = this.userService.getAll().subscribe(data => {
      this.users = data;

      for (let u of this.users) {
        this.emails.push(u.email);
      }

      subscription.unsubscribe();
    })
  }

  login() {
    this.authService.login(this.emailB.value, this.passwordB.value).then(cred => {
      console.log(cred);
      console.log("felhasznalo bejelnetkezve");
      this.router.navigateByUrl('/account');
    }).catch(error => {
      this.openSnackBar("Hibás email vagy jelszó.");
      console.error(error);
    });
  }

  onSubmit() {
    console.log(this.signUpForm.value);

    if (!this.emails.includes(this.signUpForm.get('emailR')?.value)) {
      if (this.signUpForm.get('passwordR')?.value === this.signUpForm.get('passwordAR')?.value) {
        if (this.signUpForm.get('passwordR')?.value.length >= 6) {

          this.authService.signup(this.signUpForm.get('emailR')?.value, this.signUpForm.get('passwordR')?.value).then(cred => {
            console.log(cred);


            const user: User = {
              id: cred.user?.uid as string,
              email: this.signUpForm.get('emailR')?.value,
              username: this.signUpForm.get('usernameR')?.value,
              name: {
                firstname: '',
                lastname: ''
              },
              mobileNumber: '',
              city: '',
              postalCode: '',
              street: '',
              houseNumber: ''
            };



            this.userService.create(user).then(_ => {
              console.log('User added successfully.');
              this.router.navigateByUrl('/account');
            }).catch(error => {
              this.openSnackBar("Valami hiba történt.");
              console.error(error);
            })



          }).catch(error => {
            console.error(error);
          });
        } else {
          this.openSnackBar("A jelszónak legalább 6 karakter hosszúnak kell lennie.");
        }
      } else {
        this.openSnackBar("A két jelszó nem egyezeik.");
      }
    } else {
      this.openSnackBar("Ez az email cím már foglalt.");
    }
  }


  openSnackBar(message: string) {
    this.snackBar.open(message, 'X', {
      panelClass: 'my-custom-snackbar',
      duration: 10000,
    });
  }
}
