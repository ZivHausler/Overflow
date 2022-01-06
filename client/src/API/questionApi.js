import { getAllQuestionsRateQuery } from '../Queries/questionQueries'
import { getAllQuestionsUserRateQuery } from '../Queries/questionQueries'
import { getAllQuestionDiscussionsCommentsQuery } from '../Queries/questionQueries'
import { createQuestionQuery } from '../Queries/questionQueries'
import { getAllQuestionUserRateQuery } from '../Queries/questionQueries'
import { createQuestionUserRateQuery } from '../Queries/questionQueries'
import { getAllQuestionRateScoreAndRateAmountQuery } from '../Queries/questionQueries'
import { updateQuestionRateQuery } from '../Queries/questionQueries'
import { updateQuestionUserRateQuery } from '../Queries/questionQueries'
import { getAllQuestionDiscussionsQuery } from '../Queries/questionQueries'
import { createQuestionDiscussionQuery } from '../Queries/questionQueries'

import axios from 'axios'

// Question functions
export const getAllQuestionsRate = () => {
  axios.post('http://localhost:5000/graphql', {
    query: getAllQuestionsRateQuery,
    variables: {}
  })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
}

export const getAllQuestionsUserRate = () => {
  axios.post('http://localhost:5000/graphql', {
    query: getAllQuestionsUserRateQuery,
    variables: {}
  })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
}

export const getAllQuestionDiscussions = () => {
  return axios.post('http://localhost:5000/graphql', {
    query: getAllQuestionDiscussionsQuery,
    variables: {}
  })
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      console.log(error);
    });
}

export const getAllQuestionDiscussionsComments = () => {
  return axios.post('http://localhost:5000/graphql', {
    query: getAllQuestionDiscussionsCommentsQuery,
    variables: {}
  })
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      console.log(error);
    });
}

export const createQuestionDiscussion = (object) => {
  return axios.post('http://localhost:5000/graphql', {
    query: createQuestionDiscussionQuery,
    variables: object,
  })
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      console.log(error);
    });
}

export const createQuestion = (object) => {
  return axios.post('http://localhost:5000/graphql', {
      query: createQuestionQuery,
      variables: object,
    })
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      console.log(error);
    });
}

export const  getQuestionUserRate = () => {
  return axios.post('http://localhost:5000/graphql', {
      query: getAllQuestionUserRateQuery,
      variables: {}
    })
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      console.log(error);
    });
}

export const createQuestionUserRate = (object) => {
  return axios.post('http://localhost:5000/graphql', {
      query: createQuestionUserRateQuery,
      variables: object,
    })
    .then(function (response) {
     return response;
    })
    .catch(function (error) {
      console.log(error);
    });
}


// export const  getQuestionRateScoreAndRateAmount = () => {
//   axios.post('http://localhost:5000/graphql', {
//       query: getAllQuestionRateScoreAndRateAmountQuery,
//       variables: {}
//     })
//     .then(function (response) {
//       console.log(response);
//     })
//     .catch(function (error) {
//       console.log(error);
//     });
// }

// export const updateQuestionRate = (userData) => {
//   axios.post('http://localhost:5000/graphql', {
//       query: updateQuestionRateQuery,
//       variables: {...userData}
//     })
//     .then(function (response) {
//       console.log(response);
//     })
//     .catch(function (error) {
//       console.log(error);
//     });
// }



export const updateQuestionUserRate = (object) => {
  return axios.post('http://localhost:5000/graphql', {
      query: updateQuestionUserRateQuery,
      variables: object
    })
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      console.log(error);
    });
}
