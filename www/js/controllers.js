angular.module('starter.controllers', [])

.controller('ChatsCtrl', function($scope, Chats) {
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  }
})

.controller( 'TimersCtrl', function ( $scope, $stateParams, Timers ) {
  $scope.timers = Timers.all();

  $scope.delete = function ( timer, $event ) {
    $event.preventDefault();
    Timers.remove( timer );
  }
} )

.controller( 'TimerDetailCtrl', function ( $scope, $stateParams, Timers ) {
  $scope.timer = Timers.get( $stateParams.timerId );
  // 타이머 시작 상태를 false로 초기화
  $scope.timer.isRunning = false;

} )

.controller( 'RegisterCtrl', function ( $scope, $state, $stateParams, Timers ) {
  $scope.timer = {};

  $scope.register = function () {
    Timers.add( $scope.timer );
    $state.go( 'tab.list' );
  }
} )

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('FriendsCtrl', function($scope, Friends) {
  $scope.friends = Friends.all();
})

.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
