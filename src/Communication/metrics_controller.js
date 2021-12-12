const url = 'https://idiomaplay-gateway.herokuapp.com/';

export const getMetrics = (from_date, to_date) => {
    return fetch(url+"metrics?from_date="+encodeURIComponent(from_date)+"&to_date="+encodeURIComponent(to_date), {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).then(
        response => {
            console.log(response)
            return response.json().then(
                data => {
                    console.log(data)
                    return data
                }
            )       
        }
    ).catch(errors => console.log(errors))
}