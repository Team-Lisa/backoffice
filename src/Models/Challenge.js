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
}
