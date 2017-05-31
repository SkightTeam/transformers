import './App.css';

import React, { PureComponent } from 'react';
import Chart from './components/Chart';
import { _generateTransformers, _createTeams, _battle } from './code';

import logo from './logo.svg';

class App extends PureComponent {
    constructor() {
        super();
        this.state = {
            numberOfTransformers: null,
            transformers: null,
            decepticons: null,
            autobots: null
        };
    }

    render() {
        //console.log('state', this.state);

        const { numberOfTransformers, decepticons, autobots } = this.state;
        //const chartData = this._getChartData(data);
        let showDecepticons = null;
        let showAutobots = null;
        let displayBattleResult = <h3>Enter the number of transformers for the battle and hit submit</h3>;
        if (decepticons && autobots) {
            showDecepticons = decepticons.map((decepticon, index) => <Chart key={`${index}${decepticon.overallrating}`} attributes={decepticon} />);
            showAutobots = autobots.map((autobot, index) => <Chart key={`${index}${autobot.overallrating}`} attributes={autobot} />)
            displayBattleResult = <h3>{`${decepticons.length} Decepticon and ${autobots.length} Autobots were generated `}</h3>;
        }

        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h2>Welcome to Transformer Battles</h2>
                </div>
                <div className="App-intro">
                    {displayBattleResult}
                    <input
                        className="terrainInput"
                        type="text"
                        placeholder=""
                        value={this._isPosInt(numberOfTransformers)}
                        onChange={this._handleInputChange.bind(this)}
                    />
                <button onClick={this._handleButtonClick.bind(this)}>submit</button>
                </div>
                <div className="teamsContainer">
                  <div className="decepticons items">
                    {showDecepticons}
                  </div>
                  <div className="autobots items">
                    {showAutobots}
                  </div>
                </div>
            </div>
        );
    }

    _displayDecepticons() {
      const { decepticons } = this.state;
      decepticons.map((decepticon) => <Chart attributes={decepticon} />);
    }

    _handleInputChange(event) {
        this.setState({ numberOfTransformers: event.target.value });
    }

    _handleButtonClick() {
        const { numberOfTransformers } = this.state;
        if (!numberOfTransformers) {
            this.setState({ numberOfTransformers: null });
            return false;
        }

        const transformers = _generateTransformers(numberOfTransformers);
        const {decepticons, autobots} = _createTeams(transformers);
        //console.log(_battle(decepticons, autobots))
        this.setState({ transformers, decepticons, autobots });
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
