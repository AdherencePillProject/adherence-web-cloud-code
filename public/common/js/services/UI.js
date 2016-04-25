angular
  .module('app')
  .factory('UI', ['$route', '$routeParams', '$location',  function ($route, $routeParams, $location) {
    var UI = {};

    UI.home = home;
    UI.redirect = redirect;
    UI.reload = reload;

    function home() {
        $location.path('/').replace();
    }

    function redirect(path) {
        $location.path(path).replace();      
    }

    function reload() {
      $route.reload();
    }

    return UI;
}]);
