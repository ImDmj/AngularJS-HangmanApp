//contains structure of the app

//parameter - name of the app, dependency 
var app = angular.module("HangmanApp",[]);

//AngularJs is a MV* based libraries. So we need to define controllers. this controller is linked to the index.html. 
//we need to pass function which takes $scope as parameter. $scope - i want it to be available in the controller so pass it as the parameter t
// to the function, also i want it to be available in the index.html so pass it along with the function giving us "Dependency Injection".
// All the properties attached to the $scope will be available in index.html now eg. $scope.demo="somestring"
app.controller("GameController",['$scope','$timeout', function($scope, $timeout){

var words = ["ratle", "cat", "matter", "bat", "sat", "hat"]
$scope.incorrectGuess = [];
$scope.correctGuess = [];
$scope.guesses = 6;
$scope.displayWord = '';
$scope.input = {
	Letter :''
}

//function to select a random word from the array of words
var selectRandomWord = function(){
	var index = Math.round(Math.random()*words.length);
	return words[index];
}

// Game starts from the scratch
var newGame = function(){

	$scope.incorrectGuess = [];
	$scope.correctGuess = [];
	$scope.guesses = 6;
	$scope.displayWord = '';

	selectedWord = selectRandomWord();
	var tempDisplayWord = '';
	console.log(selectedWord);
	for (var i = 0; i < selectedWord.length; i++) {
			tempDisplayWord += '*';
		}
		console.log(tempDisplayWord);
		$scope.displayWord = tempDisplayWord;
}

$scope.letterChoosen = function(){
	for (var i = 0; i < $scope.correctGuess.length; i++) {
		if ($scope.correctGuess[i].toLowerCase() == $scope.input.letter.toLowerCase()){
			$scope.input.letter = "";
			return;
		}
	}
	for (var i = 0; i < $scope.incorrectGuess.length; i++) {
		if ($scope.incorrectGuess[i].toLowerCase() == $scope.input.letter.toLowerCase()){
			$scope.input.letter = "";
			return;
		}
	}

	var correct = false;
	for (var i = 0; i < selectedWord.length; i++) {
		if (selectedWord[i].toLowerCase() == $scope.input.letter.toLowerCase()) {
			$scope.displayWord = $scope.displayWord.slice(0,i) + $scope.input.letter.toLowerCase() + $scope.displayWord.slice(i+1);
			correct = true;
		}
	}
	if (correct) {
		$scope.correctGuess.push($scope.input.letter.toLowerCase());
	}else{
		$scope.guesses-- ;
		$scope.incorrectGuess.push($scope.input.letter.toLowerCase());
	}
	$scope.input.letter = "";
	if ($scope.guesses == 0) {
		alert("You Lost");
		$timeout(function(){
			newGame();
		},400);
	}
	if ($scope.displayWord.indexOf("*") == -1) {
		alert("You Won. Yayy!");
	}
}

newGame();
}])