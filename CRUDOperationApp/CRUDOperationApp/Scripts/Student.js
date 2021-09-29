/// <reference path="angular.min.js" />

var app = angular.module('myApp', []);
app.controller('myController', function ($scope, $http) {

    $scope.GetAllStudents = function() {
        $http({
            method: "get",
            url: "/Home/GetAllStudents"
        }).then(function (response) {
            $scope.students = response.data;
        }, function () {
                alert("Lỗi !!!");
        });
    }

    $scope.InsertStudent = function () {
        var type = $("#insert").val();
        if (type == "Add") {
            $scope.student = new Object();
            $scope.student.Name = $scope.SName;
            $scope.student.Age = $scope.SAge;
            $scope.student.Department = $scope.SDepartment;
            $http({
                method: "post",
                url: "/Home/AddStudent",
                datatype: "json",
                data: JSON.stringify($scope.student)
            }).then(function (response) {
                $scope.GetAllStudents();
                $scope.SName = "";
                $scope.SAge = "";
                $scope.SDepartment = "";
                alertify.success('Thêm thành công !!!');
            }, function () {
                alertify.error('Lỗi !!!');
            });
        }
        else {
            $scope.student = new Object();
            $scope.student.Id = $scope.SId;
            $scope.student.Name = $scope.SName;
            $scope.student.Age = $scope.SAge;
            $scope.student.Department = $scope.SDepartment;
            $http({
                method: "post",
                url: "/Home/UpdateStudent",
                datatype: "json",
                data: JSON.stringify($scope.student)
            }).then(function (response) {
                $scope.GetAllStudents();
                $scope.SName = "";
                $scope.SAge = "";
                $scope.SDepartment = "";
                $("#insert").val("Add");
                alertify.success('Cập nhật thành công !!!');
            }, function () {
                alertify.error('Lỗi !!!');
            });
        }
    }

    $scope.UpdateStudent = function (item) {
        $scope.SId = item.Id;
        $scope.SName = item.Name;
        $scope.SAge = item.Age;
        $scope.SDepartment = item.Department;
        $("#insert").val("Save");
    }

    $scope.DeleteStudent = function (item) {
        alertify.confirm("Thông báo","Bạn có muốn xóa không ???",
            function () {
                $http({
                    method: "get",
                    url: "/Home/DeleteStudent/" + item.Id,
                }).then(function (response) {
                    $scope.GetAllStudents();
                    alertify.success('Xóa thành công !!!');
                }, function () {
                    alertify.error('Lỗi !!!');
                });
            },
            function () {
                alertify.error('Đã hủy');
            });
    }
});