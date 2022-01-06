import { createCourseCommentQuery } from '../Queries/commentQueries'
import { updateCourseCommentQuery } from '../Queries/commentQueries'
import { createTestCommentQuery } from '../Queries/commentQueries'
import { updateTestCommentQuery } from '../Queries/commentQueries'
import { createQuestionCommentQuery } from '../Queries/commentQueries'
import { updateQuestionCommentQuery } from '../Queries/commentQueries'

import axios from 'axios'

// Comment functions
export const createCourseComment = (object) => {
    return axios.post('http://localhost:5000/graphql', {
        query: createCourseCommentQuery,
        variables: object,
      })
      .then(function (response) {
        return response;
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  export const updateCourseComment = (userData) => {
    axios.post('http://localhost:5000/graphql', {
        query: updateCourseCommentQuery,
        variables: {...userData}
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  export const createTestComment = (object) => {
    return axios.post('http://localhost:5000/graphql', {
        query: createTestCommentQuery,
        variables: object,
      })
      .then(function (response) {
        return response;
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  export const updateTestComment = (userData) => {
    axios.post('http://localhost:5000/graphql', {
        query: updateTestCommentQuery,
        variables: {...userData}
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  export const createQuestionComment = (object) => {
    return axios.post('http://localhost:5000/graphql', {
        query: createQuestionCommentQuery,
        variables: object,
      })
      .then(function (response) {
        return response;
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  export const updateQuestionComment = (userData) => {
    axios.post('http://localhost:5000/graphql', {
        query: updateQuestionCommentQuery,
        variables: {...userData}
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
