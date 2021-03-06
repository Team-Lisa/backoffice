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
    .then(response => {
        return response.json().then(data => {
          return data["challenges"];
        })
      }
    )
}

export const getLessonExercises = (lesson_id) => {
  return fetch(url + "lessons/" + lesson_id + "/exercises")
    .then(response => {
      return response.json().then(data => {
        return data["exercises"];
      });
    })
}

export const getExamExercises = (exam_id) => {
  return fetch(url + "exams/" + exam_id + "/exercises")
    .then(response => {
      return response.json().then(data => {
        return data["exercises"];
      });
    })
}

export const getNextChallengeId = () => {
  return fetch(url + "challenges/next")
    .then(response => {
      return response.json().then(data => {
        return data["challenges_next_id"];
      });
    })

}

export const createChallenge = (challenge) => {
    return fetch(url+"challenges", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(challenge)
    }).then(
        response => {
            return response.json().then(
                data => {
                    console.log(data);
                    if (!data.hasOwnProperty("challenge")) {
                        return data.details.errors
                    }
                    return data.hasOwnProperty("challenge");
                }
            )
        }
    )
}

export const saveChallenge = (challenge_id, challenge) => {
    return fetch(url+"challenges/"+challenge_id, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(challenge)
    }).then(
        response => {
            console.log(response)
            return response.json().then(
                data => {
                    console.log(data);
                    if (!data.hasOwnProperty("challenge")) {
                        console.log(data.detail.errors)
                        return data.detail.errors
                    }
                    return data.hasOwnProperty("challenge");
                }
            )       
        }
    ).catch(errors => console.log(errors))
}

export default createLesson;
