import { Component, OnInit } from '@angular/core';
import { HomeService } from '../services/home.service';


@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  providers: [HomeService]
})
export class HomeComponent {
  title:string = 'Gnomes';
  items: any;
  constructor(private homeHttp: HomeService) { }

  ngOnInit(): void {
    this.homeHttp.getGnomes().then((response) => {
      console.log(response)
      this.items = response.Brastlewark
    })
  }
}
