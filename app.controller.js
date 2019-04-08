"use strict";
function SuperHeroCtrl($scope) {
  const ctrl = this;

  ctrl.heroes = [
    {
      name: 'Thor',
      type: 'hero',
      power: 90
    }
  ];
  ctrl.villians = [];

  // Initialize with some build-in heros & villians
  ctrl.people = [
    {
      name: 'Thor',
      type: 'hero',
      power: 90
    },
    {
      name: 'Loki',
      type: 'both',
      power: 50
    },
    {
      name: 'Thanos',
      type: 'villian',
      power: 99
    },
    {
      name: 'Iron Man',
      type: 'hero',
      power: 85
    },
    {
      name: 'Hela',
      type: 'villian',
      power: 95
    },
    {
      name: 'Ultron',
      type: 'villian',
      power: 85
    }
  ];

  ctrl.isOnTeam = (person) => {
    var search = person.name;


    var found = false;

    if ( person.type === 'villian' || person.type === 'both' ) {
      ctrl.villians.forEach( (villian) => {
        if ( villian.name === search )
          found = 'villians';
      }); 
    }

    if (person.type === 'hero' || ( person.type === 'both' && !found ) ) {
      ctrl.heroes.forEach( (hero) => {
        if ( hero.name === search )
          found = 'heroes';
      });
    }

    return found;
  }

  ctrl.getTeamWithLeastPower = () => {
    let heroPoints = ctrl.getTotalByType('heroes');
    let grandTotal = ctrl.getGrandTotal();

    return (grandTotal - heroPoints) > heroPoints ? 'heroes' : 'villians';  
  }

  ctrl.daysUntilAvengers = () => {
    var date1 = new Date();
    var date2 = new Date("04/23/2019");
    
    var timeDiff = Math.abs(date2.getTime() - date1.getTime());

    return Math.ceil(timeDiff / (1000 * 3600 * 24)); 
  }

  ctrl.getTotalByType = (type) => {
    let total = 0;

    ctrl[type].forEach( (person) => {
      total += person.power;
    });

    return total;
  }

  ctrl.getGrandTotal = () => {
    let total = 0;

    ['heroes', 'villians'].forEach( (type) => {
      ctrl[type].forEach( (person) => {
        total += person.power;
      });
    })

    return total;
  }

  ctrl.addPerson = (newHero) => {    
    ctrl.people.push(angular.copy(newHero));
  };

  ctrl.addHero = (person) => {
    if ( 
      person.type === 'villian' || 
      (person.type === 'both' && ctrl.getTeamWithLeastPower() === 'villians')
    ) {
      ctrl.villians.push(angular.copy(person));
    } else {
      ctrl.heroes.push(angular.copy(person));  
    }
  };

  ctrl.removeHero = (person) => {
    let search = person.name;

    if ( ctrl.isOnTeam(person) === 'villians' ) {
      ctrl.villians.forEach( (villian,index) => {
        if ( search === villian.name ) {
          ctrl.villians.splice(index, 1);
        }
      });
    } 
    
    if ( ctrl.isOnTeam(person) === 'heroes' ) {
      ctrl.heroes.forEach( (hero, index) => {
        if ( search === hero.name ) {
          ctrl.heroes.splice(index, 1);
        }
      });
    }
  };
}
angular
  .module("App")
  .controller("SuperHeroCtrl", ['$http',SuperHeroCtrl]);