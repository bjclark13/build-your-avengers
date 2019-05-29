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