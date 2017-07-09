var matchControllers = angular.module("matchControllers", []);

matchControllers.controller("ListController", [ '$http', '$q', function($http, $q){    
    var main =this;
    main.loadAllData =  function(){
   // main.tmpResult =[];
    
        /* Define vraible  */
 
        var first  = $http.get("2015-2016.json.txt"),
            second = $http.get("2016-2017.json.txt");

        $q.all([first, second]).then(function(result) {
          // console.log(result);
           main.tmpResult =[];   
  angular.forEach(result, function(responsedata) {  
   
      main.tmp=responsedata.data;
      main.tmpResult.push(main.tmp);
 
  });
 console.log(main.tmpResult);
  /*return tmp;*/
   
})
   
        
    }
    
 

		}]
);
/*--- match details page on click on coutry page  */

 matchControllers.controller("DetailsController", ['$http', '$q', '$routeParams',function( $http, $q, $routeParams){ 
//     define the context
     var main =this;
     
     

    main.loadOneMatchData = function(){
    main.yearId = $routeParams.yearId;
    main.roundsId = $routeParams.roundsId;
    main.matchId = $routeParams.matchId;   

    var first  = $http.get("2015-2016.json.txt"),
        second = $http.get("2016-2017.json.txt");

    $q.all([first, second]).then(function(result) {
    main.matchData = [];
    main.mainData = result[main.yearId].data.rounds[main.roundsId].matches[main.matchId] ;
    console.log(main.mainData.date );

    }); 
     }

    }]);

 
/* ------------  Team by details   -----------------------  */


matchControllers.controller("teamDetailsController", ['$http','$q', '$routeParams', function($http, $q, $routeParams){
    // define 
    var main = this;
    main.loadOneTeamData=function() {
//                    main.allMatchDatas = [];

        // route param define team name
         main.teamId = $routeParams.teamId;
       
         var first  = $http.get("2015-2016.json.txt"),
             second = $http.get("2016-2017.json.txt");
        $q.all([first, second]).then(function(result){
 /*total match palyed*/         var count = 0;
 /*total Win match palyed*/     var winMatchCount = 0;            
 /*total Loss match palyed*/    var losMatchCount = 0; 
/*total Loss match palyed*/     var drawMatchCount = 0;  
/*Toal Goal Match */            var goalMatch=0;          
            
            angular.forEach(result, function(matchData){
             main.matchData1 = matchData.data.rounds
             angular.forEach(main.matchData1, function(allMatchData){
               angular.forEach(allMatchData.matches, function(value){
                   // taotal match palyed
                 if(value.team1.name===  main.teamId ||  value.team2.name=== main.teamId){
                     count++;
                 }
                 document.getElementById("totalMatch").innerText= count;
            // Total win matched
                   if(value.team1.name === main.teamId && value.score1 >  value.score2 || value.team2.name === main.teamId && value.score2 > value.score1 ){
                       winMatchCount++;
                   }
                   document.getElementById("winMatch").innerText=winMatchCount;
               
 // Total loss Match
                   if(value.team1.name === main.teamId && value.score1 < value.score2 || value.team2.name === main.teamId && value.score2 < value.score1){
                       losMatchCount++;
                   }
                       document.getElementById("lossMatch").innerText=losMatchCount;
// Total Draw Match
                   if(value.team1.name=== main.teamId && value.score1 == value.score2 || value.team2.name === main.teamId && value.score2 == value.score1){
                       drawMatchCount++;
                   }
                   document.getElementById("drawMatch").innerText=drawMatchCount;
                 // Total goal of matches  
                   if(value.team1.name === main.teamId){
                       goalMatch += value.score1;
                   }
                   if(value.team2.name === main.teamId){
                       goalMatch += value.score2;
                   }
                   document.getElementById("totalGoalMatch").innerText=goalMatch;
             });
            
        });
            })
            });
    }
    
}]);
 
    
