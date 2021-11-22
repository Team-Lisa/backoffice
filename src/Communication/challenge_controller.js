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
    return fetch('https://idiomaplay-gateway.herokuapp.com/challenges')
        .then(response => response.json())
        .then(data =>{
            let challenges = data["challenges"];
            return challenges;
        });
}

export default createLesson;
