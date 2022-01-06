export const getAllDepartmentsQuery = `{
    allDepartments {
        nodes {
          englishName
          facultyId
          hebrewName
          id
        }
      }
  }`

  export const getAllCoursesInDepartmentsQuery = `{
    allCoursesInDepartments {
      nodes {
        departmentId
        courseId
      }
    }
  }`