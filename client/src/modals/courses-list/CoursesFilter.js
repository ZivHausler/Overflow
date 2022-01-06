// import DropDownList from "../../general-components/DropDownList"
// import Button from "../../general-components/Button"
// import { Link } from "react-router-dom"
// import { getAllFaculties } from '../../API/facultyApi'
// import { getAllDepartments } from '../../API/departmentApi'
// import { getAllCourses } from '../../API/courseApi'
// import { getAllCoursesInDepartments } from '../../API/departmentApi'
// import { useEffect, useState } from "react"

// const CoursesFilter = () => {

//     // lists of all sections in the university
//     const [faculties, setFaculties] = useState([]);
//     const [deparments, setDepartments] = useState([]);
//     const [courses, setCourses] = useState([]);
//     const [coursesInDepartments, setCoursesInDepartments] = useState([]);

    

//     useEffect(async () => {
//         // get all data from postgres
//         const facList = getAllFaculties();
//         const dptList = getAllDepartments();
//         const crsList = getAllCourses();
//         const cidList = getAllCoursesInDepartments();
//         Promise.all([facList, dptList, crsList, cidList]).then(values => {
//             setFaculties(values[0].data.data.allFaculties.nodes);
//             setDepartments(values[1].data.data.allDepartments.nodes);
//             setCourses(values[2].data.data.allCourses.nodes);
//             setCoursesInDepartments(values[3].data.data.allCoursesInDepartments.nodes)
//         })
//     }, []);

//     useEffect(() => {
//         setIsDDL2changed(null);
//         setIsDDL3changed(null);
//     }, [isDDL1changed])

//     useEffect(() => {
//         setIsDDL3changed(null);
//     }, [isDDL2changed])


//     const createList = (value, type) => {
//         let list = [];
//         switch (type) {
//             case 'faculty':
//                 value.forEach(item => list.push({ id: item.id, name: item.hebrewName }))
//                 break;
//             case 'department':
//                 value.forEach(item => {
//                     if (item.facultyId == isDDL1changed) list.push({ id: item.id, name: item.hebrewName })
//                 });
//                 break;
//             case 'course':
//                 // check which courses are in this specific department
//                 let coursesList = []
//                 coursesInDepartments.forEach(item => {
//                     if (item.departmentId == isDDL2changed) coursesList.push(item.courseId);
//                 });
//                 // filter all the courses and keep only the ones that match
//                 value.forEach(item => {
//                     if (coursesList.includes(item.id)) list.push({ id: item.id, name: item.name });
//                 });
//                 break;
//             default:
//                 break;
//         }
//         return list;
//     }

//     return (
//         <div dir='rtl' className="my-10 flex items-center justify-center ">
//             <div className="flex flex-col items-center p-5 shadow rounded-lg dark:bg-gray-900">
//                 <div className="mx-6 flex">
//                     <DropDownList text={'פקולטה'} list={createList(faculties, 'faculty')} object={isDDL1changed} setObject={setIsDDL1changed} />
//                     <DropDownList text={'חוג'} list={createList(deparments, 'department')} object={isDDL2changed} setObject={setIsDDL2changed} />
//                     <DropDownList text={'קורס'} list={createList(courses, 'course')} object={isDDL3changed} setObject={setIsDDL3changed} />
//                     {/* {isDDL1changed && <DropDownList text={'חוג'} list={createList(deparments, 'department')} object={isDDL2changed} setObject={setIsDDL2changed} />}
//                     {isDDL1changed && isDDL2changed && <DropDownList text={'קורס'} list={createList(courses, 'course')} object={isDDL3changed} setObject={setIsDDL3changed} />} */}
//                 </div>
//                 <Link to={isDDL3changed ? '/course/' + isDDL3changed : '#'}>
//                     <div className="mx-6">
//                         <Button text={'חפש'}/>
//                     </div>
//                 </Link>
//                 <div></div>
//             </div>
//         </div>
//     )
// }
// export default CoursesFilter