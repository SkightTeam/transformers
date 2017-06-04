import './App.css';

import React, { PureComponent } from 'react';
import { _battle, _createTeams, _generateTransformers } from './code';

import Chart from './components/Chart';
import logo from './logo.svg';

class App extends PureComponent {
    constructor() {
        super();
        this.state = {
            numberOfTransformers: null,
            transformers: null,
            decepticons: null,
            autobots: null,
            battleResult: null,
            loading: false
        };
    }

    render() {
        console.log('state', this.state);

        const { loading, battleResult, decepticons, autobots } = this.state;

        let showDecepticons = null;
        let showAutobots = null;
        let displayGenerationResult = <h3>Enter the number of transformers to generate.</h3>;
        let battleResultText = null;
        let bossBattleText = null;

        if (decepticons && autobots) {
            showDecepticons = decepticons.map((decepticon, index) => <Chart key={`${index}${decepticon.overallrating}`} attributes={decepticon} />);
            showAutobots = autobots.map((autobot, index) => <Chart key={`${index}${autobot.overallrating}`} attributes={autobot} />);
            displayGenerationResult = <h3>{`${decepticons.length} Decepticons and ${autobots.length} Autobots were generated `}</h3>;
        }

        if (loading) {
            displayGenerationResult = <h3>LOADING ...</h3>;
        }

        if (battleResult) {
            battleResultText = (
                <div>
                                         <h3>{`Battles: ${battleResult.battles}`}</h3>
                                         <h3>{`Winning Team (${battleResult.winningTeamName}): ${String(battleResult.winningTeam)}`}</h3>
                                         <h3>{`Survivors from the loosing team (${battleResult.loosingTeamName}): ${String(battleResult.loosingTeam)}`}</h3>
                                 </div>
            );
        }

        if (battleResult && battleResult.bossVsBoss) {
            bossBattleText = (
                   <div>
                                            <h1>BOSS VS BOSS !</h1>
                                            <h3>Optimus Prime and Predaking met in battle</h3>
                                            <h4>There were no survivors.</h4>
                                    </div>
               );
        }

        return (
            <div className='App'>
                <div className='App-header'>
                    <img src='https://cdn.glitch.com/53eb7a5c-011c-474d-ba06-b9b98b7031e1%2Ftransformers.gif?1496564307854' className='App-logo' alt='logo' />
                    <h2>Welcome to Transformer Battles</h2>
                </div>
                <div className='App-intro'>
                {displayGenerationResult}
                {this._getControls()}
                {battleResultText}
                </div>
                <div className='teamsContainer row'>
                  <div className='decepticons col-xs'>
                    {showDecepticons}
                  </div>
                  <div className='autobots col-xs'>
                    {showAutobots}
                  </div>
                </div>
            </div>
        );
    }

    _getControls() {
        const { numberOfTransformers, decepticons, autobots } = this.state;

        let controls = (
             <div>
                <input
                    className='input'
                    type='text'
                    placeholder='10 or 100 etc..'
                    value={this._isPosInt(numberOfTransformers)}
                    onChange={this._handleInputChange.bind(this)}
                    onKeyPress={this._handleKeyPress.bind(this)}
                />
                <button className='btn' onClick={this._handleGenerateButtonClick.bind(this)}>submit</button>
            </div>
        );

        if (decepticons && autobots) {
            controls = (
                <div className='App-intro'>
                    <button className='btn' onClick={this._handleBattleButtonClick.bind(this)}>BATTLE!</button>
                </div>
              );
        }
        return controls;
    }

    _displayDecepticons() {
        const { decepticons } = this.state;
        decepticons.map((decepticon) => <Chart attributes={decepticon} />);
    }

    _handleInputChange(event) {
        this.setState({ numberOfTransformers: event.target.value });
    }

    _handleGenerateButtonClick() {
        const { numberOfTransformers } = this.state;
        if (!numberOfTransformers) {
            this.setState({ numberOfTransformers: null });
            return false;
        }

        const transformers = _generateTransformers(numberOfTransformers);
        const {decepticons, autobots} = _createTeams(transformers);

        this.setState({ transformers, decepticons, autobots });
    }

    _handleBattleButtonClick() {
        const { decepticons, autobots } = this.state;

        const battleResult = _battle(decepticons, autobots);
        this.setState({ battleResult });
    }

    _handleKeyPress(e) {
        if (e.key === 'Enter') {
            this._handleGenerateButtonClick();
        }
    }

    // Format data in the way Victory js wants it
    _getChartData(data) {
        return data.map(number => {
            return { num: Number(number) };
        });
    }

    _isPosInt(n) {
        // Positive ints only
        return String(n).replace(/\D+/g, '');
    }
}

export default App;
