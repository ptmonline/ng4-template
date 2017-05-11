import { Component, OnInit } from '@angular/core';
import { HomeService } from '../services/home.service';
import {GnomesModel} from '../models/gnomes.model';


@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  providers: [HomeService]
})
export class HomeComponent {
  title:string = "Gnomes's Village";
  items: any;
  constructor(private homeHttp: HomeService) { }

  // ngOnInit(): void {
  //   let newgnomes: GnomesModel = <GnomesModel>{};
  //   newgnomes.hair_color = 'Pink',
  //   newgnomes.age = 306;
  //   newgnomes.weight = 12;
  //   newgnomes.professions_length = 1;
  //   this.homeHttp.getAllGnomes(newgnomes).then((response) => {
  //     console.log(response)
  //     this.items = response
  //   })
  // }
}
