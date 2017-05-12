import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { GnomesModel } from '../models/gnomes.model';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class HomeService {
    public allGnomes: any;
    public gnomesProfessions: any;
    private theurl: string = "https://raw.githubusercontent.com/rrafols/mobile_test/master/data.json";

    constructor(private http: Http) { }
    getAllGnomes(inputgnome: GnomesModel): Promise<any> {
        return this.http.get(this.theurl).toPromise().then(data => {
            this.allGnomes = data.json();
            this.getProfessions();
            let gnomes = this.allGnomes.Brastlewark.filter(gnome => {
                return gnome.age >= inputgnome.age &&
                    gnome.hair_color == inputgnome.hair_color &&
                    gnome.weight >= inputgnome.weight &&
                    gnome.professions.length == inputgnome.professions_length;
            })
            return gnomes
        });
    }

    getProfessions() {
        let gnomesProfessions = [];
        let uniq;
        this.allGnomes.Brastlewark.filter((gnome) => {
            gnome.professions.filter((job) => {
                gnomesProfessions.push(job);
                uniq = gnomesProfessions.filter(this.onlyUnique)
            })
        })
    }

    onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
    }
}

// import { Injectable } from '@angular/core';
// import { Headers, Http, Response } from '@angular/http';
// import { GnomesModel } from '../models/gnomes.model';
// import 'rxjs/add/operator/toPromise';

// @Injectable()
// export class HomeService {
//     public allGnomes: any;
//     public gnomesProfessions: any;
//     public uniq: any;
//     private theurl: any = "https://raw.githubusercontent.com/rrafols/mobile_test/master/data.json";

//     constructor(private http: Http) { }
//     getAllGnomes(): Promise<any> {
//         console.log('yooopppp')
//         let promise = new Promise((resolve, reject) => {
//         return this.http.get(this.theurl).toPromise().then(data => {
//             this.allGnomes = data.json();
//             let gnomesProfessions = [];

//             this.allGnomes.Brastlewark.filter((gnome) => {
//                 gnome.professions.filter((job) => {
//                     gnomesProfessions.push(job);
//                     this.uniq = gnomesProfessions.filter(this.onlyUnique)
//                     return 'fuck off'
//                 })
//             })
            
//         });
//     })
//     return promise;
//     }

//     getSelectedGnomes(inputgnome: GnomesModel): Promise<any> {
//         let gnomes = this.allGnomes.Brastlewark.filter(gnome => {
//             return gnome.age >= inputgnome.age &&
//                 gnome.hair_color == inputgnome.hair_color &&
//                 gnome.weight >= inputgnome.weight &&
//                 gnome.professions.length == inputgnome.professions_length;
//         })
//         return gnomes
//     }

//     getProfessions() {
//         let gnomesProfessions = [];

//         this.allGnomes.Brastlewark.filter((gnome) => {
//             gnome.professions.filter((job) => {
//                 gnomesProfessions.push(job);
//                 this.uniq = gnomesProfessions.filter(this.onlyUnique)
//             })
//         })
//     }

//     onlyUnique(value, index, self) {
//         return self.indexOf(value) === index;
//     }
// }
