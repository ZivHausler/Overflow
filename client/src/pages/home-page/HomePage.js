import DropDownList from "../../general-components/DropDownList"
import Button from "../../general-components/Button"
import { Link } from "react-router-dom"
import { getAllFaculties } from '../../API/facultyApi'
import { getAllDepartments } from '../../API/departmentApi'
import { getAllCourses } from '../../API/courseApi'
import { getAllUserCourses } from "../../API/usersApi"
import { getAllCoursesInDepartments } from '../../API/departmentApi'
import { useEffect, useState } from "react"
import { useAuth0 } from '@auth0/auth0-react';
import H3 from "../../general-components/H3";
import H1 from "../../general-components/H1";


const HomePage = () => {

    const { user } = useAuth0();
    const colors = ['yellow', 'pink', 'gray', 'red', 'blue', 'green', 'indigo']

    // check if ddl is changed
    const [isDDL1changed, setIsDDL1changed] = useState(null);
    const [isDDL2changed, setIsDDL2changed] = useState(null);
    const [isDDL3changed, setIsDDL3changed] = useState(null);

    // lists of all sections in the university
    const [faculties, setFaculties] = useState([]);
    const [deparments, setDepartments] = useState([]);
    const [courses, setCourses] = useState([]);
    const [coursesInDepartments, setCoursesInDepartments] = useState([]);
    const [userCourses, setUserCourses] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const facList = getAllFaculties();
                const dptList = getAllDepartments();
                const crsList = getAllCourses();
                const cidList = getAllCoursesInDepartments();
                const ucList = getAllUserCourses();
                Promise.all([facList, dptList, crsList, cidList, ucList]).then(values => {
                    setFaculties(values[0].data.data.allFaculties.nodes);
                    setDepartments(values[1].data.data.allDepartments.nodes);
                    setCourses(values[2].data.data.allCourses.nodes);
                    setCoursesInDepartments(values[3].data.data.allCoursesInDepartments.nodes);
                    setUserCourses(values[4].data.data.allUserCourses.nodes);
                })
            }
            catch (error) {
                console.log(error);
            }
        })()
    }, [])

    useEffect(() => {
        setIsDDL2changed(null);
        setIsDDL3changed(null);
    }, [isDDL1changed])

    useEffect(() => {
        setIsDDL3changed(null);
    }, [isDDL2changed])

    const createList = (value, type) => {
        let list = [];
        switch (type) {
            case 'faculty':
                value.forEach(item => list.push({ id: item.id, name: item.hebrewName }))
                break;
            case 'department':
                value.forEach(item => {
                    if (item.facultyId.toString() === isDDL1changed) list.push({ id: item.id, name: item.hebrewName })
                })
                break;
            case 'course':
                // check which courses are in this specific department
                let coursesList = [];
                coursesInDepartments.forEach(item => {
                    if (item.departmentId.toString() === isDDL2changed) coursesList.push(item.courseId);
                });
                // filter all the courses and keep only the ones that match
                value.forEach(item => {
                    if (coursesList.includes(item.id)) list.push({ id: item.id, name: item.name });
                });
                break;
            case 'userCourse':
                userCourses.forEach(course => {
                    if (course.uid === user.sub.split("|")[1])
                        list.push(course);
                });
            default:
                break;
        }
        return list;
    }

    const renderUserCourses = () => {
        return createList(userCourses, 'userCourse').map((item, index) =>
            courses.map(course => {
                if (item.cid === course.id) {
                    return <Link key={index} to={`course=${course.id}`}>
                        <div className={`transition break-word h-full flex items-center justify-center duration-150 ease-in-out shadow p-3 m-1 rounded-xl bg-${colors[index % colors.length]}-100 cursor-pointer w-36 `}>
                            <h1>{course.name}</h1>
                        </div>
                    </Link>
                }
            })
        )
    }

    return (
        <div dir='rtl' className="my-10 flex flex-col items-center justify-center">
            <div className="flex flex-col max-w-7xl justify-center items-center p-5 shadow rounded-lg dark:bg-gray-900 ">
                <H1 text={'חפש את הקורס שלך'}/>
                <div className="mx-6 mt-8 flex flex-col md:flex-row">
                    <DropDownList text={'פקולטה'} list={createList(faculties, 'faculty')} object={isDDL1changed} setObject={setIsDDL1changed} />
                    <DropDownList text={'חוג'} list={createList(deparments, 'department')} object={isDDL2changed} setObject={setIsDDL2changed} />
                    <DropDownList text={'קורס'} list={createList(courses, 'course')} object={isDDL3changed} setObject={setIsDDL3changed} />
                </div>
                <Link to={isDDL3changed ? '/course=' + isDDL3changed : '#'}>
                    <div className="mx-6">
                        <Button text={'חפש'} />
                    </div>
                </Link>
            </div>
            {user && <div className="my-8 w-screen max-w-7xl flex flex-col text-center">
                {createList(userCourses, 'userCourse').length > 0 && <H3 text={'אפשר גם לקצר קצת את הדרך...'} />}
                <div className="mx-10 pb-6 rounded-xl flex flex-wrap justify-center items-center md:items-stretch md:flex-nowrap md:justify-start md:overflow-x-auto p-4 scrollbar scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-track-gray-200 scrollbar-thumb-gray-400 dark:scrollbar-track-gray-800 dark:scrollbar-thumb-gray-600">
                    {renderUserCourses()}
                </div>
            </div>}
        </div>
    )
}
export default HomePage