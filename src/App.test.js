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
        'strength': 8,
        'intelligence': 1,
        'speed': 8,
        'endurance': 10,
        'rank': 10,
        'courage': 6,
        'firepower': 0,
        'skill': 4,
        'name': 'Optimus Prime',
        'overallrating': 27
    }];

    const decepticons = [{
        'type': 'Decepticon',
        'strength': 8,
        'intelligence': 1,
        'speed': 8,
        'endurance': 10,
        'rank': 10,
        'courage': 6,
        'firepower': 0,
        'skill': 4,
        'name': 'Predaking',
        'overallrating': 27
    }];

    const battleResult = _battle(decepticons, autobots);

    expect(battleResult.bossVsBoss).toBe(true);
    expect(battleResult.battles).toEqual(1);
});



it('Should cause decepticon to flee (Autobot courage is >= 4 and Strength is >= 3)', () => {
    const autobots = [{
        'type': 'Autobot',
        'strength': 8,
        'intelligence': 1,
        'speed': 8,
        'endurance': 10,
        'rank': 10,
        'courage': 10,
        'firepower': 0,
        'skill': 4,
        'name': 'Landwhip',
        'overallrating': 2
    }];

    const decepticons = [{
        'type': 'Decepticon',
        'strength': 2,
        'intelligence': 1,
        'speed': 8,
        'endurance': 10,
        'rank': 10,
        'courage': 3,
        'firepower': 0,
        'skill': 4,
        'name': 'Rumblebeast',
        'overallrating': 27
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
        'strength': 8,
        'intelligence': 1,
        'speed': 8,
        'endurance': 10,
        'rank': 10,
        'courage': 10,
        'firepower': 0,
        'skill': 4,
        'name': 'Landwhip',
        'overallrating': 2
    }];

    const decepticons = [{
        'type': 'Decepticon',
        'strength': 7,
        'intelligence': 1,
        'speed': 8,
        'endurance': 10,
        'rank': 10,
        'courage': 9,
        'firepower': 0,
        'skill': 4,
        'name': 'Rumblebeast',
        'overallrating': 27
    }];

    const battleResult = _battle(decepticons, autobots);

    expect(battleResult.winningTeam[0]).toEqual(' Rumblebeast');
    expect(battleResult.winningTeamName).toEqual('decepticons');
    expect(battleResult.loosingTeamName).toEqual('autobots');
    expect(battleResult.battles).toEqual(1);
});