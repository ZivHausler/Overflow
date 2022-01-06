import { getAllCoursesQuery } from '../Queries/courseQueries'
import { getAllCourseDiscussionsQuery } from '../Queries/courseQueries'
import { getAllCourseDiscussionCommentsQuery } from '../Queries/courseQueries'
// import { getAllTestDiscussionsQuery } from '../Queries/courseQueries'
// import { getAllTestByCourseQuery } from '../Queries/courseQueries'
// import { getAllCourseProfessorsQuery } from '../Queries/courseQueries'
// import { getAllTestDiscussionsCommentsQuery } from '../Queries/courseQueries'

import axios from 'axios'

export const getAllCourses = () => {
    return axios.post('http://localhost:5000/graphql', {
        query: getAllCoursesQuery,
        variables: {}
      })
      .then(function (response) {
        return response;
      })
      .catch(function (error) {
        console.log(error);
      });
}

// From here - the updated functions!!! all of the abve - examples !!!!!!!

export const getAllCourseDiscussions = () => {
  return axios.post('http://localhost:5000/graphql', {
      query: getAllCourseDiscussionsQuery,
      variables: {}
    })
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      console.log(error);
    });
}

// export const getAllTestByCourse = () => {
//   axios.post('http://localhost:5000/graphql', {
//       query: getAllTestByCourseQuery,
//       variables: {}
//     })
//     .then(function (response) {
//       console.log(response);
//     })
//     .catch(function (error) {
//       console.log(error);
//     });
// }

export const getAllCourseDiscussionComments = () => {
  return axios.post('http://localhost:5000/graphql', {
      query: getAllCourseDiscussionCommentsQuery,
      variables: {}
    })
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      console.log(error);
    });
}

// export const getAllCourseProfessors = () => {
//   axios.post('http://localhost:5000/graphql', {
//       query: getAllCourseProfessorsQuery,
//       variables: {}
//     })
//     .then(function (response) {
//       console.log(response);
//     })
//     .catch(function (error) {
//       console.log(error);
//     });
// }
 
// // Test functions
// export const getAllTestDiscussions = () => {
//   axios.post('http://localhost:5000/graphql', {
//       query: getAllTestDiscussionsQuery,
//       variables: {}
//     })
//     .then(function (response) {
//       console.log(response);
//     })
//     .catch(function (error) {
//       console.log(error);
//     });
// }

// export const getAllTestDiscussionsComments = () => {
//   axios.post('http://localhost:5000/graphql', {
//       query: getAllTestDiscussionsCommentsQuery,
//       variables: {}
//     })
//     .then(function (response) {
//       console.log(response);
//     })
//     .catch(function (error) {
//       console.log(error);
//     });
// }
