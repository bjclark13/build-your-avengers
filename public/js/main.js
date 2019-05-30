"use strict";
// getter syntax
angular.module("App", []);//
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
function HeroService($http, $q) {
    const service = this;
    
    service.heroes = [];
    service.villians = [];
    service.people = [];

    service.heroTotals = 0;
    service.villianTotals = 0;
    
    // Simulating external data source
    service.heroes.push({
        name: 'Thor',
        type: 'hero',
        power: 90
    });
    
    service.people = [      
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
            name: 'Spider-Man',
            type: 'hero',
            power: 80               
        },
        {
            name: 'Hawkeye',
            type: 'hero',
            power: 60               
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
    }];

    service.updateTotals = () => {
        service.heroTotals = service.getTotalByType('heroes');
        service.villianTotals = service.getTotalByType('villians');
    }
        
    service.isOnTeam = (person) => {
    

        console.log(person);

        var search = person.name;
        
        var found = false;
        
        if ( person.type_id === 3 || person.type_id === 1 ) {
            console.log('searching both')
            service.villians.forEach( (villian) => {
                console.log(villian);
                if ( villian.name === search )
                    found = 'villians';
            }); 
        }
        
        if (person.type_id === 2 || ( person.type_id === 3 && !found ) ) {
            service.heroes.forEach( (hero) => {
                if ( hero.name === search )
                    found = 'heroes';
            });
        }
        
        return found;
    }
    
    service.getTeamWithLeastPower = () => {
        let heroPoints = service.getTotalByType('heroes');
        let grandTotal = service.getGrandTotal();
        
        return (grandTotal - heroPoints) > heroPoints ? 'heroes' : 'villians';  
    }
    
    service.daysUntilAvengers = () => {
        var date1 = new Date();
        var date2 = new Date("04/23/2019");
        
        var timeDiff = Math.abs(date2.getTime() - date1.getTime());
        
        return Math.ceil(timeDiff / (1000 * 3600 * 24)); 
    }
    
    service.getTotalByType = (type) => {
        let total = 0;
        
        service[type].forEach( (person) => {
            total += person.power;
            console.log(total);

        });
        
        return total;
    }
    
    service.getGrandTotal = () => {
        let total = 0;
        
        ['heroes', 'villians'].forEach( (type) => {
            service[type].forEach( (person) => {
                total += person.power;
            });
        })
        
        return total;
    }
    
    service.getPeople = () => {
        return $http.get('/avengers');
    }

    service.getHeroes = () => {
        return $http.get('/avengers?type=2');
    }

    service.getVillians = () => {
        return $http.get('/avengers?type=3');
    }

    service.getTypes = () => {
        return $q( (resolve, reject) => {
            if ( service.types ) {
                resolve(service.types);
            } else {
                $http.get('/avengers/types')
                .then( (response) => {
                    let types = response.data;
                    service.types = [];
                    types.forEach( (type) => {
                        service.types[type.id] = type;
                    });
    
                    console.log(service.types);
    
                    resolve(service.types);
                })
            }
        });
    }
    /**
     * Add to list of heroes and villians that we can 
     * pull from.
     * 
     * @param newHero  Hero to add
     */
    service.addToRoster = (newHero) => {  
        console.log(service.people);

        console.log(newHero);

        if ( newHero.type === 'villian' ) {
            newHero.type_id = 1;
        }

        if ( newHero.type === 'hero' ) {
            newHero.type_id = 2;
        }

        if ( newHero.type === 'both' ) {
            newHero.type_id = 3;
        }

        $http.post('/avengers', newHero)
        .then( (resp) => {
            console.log(resp);
        })
    };
    
    service.addHero = (person) => {
        console.log('Adding to hero list...', person);

        if ( 
            person.type_id === 1 || 
            (person.type_id === 3 && service.getTeamWithLeastPower() === 'villians')
            ) {
                service.villians.push(angular.copy(person));
            } else {
                service.heroes.push(angular.copy(person));  
            }
        
        service.updateTotals();
    };
        
    service.removeHero = (person) => {

        let search = person.name;
        
        if ( service.isOnTeam(person) === 'villians' ) {
            service.villians.forEach( (villian,index) => {
                if ( search === villian.name ) {
                    service.villians.splice(index, 1);
                }
            });
        } 
        
        if ( service.isOnTeam(person) === 'heroes' ) {
            service.heroes.forEach( (hero, index) => {
                if ( search === hero.name ) {
                    service.heroes.splice(index, 1);
                }
            });
        }

        service.updateTotals();
    };

    service.updateTotals();
}

