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