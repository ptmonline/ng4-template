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
}