angular.module('App')
.service('HeroService', HeroService)
angular
.module('App')
.component('heroList', {
    templateUrl: 'components/hero-list/hero-list.html', // or use templateUrl
    controller: function(HeroService) {
        let ctrl = this;

        ctrl.isOnTeam = HeroService.isOnTeam;
        ctrl.getGrandTotal = HeroService.getGrandTotal;
        ctrl.getTeamWithLeastPower = HeroService.getTeamWithLeastPower;
        ctrl.getTotalByType = HeroService.getTotalByType;
 
        ctrl.addHero = (hero) => {
            console.log('in add hero');
            HeroService.addHero(hero);

            console.log(HeroService.heroes);

            ctrl.heroes = HeroService.heroes;
            ctrl.villians = HeroService.villians;
        }

        ctrl.removeHero = (hero) => {
            HeroService.removeHero(hero);

            ctrl.heroes = HeroService.heroes;
            ctrl.villians = HeroService.villians;
            // 
        }

        ctrl.getPeople = () => {
            HeroService.getPeople().then( (response) => {
                ctrl.people = response.data;

                console.log(ctrl.heroes);
            });

            ctrl.heroes = HeroService.heroes;
            ctrl.villians = HeroService.villians;

            // HeroService.getHeroes().then( (response) => {
            //     ctrl.heroes = response.data;

            //     console.log(ctrl.heroes);
            // });

            // HeroService.getVillians().then( (response) => {
            //     ctrl.villians = response.data;

            //     console.log(ctrl.heroes);
            // });
        }

        ctrl.getPeople();
    }
});
function HeroRoster(HeroService) {
    const ctrl = this;

    HeroService.getTypes()
    .then( (types) => {
        ctrl.types = types;
    });

    ctrl.addHero = (person) => {
        console.log('adding hero...', person, ctrl.addToTeam);

        console.log(ctrl.addToTeam());
        // Call parent to add to team
        ctrl.addToTeam()(person);
    }

    ctrl.removeHero = (person) => {
        // Call parent to add to team
        ctrl.removeFromTeam()(person);
    }

    ctrl.getIsOnTeam = ( person ) => {
        return ctrl.isOnTeam()(person);
    }
}
        
angular
.module('App')
.component('heroRoster', {
    template: `
    <main id="heroes">
        <section ng-class="{ 'hero': person.type_id === 2, 'villian': person.type_id === 1, 'both': person.type_id === 3 }" ng-repeat="person in $ctrl.people | filter : $ctrl.filterName | orderBy: ['power', '-name' ]">
            <h2> {{ person.name }} ({{person.power}})</h2>
            <h3>Type: {{ person.type }}</h3>
            <button ng-if="$ctrl.getIsOnTeam(person)" ng-click="$ctrl.removeHero(person);">Remove From Team</button>
            <button ng-if="!$ctrl.getIsOnTeam(person)" ng-click="$ctrl.addHero(person);">Add To Team</button>
        </section>  
    </main>
    `, // or use templateUrl
    controller: HeroRoster,
    bindings: {
        people: '<',
        addToTeam: '&',
        removeFromTeam: '&',
        isOnTeam: '&',
        filterName: '<'
    }
});
function AddHeroForm(HeroService) {
    const ctrl = this;

    ctrl.person = {
        name: '',
        type: '',
        power: 0
    }

    ctrl.addPerson = (person) => {
        // Call parent to add to team
        HeroService.addToRoster(person);
    }
}
        
angular
.module('App')
.component('addHeroForm', {
    template: `
        <section id="add-custom">
        <h2>Add a Superhero</h2>
            <form ng-submit="$ctrl.addPerson($ctrl.person);">
                <p>
                    <label>
                        Superhero Name
                        <input type="text" ng-model="$ctrl.person.name">
                    </label>
                </p>

                <p>
                    <label>
                        Hero or Villian
                        <select ng-init="$ctrl.person.type = 'hero'" ng-model="$ctrl.person.type">
                            <option value="hero"> Hero </option>
                            <option value="villian"> Villian </option>
                            <option value="both"> Both </option>
                        </select>
                    </label>
                </p>

                <p>
                    <label>
                        Power
                        <input type="number" ng-model="$ctrl.person.power">
                    </label>            
                </p>
            <button>Add Person</button>
            </form>
        </section>
    `, // or use templateUrl
    controller: AddHeroForm,
});
function TeamList($scope) {
    const ctrl = this;
}
        
angular
.module('App')
.component('teamList', {
    template: `
    <section class="team" ng-class="$ctrl.type">
        <h2> {{ $ctrl.type === 'heroes' ? 'Heroes' : 'Villians' }} </h2>
        <h3> Total: <span class="total"> {{$ctrl.total}} </span> </h3>
        <ul>
            <li ng-repeat="hero in $ctrl.people"> {{hero.name}} ({{hero.power}}) </li>
        </ul>
    </section>  
    `, // or use templateUrl
    controller: TeamList,
    bindings: {
        people: '<',
        type: '@',
        total: '<'
    }
});