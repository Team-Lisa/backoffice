const url = 'https://idiomaplay-gateway.herokuapp.com/';

export const createExercise = (exercise) => {
  return fetch(url + "exercises", {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(exercise)
  }).then(
    response => {
      return response.json().then(data => {
        console.log(data);
        return data.hasOwnProperty("exercise");
      })
    }
  )
}

export const saveExercise = (exercise, exercise_id) => {
  return fetch(url + "exercises/" + exercise_id, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(exercise)
  }).then(
    response => {
      return response.json().then(
        data => {
          console.log(data);
          return data.hasOwnProperty("exercise");
        }
      )
    }
  )
}

