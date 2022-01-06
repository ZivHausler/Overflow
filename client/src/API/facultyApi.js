import { getAllFacultiesQuery } from '../Queries/facultiesQueries'

import axios from 'axios'

export const getAllFaculties = () => {
    return axios.post('http://localhost:5000/graphql', {
        query: getAllFacultiesQuery,
        variables: {}
    })
        .then(function (response) {
            return response
        })
        .catch(function (error) {
            console.log(error);
        });
}