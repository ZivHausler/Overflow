import { getAllUsersQuery, createUserQuery, updateUserQuery, createUserCourseQurey,getAllUserCoursesQuery, deleteUserCourseQurey } from '../Queries/userQueries'
import axios from 'axios'

export const getAllUsers = () => {
  return axios.post('http://localhost:5000/graphql', {
    query: getAllUsersQuery,
    variables: {}
  })
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      console.log(error);
    });
}

export const createUser = (object) => {
  return axios.post('http://localhost:5000/graphql', {
    query: createUserQuery,
    variables: object,
  })
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      console.log('could not create a user', error);
    });
}

// export const updateUser = (userData) => {
//     axios.post('http://localhost:5000/graphql', {
//         query: updateUserQuery,
//         variables: {...userData}
//       })
//       .then(function (response) {
//         console.log(response);
//       })
//       .catch(function (error) {
//         console.log(error);
//       });
// }

// // From here - the updated queries!!! all of the abve - examples !!!!!!!

export const getAllUserCourses = () => {
  return axios.post('http://localhost:5000/graphql', {
    query: getAllUserCoursesQuery,
    variables: {}
  })
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      console.log(error);
    });
}

export const createUserCourse = (object) => {
  return axios.post('http://localhost:5000/graphql', {
    query: createUserCourseQurey,
    variables: object
  })
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      console.log(error);
    });
}

export const deleteUserCourse = (object) => {
  return axios.post('http://localhost:5000/graphql', {
      query: deleteUserCourseQurey,
      variables: object,
    })
    .then(function (response) {
     return response;
    })
    .catch(function (error) {
      console.log(error);
    });
}

