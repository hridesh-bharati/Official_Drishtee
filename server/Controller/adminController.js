const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWTKEYS = process.env.JWTKEYS;
const { notice, admin, course } = require("../Model/admin");
const { student, enquiry, certificate } = require("../Model/student");

// Student Controller
const studentList = (async (req, res) => {
    try {
        student.find().then((result) => {
            res.json(result)
        })
    } catch (error) {
        res.json({ message: "Some Internal Error Occured", mError: error });
    }
})
const takeNewAdmission = (async (req, res) => {
    try {
        const _id = req.params._id;
        const iNum = req.body.iNum;
        const centerCode = process.env.CENTERCODE;
        if (!_id || !iNum) {
            return res.json({ error: "Student Id and Student Index No. is Required" });
        }
        else {
            await student.findById(_id).then((result) => {
                if (result == null) {
                    return res.json({ message: "Student Registration Form Does Not Exist" });
                }
                else {
                    if (result.admitted === true) {
                        return res.json({ message: 'You Have been Already Taken This Student Admission' });
                    } else {
                        let regNum = centerCode+'/'+result.course+'/'+iNum;
                        student.findByIdAndUpdate(_id, { $set: { admitted: true , regNum:regNum  } }).then(() => {
                            return res.json("Student Admission Has Been Done Successfully");
                        }).catch((error) => {
                            return res.json({ message: "Some Internal Error Occured While Admission", mError: error });
                        })
                    }
                }
            }).catch((error) => {
                return res.json({ message: "Student Registration Form Does Not Exist", mError: error });
            })
        }
    } catch (error) {
        res.json({ message: "Some Internal Error Occured", mError: error });
    }
})
const deleteStudentRegistrationForm = (async (req, res) => {
    try {
        const _id = req.params._id;
        if (!_id) {
            return res.status(400).json({ error: "Student Id Not Gotten" });
        }
        else {
            await student.findOneAndDelete({ _id: _id, admitted:false }).then((result) => {
                if (result == null) {
                    res.json({ message: "Student Registration Form Does Not Exist Or You have been taken Student Admission" });
                }
                else {
                    res.json({ message: "Student Registration Form Has Been Deleted" });
                }
            }).catch((error) => {
                res.json({ message: "Student Registration Form Does Not Exist", mError: error });
            })
        }
    } catch (error) {
        res.json({ message: "Some Internal Error Occured", mError: error });
    }
})
// Student Certificate Controllers
const generateCertificate = (async(req,res)=>{
    try {
        const {_id,percentage}= req.body;
        if(!_id || ! percentage){
            return res.status(404).json({message:"Student Id and Percentage boath are Required"});    
        }
        else{
            const data = await student.findOne({_id:_id,admitted:true}).select('regNum');
            if(data==null)
            {
            return res.status(404).json({message: "Student Data Not Found Or Student have Not Taken Admission"});             
            }
            else{
                const newCertificate = new certificate({
                    student: _id,
                    completationDate: Date.now(),
                    percentage: percentage,
                    regNum:data.regNum
                });
                await newCertificate.save().then((data) => {
                    console.log(data);
                    return res.status(200).json({message: "Certificate Generated Successfully"});
                }).catch((error) => {
                    return res.status(500).json({message: "Some Error Occured While Generating Certificate", mError: error});
                });
            }
                
        }
      
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"some Internal Error Occured",mError:error});
    }
})

