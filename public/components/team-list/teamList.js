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