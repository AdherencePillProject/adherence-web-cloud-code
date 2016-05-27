angular
  .module('app')
  .factory('UI', ['$route', '$routeParams', '$location', function ($route, $routeParams, $location) {
    var UI = {};

    UI.home = home;
    UI.redirect = redirect;
    UI.reload = reload;

    UI.success = success;
    UI.error = error;
    UI.info = info;

    function home() {
        $location.path('/').replace();
    }

    function redirect(path) {
        $location.path(path).replace();
    }

    function reload() {
      $route.reload();
    }

    function success(message) {
      Materialize.toast(message, 3000, 'success');
    }

    function error(title, message) {
      Materialize.toast(message, 3000, 'error');
    }

    function info(title, message) {
      Materialize.toast(message, 3000, 'info');
    }

    return UI;
}]);