// Admin Controller
const addAdmin = (async (req, res) => {
    try {
        const { name, email, profilePic, dob, mobileNumber, password } = req.body;
        if (!name || !email || !profilePic || !dob || !mobileNumber || !password) {
            return res.json({ error: "Please Add All Fields" });
        } else {
            bcrypt.hash(password, 9).then(async (hashedPassword) => {
                const adminData = new admin({
                    name, email, profilePic, dob, mobileNumber, password: hashedPassword
                });
                await adminData.save().then((data) => {
                    const token = jwt.sign({ _id: data._id }, process.env.JWTKEYS);
                    res.json(token);
                }).catch((error) => {
                    // res.json({ error: `${JSON.stringify(error.keyValue)} is Already Exist` });
                    console.log(error)
                })
            }).catch((error) => {
                res.json({ error: "Some Internal Error Occured", mError: error });
            })
        }
    } catch (error) {
        res.json({ error: 'Some Error Occured', mError: error });
    }
});
const loginAdmin = (async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.json({ error: "Please Add All The Fields" });
        } else {
            const adminData = await admin.findOne({ email });
            if (adminData) {
                bcrypt.compare(password, adminData.password).then((result) => {
                    if (result) {
                        const token = jwt.sign({ _id: adminData._id }, JWTKEYS);
                        const { _id, name, email, profilePic, dob, mobileNumber } = adminData;
                        res.json({ token: token, adminData: { _id, name, email, profilePic, dob, mobileNumber } });
                    } else {
                        res.status(401).json({ error: 'Password Did Not Matched' });
                    }
                }).catch((error) => {
                    res.status(401).json({ error: 'Password Did Not Matched', mError: error });
                })
            }
            else {
                res.status(401).json({ error: 'Please Enter Valid Credential' });
            }
        }
    } catch (error) {
        return res.json({ error: "Some Error Occured", mError: error });
    }
});
const getAdminList = async (req, res) => {
    try {
         await admin.find().select('name email mobileNumber').then((admins)=>{
             res.json(admins);
         }).catch((error)=>{
            res.json({message:"Server is Busy",error:error});
         })
    } catch (error) {
        res.status(500).json({ message: 'Server error', mError: error });
    }
};
const deleteAdmin = async (req, res) => {
    try {
        const _id= req.params._id;
        if (!_id) {
            return res.status(400).json({ message: 'Admin Id Required' });
        }
        else {
            await admin.findByIdAndDelete(_id).then((result) => {
                if (result == null) {
                    res.status.json({ message: "This Admin Data Does Not Exist" });
                }
                else {
                    res.status(200).json({ message: 'Admin Account deleted successfully' });
                }
            }).catch((error) => {
                res.status(404).json({ message: "Admin Data Does Not Exist", mError: error });
            })
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', mError: error });
    }
};
// Course Controller
const pushANewCourse = async(req,res)=>{
    try {
        const {name,description,duration,subjects,prerequisites}=req.body;
        if (!name || !description || !duration || !subjects ) {
            return res.status(400).json({ error: "Please provide all the required fields" });
        }else{
            const courseData = new course({name,description,duration,subjects,prerequisites});
            await courseData.save().then(()=>{
                res.json({message:`${name} course has Been Pushed`});
            }).catch((error)=>{
                res.status(500).json({message:"Some Internal Error Occured",mError:error})        
            })
        }
    } catch (error) {
        res.status(500).json({message:"Some Internal Error Occured",mError:error})
    }
}
const getCourseList = (async (req, res) => {
    try {
        const courseList = await course.find();
        if (courseList) {
            res.json(courseList);
        } else {
            res.json({ error: "Courses Does Not Exist" });
        }
    } catch (error) {
        res.json({ error: "Some Internal Error Occured", mError: error });
    }
});
// Notice Controller
const pushNotice = (async (req, res) => {
    try {
        const { title, nMessage } = req.body;
        if (!title || !nMessage) {
            return res.json({ error: "Please Fill All The Fields" });
        }
        else {
            const noticeData = new notice({
                title, nMessage
            });
            await noticeData.save().then(() => {
                res.json({ message: 'Notice Has Been Pushed' })
            }).catch((error) => {
                return res.json({ error: "Some Internal Error Occured", mError: error });
            })
        }
    } catch (error) {
        console.log(error);
    }
});
const getAllNotice = (async (req, res) => {
    try {
        let allNotice = await notice.find().select('title nMessage')
        if (allNotice) {
            res.json(allNotice);
        }
        else {
            res.json({ message: 'Not Exist' });
        }
    } catch (error) {
        return res.json({ error: "Some Internal Error Occured", mError: error });
    }
});
const updateNotice = (async (req, res) => {
    try {
        const { _id, title, nMessage } = req.body;
        if (!_id) {
            res.json({ message: "Notice Does Not Exist" });
        }
        else {
            await notice.findOneAndUpdate({ _id: _id }, { $set: { title: title, nMessage: nMessage } }, { new: true }).then((notice) => {
                res.json({ message: "Saved" });
            }).catch((error) => {
                res.json({ error: "Notice Does Not Exists" });
            });
        }
    } catch (error) {
        return res.json({ error: "Some Internal Error Occured", mError: error });
    }
});
const deleteNotice = (async (req, res) => {
    try {
        const _id = req.params._id;
        if (!_id) {
            return res.json({ error: "Id not Gotten Error occured" });
        }
        else {
            await notice.findByIdAndDelete({ _id: _id }).then((result) => {
                if (result == null) {
                    res.json({ message: "Notice Does Not Exist" });
                }
                else {
                    res.json({ message: "Notice Has Been Deleted" });
                }
            }).catch((error) => {
                res.json({ message: "Notice Does Not Exist", mError: error });
            })
        }
    } catch (error) {
        return res.json({ error: "Some Internal Error Occured", mError: error });
    }
});

// Query Controller
const getAllQuery = (async (req, res) => {
    try {
        const allQuery = await enquiry.find();
        if (allQuery) {
            res.json(allQuery);
        } else {
            res.json({ error: "Query Not Exist" });
        }
    } catch (error) {
        res.json({ error: "Some Internal Error Occured", mError: error });
    }
});
const updateIQueryStatus = (async (req, res) => {
    try {
        const _id = req.body;
        if (!_id) {
            return res.json({ error: "Query Id not Found" });
        } else {
            const query = await enquiry.findByIdAndUpdate(_id, { $set: { iSolveStatus: true } }, { new: true });
            return res.json(query.iSolveStatus);
        }
    } catch (error) {
        return res.json({ error: "Some Internal Error Occured", mError: error });
    }
});
const deleteQuery = (async (req, res) => {
    try {
        const _id = req.params._id;
        if (!_id) {
            return res.json({ error: "Id not Gotten Error occured" });
        }
        else {
            await enquiry.findByIdAndDelete({ _id: _id }).then((result) => {
                if (result == null) {
                    res.json({ message: "Query Does Not Exist" });
                }
                else {
                    res.json({ message: "Query Has Been Deleted" });
                }
            }).catch((error) => {
                res.json({ message: "Query Does Not Exist", mError: error });
            })
        }
    } catch (error) {
        return res.json({ error: "Some Internal Error Occured", mError: error });
    }
});

module.exports = {
    // Admin Controller
    addAdmin,
    loginAdmin,
    getAdminList,
    deleteAdmin,
    // Course Controller
    pushANewCourse,
    getCourseList,

    // Student Controller
    studentList,
    takeNewAdmission,
    deleteStudentRegistrationForm,

    // Certificate Controller
    generateCertificate,
    // Notice Controller
    pushNotice,
    getAllNotice,
    updateNotice,
    deleteNotice,
    // Query Controller
    getAllQuery,
    updateIQueryStatus,
    deleteQuery

}

