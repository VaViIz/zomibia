import { Component, OnInit } from '@angular/core';
import { ImageService } from 'src/app/shared/services/image.service';

@Component({
  selector: 'app-b2',
  templateUrl: './b2.component.html',
  styleUrls: ['./b2.component.scss']
})
export class B2Component implements OnInit {

  /*
  kepek : Array<any> = [];
  imgUrls : Array<string> = ['Other/haszagy.jpg', 'Other/csomag.jpg', 'Other/warning.png']
*/
  constructor(private imageService: ImageService) { }

  ngOnInit(): void {
    /*
        let i = 0;
        for(let vmi of this.imgUrls){
    
          
          const subscription = this.imageService.loadImage(vmi).subscribe(data => {
          this.kepek[i] = data;
          i++;
          subscription.unsubscribe();  
        })
        }*/

  }

}
