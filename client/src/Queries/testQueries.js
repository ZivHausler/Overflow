// Test level queries

export const getAllTestDiscussionsQuery = `query MyQuery {
  allTestDiscussions {
    nodes {
      body
      cid
      createdAt
      id
      nodeId
      tid
      title
      uid
      updatedAt
      attachment
    }
  }
}
`

export const getAllTestDiscussionsCommentsQuery = `
query MyQuery {
  allTestComments {
    nodes {
      body
      cid
      createdAt
      did
      id
      tid
      uid
      updatedAt
      attachment
    }
  }
}
`

export const getTestNumQuestionsQuery = `{
    allTests {
      nodes {
        id
        numQuestions
      }
    }
  }`

export const updateTestNumQuestionsQuery = `mutation updateTestById($id:Int!, $numQuestions: Int!) {
    updateTestById(input:{id : $id , testPatch:{numQuestions: $numQuestions}}
    ) {
        test {
        id
        numQuestions
        }
    }
}`


export const createTestQuery = `mutation createTest($cid: String!, $year: Int!, $questionsNum: Int!, $semester: String!, $period: String!) {
  createTest(
    input: {test: {cid: $cid, year: $year, questionsNum: $questionsNum, semester: $semester, period: $period}}
  ) {
    test {
      id
    }
  }
}
`


export const createExamQuery = `mutation createExam( $cid: String!, $downloadLink: String!, $tid: Int!, $language: String!) {
  createExam(input: {exam: {cid: $cid, downloadLink: $downloadLink, tid: $tid, language: $language}}
    ) {
      exam {
        cid
        downloadLink
        tid
        language
      }
    } 
}`

export const getAllExamsQuery = `query MyQuery {
  allExams {
    nodes {
      cid
      downloadLink
      language
      id
      tid
    }
  }
}
`


export const createSolutionQuery = `mutation createSolution($cid: String!, $downloadLink: String!, $tid: Int!, $grade: Int!) {
  createSolution(
    input: {solution: {cid: $cid, downloadLink: $downloadLink, tid: $tid, grade: $grade}}
  ) {
    solution {
      cid
      downloadLink
      tid
      grade
    }
  }
}`

export const getAllSolutionsQuery = `query MyQuery {
  allSolutions {
    nodes {
      cid
      downloadLink
      grade
      id
      tid
    }
  }
}
`

export const getAllTestsQuery = `
query MyQuery {
  allTests {
    nodes {
      cid
      id
      period
      questionsNum
      semester
      year
    }
  }
}
`