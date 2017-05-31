import rn from 'random-number';

const transformerNames = {
    Decepticon: [
        'Nightfoot',
        'Hangbird',
        'Rumblebeast',
        'Nightglitch',
        'Brakedome',
        'Flybang',
        'Savage',
        'Wallop',
        'Slide',
        'Flutter',
        'Rageback',
        'Avianblight',
        'Longpunch',
        'Aquahead',
        'Crankburn',
        'Rabid',
        'Quake',
        'Sidearm',
        'Oracle',
        'Core'
    ],
    Autobot: [
        'Dropcharger',
        'Grimraker',
        'Flamedome',
        'Sidescope',
        'Lunarcase',
        'Jeopardy',
        'Augment',
        'Quake',
        'Pillage',
        'Weasel',
        'Darksling',
        'Dustcast',
        'Wrecktop',
        'Freekick',
        'Landspike',
        'Virtue',
        'Hightop',
        'Aurora',
        'Starblaster',
        'Enigma',
    ]
};

const attrRNGOptions = {
    min:  0,
    max:  9,
    integer: true
};

const nameRNGOptions = {
    min:  0,
    max:  19,
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

export const _battle = (decepticons, autobots) => {
    let decIdx = 0;
    let autoIdx = 0;

    // Iterate both arrays based on condition
    while ((decIdx < decepticons.length) && (autoIdx < autobots.length)) {
        console.log()
        if (Number(decepticons[decIdx].courage) - Number(autobots[autoIdx].courage) <= -3) {
            ++decIdx;
            const i = decepticons.indexOf(decepticons[decIdx]);
            if (i !== -1) {
                decepticons.splice(i, 1);
            }
        }
        if (Number(autobots[autoIdx].courage) - Number(decepticons[decIdx].courage) <= -3) {
            ++autoIdx;
            const i = autobots.indexOf(autobots[decIdx]);
            if (i !== -1) {
                autobots.splice(i, 1);
            }
        }
    }

    return {decepticons, autobots};

    // At this point, at least one array is completely traversed, now iterate the remaining array
    // while (decIdx < A.length) {
    //     ++decIdx;
    //
    //     // do stuff
    // }
    // while (autoIdx < B.length) {
    //     ++autoIdx;
    //
    //     // do stuff
    // }

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
