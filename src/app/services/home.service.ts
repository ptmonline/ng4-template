import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { GnomesModel } from '../models/gnomes.model';
import 'rxjs/add/operator/toPromise';
import { StorageApp } from '../helpers/storage.helper';
import * as _ from 'lodash';
import lodash from 'lodash';
import { GnomeProfessionHelper } from 'app/helpers/gnomeProfessions.helper';

@Injectable()
export class HomeService {

    public allGnomes: any;
    public gnomesProfessions: any;
    public uniq: any;
    private theurl: any = "https://raw.githubusercontent.com/rrafols/mobile_test/master/data.json";
    private static stored_gnomes: string = 'stored_gnomes'

    constructor(private http: Http, private _gnomeProfessionHelper: GnomeProfessionHelper) { }

    getAllGnomes(): Promise<any> {
        let storedgnomes = StorageApp.get(HomeService.stored_gnomes);

        if (storedgnomes == null) {
            return this.http.get(this.theurl).toPromise().then(data => {
                this.allGnomes = data.json();
                StorageApp.set(HomeService.stored_gnomes, this.allGnomes, false);
                this._gnomeProfessionHelper.getProfessions(this.allGnomes);
            });
        } else {
            this.allGnomes = StorageApp.get(HomeService.stored_gnomes);
            this._gnomeProfessionHelper.getProfessions(this.allGnomes);
            return Promise.resolve(this.allGnomes);
        };
    }

    getSelectedGnomes(inputgnome: GnomesModel): Promise<any> {
        let gnomes = this.allGnomes.Brastlewark.filter(gnome => {
            return gnome.age >= inputgnome.age &&
                gnome.hair_color == inputgnome.hair_color &&
                gnome.weight >= inputgnome.weight &&
                gnome.professions.length == inputgnome.professions_length;
        })
        return gnomes;
    }
}
