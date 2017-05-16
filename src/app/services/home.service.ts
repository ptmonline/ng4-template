import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { GnomesModel } from '../models/gnomes.model';
import 'rxjs/add/operator/toPromise';
import { StorageApp } from '../helpers/storage.helper';

@Injectable()
export class HomeService {
    public allGnomes: any;
    public gnomesProfessions: any;
    public uniq: any;
    private theurl: any = "https://raw.githubusercontent.com/rrafols/mobile_test/master/data.json";
    private static stored_gnomes: string = 'stored_gnomes'

    constructor(private http: Http) { }
    getAllGnomes(): Promise<any> {
        let storedgnomes = StorageApp.get(HomeService.stored_gnomes);
        if (storedgnomes == null) {
            return this.http.get(this.theurl).toPromise().then(data => {
                this.allGnomes = data.json();
                console.log(typeof this.allGnomes)
                StorageApp.set(HomeService.stored_gnomes, this.allGnomes, false);
                this.getProfessions();
            });
        } else {
            this.allGnomes = StorageApp.get(HomeService.stored_gnomes);
            console.log(typeof this.allGnomes)
            this.getProfessions();
            return Promise.resolve(this.allGnomes);
        }

    }

    getSelectedGnomes(inputgnome: GnomesModel): Promise<any> {
        console.log(inputgnome)
        console.log(typeof this.allGnomes)
        let gnomes = this.allGnomes.Brastlewark.filter(gnome => {
            return gnome.age >= inputgnome.age &&
                gnome.hair_color == inputgnome.hair_color &&
                gnome.weight >= inputgnome.weight &&
                gnome.professions.length == inputgnome.professions_length;
        })
        return gnomes
    }

    getProfessions() {
        let checkjobs = StorageApp.get('jobs');
        console.log(checkjobs);
        if (checkjobs != null) {
            this.uniq = checkjobs;
            return Promise.resolve(this.uniq)
        } else {
            let gnomesProfessions = [];

            this.allGnomes.Brastlewark.filter((gnome) => {
                gnome.professions.filter((job) => {
                    gnomesProfessions.push(job);
                    this.uniq = gnomesProfessions.filter(this.onlyUnique)
                    StorageApp.set('jobs', this.uniq)
                    return this.uniq
                })
            })
        }
    }

    onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
    }
}
