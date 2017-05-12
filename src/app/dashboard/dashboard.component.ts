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
    public gnomeprofessions: any;

    constructor(public fb: FormBuilder, private homeHttp: HomeService) {
        this.CBPATTCForm = this.fb.group({
            professions_length: [1],
            old: [100],
            color_hair: ['Red'],
            weight: [''],
            professions: ['']
        });
    }

    ngOnInit(){
        this.homeHttp.getAllGnomes().then((response) =>{
            this.gnomeprofessions = this.homeHttp.uniq;
        })
    }


    onSubmit() {
        let newgnomes: GnomesModel = <GnomesModel>{};
        newgnomes.hair_color = this.color_hair,
        newgnomes.age = this.old;
        newgnomes.weight = this.weight;
        newgnomes.professions_length = this.professions_length;
        this.items = this.homeHttp.getSelectedGnomes(newgnomes);
    }
}