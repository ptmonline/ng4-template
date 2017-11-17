import { Injectable } from "@angular/core";
import { StorageApp } from '../helpers/storage.helper';

@Injectable()

export class GnomeProfessionHelper {
    public uniq: any;

    getProfessions(allGnomes: any) {
        let checkjobs = StorageApp.get('jobs');
        if (checkjobs != null) {
            this.uniq = checkjobs;
            return Promise.resolve(this.uniq)
        } else {
            let gnomesProfessions = [];
            allGnomes.Brastlewark.filter((gnome) => {
                gnome.professions.filter((job) => {
                    gnomesProfessions.push(job);
                    this.uniq = gnomesProfessions.filter(this.onlyUnique)
                    StorageApp.set('jobs', this.uniq)
                    return this.uniq
                })
            })
        }
    }

    getSelectedGnomesJob(selectedGnomes: any){
        let gnomesProfessions = [];
        selectedGnomes.filter((gnome) => {
            gnome.professions.filter((job) => {
                gnomesProfessions.push(job);
                this.uniq = gnomesProfessions.filter(this.onlyUnique)
                return this.uniq
            })
        })
    }

    onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
    }
}