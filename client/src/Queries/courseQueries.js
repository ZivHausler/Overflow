export const getAllCoursesQuery = `{
    allCourses {
      nodes {
        id
        name
      }
    }
  }`


// From here - the updated functions!!! all of the abve - examples !!!!!!!

export const getAllCourseDiscussionsQuery = `query MyQuery {
  allCourseDiscussions {
    nodes {
      attachment
      body
      cid
      createdAt
      id
      title
      uid
      updatedAt
    }
  }
}
`

export const getAllTestByCourseQuery = `{
    allCourses {
      nodes {
        id
        testsByCid {
          nodes {
            cid
            id
            numQuestions
            period
            semester
            year
          }
        }
      }
    }
  }`

export const getAllCourseDiscussionCommentsQuery = `
query MyQuery {
  allCourseComments {
    nodes {
      body
      cid
      createdAt
      did
      id
      uid
      updatedAt
      attachment
    }
  }
}
`

