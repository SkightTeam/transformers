import rn from 'random-number';
import {transformerNames} from './names';

// Options for random attributes generation
const attrRNGOptions = {
    min:  0,
    max:  10,
    integer: true
};

// Options for random name generation
const nameRNGOptions = {
    min:  0,
    max:  30,
    integer: true
};

// Options for random team affiliation
const typeRNGOptions = {
    min:  0,
    max:  1,
    integer: true
};

const faction = ['Autobot', 'Decepticon'];
const overallRatingBlackList = ['type', 'rank', 'courage', 'skill', 'name'];

/**
 * Generates a Transformer with random stats and affiliation
 * @function _getAttributes
 */
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

/**
 * Used by calculateOverallRating() to calculate overall rating of an array of transformers
 * @function getOverallRating
 * @param {object} - transformer object
 */
const _getOverallRating = transformer => {

    const transformerkeys = Object.keys(transformer);
    const filteredTranformerKeys = transformerkeys.filter((key) => overallRatingBlackList.indexOf(key) === -1);
    const overallRatingValues = filteredTranformerKeys.map((key) => transformer[key]);
    const overallRating = overallRatingValues.reduce((prev, curr) => {
        return prev + curr;
    }, 0);

    transformer.overallrating = overallRating;
    return transformer;
};

/**
 * Calculate overall rating of an array of transformers
 * @function calculateOverallRating
 * @param {array} - transformers array
 */
const calculateOverallRating = (transformers) => {
    return transformers.map(transformer => _getOverallRating(transformer));

};

/**
 * Compares 2 transformers based on courage and strength attributes
 * @function courageStrengthCase
 * @param {object} transformer1 - 1st transformer object
 * @param {object} transformer2 - 2nd transformer object
 */
const courageStrengthCase = (transformer1, transformer2) => {
    if (
      Number(transformer1.courage) - Number(transformer2.courage) <= -4 &&
      Number(transformer1.strength) - Number(transformer2.strength) <= -3
    ) {
        return true;
    }
    return false;
};

/**
 * Compares 2 transformers based on skill attribute
 * @function skillCase
 * @param {object} transformer1 - 1st transformer object
 * @param {object} transformer2 - 2nd transformer object
 */
const skillCase = (transformer1, transformer2) => {
    if (Number(transformer1.skill) - Number(transformer2.skill) >= 3) {
        return true;
    }
    return false;
};

/**
 * Compares 2 transformers based on overallrating attribute
 * @function overallRatingCase
 * @param {object} transformer1 - 1st transformer object
 * @param {object} transformer2 - 2nd transformer object
 */
const overallRatingCase = (transformer1, transformer2) => {
    if (Number(transformer1.overallrating) > Number(transformer2.overallrating)) {
        return true;
    }
    return false;
};

/**
 * Main function to initiate the battle
 * @function _battle
 * @param {array} decepticons - decepticons array
 * @param {array} autobots - autobots array
 */
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

    let winningTeamName = null;
    let loosingTeamName = null;
    if (battleResult.autobots.length > battleResult.decepticons.length) winningTeamName = 'autobots';
    if (battleResult.autobots.length < battleResult.decepticons.length) loosingTeamName = 'autobots';
    if (battleResult.decepticons.length > battleResult.autobots.length) winningTeamName = 'decepticons';
    if (battleResult.decepticons.length < battleResult.autobots.length) loosingTeamName = 'decepticons';

    battleResult.winningTeamName = winningTeamName;
    battleResult.loosingTeamName = loosingTeamName;
    battleResult.winningTeam = (battleResult[winningTeamName] || []).map(({name}) => ` ${name}`);
    battleResult.loosingTeam = (battleResult[loosingTeamName] || []).map(({name}) => ` ${name}`);

    return battleResult;

};

/**
 * Creates autobot and decepticon teams from single generated transformers array
 * @function _createTeams
 * @param {array} transformers - transformers array
 */
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

/**
 * Creates autobot and decepticon teams from single generated transformers array
 * @function _generateTransformers
 * @param {number} numberOfTransformers - number of transformers to generate
 */
export const _generateTransformers = (numberOfTransformers) => {
    const transformers = [];
    for (let i = 0; i < numberOfTransformers; i += 1) {
        transformers.push(_getAttributes());
    }

    return calculateOverallRating(transformers);
};
