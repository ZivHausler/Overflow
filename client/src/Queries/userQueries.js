export const getAllUsersQuery = `query MyQuery {
  allUsers {
    nodes {
      email
      firstname
      id
      lastname
    }
  }
}
`

export const createUserQuery = `mutation createUser($firstname: String!, $lastname: String!, $email: String!, $id: String!) {
  createUser(
    input: {user: {firstname: $firstname, lastname: $lastname, email: $email, id: $id}}
  ) {
    user {
      id
      firstname
      lastname
      email
    }
  }
}`

export const updateUserQuery = `mutation updateUser($id:Int!, $name: String!,  $email: String!,  $pass: String!) {
    updateUserById(input:{id : $id , userPatch:{name: $name, pass: $pass, email:$email}}
    ) {
        user {
        id
        name
        pass
        email
        }
    }
}`

// From here - the updated functions!!! all of the abve - examples !!!!!!!


export const getAllUserCoursesQuery = `{
  allUserCourses {
    nodes {
      cid
      uid
    }
  }
}
`

export const createUserCourseQurey = `mutation createUserCourse( $uid: String!, $cid: String!) {
  createUserCourse(input: {userCourse: {uid: $uid, cid: $cid}}
    ) {
      userCourse {
        uid
        cid
      }
    } 
}`

export const deleteUserCourseQurey = `mutation deleteUserCourse( $uid: String!, $cid: String!) {
  deleteUserCourseByUidAndCid(input:{uid: $uid, cid: $cid}
    ) {
      userCourse {
        uid
        cid
      }
    } 
}`