import { Component, Input, OnInit, EventEmitter, OnChanges } from '@angular/core';
import { user } from '@angular/fire/auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProfilePicture } from 'src/app/shared/models/ProfilePicture';
import { User } from 'src/app/shared/models/User';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ImageService } from 'src/app/shared/services/image.service';
import { UserService } from 'src/app/shared/services/user.service';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, OnChanges {

  userTemp?: User;
  filePath?: string;
  loadedImage?: string;
  img?: ProfilePicture;

  userdataUpdateForm = new FormGroup({
    lastname: new FormControl('', [Validators.required]) as FormControl,
    firstname: new FormControl('', [Validators.required]) as FormControl,
    username: new FormControl('', [Validators.required]) as FormControl,
    mobileNumber: new FormControl('', [Validators.required]) as FormControl,
    postalCode: new FormControl('', [Validators.required]) as FormControl,
    city: new FormControl('', [Validators.required]) as FormControl,
    street: new FormControl('', [Validators.required]) as FormControl,
    houseNumber: new FormControl('', [Validators.required]) as FormControl
  });


  constructor(private authService: AuthService, private userService: UserService, private imgServices: ImageService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user') as string) as firebase.default.User;
    this.userService.getById(user.uid).subscribe(data => {
      this.userTemp = data;
      this.setFormValue();
      //this.setImg();
    }, error => {
      console.error(error);
    });


  }

  ngOnChanges(): void {}

  updateDatas() {
    if (this.userdataUpdateForm.valid) {

      const user: User = {
        id: this.userTemp?.id as string,
        email: this.userTemp?.email as string,
        username: this.userdataUpdateForm.get('username')?.value,
        name: {
          firstname: this.userdataUpdateForm.get('firstname')?.value,
          lastname: this.userdataUpdateForm.get('lastname')?.value,
        },
        mobileNumber: this.userdataUpdateForm.get('mobileNumber')?.value,
        city: this.userdataUpdateForm.get('city')?.value,
        postalCode: this.userdataUpdateForm.get('postalCode')?.value,
        street: this.userdataUpdateForm.get('street')?.value,
        houseNumber: this.userdataUpdateForm.get('houseNumber')?.value,
      };

      this.userService.update(user).then(_ => {
        console.log('User update successfully.');
        this.openSnackBar("Az adataid sikeresen frissültek.");
      }).catch(error => {

        console.error(error);
      })
    } else {
      this.openSnackBar("Minden mezőt ki kell tölteni!.");
    }
  }

  setFormValue() {
    this.userdataUpdateForm.setValue({
      lastname: this.userTemp?.name.lastname,
      firstname: this.userTemp?.name.firstname,
      username: this.userTemp?.username,
      mobileNumber: this.userTemp?.mobileNumber,
      postalCode: this.userTemp?.postalCode,
      city: this.userTemp?.city,
      street: this.userTemp?.street,
      houseNumber: this.userTemp?.houseNumber
    })

  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'X', {
      duration: 3000,
    });
  }


  /*

  setImg(){
    this.imgServices.getById(this.userTemp?.id as string).subscribe(data => {
      this.img = data;
      console.log(this.img?.url)
      
      this.imgServices.retrieveProfilePicture(this.img?.url + '.jpg').subscribe(img => {
        this.loadedImage = img;
      })
    })

    
  }

  upload(event: any){
    
    console.log(event)
    this.filePath = event.target.files[0];
    this.imgServices.uploadProfilePicture(this.filePath, this.userTemp?.id as string);
    
    
    const profileP: ProfilePicture = {
      id: this.userTemp?.id as string,
      url: 'ProfilePictures/' + this.userTemp?.id as string,
    }
   
    this.imgServices.create(profileP).then(_ => {
      console.log('PP create successfully.');
    }).catch(error => {
      console.error(error);
    })
    console.log("masodjara")
    this.setImg();
   
    
  }*/



}
