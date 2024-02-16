import React, { useState } from "react";
import { Link } from "react-router-dom";
import SearchBox from "./SearchBox";

function ComputerLanguage() {
    const [DiplomaData, setDiplomaData] = useState("var(--mainBgcolor)");
    const [DiplomaText, setDiplomaText] = useState("#212329");
    const [mainContainer, setmainContainer] = useState("white");
    const [DiplomaTitle, setDiplomaTitle] = useState("white");
    const [mainContainerBorder, setmainContainerBorder] = useState("transparent");
    const [searchQuery, setSearchQuery] = useState("");

    const courses = [
        {
            title: "C Language",
            duration: "3 months",
            contents: [
                "Overview of SDLC",
                "MS Dos",
                "Windows Operating System",
                "Flowchart",
                "MS DOS & DOS Commands",
                "Project & Lab Work",
                "C Fundamentals",
                "Variable & Constant",
                "Data Type",
                "C Input/Output",
                "Arrays & String",
                "Lab Work",
                "Control statement & Decision-Making",
                "Memory Management",
                "File Handling",
                "Project- work",
            ],
        },
        {
            title: "C++ Language",
            duration: "3 months",
            contents: [
                "Overview of C++",
                "Decision Making",
                "Loops",
                "Functions",
                "Array and Strings",
                "Pointers and References",
                "Structures, Unions and Enumerations",
                "Object-Oriented Programming",
                "Project- work",
            ],
        },
        {
            title: "Python Programming",
            duration: "6 months",
            contents: [
                "Module-1 Python Basics",
                "Overview of Python",
                "Data Structure & Data type",
                "Input & Output",
                "Module-2 Python Program Flow",
                "Indentation",
                "The If statement and its’ related statement",
                "The while loop",
                "The For loop",
                "The range statement",
                "Break & Continue",
                "Module-3 Functions & Modules",
                "Introduction",
                "Components and Events",
                "Module-4 Writing GUIs in Python (Tkinter)",
            ],
        },
    ];

    const filteredCourses = courses.filter((course) =>
        course.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Separate matching and non-matching courses
    const matchingCourses = filteredCourses.filter((course) =>
        course.title.toLowerCase().startsWith(searchQuery.toLowerCase())
    );
    const nonMatchingCourses = filteredCourses.filter(
        (course) => !course.title.toLowerCase().startsWith(searchQuery.toLowerCase())
    );

    // Concatenate matching and non-matching courses
    const displayedCourses = [...matchingCourses, ...nonMatchingCourses];

    return (
        <div style={{ background: DiplomaData, color: DiplomaText }} className="mb-4">
            <div
                className="container-fluid row text-center px-0 mx-0 py-2 myshadow"
                style={{ background: DiplomaTitle, marginTop: "3.8rem" }}
                id="mainDiplomaContainer"
            >
                <h1 className="fw-bolder">
                    Computer <font color="red">  Certificate Course </font>
                </h1>
                <div className="col-md-12 mx-0 px-0 d-flex justify-content-between">
                    <div>
                        <small className="d-flex px-2">
                            {" "}
                            <Link to="/" className="nav-link">
                                <i className="fa fa-home"></i> /
                            </Link>{" "}
                            &nbsp; Diploma Courses{" "}
                        </small>
                    </div>
                    <div>
                        <SearchBox searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
                    </div>
                </div>
            </div>
            <div
                className="mx-md-5 py-4 mx-1 mt-3"
                style={{ background: mainContainer, border: mainContainerBorder }}
            >
                <div className="diplomaTable pb-3 my-2">
                    {displayedCourses.map((course, index) => (
                        <div key={index} className="container-fluid my-4" data-aos="fade-down">
                            <table
                                className="table table-hover table-bordered border-primary  table-lg table-hover border-0"
                                style={{ border: "1px solid skyblue", marginBottom: "20px" }}
                            >
                                <thead>
                                    <tr className="headText">
                                        <th colSpan="4">{course.title}

                                        </th>
                                    </tr>
                                    <tr className="my-row-color">
                                        <th>Course Content</th>
                                        <th></th>
                                        <th></th>
                                        <th>Duration: {course.duration}</th>
                                    </tr>
                                </thead>

                                <tbody className="border-0 table-bordered border-primary  ">
                                    {[...Array(Math.ceil(course.contents.length / 4))].map((_, rowIndex) => (
                                        <tr key={rowIndex}>
                                            {[...Array(4)].map((_, colIndex) => (
                                                <td key={colIndex}>
                                                    {course.contents[rowIndex * 4 + colIndex]}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                                <button type="button" className="btn btn-primary btn-sm my-1">
                                    <Link to="/AdmissionForm" className="nav-link m-0 p-0">APPLY</Link>
                                </button>
                            </table>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ComputerLanguage;
