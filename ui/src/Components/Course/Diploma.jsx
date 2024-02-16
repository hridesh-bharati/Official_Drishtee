import React, { useState } from "react";
import { Link } from "react-router-dom";
import SearchBox from "./SearchBox";
import AdmissionForm from "../Admission/AdmissionForm";

function Diploma() {
    const [DiplomaData, setDiplomaData] = useState("var(--mainBgcolor)");
    const [DiplomaText, setDiplomaText] = useState("#212329");
    const [mainContainer, setmainContainer] = useState("white");
    const [DiplomaTitle, setDiplomaTitle] = useState("white");
    const [mainContainerBorder, setmainContainerBorder] = useState("transparent");
    const [searchQuery, setSearchQuery] = useState("");

    const courses = [
        {
            title: "ADCA (Advance Diploma in Computer Application)",
            duration: "15 months",
            contents: [
                "Fundamental of Computer", "MS Dos", "Windows Operating System", "M.S. Word", "M.S. Excel", "M.S. PowerPoint", "M.S. Access",
                "Tally & inventory with GST", "Photoshop", "Pagemaker", "Corel-Draw", "C language",
                "C++ language", "HTML", "JavaScript", "Internet & E-Mail", "Hardware", "Project- work",
            ],
        },

        {
            title: "ADCA+ (Advance Diploma in Computer Application+)",
            duration: "18 months",
            contents: [
                "Fundamental of Computer", "MS Dos", "Windows Operating System", "M.S. Word", "M.S. Excel", "M.S. PowerPoint", "M.S. Access",
                "Tally & inventory with GST", "Photoshop", "Pagemaker", "Corel-Draw", "C language",
                "C++ language", "HTML", "CSS", "JavaScript", "EchmaScript", "Internet & E-Mail", "Hardware", "Project- work",
            ],
        },
        {
            title: "DBI (Diploma in Banking Insurance)",
            duration: "6 months",
            contents: [
                "Overview of Banking", "Overview of retail Banking", "Profession skills",
                "Sales Planning & Administration", "Sales skills & Technique",
                "Relationship building & team management", "Internet Banking & Activities",
                "Non Transactional task", "Viewing recent Transaction", "Viewing Account Balance",
                "Ordering chequebooks", "Downloading periodic account statement", "Downloading application",
                "M-Banking", "E-Banking", "Lab & Project - work",
            ],
        },

        {
            title: "Diploma in Web Development",
            duration: "6 months",
            contents: [
                'HTML', "CSS", 'SCSS', 'Bootstrap', 'Projects', 'JavaScript', 'React', 'Projects',

            ]
        },
        {
            title: "DCA ( Diploma in Computer Application)",
            duration: "12 months",
            contents: [
                "Fundamental of Computer", "MS DOS", "Windows Operating System", "M.S. Word", "M.S. Excel", "M.S. PowerPoint", "M.S. Access",
                "Tally & inventory with GST", "Photoshop", "Pagemaker", "Corel-Draw",
                "Internet & E:mail", "Syber Security With A.I.", "C language", "C++ language",
            ],
        },
        {
            title: "DDTP ( Diploma in Desktop Publishing)",
            duration: "6 months",
            contents: [
                "Computer Fundamental", "MS Dos", "Windows Operating System", "MS Office",
                "Tally & inventory with GST", "Photoshop", "Pagemaker", "Corel-Draw",
            ],
        },
        {
            title: "ADIT (Advanced Diploma Information Technology)",
            duration: "12 months",
            contents: [
                "Computer Fundamantal", "Ms. Work", "Operating System(G.U.I & C.SU.d)", "M.S. Excel", "M.S. PowerPoint", "M.S. Access",
                "Internet", "MY SQL", "C Language",
                "C++", "C#", "HTML",
                "CSS", "JavaScript", "Data Base",
                "VB.net", "ASP.net", "Project work",
            ],
        },
        {
            title: "DIT (Diploma in Information Technology)",
            duration: "6 months",
            contents: [
                "Computer Fundamantal", "MS DOS", "WINDOWS Operating System",
                "Microsoft Windows", "Microsoft Word", "Microsoft Excel",
                "Microsoft Powerpoint", "Computer Network & Internet", "Lab & Project",
                "Information Technology", "Object Oriented Programming in C++", "Project Work",
            ],
        },
        {
            title: "DCAD (Diploma in Computer Application & Designing)",
            duration: "12 months",
            contents: [
                "Computer Fundamantal", "MS DOS", "Windows Operating System",
                "Microsoft Word", "Microsoft Excel", "Microsoft Powerpoint",
                "Microsoft Access", "Computer Network & Internet", "Project Work",
                "Photoshop", "Pagemaker", "Corel-Draw",
                "HTML", "CSS", "Project Work (Web Designing)",
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
                    All <font color="red"> Diploma Course </font>
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

export default Diploma;
