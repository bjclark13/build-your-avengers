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