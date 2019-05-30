"use strict";function SuperHeroCtrl(e){this.daysUntilAvengers=(()=>{var e=new Date,o=new Date("04/23/2019"),n=Math.abs(o.getTime()-e.getTime());return Math.ceil(n/864e5)})}function HeroService(e,o){const n=this;n.heroes=[],n.villians=[],n.people=[],n.heroTotals=0,n.villianTotals=0,n.heroes.push({name:"Thor",type:"hero",power:90}),n.people=[{name:"Thor",type:"hero",power:90},{name:"Loki",type:"both",power:50},{name:"Thanos",type:"villian",power:99},{name:"Iron Man",type:"hero",power:85},{name:"Spider-Man",type:"hero",power:80},{name:"Hawkeye",type:"hero",power:60},{name:"Hela",type:"villian",power:95},{name:"Ultron",type:"villian",power:85}],n.updateTotals=(()=>{n.heroTotals=n.getTotalByType("heroes"),n.villianTotals=n.getTotalByType("villians")}),n.isOnTeam=(e=>{console.log(e);var o=e.name,t=!1;return 3!==e.type_id&&1!==e.type_id||(console.log("searching both"),n.villians.forEach(e=>{console.log(e),e.name===o&&(t="villians")})),(2===e.type_id||3===e.type_id&&!t)&&n.heroes.forEach(e=>{e.name===o&&(t="heroes")}),t}),n.getTeamWithLeastPower=(()=>{let e=n.getTotalByType("heroes");return n.getGrandTotal()-e>e?"heroes":"villians"}),n.daysUntilAvengers=(()=>{var e=new Date,o=new Date("04/23/2019"),n=Math.abs(o.getTime()-e.getTime());return Math.ceil(n/864e5)}),n.getTotalByType=(e=>{let o=0;return n[e].forEach(e=>{o+=e.power,console.log(o)}),o}),n.getGrandTotal=(()=>{let e=0;return["heroes","villians"].forEach(o=>{n[o].forEach(o=>{e+=o.power})}),e}),n.getPeople=(()=>e.get("/avengers")),n.getHeroes=(()=>e.get("/avengers?type=2")),n.getVillians=(()=>e.get("/avengers?type=3")),n.getTypes=(()=>o((o,t)=>{n.types?o(n.types):e.get("/avengers/types").then(e=>{let t=e.data;n.types=[],t.forEach(e=>{n.types[e.id]=e}),console.log(n.types),o(n.types)})})),n.addToRoster=(o=>{console.log(n.people),console.log(o),"villian"===o.type&&(o.type_id=1),"hero"===o.type&&(o.type_id=2),"both"===o.type&&(o.type_id=3),e.post("/avengers",o).then(e=>{console.log(e)})}),n.addHero=(e=>{console.log("Adding to hero list...",e),1===e.type_id||3===e.type_id&&"villians"===n.getTeamWithLeastPower()?n.villians.push(angular.copy(e)):n.heroes.push(angular.copy(e)),n.updateTotals()}),n.removeHero=(e=>{let o=e.name;"villians"===n.isOnTeam(e)&&n.villians.forEach((e,t)=>{o===e.name&&n.villians.splice(t,1)}),"heroes"===n.isOnTeam(e)&&n.heroes.forEach((e,t)=>{o===e.name&&n.heroes.splice(t,1)}),n.updateTotals()}),n.updateTotals()}function HeroRoster(e){const o=this;e.getTypes().then(e=>{o.types=e}),o.addHero=(e=>{console.log("adding hero...",e,o.addToTeam),console.log(o.addToTeam()),o.addToTeam()(e)}),o.removeHero=(e=>{o.removeFromTeam()(e)}),o.getIsOnTeam=(e=>o.isOnTeam()(e))}function AddHeroForm(e){this.person={name:"",type:"",power:0},this.addPerson=(o=>{e.addToRoster(o)})}function TeamList(e){}angular.module("App",[]),angular.module("App").controller("SuperHeroCtrl",SuperHeroCtrl),angular.module("App").service("HeroService",HeroService),angular.module("App").component("heroList",{templateUrl:"components/hero-list/hero-list.html",controller:function(e){let o=this;o.isOnTeam=e.isOnTeam,o.getGrandTotal=e.getGrandTotal,o.getTeamWithLeastPower=e.getTeamWithLeastPower,o.getTotalByType=e.getTotalByType,o.addHero=(n=>{console.log("in add hero"),e.addHero(n),console.log(e.heroes),o.heroes=e.heroes,o.villians=e.villians}),o.removeHero=(n=>{e.removeHero(n),o.heroes=e.heroes,o.villians=e.villians}),o.getPeople=(()=>{e.getPeople().then(e=>{o.people=e.data,console.log(o.heroes)}),o.heroes=e.heroes,o.villians=e.villians}),o.getPeople()}}),angular.module("App").component("heroRoster",{template:'\n    <main id="heroes">\n        <section ng-class="{ \'hero\': person.type_id === 2, \'villian\': person.type_id === 1, \'both\': person.type_id === 3 }" ng-repeat="person in $ctrl.people | filter : $ctrl.filterName | orderBy: [\'power\', \'-name\' ]">\n            <h2> {{ person.name }} ({{person.power}})</h2>\n            <h3>Type: {{ person.type }}</h3>\n            <button ng-if="$ctrl.getIsOnTeam(person)" ng-click="$ctrl.removeHero(person);">Remove From Team</button>\n            <button ng-if="!$ctrl.getIsOnTeam(person)" ng-click="$ctrl.addHero(person);">Add To Team</button>\n        </section>  \n    </main>\n    ',controller:HeroRoster,bindings:{people:"<",addToTeam:"&",removeFromTeam:"&",isOnTeam:"&",filterName:"<"}}),angular.module("App").component("addHeroForm",{template:'\n        <section id="add-custom">\n        <h2>Add a Superhero</h2>\n            <form ng-submit="$ctrl.addPerson($ctrl.person);">\n                <p>\n                    <label>\n                        Superhero Name\n                        <input type="text" ng-model="$ctrl.person.name">\n                    </label>\n                </p>\n\n                <p>\n                    <label>\n                        Hero or Villian\n                        <select ng-init="$ctrl.person.type = \'hero\'" ng-model="$ctrl.person.type">\n                            <option value="hero"> Hero </option>\n                            <option value="villian"> Villian </option>\n                            <option value="both"> Both </option>\n                        </select>\n                    </label>\n                </p>\n\n                <p>\n                    <label>\n                        Power\n                        <input type="number" ng-model="$ctrl.person.power">\n                    </label>            \n                </p>\n            <button>Add Person</button>\n            </form>\n        </section>\n    ',controller:AddHeroForm}),angular.module("App").component("teamList",{template:'\n    <section class="team" ng-class="$ctrl.type">\n        <h2> {{ $ctrl.type === \'heroes\' ? \'Heroes\' : \'Villians\' }} </h2>\n        <h3> Total: <span class="total"> {{$ctrl.total}} </span> </h3>\n        <ul>\n            <li ng-repeat="hero in $ctrl.people"> {{hero.name}} ({{hero.power}}) </li>\n        </ul>\n    </section>  \n    ',controller:TeamList,bindings:{people:"<",type:"@",total:"<"}});