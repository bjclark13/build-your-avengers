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