"use strict";
function SuperHeroCtrl($scope) {
  const ctrl = this;

  ctrl.daysUntilAvengers = () => {
    var date1 = new Date();
    var date2 = new Date("04/23/2019");
    
    var timeDiff = Math.abs(date2.getTime() - date1.getTime());

    return Math.ceil(timeDiff / (1000 * 3600 * 24)); 
  }

}
angular
  .module("App")
  .controller("SuperHeroCtrl", SuperHeroCtrl);