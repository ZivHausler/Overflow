// import { useState } from "react";
import DropDownList from "../../general-components/DropDownList"
import Input from '../../general-components/Input'

const semestersList = ['א', 'ב', 'קיץ'];
const duesList = ['א', 'ב', 'ג', 'מיוחד'];

const GroupedDDLs = ({examDefenition,grade,questionNum, isQuestionNum, enableNulls, fileType, setFileType, upload, setYear, year, setSemester, semester, setDue, setGrade, due, language, setLanguage, setQuestionNum, popupType }) => {
    const generateArrayOfLastYears = (n) => {
        let years = [];
        let maxYear = new Date().getFullYear();
        let minYear = maxYear - n;
        for (let i = maxYear; i >= minYear; i--) years.push(i);
        return years;
    }

    return (
        <div dir="rtl" className="flex flex-col items-center my-2 w-full justify-center">
            <div className="flex flex-col sm:flex-row ">
                <DropDownList value={examDefenition?.year} enableNulls={enableNulls}  type={"text"} object={year} setObject={setYear} text={'שנה'} list={upload ? generateArrayOfLastYears(10) : generateArrayOfLastYears(20)} />
                <DropDownList value={examDefenition?.semester} enableNulls={enableNulls}  type={"text"} object={semester} setObject={setSemester} text={'סמסטר'} list={semestersList} />
                <DropDownList value={examDefenition?.period} enableNulls={enableNulls}  type={"text"} object={due} setObject={setDue} text={'מועד'} list={duesList} />
            </div>
            {upload &&
                <div className="flex items-start sm:flex-row">
                    {!isQuestionNum && <Input value={questionNum} setInputValue={setQuestionNum} text={'מספר שאלות'} type={'number'}  />}
                    {popupType === 'solution' &&
                        <DropDownList object={fileType} setObject={setFileType} text={'סוג טופס'} list={['פיתרון', 'נוסח מבחן']} />}
                    {parseInt(fileType) === 0 && <Input setInputValue={setGrade} value={grade} text={'ציון'} type={'number'} />}
                    {parseInt(fileType) === 1 && <DropDownList type={"text"} object={language} setObject={setLanguage} text={'שפת הנוסח'} list={['עברית', 'אנגלית', 'ערבית', 'רוסית', 'ספרדית', 'צרפתית', 'איטלקית']} />}
                </div>}
        </div>

    )
}
export default GroupedDDLs