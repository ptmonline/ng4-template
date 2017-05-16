import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { GnomesModel } from '../models/gnomes.model';
import { HomeService } from '../services/home.service';
import { StorageApp } from '../helpers/storage.helper';

@Component({
    selector: 'dashboard',
    templateUrl: './dashboard.component.html',
    providers: [HomeService,StorageApp]
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
            professions_length: [''],
            old: [''],
            color_hair: [''],
            weight: ['']
        });
    }

    ngOnInit(){
        StorageApp.set('pollo', 'fuck nope', true)
        this.homeHttp.getAllGnomes().then(() =>{
            this.gnomeprofessions = this.homeHttp.uniq;
        })
    }


    onSubmit() {
        let newgnomes: GnomesModel = <GnomesModel>{};
        newgnomes.hair_color = this.color_hair || null,
        newgnomes.age = this.old || null;
        newgnomes.weight = this.weight || null;
        newgnomes.professions_length = this.professions_length || null;
        this.items = this.homeHttp.getSelectedGnomes(newgnomes);
    }

    onChange(job){
        console.log(job)
    }
}