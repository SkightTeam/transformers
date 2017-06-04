import rn from 'random-number';
import {transformerNames} from './names';

const attrRNGOptions = {
    min:  0,
    max:  10,
    integer: true
};

const nameRNGOptions = {
    min:  0,
    max:  30,
    integer: true
};

const typeRNGOptions = {
    min:  0,
    max:  1,
    integer: true
};

const faction = ['Autobot', 'Decepticon'];

const _getAttributes = () => {
    const team = faction[rn(typeRNGOptions)];
    const name = transformerNames[team][rn(nameRNGOptions)];
    return {
        type: team,
        strength: rn(attrRNGOptions),
        intelligence: rn(attrRNGOptions),
        speed: rn(attrRNGOptions),
        endurance: rn(attrRNGOptions),
        rank: rn(attrRNGOptions),
        courage: rn(attrRNGOptions),
        firepower: rn(attrRNGOptions),
        skill: rn(attrRNGOptions),
        name
    };
};

const overallRatingBlackList = ['type', 'rank', 'courage', 'skill', 'name'];

const getOverallRating = transformer => {

    const transformerkeys = Object.keys(transformer);
    const filteredTranformerKeys = transformerkeys.filter((key) => overallRatingBlackList.indexOf(key) === -1);
    const overallRatingValues = filteredTranformerKeys.map((key) => transformer[key]);
    const overallRating = overallRatingValues.reduce((prev, curr) => {
        return prev + curr;
    }, 0);

    transformer.overallrating = overallRating;
    return transformer;
};

const calculateOverallRating = (transformers) => {
    return transformers.map(transformer => getOverallRating(transformer));

};

const courageStrengthCase = (transformer1, transformer2) => {
    if (
      Number(transformer1.courage) - Number(transformer2.courage) <= -4 &&
      Number(transformer1.strength) - Number(transformer2.strength) <= -3
    ) {
        return true;
    }
    return false;
};

const skillCase = (transformer1, transformer2) => {
    if (Number(transformer1.skill) - Number(transformer2.skill) >= 3) {
        return true;
    }
    return false;
};

const overallRatingCase = (transformer1, transformer2) => {
    if (Number(transformer1.overallrating) > Number(transformer2.overallrating)) {
        return true;
    }
    return false;
};

export const _battle = (decepticons, autobots) => {
    const battleResult = {
        battles: 0,
        winningTeam: [],
        winningTeamName: '',
        loosingTeamName: '',
        loosingTeam: [],
        survivors: [],
        autobots: [],
        decepticons: [],
        bossVsBoss: false
    };

    let longestArray = autobots;

    if (decepticons.length > autobots.length) {
        longestArray = decepticons;
    }

    longestArray.forEach((transformer, index) => {
        const decepticon = decepticons[index];
        const autobot = autobots[index];

        if (decepticon && autobot) {

            // If Predaking and Optimus meet in battle, it's gg game over all tranformers have been obliterated.
            if (decepticon.name === 'Predaking' && autobot.name === 'Optimus Prime') {
                console.log('Predaking VS Optimus Prime happend');

                battleResult.battles = 1;
                battleResult.bossVsBoss = true;

            } else if (decepticon.name === 'Predaking' && autobot.name !== 'Optimus Prime') {
                // Predaking wins
                battleResult.battles += 1;
                battleResult.decepticons.push(autobot);
            } else if (decepticon.name !== 'Predaking' && autobot.name === 'Optimus Prime') {
                // Optimus Prime wins
                battleResult.battles += 1;
                battleResult.autobots.push(autobot);
            } else {

                if (courageStrengthCase(decepticon, autobot)) {
                    // autobot wins
                    battleResult.battles += 1;
                    battleResult.autobots.push(autobot);
                } else if (courageStrengthCase(autobot, decepticon)) {
                    // decepticon wins
                    battleResult.battles += 1;
                    battleResult.decepticons.push(decepticon);
                } else if (skillCase(decepticon, autobot)) {
                    // decepticon wins
                    battleResult.battles += 1;
                    battleResult.decepticons.push(decepticon);
                } else if (skillCase(autobot, decepticon)) {
                    // autobot wins
                    battleResult.battles += 1;
                    battleResult.autobots.push(autobot);
                } else if (decepticon.overallrating === autobot.overallrating) {
                    // there is a tie, both tranformers are destroyed
                    battleResult.battles += 1;
                } else if (overallRatingCase(decepticon, autobot)) {
                    // decepticon wins
                    battleResult.battles += 1;
                    battleResult.decepticons.push(decepticon);
                } else if (overallRatingCase(autobot, decepticon)) {
                    // autobot wins
                    battleResult.battles += 1;
                    battleResult.autobots.push(autobot);
                }

            }
        }

    });

    const winningTeamName = battleResult.autobots.length > battleResult.decepticons.length ? 'autobots' : 'decepticons';
    const loosingTeamName = battleResult.autobots.length < battleResult.decepticons.length ? 'autobots' : 'decepticons';
    battleResult.winningTeamName = winningTeamName;
    battleResult.loosingTeamName = loosingTeamName;
    battleResult.winningTeam = battleResult[winningTeamName].map(({name}) => ` ${name}`);
    battleResult.loosingTeam = battleResult[loosingTeamName].map(({name}) => ` ${name}`);

    return battleResult;

};

export const _createTeams = (transformers) => {
    const decepticons = transformers.filter(({type}) => type === 'Decepticon').sort((a, b) => {
        if (a.rank < b.rank)
            return 1;
        if (a.rank > b.rank)
            return -1;
        return 0;
    });
    const autobots = transformers.filter(({type}) => type === 'Autobot').sort((a, b) => {
        if (a.rank < b.rank)
            return 1;
        if (a.rank > b.rank)
            return -1;
        return 0;
    });
    return {decepticons, autobots};
};

export const _generateTransformers = (numberOfTransformers) => {
    const transformers = [];
    for (let i = 0; i < numberOfTransformers; i += 1) {
        transformers.push(_getAttributes());
    }

    return calculateOverallRating(transformers);
};
