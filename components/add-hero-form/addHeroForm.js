function AddHeroForm() {
    const ctrl = this;

    ctrl.addPerson = (person) => {
        // Call parent to add to team
        ctrl.addToRoster()(person);
    }
}
        
angular
.module('App')
.component('addHeroForm', {
    template: `
        <section id="add-custom">
            <form ng-submit="$ctrl.addPerson(person);">
                <p>
                    <label>
                        Superhero Name
                        <input type="text" ng-model="person.name">
                    </label>
                </p>

                <p>
                    <label>
                        Hero or Villian
                        <select ng-init="person.type = 'hero'" ng-model="person.type">
                            <option value="hero"> Hero </option>
                            <option value="villian"> Villian </option>
                            <option value="both"> Both </option>
                        </select>
                    </label>
                </p>

                <p>
                    <label>
                        Power
                        <input type="number" ng-model="person.power">
                    </label>            
                </p>
            <button>Add Person</button>
            </form>
        </section>
    `, // or use templateUrl
    controller: AddHeroForm,
    bindings: {
        addToRoster: '&'
    }
});