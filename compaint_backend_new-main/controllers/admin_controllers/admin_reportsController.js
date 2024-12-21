const Complaint = require("../../models/complaints");
function admin_reportsController() {
  return {
    async getAllReports(req, res) {
      try{
        allReports = await Complaint.find({});
        // console.log(allReports);
        // res.render("home", { allReports: allReports });
        res.status(200).json(allReports);
      }catch(err){
        console.log(err);
      }
  
    },
    async viewSingleReport(req,res){
      console.log(req.params.id);
      const report = await Complaint.findOne({_id:req.params.id})
      res.json(report);
      // console.log(report);
    }
  };
}

module.exports = admin_reportsController;
