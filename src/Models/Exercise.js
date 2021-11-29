export default class ExerciseModel {
    static addNewExercises(lesson_id, exercise){
        let exercises_to_save = {};
        if (localStorage.hasOwnProperty('exercises_to_saved')){
            exercises_to_save = JSON.parse(localStorage.getItem('exercises_to_saved'));
        }
        if(!exercises_to_save.hasOwnProperty(lesson_id)){
            exercises_to_save[lesson_id] = [];
        }

        exercises_to_save[lesson_id].push(exercise);

        localStorage.setItem("exercises_to_saved", JSON.stringify(exercises_to_save));
    }


    static editExercise(lesson_id, exercise_id, exercise){
        let exercises_to_save = {};
        if (localStorage.hasOwnProperty('exercises_to_saved')){
            exercises_to_save = JSON.parse(localStorage.getItem('exercises_to_saved'));
        }
        const exercises = exercises_to_save[lesson_id];
        let exercise_index = 0;
        for (let i = 0; i < exercises.length; i++) {
            const exercise_i = exercises[i];
            if (exercise_i["exercise_id"] === exercise_id){
                exercise_index = i;
                break;
            }
        }
        exercises[exercise_index] = exercise;
        exercises_to_save[lesson_id] = exercises;
        localStorage.setItem("exercises_to_saved", JSON.stringify(exercises_to_save));
    }

    static getExercises(lesson_id){
        let exercises_to_save = {};
        if (localStorage.hasOwnProperty('exercises_to_saved')){
            exercises_to_save = JSON.parse(localStorage.getItem('exercises_to_saved'));
        }

        if (exercises_to_save.hasOwnProperty(lesson_id)){
            return exercises_to_save[lesson_id];
        }

        return [];
    }

    static getNextId(lesson_id) {
        let exercises_to_save = {};
        if (localStorage.hasOwnProperty('exercises_to_saved')){
            exercises_to_save = JSON.parse(localStorage.getItem('exercises_to_saved'));
        }
        if (exercises_to_save.hasOwnProperty(lesson_id)){
            return lesson_id + "E" + (exercises_to_save[lesson_id].length + 1).toString();
        }else{
            return lesson_id + "E1";
        }
    }

    static getExercisesToSave(){
        let exercises_to_save = {};
        if (localStorage.hasOwnProperty('exercises_to_saved')){
            exercises_to_save = JSON.parse(localStorage.getItem('exercises_to_saved'));
        }
        return exercises_to_save;
    }
}
