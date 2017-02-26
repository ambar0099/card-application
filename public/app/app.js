var app = angular.module('cardApp', []);

app.config(function() {

})




app.directive('cardDetails', function() {
    return {
        restrict: 'E',
        scope: {
            data: '='
        },
        templateUrl: 'html/cardDetails.html',
        link: function(scope, element) {
            $('#empDetails').modal('show');
        }
    }

});


app.directive('addCard', function() {
    return {
        restrict: 'E',
        scope: {
            data: '='
        },
        templateUrl: 'html/addCard.html',
        link: function(scope, element) {
            $('#addCard').modal('show');
            
            scope.saveChanges = function() {
                var cardObj = { title: scope.cardDetails.empName, designation: scope.cardDetails.desig, project: scope.cardDetails.proj, extraInfo: { 'Joining Date': scope.cardDetails.doj, 'Blood Group': scope.cardDetails.bGrp, 'Employee Id': scope.cardDetails.empId }, desc: scope.cardDetails.empDesc, link: scope.cardDetails.profileLink };
                scope.$emit('addCard', { data: cardObj });
                $('#addCard').modal('hide');
                scope.cardDetails = null;
            }
        }
    }

});

app.directive('cardComponent', function($compile) {
    return {
        restrict: 'E',
        scope: {
            carddata: '='
        },
        templateUrl: 'html/cardComponent.html',
        link: function(scope, element) {

            scope.$on('addCard', function(event, data) {
                scope.carddata.push(data.data);
            })

            scope.addCard = function() {
                var elem = $compile('<add-Card data="data1"></add-Card>')(scope);
                element.append(elem);
            }

            scope.openCard = function(i) {
                scope.dataToOpen = scope.carddata[i];
                var elem = $compile('<card-Details data="dataToOpen"></card-Details>')(scope);
                element.append(elem);
            }
        }
    }

});




app.controller("cardController", function($scope, $rootScope) {

    $scope.cardsObject = [
        { title: 'John Davis', project: 'Device Manager', designation: 'Software Engineer', extraInfo: { 'Joining Date': '20 Jan 2009', 'Blood Group': 'B+', 'Employee Id': 300211 }, desc: 'John is working on front-end technologies such as angularJS,javascript,html and css.', link: 'Link to his bio' },
        { title: 'James Martin', project: 'Device Manager', designation: 'Senior Software Engineer', extraInfo: { 'Joining Date': '20 Jan 2009', 'Blood Group': 'AB-', 'Employee Id': 300219 }, desc: 'James is working on .Net technologies such as c#,f#.', link: 'Link to his bio' },
        { title: 'Joshua Springsteen', project: 'Device Manager', designation: 'Software Engineer', extraInfo: { 'Joining Date': '20 Jan 2009', 'Blood Group': 'AB+', 'Employee Id': 300210 }, desc: 'Joshua is working on database technologies such as oracle,sql,mysql and cassandra.', link: 'Link to his bio' },
        { title: 'Estefen Gloria', project: 'Device Manager', designation: 'Delivery Engineer', extraInfo: { 'Joining Date': '20 Jan 2009', 'Blood Group': 'O+', 'Employee Id': 300214 }, desc: 'Estefen is working as a delivery manager with products and servies team.', link: 'Link to his bio' }
    ];

});
