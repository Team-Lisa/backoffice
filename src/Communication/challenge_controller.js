const url = 'https://idiomaplay-gateway.herokuapp.com/';

const createLesson = (lesson) => {
    console.log(lesson);
    const exercises = lesson.exercises;
    for (let i = 0; i < exercises.length; i++) {
        const exercise_i = exercises[i];
        const exercise_to_save = {
            lesson_id: lesson.lesson_id,
            exercises_type: exercise_i.exercises_type,
            question: exercise_i.question,
            options: exercise_i.options,
            correct_answer: exercise_i.correct_answer
        }
        console.log(exercise_to_save)
    }

    const lesson_to_save = {
        name: lesson.name,
        id: "L1"
    };
    console.log(lesson_to_save);
}

export const getChallenges = () => {
    return fetch(url + 'challenges')
        .then(response => response.json())
        .then(data =>{
            return data["challenges"];
        });
}

export const getLessonExercises = (lesson_id) => {
    return fetch(url+"lessons/"+ lesson_id + "/exercises")
        .then(response => response.json())
        .then(data =>{
            return data["exercises"];
        });
}

export const getExamExercises = (exam_id) => {
    return fetch(url+"exams/"+ exam_id + "/exercises")
        .then(response => response.json())
        .then(data =>{
            return data["exercises"];
        });
}

export const getNextChallengeId = () => {
    return fetch(url+"challenges/next")
        .then(response => response.json())
        .then(data =>{
            return data["challenges_next_id"];
        });
}

export default createLesson;
