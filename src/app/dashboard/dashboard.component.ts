import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { GnomesModel } from '../models/gnomes.model';
import { HomeService } from '../services/home.service';
import { StorageApp } from '../helpers/storage.helper';
import { GnomeProfessionHelper } from 'app/helpers/gnomeProfessions.helper';

@Component({
    selector: 'dashboard',
    templateUrl: './dashboard.component.html'
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
    public bigFile: GnomesModel;
    public isValid: boolean;

    constructor(public fb: FormBuilder, private homeHttp: HomeService, private _gnomeProfessionHelper: GnomeProfessionHelper) {
        this.GnomesForm = this.fb.group({
            professions_length: '',
            old: '',
            color_hair: '',
            weight: ''
        });
    }

    ngOnInit() {
        this.homeHttp.getAllGnomes().then(() => {
            this.gnomeprofessions = this._gnomeProfessionHelper.uniq;
        })
    }

    onSubmit() {
        let newgnomes: GnomesModel = <GnomesModel>{};
        newgnomes.hair_color = this.color_hair || null;
        newgnomes.age = this.old || null;
        newgnomes.weight = this.weight || null;
        newgnomes.professions_length = this.professions_length || null;
        this.items = this.homeHttp.getSelectedGnomes(newgnomes);
        this.bigFile = this.items;

        this.gnomeprofessions = this._gnomeProfessionHelper.filterJob(this.bigFile);
        if (this.items.length) this.isValid = true;
        else this.isValid = false;
    }

    saveJob(job) {
        if (!this.jobSelected.length) {
            this.jobSelected.push(job);
            this.items = this.bigFile;
            this.gnomeprofessions = this._gnomeProfessionHelper.filterJob(this.items);
            this.items = this.filterBaseOnJobs();
        } else {
            let index: number = this.jobSelected.indexOf(job);
            if (this.jobSelected[index] != null) {
                this.jobSelected.splice(index, 1);
                this.gnomeprofessions = this._gnomeProfessionHelper.filterJob(this.items);
            } else {
                this.jobSelected.push(job);
            }
            this.items = this.bigFile;
            this.items = this.filterBaseOnJobs();
        }

    }

    filterBaseOnJobs() {
        this.newArray = [];
        for (let u = 0; u <= this.items.length - 1; u++) {
            if (this.jobSelected.every(elem => this.items[u].professions.indexOf(elem) > -1)) {
                this.newArray.push(this.items[u]);
                setTimeout(() => {
                    this.items = this.newArray;
                    this.gnomeprofessions = this._gnomeProfessionHelper.filterJob(this.items);
                }, 500)
            };
        }
    }

    showProfessions(event) {
        event.target.classList.toggle('active');
        event.target.nextElementSibling.classList.toggle('active');
    }
}
