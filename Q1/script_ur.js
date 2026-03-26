// script_ur.js (from pdf)
//

const app = angular.module("app", []);

// userDashboardService.js
angular.module("app").factory("UserDashboardService", function ($http) {
  var users = [];
  $http.get("https://api.example.com/users").then(function (response) {
    users = response.data;
  });
  return {
    getUsers: function () {
      return users;
    },
    getUser: function (id) {
      for (var i = 0; i < users.length; i++) {
        if (users[i].id == id) return users[i];
      }
    },
    updateUser: function (id, changes) {
      $http.put("https://api.example.com/users/" + id, changes);
      $http.get("https://api.example.com/users").then(function (response) {
        users = response.data;
      });
    },
    searchUsers: function (query) {
      var results = [];
      for (var i = 0; i < users.length; i++) {
        if (users[i].name.toLowerCase().indexOf(query) !== -1 || users[i].email.toLowerCase().indexOf(query) !== -1) {
          results.push(users[i]);
        }
      }
      return results;
    },
  };
});

// userDashboardController.js
angular.module("app").controller("UserDashboardController", function ($scope, UserDashboardService) {
  $scope.filteredUsers = UserDashboardService.searchUsers("");
  $scope.onSearch = function () {
    var query = $scope.searchQuery;
    $scope.filteredUsers = UserDashboardService.searchUsers(query);
  };
  $scope.makeAdmin = function (user) {
    UserDashboardService.updateUser(user.id, { role: "admin" });
  };
});
