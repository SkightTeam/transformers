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

    expect(battleResult.bossVsBoss).toBe(true);
    expect(battleResult.battles).toEqual(1);
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

    expect(battleResult.winningTeam[0]).toEqual(' Landwhip');
    expect(battleResult.winningTeamName).toEqual('autobots');
    expect(battleResult.loosingTeamName).toEqual('decepticons');
    expect(battleResult.battles).toEqual(1);
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

    expect(battleResult.winningTeam[0]).toEqual(' Rumblebeast');
    expect(battleResult.winningTeamName).toEqual('decepticons');
    expect(battleResult.loosingTeamName).toEqual('autobots');
    expect(battleResult.battles).toEqual(1);
});