'use strict';

angular.module('mvsouza.angular-rrssb', []).directive('rrssb', function () {
  return {
    scope: {},
    restrict: 'AE',
    templateUrl: 'angular-rrssb.html',
    replace: true,
    link: function ($scope, element, attr) {
      var customUrls = $scope.$eval(attr.ngCustomUrls) || {};
      var urlToShare = attr.ngShareLink;
      $scope.shareMidias = attr.ngShareMidias;
      $scope.showAll = false || attr.ngShareAll;
      $scope.shoulShow = function (socialNetworkName) {
        return ($scope.shareMidias && $scope.shareMidias.indexOf(socialNetworkName)>-1) || $scope.showAll;
      };
      $scope.pinterestImg = attr.ngPinterestImg;
      if(attr.ngGithubProject)$scope.githubProject = attr.ngGithubProject;
      var title = attr.ngShareTitle || ""; 
      var encode = function (text) {
        return encodeURIComponent(text);
      };
      $scope.mediasAvailable = {
        'facebook': (customUrls.facebook || 'https://www.facebook.com/sharer/sharer.php?u='+urlToShare),
        'pinterest': (customUrls.pinterest || 'http://pinterest.com/pin/create/button/?url='+urlToShare+'&amp;media'+$scope.pinterestImg+'&amp;description'+encode(title)+'.'),
        'pocket': (customUrls.pocket || 'https://getpocket.com/save?url'+urlToShare),
        'github': (customUrls.github || $scope.githubProject),
        'youtube': (customUrls.youtube || '#'),
        'googleplus': (customUrls.googleplus || 'https://plus.google.com/share?url'+encode(title)+'%2'+urlToShare),
        'reddit': (customUrls.reddit || 'http://www.reddit.com/submit?url'+urlToShare),
        'twitter': (customUrls.twitter || 'http://twitter.com/home?status'+encode(title)+'%20%0'+urlToShare),
        'linkedin': (customUrls.linkedin || 'http://www.linkedin.com/shareArticle?mini=true&amp;url'+urlToShare+'&amp;title'+encode(title)+'&amp;summary'+encode(title)),
        'tumblr': (customUrls.tumblr || 'http://tumblr.com/share?s=&amp;v=3&t'+encode(title)+'&amp;u'+encode(urlToShare)),
        'email': (customUrls.email || 'mailto:?subject'+encode(title)+'&amp;body'+encode(urlToShare))
      };
      $scope.$watch('$viewContentLoaded', rrssbInit);
    }
  };
});