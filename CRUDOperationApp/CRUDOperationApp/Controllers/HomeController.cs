using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using CRUDOperationApp.Models;

namespace CRUDOperationApp.Controllers
{
    public class HomeController : Controller
    {
        private DemoDBEntities db = new DemoDBEntities();
        public ActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public ActionResult GetAllStudents()
        {
            var sl = db.Students.ToList();
            return Json(sl, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult AddStudent(Student student)
        {
            db.Students.Add(student);
            db.SaveChanges();
            return Json(true, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult UpdateStudent(Student student)
        {
            var s = db.Students.SingleOrDefault(x => x.Id == student.Id);
            s.Name = student.Name;
            s.Age = student.Age;
            s.Department = student.Department;
            db.SaveChanges();
            return Json(true, JsonRequestBehavior.AllowGet);
        }

        public ActionResult DeleteStudent(Student student)
        {
            var s = db.Students.SingleOrDefault(x => x.Id == student.Id);
            db.Students.Remove(s);
            db.SaveChanges();
            return Json(true, JsonRequestBehavior.AllowGet);
        }
    }
}