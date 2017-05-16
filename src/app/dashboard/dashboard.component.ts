import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { GnomesModel } from '../models/gnomes.model';
import { HomeService } from '../services/home.service';
import { StorageApp } from '../helpers/storage.helper';

@Component({
    selector: 'dashboard',
    templateUrl: './dashboard.component.html',
    providers: [HomeService, StorageApp]
})

export class DashboardComponent {
    public gnomebusy: GnomesModel;
    public professions_length: number;
    public old: number;
    public weight: number;
    public height: number;
    public color_hair: string;
    public GnomesForm: FormGroup;
    public items: any;
    public gnomeprofessions: any;
    public jobSelected: GnomesModel[] = [];
    public newArray: any[] = [];
    public bigFile: any;

    constructor(public fb: FormBuilder, private homeHttp: HomeService) {
        this.GnomesForm = this.fb.group({
            professions_length: '',
            old: '',
            color_hair: '',
            weight: ''
        });
    }

    ngOnInit() {
        this.homeHttp.getAllGnomes().then(() => {
            this.gnomeprofessions = this.homeHttp.uniq;
        })
    }


    onSubmit() {
        let newgnomes: GnomesModel = <GnomesModel>{};
        newgnomes.hair_color = this.color_hair || null;
        newgnomes.age = this.old || null;
        newgnomes.weight = this.weight || null;
        newgnomes.professions_length = this.professions_length || null;
        newgnomes.jobs = this.jobSelected || null;
        this.items = this.homeHttp.getSelectedGnomes(newgnomes);
        this.bigFile = this.items;
    }

    saveJob(job) {

        if (!this.jobSelected.length) {
            this.jobSelected.push(job);
            this.items = this.bigFile
        } else {
            let index: number = this.jobSelected.indexOf(job);
            if (this.jobSelected[index] != null) this.jobSelected.splice(index, 1);
            else this.jobSelected.push(job);

            for (let u = 0; u <= this.items.length - 1; u++) {
                console.log(this.items[u].professions)
                for (let b = 0; b <= this.professions_length - 1; b++) {
                    if (this.items[u].professions[b] == job) {
                        this.newArray.push(this.items[u])

                        this.items = this.newArray;


                    }
                }
            }
        }

    }
}
