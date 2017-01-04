routes.$inject = ['$stateProvider', '$urlRouterProvider'];

export default function routes($stateProvider, $urlRouterProvider) {
    $stateProvider.state({
        name: 'home',
        url: '/',
        component: 'welcome',
        data: {
            public: true
        }
    });
    
    $stateProvider.state({
        name: 'userDashboard',
        url: '/user',
        component: 'userDashboard',
        resolve: {

            user: ['userService', User => {
                return User.get().$promise;
            }],

            //TODO: get this working
            house: ['user', 'houseService', '$transition$', (user, House) => {
                console.log(user);
                return House.get(user.houseId);
            }]
        }
    });

    $stateProvider.state({
        name: 'houseDashboard',
        url: '/house/',
        component: 'houseDashboard',
        resolve: {
            user: ['userService', User => {
                return User.get().$promise;
            }],
            id: ['user', user => {
                console.log(user);
                return user.houseId;
            }],
            house: ['id', 'houseService', (id, House) => {
                console.log(id);
                return House.get(id);
            }]
        }//,
        // data: {
        //     public: true
        // }
    });
    // .state({
    //     name: 'houseDashboard.choreInput',
    //     url: '/enterchore',
    //     component: ''
    // })

    $urlRouterProvider.otherwise('/');
}