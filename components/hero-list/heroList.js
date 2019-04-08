function HeroList() {
    const ctrl = this;
    
    ctrl.heroes = [];
    ctrl.villians = [];
    ctrl.people = [];

    ctrl.heroTotals = 0;
    ctrl.villianTotals = 0;

    
    ctrl.$onInit = () => {
        // Simulating external data source
        ctrl.heroes.push({
            name: 'Thor',
            type: 'hero',
            power: 90
        });
        
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
            }];

            ctrl.updateTotals();
        };

    ctrl.updateTotals = () => {
        ctrl.heroTotals = ctrl.getTotalByType('heroes');
        ctrl.villianTotals = ctrl.getTotalByType('villians');
    }
        
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
        console.log('Adding to hero list...', person);

        if ( 
            person.type === 'villian' || 
            (person.type === 'both' && ctrl.getTeamWithLeastPower() === 'villians')
            ) {
                ctrl.villians.push(angular.copy(person));
            } else {
                ctrl.heroes.push(angular.copy(person));  
            }
        
        ctrl.updateTotals();
            console.log(ctrl.totals);
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

        ctrl.updateTotals();
    };
}
        

angular
.module('App')
.component('heroList', {
    template: `
    <section>
        <add-hero-form
            add-to-roster="$ctrl.addPerson"
        ></add-hero-form>

        <!-- This is really cool-->
        <section>
            <h2>Filter the list</h2>
            <h3> Filter by name, type, or power. </h3>
            <input type="text" ng-model="$ctrl.filterName">
        </section>

        <h2> Add or Remove Heroes and Villians from Your Teams </h2>
        <h3> If a person can be a hero or villian, he or she will join the <span ng-bind="$ctrl.getTeamWithLeastPower()"></span></h3>

        <hero-roster 
            people="$ctrl.people"
            is-on-team="$ctrl.isOnTeam" 
            add-to-team="$ctrl.addHero"
            remove-from-team="$ctrl.removeHero"
            filter-name="$ctrl.filterName"
        >
        </hero-roster>

        <p> Score: <progress value="{{$ctrl.getTotalByType('heroes')}}" max="{{$ctrl.getGrandTotal()}}">{{ ($ctrl.getGrandTotal() - $ctrl.getTotalByType('villians')) / $ctrl.getGrandTotal() * 100 | number:0 }}%</progress> </p>
        <p> Heroes are <strong>{{ $ctrl.getTeamWithLeastPower() === 'heroes' ? 'losing :(' : 'winning!' }}</strong> </p>

        <team-list 
            people="$ctrl.heroes"
            type="heroes"
            total="$ctrl.heroTotals"
        ></team-list>

        <team-list 
            people="$ctrl.villians"
            type="villians"
            total="$ctrl.villianTotals"
        ></team-list>
    </section>
    `, // or use templateUrl
    controller: HeroList
});