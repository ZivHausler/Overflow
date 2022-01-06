import { getAllSolutionsQuery, getAllTestDiscussionsQuery } from '../Queries/testQueries'
import { getAllTestDiscussionsCommentsQuery } from '../Queries/testQueries'
import { updateTestNumQuestionsQuery } from '../Queries/testQueries'
import { getTestNumQuestionsQuery } from '../Queries/testQueries'
import { createTestQuery } from '../Queries/testQueries'
import { createExamQuery } from '../Queries/testQueries'
import { createSolutionQuery, getAllExamsQuery } from '../Queries/testQueries'
import { getAllTestsQuery } from '../Queries/testQueries'

import axios from 'axios'

// Test functions
export const getAllTestDiscussions = () => {
  return axios.post('http://localhost:5000/graphql', {
      query: getAllTestDiscussionsQuery,
      variables: {}
    })
    .then(function (response) {
       return response;
    })
    .catch(function (error) {
      console.log(error);
    });
}

export const getAllTestDiscussionsComments = () => {
  return axios.post('http://localhost:5000/graphql', {
      query: getAllTestDiscussionsCommentsQuery,
      variables: {}
    })
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      console.log(error);
    });
}

export const getTestNumQuestions = () => {
  axios.post('http://localhost:5000/graphql', {
      query: getTestNumQuestionsQuery,
      variables: {}
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
}

export const updateTestNumQuestions = (userData) => {
  axios.post('http://localhost:5000/graphql', {
      query: updateTestNumQuestionsQuery,
      variables: {...userData}
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
}

export const createTest = (object) => {
  return axios.post('http://localhost:5000/graphql', {
      query: createTestQuery,
      variables: object
    })
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      console.log(error);
    });
}

export const createExam = (object) => {
  return axios.post('http://localhost:5000/graphql', {
      query: createExamQuery,
      variables: object,
    })
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      console.log(error);
    });
}

export const getAllExams = () => {
  return axios.post('http://localhost:5000/graphql', {
      query: getAllExamsQuery,
      variables: {}
    })
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      console.log(error);
    });
}

export const getAllSolutions = () => {
  return axios.post('http://localhost:5000/graphql', {
      query: getAllSolutionsQuery,
      variables: {}
    })
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      console.log(error);
    });
}


export const createSolution = (object) => {
  return axios.post('http://localhost:5000/graphql', {
      query: createSolutionQuery,
      variables: object,
    })
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      console.log(error);
    });
}

export const getAllTests = () => {
  return axios.post('http://localhost:5000/graphql', {
      query: getAllTestsQuery,
      variables: {}
    })
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      console.log(error);
    });
}