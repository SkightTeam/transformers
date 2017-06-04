import { _battle } from './code';

import App from './App';
import React from 'react';
import ReactDOM from 'react-dom';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
});

it('Should correctly set bossVsBoss flag to true when Optimus and Predaking fight', () => {
    const autobots = [{
        'type': 'Autobot',
        'strength': 0,
        'intelligence': 0,
        'speed': 0,
        'endurance': 0,
        'rank': 0,
        'courage': 0,
        'firepower': 0,
        'skill': 0,
        'name': 'Optimus Prime',
        'overallrating': 0
    }];

    const decepticons = [{
        'type': 'Decepticon',
        'strength': 0,
        'intelligence': 0,
        'speed': 0,
        'endurance': 0,
        'rank': 0,
        'courage': 0,
        'firepower': 0,
        'skill': 0,
        'name': 'Predaking',
        'overallrating': 0
    }];

    const battleResult = _battle(decepticons, autobots);

    expect(battleResult).toEqual({ 
      battles: 1,
      winningTeam: [],
      winningTeamName: null,
      loosingTeamName: null,
      loosingTeam: [],
      survivors: [],
      autobots: [],
      decepticons: [],
      bossVsBoss: true 
    });
});



it('Should cause decepticon to flee based on  courage and strength', () => {
    const autobots = [{
        'type': 'Autobot',
        'strength': 8,
        'intelligence': 0,
        'speed': 0,
        'endurance': 10,
        'rank': 0,
        'courage': 7,
        'firepower': 0,
        'skill': 0,
        'name': 'Landwhip',
        'overallrating': 0
    }];

    const decepticons = [{
        'type': 'Decepticon',
        'strength': 2,
        'intelligence': 0,
        'speed': 0,
        'endurance': 10,
        'rank': 0,
        'courage': 3,
        'firepower': 0,
        'skill': 0,
        'name': 'Rumblebeast',
        'overallrating': 0
    }];

    const battleResult = _battle(decepticons, autobots);

    expect(battleResult).toEqual({
      battles: 1,
      winningTeam: [ ' Landwhip' ],
      winningTeamName: 'autobots',
      loosingTeamName: 'decepticons',
      loosingTeam: [],
      survivors: [],
      autobots: 
       [ { type: 'Autobot',
           strength: 8,
           intelligence: 0,
           speed: 0,
           endurance: 10,
           rank: 0,
           courage: 7,
           firepower: 0,
           skill: 0,
           name: 'Landwhip',
           overallrating: 0 } ],
      decepticons: [],
      bossVsBoss: false 
    });
});

it('Should cause autobot to flee (Decepticon Overall Rating is higher)', () => {
    const autobots = [{
        'type': 'Autobot',
        'strength': 0,
        'intelligence': 0,
        'speed': 0,
        'endurance': 0,
        'rank': 0,
        'courage': 0,
        'firepower': 0,
        'skill': 0,
        'name': 'Landwhip',
        'overallrating': 2
    }];

    const decepticons = [{
        'type': 'Decepticon',
        'strength': 0,
        'intelligence': 0,
        'speed': 0,
        'endurance': 0,
        'rank': 0,
        'courage': 0,
        'firepower': 0,
        'skill': 0,
        'name': 'Rumblebeast',
        'overallrating': 27
    }];

    const battleResult = _battle(decepticons, autobots);
    //console.log(battleResult);

    expect(battleResult).toEqual({ 
      battles: 1,
      winningTeam: [ ' Rumblebeast' ],
      winningTeamName: 'decepticons',
      loosingTeamName: 'autobots',
      loosingTeam: [],
      survivors: [],
      autobots: [],
      decepticons: 
       [ { type: 'Decepticon',
           strength: 0,
           intelligence: 0,
           speed: 0,
           endurance: 0,
           rank: 0,
           courage: 0,
           firepower: 0,
           skill: 0,
           name: 'Rumblebeast',
           overallrating: 27 } ],
      bossVsBoss: false 
    });
});