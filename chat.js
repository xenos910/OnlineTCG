var app = angular.module('MyApp', []);

function submitMessage() {
        $scope.MyChat.push($scope.name);
        $scope.name ="";
}

app.controller('MyController', ['$scope', function($scope) {
      $scope.example = {
        text: 'guest',
        word: /^\s*\w*\s*$/
      };
          $scope.username = "Steve";
          $scope.name = "";
          $scope.MyChat = [];
          $scope.MyChat.push({username:'Admin', message:'Hello, new user! Type in a username and start chatting!'});
    }]);

