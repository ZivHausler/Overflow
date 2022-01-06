import { useState, useEffect } from "react";
import DropDownList from "../general-components/DropDownList"
import { getAllFaculties } from '../API/facultyApi'
import { getAllDepartments, getAllCoursesInDepartments } from '../API/departmentApi'
import { getAllCourses } from '../API/courseApi'
import Input from "../general-components/Input";
import H1 from "../general-components/H1";
import H3 from "../general-components/H3";
import Button from "../general-components/Button";
import { useAuth0 } from '@auth0/auth0-react';
import { createUserCourse } from "../API/usersApi";
import { useNavigate } from 'react-router-dom';

const SelectCourses = () => {
    const MAX_COUNT = 10;

    // check if ddl is changed
    const [isDDL1changed, setIsDDL1changed] = useState(null);
    const [isDDL2changed, setIsDDL2changed] = useState(null);
    const [isDDL3changed, setIsDDL3changed] = useState(null);

    // lists of all sections in the university
    const [faculties, setFaculties] = useState([]);
    const [deparments, setDepartments] = useState([]);
    const [courses, setCourses] = useState([]);
    const [coursesInDepartments, setCoursesInDepartments] = useState([]);
    const [selectedValues, setSelectedValues] = useState([])
    const [countInputs, setCountInputs] = useState(MAX_COUNT);

    // user data
    const { user } = useAuth0();
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            try {
                const facList = getAllFaculties();
                const dptList = getAllDepartments();
                const crsList = getAllCourses();
                const cidList = getAllCoursesInDepartments();
                Promise.all([facList, dptList, crsList, cidList]).then(values => {
                    setFaculties(values[0].data.data.allFaculties.nodes);
                    setDepartments(values[1].data.data.allDepartments.nodes);
                    setCourses(values[2].data.data.allCourses.nodes);
                    setCoursesInDepartments(values[3].data.data.allCoursesInDepartments.nodes)
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
        if (isDDL2changed !== null) setIsDDL3changed(true);
        else setIsDDL3changed(null);
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
                let coursesList = []
                coursesInDepartments.forEach(item => {
                    if (item.departmentId.toString() === isDDL2changed) coursesList.push(item.courseId);
                });
                // filter all the courses and keep only the ones that match
                value.forEach(item => {
                    if (coursesList.includes(item.id)) list.push({ id: item.id, name: item.name });
                });
                break;
            default:
                break;
        }
        return list;
    }

    const setSelections = (e) => {
        let selectedCourses = selectedValues;
        if (e.target.checked) {
            // too many courses were selected
            if (selectedCourses.length >= MAX_COUNT) {
                alert('too many courses');
                e.target.checked = false;
                return;
            }
            // add this course to selectedCourses list;
            selectedCourses.push(e.target.value);
            setCountInputs(countInputs - 1)
        }
        else {
            // remove this course from selectedCourses list;
            const index = selectedCourses.indexOf(e.target.value);
            if (index > -1) {
                selectedCourses.splice(index, 1);
                setCountInputs(countInputs + 1);
            }
        }
        setSelectedValues(selectedCourses);
    }

    const checkIfIncludes = (courseID) => {
        return selectedValues.includes(courseID);
    }

    const renderCoursesInputs = (list) => {
        return list.map((course, index) => <Input key={index} isChecked={checkIfIncludes(course.id)} text={course.name} value={course.id} type={'checkbox'} courseSelection={true} setInputValue={setSelections} />)
    }

    const saveCourses = async () => {
        for (let courseID of selectedValues) {
            await createUserCourse({
                "uid": user.sub.split("|")[1],
                "cid": courseID
            })
        }
        // navigate('/');
        window.location.replace(`/`);

    }

    return (
        <div dir="rtl" className="flex flex-col my-6 items-center bg-indigo-50 mx-10 rounded-xl shadow">
            <H1 text={'סנן קורסים שרלוונטים אליך כדי לקצר את תהליך החיפוש שלך'} />
            <div className="flex my-6">
                <DropDownList text={'פקולטה'} list={createList(faculties, 'faculty')} object={isDDL1changed} setObject={setIsDDL1changed} />
                <DropDownList text={'חוג'} list={createList(deparments, 'department')} object={isDDL2changed} setObject={setIsDDL2changed} />
            </div>
            {isDDL3changed && <div className="w-full text-center">
                <div className="flex justify-center items-center">
                    <H3 text={`בחר עד ${MAX_COUNT} קורסים (${countInputs} נותרו)`} />
                    <Button clickHandler={saveCourses} text={'שמור'} />
                </div>
                <div className="flex p-5 mx-10 flex-col items-start">
                    {renderCoursesInputs(createList(courses, 'course'))}
                </div>
            </div>}
        </div>
    )
}

export default SelectCourses
