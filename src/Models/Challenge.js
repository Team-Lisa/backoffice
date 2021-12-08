export default class ChallengeModel {
    constructor(name = "Nuevo desafio", units = [], challenge_id = "", published = false) {
        this.name = name;
        this.units = units;
        this.challenge_id = challenge_id;
        this.published = published;
    }

    save(){
        let data_to_save = {
            name: this.name,
            units: this.units,
            challenge_id: this.challenge_id,
            published: this.published
        }
        localStorage.setItem("actualChallenge", JSON.stringify(data_to_save));
    }

    publish(){
        this.published = true;
        this.save()
    }

    unpublish(){
        this.published = false;
        this.save()
    }

    updateUnitName(unit_id, name){
        for (let i = 0; i < this.units.length; i++) {
            let unit_i = this.units[i];
            if (unit_i["id"] === unit_id){
                unit_i["name"] = name
            }
        }
        this.save();
    }

    updateLessons(unit_id, lesson){
        for (let i = 0; i < this.units.length; i++) {
            let unit_i = this.units[i];
            if (unit_i["id"] === unit_id){
                unit_i["lessons"].push(lesson)
            }
        }
        this.save();
    }

    updateExam(unit_id, exam){
        for (let i = 0; i < this.units.length; i++) {
            let unit_i = this.units[i];
            if (unit_i["id"] === unit_id){
                unit_i["exam"] = exam
            }
        }
        this.save();
    }

    static getActualChallenge(){
        let data = JSON.parse(localStorage.getItem('actualChallenge'));
        return new ChallengeModel(data["name"], data["units"], data["challenge_id"], data["published"])

    }

    static getActualChallengeJSON(){
        let data = JSON.parse(localStorage.getItem('actualChallenge'));
        data["id"] = data["challenge_id"];
        delete data["challenge_id"];
        return data;
    }

    unitNameExist(newUnit, id){
        for(let i = 0; i < this.units.length; i++){
             if(id !== this.units[i]['id']){
                 if(this.units[i]['name'].toLowerCase().localeCompare(newUnit.toLowerCase()) === 0){
                     return true;
                 }
             }
        }
        return false
    }
}
