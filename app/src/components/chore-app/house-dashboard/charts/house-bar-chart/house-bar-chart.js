import template from './house-bar-chart.html';
import Chart from 'chart.js';

export default {
    template,
    bindings: {
        house: '<'
    }, 
    controller
};

// controller.$inject = ['$element'];

function controller() {

    this.$onInit = () => {

        

        // the house target for each chore & name
        // the house target for all chores & name

        // the user total for each chore for Jan 17 & name
        // the user total for all chores for Jan 17 & name
        // let houseChores = this.house.chores.reduce((acc, curr) => {
        //     var id = curr._id;
        //     if (curr.name) {
        //         return acc[id] = curr.name;
        //     }
        //     else return null;
        // }, {});;

        this.choreTargets = this.house.chores.map(chore => {
            return chore.target;
        });
        this.sumChoreTargets = this.house.chores.reduce((acc, curr) => {
            if (curr.target) return acc += parseInt(curr.target);  
            else return acc;
        }, 0);

        this.houseCompleted = this.house.chores.map(chore => {
            if (!chore.completed) return null;
            return chore.completed['Jan 2017'];
        });

        this.sumHouseCompleted = this.house.chores.reduce((acc, curr) => {
            if (curr.completed && curr.completed['Jan 2017']) return acc += parseInt(curr.completed['Jan 2017']);  
            else return acc;
        }, 0);

        function getChoreAmounts(id, arr) {
            return arr.map(user => {
                if (user.choreUnits.length) {
                    for (var i = 0; i < user.choreUnits.length; i++) {
                        if (user.choreUnits[i]._id === id) {
                            return user.choreUnits[i].completed['Jan 2017'];
                        } else return 0;
                    }
                } else return 0;

            });
        }

        var userNames = this.house.users.map(user => user.name);
        this.houseChoreNames = this.house.chores.map(chore => chore.name);

        
        var abc =  getChoreAmounts('586eebd6c9316540c2b8da10', this.house.users);
        
        var houseBarChart = new Chart('houseBarChart', {
            type: 'bar',
            data: {
                labels: userNames,
                datasets: [{
                    label: 'Times Completed',
                    data: abc,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                    ],
                    borderColor: [
                        'rgba(255,99,132,1)',
                        'rgba(54, 162, 235, 1)',
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    
                }
            }
        });

        
    };
    
}