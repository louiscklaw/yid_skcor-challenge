// script.js (refactored)
//
// fix 2: refactor constants
const BASE_URL = "https://api.example.com";
const USERS_ENDPOINT = `${BASE_URL}/users`;
const BROAD_CAST_USERS_LOADED = "USERS_LOADED";
const ROLE_ADMIN = "admin";
const ERR_CONN_GET = "connectino error";
const ERR_CONN_PUT = "connectino error put";

const app = angular.module("app", []);

// userDashboardService.js
app.service(
  "UserDashboardService",
  function (
    $http,
    // fix 5: the search won't work when users is empty initially
    $rootScope,
  ) {
    // fix 3: array element(s) not always exist
    var users = [];
    // fix 2: refactor constants
    $http.get(USERS_ENDPOINT).then(
      function (response) {
        users = response.data;

        // fix 5: the search won't work when users is empty initially,
        // use observer pattern to communicate between functions
        $rootScope.$broadcast(BROAD_CAST_USERS_LOADED, users);
      },

      // fix 1: add error handling here
      function (err) {
        // NOTE: connection error here may be ?
        console.debug(ERR_CONN_GET);
      },
    );
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
        // fix 2: refactor constants
        $http.put(USERS_ENDPOINT + "/" + id, changes).then(
          function () {
            // fix 2: refactor constants
            // fix 7: error handling of put request
            $http.get(USERS_ENDPOINT).then(
              function (response) {
                users = response.data;
              },
              // fix 7: error handling of put request, 404 may be ?
              function (err) {
                console.debug(ERR_CONN_PUT);
              },
            );
          },
          // fix 7: error handling of put request, 404 may be ?
          function (err) {
            console.debug(ERR_CONN_PUT);
          },
        );
      },
      searchUsers: function (query) {
        var results = [];
        // fix 9: simplify matching mechanism
        // fix 4: possibly lacking `toLowerCase` for query for case ignoring
        const lcQuery = (q) => q.toLowerCase();

        // fix 3: array element(s) name not always exist
        const nameFound = (lc_q) => users[i].name?.toLowerCase().indexOf(lcQuery(lc_q)) > -1;
        // fix 3: array element(s) email not always exist
        const emailFound = (lc_q) => users[i].email?.toLowerCase().indexOf(lcQuery(lc_q)) > -1;

        for (var i = 0; i < users.length; i++) {
          // fix 9: simplify matching mechanism
          if (nameFound(query) || emailFound(query)) {
            results.push(users[i]);
          }
        }
        return results;
      },
    };
  },
);

// userDashboardController.js
app.controller("UserDashboardController", function ($scope, UserDashboardService) {
  // fix 2: refactor constants
  // fix 5: the search won't work when users is empty at first landing
  // use observer pattern to communicate between functions
  $scope.$on(BROAD_CAST_USERS_LOADED, function (event, data) {
    $scope.filteredUsers = UserDashboardService.searchUsers("");
  });
  $scope.onSearch = function () {
    // fix 8: optional loading incidator may be better
    $scope.searching = true;
    var query = $scope.searchQuery;
    $scope.filteredUsers = UserDashboardService.searchUsers(query);

    // fix 8: optional loading incidator may be better
    $scope.searching = false;
  };
  $scope.makeAdmin = function (user) {
    // fix 2: refactor constants
    UserDashboardService.updateUser(user.id, { role: ROLE_ADMIN });
  };
});
