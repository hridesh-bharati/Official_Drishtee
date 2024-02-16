import { Link, Routes, Route } from 'react-router-dom';
import React, { useEffect, useState, useContext } from 'react';
import { fetchStudentList } from '../../functions/library';
import { UniversalContext } from '../../../context/universal';
import { Modal, Button } from 'react-bootstrap';
import AdmissionForm from '../../Admission/AdmissionForm';
import SearchBox from '../../Course/SearchBox';
import DeleteStudent from '../../Admission/DeleteStudent';
import UploadCertificateData from '../Certificate/UploadCertificateData';
import StudentChart from '../Charts/Chart';
import QuestionForm from '../../OnlineTest/Update';
import UpdateCourse from '../UpdateData/UpdateCourse';
import StudentModel from './StudentModel';
const showNotes = () => {
	alert("Student has been deleted from your data base.")
}
export default function Admin() {
	const [showModal, setShowModal] = useState(false);
	const handleModalClose = () => setShowModal(false);
	const handleModalShow = () => setShowModal(true);
	const { studentModel, setStudentModel } = useContext(UniversalContext)
	const [allStudent, setAllStudent] = useState([]);
	const getStudentList = () => {
		fetch('http://localhost:3000/admin/studentList', {
			headers: {
				"Authorization": localStorage.getItem("aJwt")
			}
		})
			.then(res => res.json())
			.then(data => {
				if (!data.error) {
					setAllStudent(data);
				}
			}).catch((error) => {
				console.log(error);
			})
	}
	useEffect(() => {
		getStudentList();
	}, [])
	// ------------------------- Start Certicate data  --------------------
	//--------------------------Start Show Hide -------------------//
	const [showInput, setShowInput] = useState(false);
	const handleNewButtonClick = () => {
		setShowInput(!showInput); // Toggle the state
	};
	const handleFileChange = (event) => {
		const files = event.target.files;
		if (files.length > 0) {
			const selectedFile = files[0];
			if (selectedFile.size <= 50 * 1024) {
				const fileReader = new FileReader();
				fileReader.onload = () => {
					setImgPreview(fileReader.result);
					setError("");
				};
				fileReader.readAsDataURL(selectedFile);
			} else {
				setImgPreview("");
				setError("Upload only 50 KB smaller image.");
			}
		}
	};
	return (
		<div style={{ background: '#B2CBFF' }}>
			<header className="p-0  shadow d-flex align-items-center bg-primary shadow-sm w-100 " style={{ marginTop: '4rem' }} id="adminHeader">
				<div className="row  px-0 mx-0  w-100 d-flex justify-content-between">
					<div className="col-md-10 mx-0 px-0 ">
						<div className="row px-0 mx-0  ">
							<div className="col-md-12 d-flex">
								<div className="row d-flex  justify-content-between text-center w-100 mx-0 px-0">
									<div className="col  col-sm-2 d-flex justify-content-start ">
										<h4 className="text-center fw-bolder fw-bolder text-white bg-primary p-0 m-0 py-4">
											<i className="fa fa-dashboard d-inline d-sm-block"
												aria-hidden="true"></i>&nbsp; <span>Dash Board</span></h4>
									</div>
									<div className="col myFlex2">
										<SearchBox className='m-0 p-0 ' />
									</div>
									<div className="col pe-sm-2 d-flex align-items-center justify-content-end">
										<div>
											<button type="button" className="btn bg-secondary-subtle mx-3 position-relative" data-bs-toggle="modal"
												data-bs-target="#MessageModal">
												<i className="bi bi-bell-fill text-secondary-emphasis fs-6"></i>
												<span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
													99+
												</span>
											</button>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</header>
			<div className="row mx-0 px-0">
				<div className="col-12 mx-0 px-0  ">
					<div className="row  mx-0 px-0 ">
						{/* ------------------------ Start  Aside Bar ------------------------ */}
						<div className="col-md-2 mx-0 text-white px-0 bg-white myshadow" style={{ height: '100vh' }}>
							<hr className="m-0 p-0" />
							<div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
								{/* Institute Section */}
								<div className="accordion accordion-flush" id="AdminSection">
									<div className="accordion-item">
										<h2 className="accordion-header">
											<button className="accordion-button bg-primary text-white accordianShadowHover collapsed"
												type="button" data-bs-toggle="collapse" data-bs-target="#InstituteData">
												<i className="fa fa-user-circle" aria-hidden="true"></i> &nbsp; Institute
											</button>
										</h2>
										<div id="InstituteData" className="accordion-collapse collapse">
											<div className="accordion-body">
												<button className="nav-link w-100 mx-0 px-0" data-bs-toggle="pill" data-bs-target="#ContactForm"
													type="button" role="tab">
													<i className="fa fa-map-marker" aria-hidden="true"></i> Contact & Location
												</button>
												<button className="nav-link w-100" data-bs-toggle="pill" data-bs-target="#instituteCertificatePictutes"
													type="button" role="tab">
													<i className="fa fa-camera-retro" aria-hidden="true"></i>  Affiliations Pics
												</button>
												<button className="nav-link w-100" data-bs-toggle="pill" data-bs-target="#Notisfication"
													type="button" role="tab">
													<i className="fa fa-newspaper-o" aria-hidden="true"></i> Notification
												</button>
												<button className="nav-link w-100" data-bs-toggle="pill" data-bs-target="#ProgramData"
													type="button" role="tab">
													<i className="fa fa-picture-o" aria-hidden="true"></i> Program Pics
												</button>
											</div>
										</div>
									</div>
								</div>
								{/* Students Section */}
								<div className="accordion accordion-flush" id="accordionFlushExample">
									<div className="accordion-item">
										<h2 className="accordion-header">
											<button className="accordion-button bg-primary text-white accordianShadowHover collapsed"
												type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne">
												<i className="fa fa-graduation-cap" aria-hidden="true"></i> &nbsp; Students
											</button>
										</h2>
										<div id="flush-collapseOne" className="accordion-collapse collapse"
											data-bs-parent="#accordionFlushExample">
											<div className="accordion-body">
												<button className="nav-link active w-100" data-bs-toggle="pill" data-bs-target="#v-pills-home"
													type="button" role="tab">
													<i className="bi bi-search"></i>  Students Board
												</button>
												<button className="nav-link w-100" data-bs-toggle="pill" data-bs-target="#AllStudent"
													type="button" role="tab"><i className="bi bi-patch-check-fill"></i> &nbsp; All Students
												</button>
												<button className="nav-link w-100" data-bs-toggle="pill" data-bs-target="#AddStudent"
													type="button" role="tab">
													<i className="bi bi-person-plus-fill"></i> Add Students
												</button>
												<button data-bs-toggle="pill" data-bs-target="#DeleteStudents" className="nav-link w-100"
													type="button" role="tab">
													<i className="bi bi-trash3-fill"></i> Delete Students
												</button>
												<button className="nav-link w-100" data-bs-toggle="pill" data-bs-target="#RestoreStudent"
													type="button" role="tab">
													<i className="bi bi-arrow-counterclockwise"></i> Restore Students
												</button>
												<button className="nav-link w-100" data-bs-toggle="pill" data-bs-target="#certificate"
													type="button" role="tab">
													<i className="bi bi-card-list"></i> Certificate Data
												</button>
											</div>
										</div>
									</div>
								</div>
								{/* Admin Section */}
								<div className="accordion accordion-flush" id="AdminSection">
									<div className="accordion-item">
										<h2 className="accordion-header">
											<button className="accordion-button bg-primary text-white accordianShadowHover collapsed"
												type="button" data-bs-toggle="collapse" data-bs-target="#AdmimPanel">
												<i className="bi bi-universal-access" aria-hidden="true"></i> &nbsp; Admin
											</button>
										</h2>
										<div id="AdmimPanel" className="accordion-collapse collapse" data-bs-parent="#AdminSection">
											<div className="accordion-body">
												<button className="nav-link w-100" data-bs-toggle="pill" data-bs-target="#AdminProfile"
													type="button" role="tab">
													<i className="fa fa-user-circle" aria-hidden="true"></i> Profile
												</button>
												<button className="nav-link w-100" data-bs-toggle="pill" data-bs-target="#NewAccount"
													type="button" role="tab">
													<i className="bi bi-person-fill-lock"></i>  Create an account
												</button>
												<button className="nav-link w-100" data-bs-toggle="pill" data-bs-target="#AdminLogin"
													type="button" role="tab">
													<i className="fa fa-arrow-circle-left" aria-hidden="true"></i> Log in
												</button>
												<button onClick={() => { localStorage.removeItem('aJwt') }} className="nav-link w-100" data-bs-toggle="pill"
													type="button" role="tab">
													<i className="fa fa-arrow-circle-o-right" aria-hidden="true"></i> Log Out
												</button>
											</div>
										</div>
									</div>
								</div>
								{/* Courses Section */}
								<div className="accordion accordion-flush" id="accordionFlushExample">
									<div className="accordion-item">
										<h2 className="accordion-header">
											<button className="accordion-button bg-primary text-white accordianShadowHover collapsed"
												type="button" data-bs-toggle="collapse" data-bs-target="#allCourses">
												<i className="fa fa-book" aria-hidden="true"></i> &nbsp; Courses
											</button>
										</h2>
										<div id="allCourses" className="accordion-collapse collapse"
											data-bs-parent="#accordionFlushExample">
											<div className="accordion-body">
												<button className="nav-link w-100" data-bs-toggle="pill" data-bs-target="#cccc"
													type="button" role="tab">
													<i className="fa fa-user-circle-o"></i>  ccc
												</button>
												<button className="nav-link w-100" data-bs-toggle="pill" data-bs-target="#hhhh"
													type="button" role="tab">
													<i className="bi bi-person-plus-fill"></i> html
												</button>
											</div>
										</div>
									</div>
								</div>
								{/* Offer Section */}
								<div className="accordion accordion-flush" id="NewOffer">
									<div className="accordion-item">
										<h2 className="accordion-header">
											<button className="accordion-button bg-primary text-white accordianShadowHover collapsed"
												type="button" data-bs-toggle="collapse" data-bs-target="#Offers">
												<i className="bi bi-rss"></i>&nbsp;   Offer
											</button>
										</h2>
										<div id="Offers" className="accordion-collapse collapse" data-bs-parent="#NewOffer">
											<div className="accordion-body">
												<button className="nav-link small w-100" data-bs-toggle="pill" data-bs-target="#OffersForNewStudent"
													type="button" role="tab">
													For New Students
												</button>
											</div>
										</div>
									</div>
								</div>
								{/* Online Exams Section */}
								<div className="accordion accordion-flush" id="OnlineExams">
									<div className="accordion-item">
										<h2 className="accordion-header">
											<button className="accordion-button bg-primary text-white accordianShadowHover collapsed"
												type="button" data-bs-toggle="collapse" data-bs-target="#CCC">
												<i className="fa fa-file-text" aria-hidden="true"></i> &nbsp;   CCC MCQ
											</button>
										</h2>
										<div id="CCC" className="accordion-collapse collapse" data-bs-parent="#CCC">
											<div className="accordion-body">
												<button className="nav-link small w-100" data-bs-toggle="pill" data-bs-target="#CCCMCQ"
													type="button" role="tab">
													Update MCQ
												</button>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						{/* ------------------------ End  Aside Bar ------------------------ */}
						{/* ------------------------ Start Main Body Content ------------------------ */}
						<div className="col-md-10 container m-0 p-0">
							<div className="tab-content mx-1 px-0 bg-light" id="v-pills-tabContent">
								{/* --------------------------- Start Body Nav Top Bar --------------------------- */}
								<div className="tab-pane fade show active" id="v-pills-home" role="tabpanel"
									aria-labelledby="v-pills-home-tab" tabIndex="0">
									<div className="mx-0 px-0 ">
										<div className="row mb-2 d-flex justify-content-center m-auto w-100">
											<div className="col-xl-3 col-xxl-3 col-sm-6 my-2">
												<div className="widget-stat myshadow2 border-0 card bg-primary">
													<div className="card-body">
														<div className="media">
															<span className="mx-1 bg-white">
																<i className="fa fa-user-circle-o" aria-hidden="true"></i>
															</span>
															<div className="media-body text-white">
																<p className="mb-1">Total Students</p>
																<h3 className="text-white">{allStudent.length}</h3>
															</div>
														</div>
													</div>
												</div>
											</div>
											<div className="col-xl-3 col-xxl-3 col-sm-6 my-2">
												<div className="widget-stat myshadow2 border-0 card bg-warning d-flex">
													<div className="card-body">
														<div className="media">
															<span className="mx-1">
																<i className="fa fa-user " aria-hidden="true"></i>
															</span>
															<div className="media-body text-white">
																<p className="mb-1">New Students</p>
																<h3 className="text-white">245</h3>
															</div>
														</div>
													</div>
												</div>
											</div>
											<div className="col-xl-3 col-xxl-3 col-sm-6 my-2">
												<div className="widget-stat myshadow2 border-0 card bg-voilet">
													<div className="card-body">
														<div className="media">
															<span className="mx-1">
																<i className="fa fa-graduation-cap" aria-hidden="true"></i>
															</span>
															<div className="media-body text-white">
																<p className="mb-1">Total Course</p>
																<h3 className="text-white">28</h3>
															</div>
														</div>
													</div>
												</div>
											</div>
											<div className="col-xl-3 col-xxl-3 col-sm-6 my-2">
												<div className="widget-stat myshadow2 border-0 card bg-danger">
													<div className="card-body">
														<div className="media">
															<span className="mx-1">
																<i className="bi bi-award-fill text-danger" aria-hidden="true"></i></span>
															<div className="media-body text-white">
																<p className="mb-1">Total New Offer</p>
																<h3 className="text-white">25</h3>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
									<StudentChart />
								</div>
								{/* --------------------------- End Body Nav Top Bar --------------------------- */}
								<div className="tab-pane fade mx-0 px-0 position-absolute top-25 mt-2" id="AllStudent" role="tabpanel"
									tabIndex="0">
									<div className="row mx-0 px-0 bg-white myshadow w-100">
										<div className="col-12 py-2 mx-0 px-0 d-flex justify-content-around align-items-center ">
											<div className="h2 fw-bold myFlex2 text-primary"><b className='px-2 text-uppercase'>All Students</b></div>
											<div className="myFlex2">
												<button className="btn btn-primary rounded-0 d-flex align-items-center">  <i className="fa fa-plus-circle"
													aria-hidden="true"></i>
													<Link to="/AdmissionForm" className="nav-link" >&nbsp; Add New</Link> </button>
											</div>
										</div>
									</div>
									<div className="row mx-0 px-0  bg-white text-primary  myshadow"
										style={{ borderTop: 'var(--my-border)' }}>
										<div
											className="col-12 mx-0  px-2 fw-medium d-flex justify-content-between align-items-center ">
											<div className="d-flex  fw-bolder">
												<p id="All small"> Total Students List</p>
											</div>
											<div>
												<SearchBox />
											</div>
										</div>
										<table className="table table-responsive table-sm " id="dashBoardTable" style={{ color: 'maroon' }}>
											<thead>
												<tr role="row">
													<th >Photo</th>
													<th>Reg. No</th>
													<th>Name</th>
													<th>Address</th>
													<th>Mobile</th>
													<th>Admission Date</th>
													<th>Action</th>
												</tr>
											</thead>
											<tbody>
												{
													(allStudent.length >= 1) && allStudent.map((student) => {
														return (
															<tr role="row" className="odd" id={student._id}>
																<td><img className="rounded-circle" width="40" src={student.photo} />
																</td>
																<td className="fw-medium">05</td>
																<td className="">{student.name}</td>
																<td>{student.address}</td>
																<td>{student.mobileNumber}</td>
																<td>{student.dob.slice(0, 10)}</td>
																<td>
																	<button
																		type="button"
																		id="LounchModal"
																		className="btn btn-sm bg-seconday bg-danger text-white"
																		onClick={handleModalShow}
																	>
																		<i className="fa fa-trash-o" aria-hidden="true"></i>
																	</button>
																</td>
															</tr>
														)
													})
												}
											</tbody>
											<Modal show={showModal} onHide={handleModalClose} animation={false} >
												<Modal.Header className='bg-primary ' closeButton >
													<Modal.Title>
														<div className="h2 fw-bold myFlex2 text-white"><b className="px-2 text-uppercase"> DELETE STUDENT'S</b></div>
													</Modal.Title>
												</Modal.Header>
												<Modal.Body>
													<StudentModel />
												</Modal.Body>
												<Modal.Footer>
													<Button variant="secondary" onClick={handleModalClose}>
														Close
													</Button>
													<Button variant="danger" onClick={showNotes}>Delete</Button>
												</Modal.Footer>
											</Modal>
										</table>
									</div>
								</div>
								<div className="tab-pane fade mx-0 px-0 position-absolute top-0 mt-5 pt-4 AddmissionDataAdmin" id="AddStudent" role="tabpanel"
									tabIndex="0">
									<AdmissionForm className="mx-0 px-0 cardEffects border border-2 border-white" />
								</div>
								<div className="tab-pane fade mx-0 px-0 cardEffects cardEffectsBorder my-2" id="DeleteStudents" role="tabpanel"
									tabIndex="0">
									<DeleteStudent />
								</div>
								<div className="tab-pane fade mx-0 px-0" id="RestoreStudent" role="tabpanel"
									tabIndex="0">
									<header className="bg-dark my-2 py-2">
										<h1 className="text-center text-white">
											Restore Student's
										</h1>
									</header>
								</div>
								<div className="tab-pane fade mx-2 py-4" id="ContactForm" role="tabpanel">
									<div className="mx-0 px-0">
										<div className="row mb-5">
											<div className="row  myflex d-flex justify-content-center my-1">
												<div className="col-12 col-md-8 bg-white py-1 myshadow">
													<div className="p-2">
														<div className="border-bottom text-white text-center text-dark m-0 py-2 h4 fw-bold text-uppercase"
															style={{ border: '1px solid #012C5', background: 'var(--card-bg)' }}
														>
															<h1 className="fw-bolder fw-bolder"> UPDATE <font color='red'>CONTACT DETAILS</font></h1>
														</div>
														<div className="row offersTitle">
															<div className="d-flex py-3">
																<div className="col-md-3">
																	<button type="button" className="btn btn-primary" onClick={handleNewButtonClick}>
																		<i className="fa fa-phone" aria-hidden="true"></i>   Contact <i className="bi bi-arrow-right-short"></i></button>
																</div>
																<div className={`col-md-9 ${showInput ? '' : ' d-none'}`}>
																	<div className="input-group">
																		<input type="number" placeholder='Enter Contact Number...' className='form-control' />
																		<button className='btn btn-primary'>Send</button>
																	</div>
																</div>
															</div>
															<div className="mb-3">
																<textarea className="form-control" placeholder='Enter institute Location....' rows="4"></textarea>
															</div>
														</div>
														<div className="text-center my-2">
															<a className="small btn btn-primary">Update</a>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className="tab-pane fade mx-2 py-5" id="Notisfication" role="tabpanel">
									<div className="mx-0 px-0">
										<div className="row mb-5">
											<div className="row  myflex d-flex justify-content-center my-1">
												<div className="col-12 col-md-8 bg-white py-1 myshadow">
													<div className="p-2">
														<div className="border-bottom text-white text-center text-dark m-0 py-2 h4 fw-bold"
															style={{ border: '1px solid #012C5', background: 'var(--card-bg)' }} >
															<h1 className="fw-bolder fw-bolder"> UPDATE <font color='red'>NOTICEFICATION</font></h1>
														</div>
														<div className="row py-3">
															<div className="col-md-3">
																<button type="button" className="btn btn-primary" onClick={handleNewButtonClick}>
																	<i className="fa fa-book" aria-hidden="true"></i>   Content <i className="bi bi-arrow-right-short"></i></button>
															</div>
															<div className={`col-md-9 ${showInput ? '' : ' d-none'}`}>
																<div className="input-group">
																	<textarea className="form-control" placeholder='Enter Noticefication content here.....' rows="4"></textarea>
																</div>
															</div>
														</div>
														<div className="text-center my-2">
															<a className="small btn btn-primary" href="#">Update</a>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className="tab-pane fade mx-2 py-3" id="instituteCertificatePictutes" role="tabpanel">
									<div className="row  myflex d-flex justify-content-center my-1">
										<div className="col-12 col-md-8 bg-white py-1 myshadow">
											<div className="mx-0 px-0">
												<div className="row mb-5">
													<div className="col-12">
														<div className="col-12 m-0 p-0 mb-3" style={{ border: '1px solid #012C5', background: 'var(--card-bg)' }}>
															<div className="container text-center m-0 py-3 h2 fw-bold text-uppercase"
																style={{ color: 'rgb(255, 255, 255)' }}>
																<b style={{ letterSpacing: '1px', color: 'white' }}>
																	Our <font color='red'>Affiliations</font>
																</b>
															</div>
														</div>
														<span className='text-danger fw-medium'>Provide to all the instituion  certificate ,
															Drishtee is registered under the organization.</span>
														<div className="input-group form-control bg-primary-subtle my-2">
															<input type="file" accept="image/*" className="form-control my-2 float-start"
																id="choose-file" onChange={handleFileChange} />
															<button className='btn btn-sm btn-warning rounded-2 mx-2'>Send</button>
														</div>
														<div className="my-3">
															<textarea className="form-control" placeholder='Caption of AFFILIATIONS message....' rows="4"></textarea>
														</div>
													</div>
													<div className="text-center">
														<a className="small btn btn-primary" href="#">
															<i className="bi bi-cloud-arrow-up-fill"></i> Update</a>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className="tab-pane fade bg-primary my-2" id="ProgramData" role="tabpanel" tabIndex="0">
									<div className="col-12 m-0 p-0 " style={{ border: '1px solid #012C5', background: 'var(--card-bg)' }}>
										<div className="container text-center m-0 py-3 h2 fw-bold text-uppercase " style={{ color: 'rgb(255, 255, 255)' }}>
											<b style={{ letterSpacing: '1px', color: 'white' }}>
												Upload  <font color="red">Gallary Images</font>
											</b>
										</div>
									</div>
									<form className="row container my-1 py-5 g-3 align-items-center">
										<div className="col-12 d-flex justify-content-around px-md-5 p-0">
											<button type="button" className="btn btn-primary" onClick={handleNewButtonClick}>
												New <i className="bi bi-plus-circle "></i>
											</button>
										</div>
										<div className={`col-lg-5 col-md-10 m-auto mt-3  m-auto my-4 ${showInput ? '' : ' d-none'}`}>
											<div className="input-group">
												<input type="file" name='file' className="form-control" />
												<button type='button' className='btn btn-warning'> <i className="bi bi-upload"></i> Send</button>
											</div>
										</div>
									</form>
								</div>
								<div className="tab-pane fade mx-2" id="certificate" role="tabpanel">
									<div className="mx-0 px-0">
										<div className="row mb-5">
											<UploadCertificateData />
										</div>
									</div>
								</div>
								{/* ---------------------Start Admin  Body--------------------- */}
								<div className="tab-pane fade" id="AdminProfile" role="tabpanel" tabIndex="0">
									<div className="row m-auto my-2">
										<div className="col-12 bg-white myshadow p-2 ">
											<div className="row bg-white mx-0 px-0">
												<section className="section">
													<div className="container ">
														<div className="row align-items-center flex-row-reverse">
															<div className="col-md-8  border-bottom ">
																<div className="about-text">
																	<div className="row">
																		<h1 className='fw-bolder text-primary'>Mr. Ajay Tiwari</h1>
																		<hr />
																		<div className="col-6">
																			<div className="media">
																				<label>Birthday</label>
																				<p>4th april 1998</p>
																			</div>
																			<div className="media">
																				<label>Address</label>
																				<p>California, USA</p>
																			</div>
																		</div>
																		<div className="col-6">
																			<div className="media">
																				<label>E-mail</label>
																				<p>info@domain.com</p>
																			</div>
																			<div className="media">
																				<label>Profession</label>
																				<p>	Lawyer</p>
																			</div>
																		</div>
																	</div>
																</div>
															</div>
															<div className="col-md-4  d-flex text-center flex-column">
																<div className="about-avatar">
																	<img src="images/team/team-1.png" alt="Ajay Tiwary" />
																</div>
															</div>
														</div>
													</div>
													<div className="px-4 pb-5 bg-body-tertiary">
														<h3 className="dark-color fw-bolder text-warning">About Me</h3>
														<h6 className="theme-color ">A Lead UX &amp; UI designer based in DIIT</h6>
														<p>I <span className='bg-warning-subtle '>design and develop </span> services for customers of all sizes, specializing in creating stylish, modern websites, web services and online stores. My passion is to design digital user experiences through the bold interface and meaningful interactions.</p>
													</div>
												</section>
											</div>
										</div>
									</div>
								</div>
								<div className="tab-pane fade" id="NewAccount" role="tabpanel" tabIndex="0">
									<div className="row myflex d-flex justify-content-center">
										<div className="col-12 col-md-8 bg-white py-3 my-3 myshadow">
											<div className="p-2">
												<div className="text-center">
													<h1 className="h2 fw-bold text-gray-900 mb-4 text-primary">Create Account!</h1>
												</div>
												<form className="user">
													<div className="form-group row my-2">
														<div className="col-md-4 mb-3 mb-sm-0 input-group w-50">
															<input type="file" className="form-control form-control mx-0 px-0" />
															<button type='button' className='btn btn-sm btn-primary'>Send</button>
														</div>
														<div className="col-sm-6 mb-3 mb-sm-0 ">
															<input type="text" className="form-control form-control" placeholder="Owner's Name" />
														</div>
													</div>
													<div className="form-group row my-2">
														<div className="col-sm-6">
															<input type="text" className="form-control form-control" placeholder="Address" />
														</div>
														<div className="col-sm-6">
															<input type="text" className="form-control form-control" placeholder="Profession" />
														</div>
													</div>
													<div className="form-group row my-2">
														<div className="col-sm-6 mb-3 mb-sm-0">
															<input type="date" className="form-control form-control" placeholder="Date of Birth" />
														</div>
														<div className="col-sm-6">
															<input type="number" className="form-control form-control" placeholder="Contact" />
														</div>
													</div>
													<div className="form-group">
														<input type="email" className="form-control form-control" placeholder="Email Address....*" />
													</div>
													<div className="form-group row my-2">
														<div className="col-sm-6 mb-3 mb-sm-0">
															<input type="password" className="form-control form-control" placeholder="Password....*" />
														</div>
														<div className="col-sm-6">
															<input type="password" className="form-control form-control" placeholder="Repeat Password....*" />
														</div>
													</div>
													<a href="login.html" className="btn btn-primary w-100 my-2 py-2 rounded-pill">
														Register Account
													</a>
													<hr />
													<a href="index.html" className="btn btn-danger w-100 my-2 py-2 rounded-pill">
														<i className="fa fa-google" aria-hidden="true"></i> Register with Google
													</a>
													<a href="index.html" className="btn fbColor text-white  w-100 my-2 py-2 rounded-pill"> <i
														className="fa fa-facebook" aria-hidden="true"></i>  Register with Facebook
													</a>
												</form>
												<hr />
												<div className="text-center">
													<a className="small" href="#">Forgot Password?</a>
												</div>
												<div className="text-center">
													<a className="small" href="#">Already have an account? Login!</a>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className="tab-pane fade" id="AdminLogin" role="tabpanel" tabIndex="0">
									<div className="row myflex d-flex justify-content-center py-5">
										<div className="col-12 col-md-6 bg-white py-3 myshadow">
											<div>
												<h3 className="text-center text-primary">Welcome Back!</h3>
												<div className="mb-3">
													<input type="email" className="form-control" placeholder="Enter User's id" />
												</div>
												<div className="mb-3">
													<input type="password" className="form-control" placeholder="Password" />
												</div>
												<button type="submit" className="btn btn-primary w-100 rounded-pill">Log in</button>
												<hr />
												<div className="text-center">
													<a className="nav-link text-primary" href="#"> <small>Forget Password</small> </a>
												</div>
												<div className="text-center">
													<a className="nav-link text-primary" href="#"> <small> Create an Account!</small>
													</a>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className="tab-pane fade" id="AdminProfile" role="tabpanel" tabIndex="0">
									<div className="row myflex d-flex justify-content-center my-4">
										<div className="col-12 col-md-11 bg-white py-3 myshadow">
											<div className="row">
												<div className="col-md-4">
													<div className="row">
														<div className="col-md-11  d-flex justify-content-center">
															<div className="card px-3 " >
																<img src="images/team/team-1.png" className="img-fluid card-img-top" alt="..." />
																<div className="card-body text-center">
																	<h5 className="card-title">Ajay Tiwari</h5>
																	<p className="card-text">Web Developer || Programmer </p>
																</div>
															</div>
														</div>
													</div>
												</div>
												<div className="col-md-8">
													<div className="row">
														<div className="col-md-11">
															<div className="card ">
																<div className="card-body">
																	<div className="profile-personal-info pt-4">
																		<h4 className="text-primary mb-4">Personal Information</h4>
																		<div className="row mb-4">
																			<div className="col-lg-3 col-md-4 col-sm-6 col-6">
																				<h5 className="f-w-500">Name <span className="pull-right">:</span>
																				</h5>
																			</div>
																			<div className="col-lg-9 col-md-8 col-sm-6 col-6"><span>Ajay Tiwari</span>
																			</div>
																		</div>
																		<div className="row mb-4">
																			<div className="col-lg-3 col-md-4 col-sm-6 col-6">
																				<h5 className="f-w-500">Email <span className="pull-right">:</span>
																				</h5>
																			</div>
																			<div className="col-lg-9 col-md-8 col-sm-6 col-6">
																				<span>ajtiwari4@gmail.com</span>
																			</div>
																		</div>
																		<div className="row mb-4">
																			<div className="col-lg-3 col-md-4 col-sm-6 col-6">
																				<h5 className="f-w-500">Mobile <span className="pull-right">:</span>
																				</h5>
																			</div>
																			<div className="col-lg-9 col-md-8 col-sm-6 col-6"><span>9918151032</span>
																			</div>
																		</div>
																		<div className="row mb-4">
																			<div className="col-lg-3 col-md-4 col-sm-6 col-6">
																				<h5 className="f-w-500">Address <span className="pull-right">:</span>
																				</h5>
																			</div>
																			<div className="col-lg-9 col-md-8 col-sm-6 col-6"><span>
																				Harredih mohalla , ward No. 04 Nichlaul, Maharajganj
																			</span>
																			</div>
																		</div>
																	</div>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div className="row m-2 d-flex justify-content-evenly ">
											<div data-target="" className="col-3 mx-1  btn btn-primary"> Profile</div>
											<div data-target="" className="col-3 mx-1  btn btn-primary">Edit </div>
										</div>
									</div>
								</div>
								{/* ---------------------End Admin Body --------------------- */}
								{/* ---------------------Start Course Body  --------------------- */}
								<div className="tab-pane fade mx-2" id="cccc" role="tabpanel">
									<UpdateCourse />
								</div>
								<div className="tab-pane fade mx-2" id="hhhh" role="tabpanel" >
									<UpdateCourse />
								</div>
								<div className="tab-pane fade" id="OffersForNewStudent" role="tabpanel">
									<div className="mx-0 px-0 py-5">
										<div className="row mb-5">
											<div className="row  myflex d-flex justify-content-center my-1">
												<div className="col-12 col-md-8 bg-white py-1 myshadow">
													<div className="p-2">
														<div className="text-center">
															<h1 className="fw-bolder text-gray-900 mb-4 text-primary"> OFFERS FOR ENQUIRY NOW</h1>
														</div>
														<div className="offersTitle">
															<h4> <b className="text-warning">50%</b> Off For New Students</h4>
															<div className="mb-3">
																<input type="text" className="form-control" placeholder='caption of message....*' />
															</div>
															<div className="mb-3">
																<textarea className="form-control" placeholder='Send a new offers....*' rows="4"></textarea>
															</div>
														</div>
														<div className="text-center my-2">
															<a className="small btn btn-primary" href="#">Update</a>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className="tab-pane fade" id="CCCMCQ" role="tabpanel">
									<QuestionForm />
								</div>
								{/* ---------------------End Course Body  --------------------- */}
							</div>
						</div>
						{/* ------------------------ Start Main Body Content ------------------------ */}
					</div>
				</div>
			</div>
		</div>
	)
}
