const Employee = require("../Model/UserModel");


exports.createEmployee = async (req, res) => {
  try {
    
    const { name, email, mobile, designation, gender, course } = req.body;
    console.log(req.body);

    if(!name || !email || !mobile || !designation || !gender || !course){
      return res.status(400).json({message:"All Fields Required *"})
    }

    const existEmail=await Employee.findOne({ email })
    if(existEmail){
      return res.status(400).json({message:"User with this Email already exists"})
    }
    
    if (!req.file) {
      return res.status(400).json({ message: "Image file is required." });
    }

    
    const imagePath = req.file.filename;
    const imageUrl = `${req.protocol}://${req.get(
      "host"
    )}/uploads/${imagePath}`;

    const employee = new Employee({
      name,
      email,
      mobile,
      designation,
      gender,
      course,
      image: imageUrl,
    });
    await employee.save();

    res
      .status(201)
      .json({ message: "Employee created successfully", employee });
  } catch (error) {
    res.status(400).json({ message: "Error creating employee", error });
  }
};

exports.getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json({ data: employees });
  } catch (error) {
    console.error("Error fetching employees:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

exports.updateEmployee = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);

    
    const { name, email, mobile, designation, gender, course } = req.body;

    
    const updatedData = {
      name,
      email,
      mobile,
      designation,
      gender,
      course,
    };

    
    if (req.file) {
      
      const imagePath = req.file.filename;
      updatedData.image = `${req.protocol}://${req.get(
        "host"
      )}/uploads/${imagePath}`; 
    }

    
    const updatedEmployee = await Employee.findByIdAndUpdate(id, updatedData, {
      new: true, 
      runValidators: true, 
    });

    if (!updatedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    
    res
      .status(200)
      .json({
        message: "Employee updated successfully",
        data: updatedEmployee,
      });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Server error", error: e.message });
  }
};

exports.DeleteEmployee = async (req, res) => {
  try {
    const id = req.params.id;
    
    const deletedEmployee = await Employee.findByIdAndDelete(id,{
        new:true
    }
    );
    if (!deletedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Server error", error: e.message });
  }
};



exports.adminLogin = async(req,res)=>{
    const{text,password}  = req.body
    console.log(req.body)
    if( password === "Manikumar@123"){
        res.status(200).json({message : "Login Success"})
    }
    else{
        res.status(401).json({message : "Invalid Credentials"})
    }
}