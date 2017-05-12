import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { GnomesModel } from '../models/gnomes.model';
import { HomeService } from '../services/home.service';

@Component({
    selector: 'dashboard',
    templateUrl: './dashboard.component.html',
    providers: [HomeService]
})

export class DashboardComponent {
    public gnomebusy: GnomesModel;
    public professions_length: number;
    public old: number;
    public weight: number;
    public height: number;
    public color_hair: string;
    public CBPATTCForm: FormGroup;
    public items: any;

    constructor(public fb: FormBuilder, private homeHttp: HomeService) {
        this.CBPATTCForm = this.fb.group({
            professions_length: [''],
            old: [''],
            color_hair: ['Red'],
            weight: ['']
        });
    }


    onSubmit() {
        let newgnome: GnomesModel = <GnomesModel>{}
        console.log(this.professions_length)
        console.log(this.old)
        console.log(this.color_hair)
        console.log(this.weight)
        console.log('hooray')
        let newgnomes: GnomesModel = <GnomesModel>{};
        newgnomes.hair_color = this.color_hair,
        newgnomes.age = this.old;
        newgnomes.weight = this.weight;
        newgnomes.professions_length = this.professions_length;
        this.homeHttp.getAllGnomes(newgnomes).then((response) => {
            console.log(response)
            this.items = response
        })
    }
}