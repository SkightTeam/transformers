import React, { PureComponent } from 'react';
import { VictoryBar, VictoryChart, VictoryLabel } from 'victory';

class Chart extends PureComponent {

    render() {
        const {type, name, strength, intelligence, speed, endurance, rank, courage, firepower, skill, overallrating} = this.props.attributes;

        return (
            <div className={'chartContainer box-row'}>
                <div className='title'>
                  <p>{`Rank: ${rank}`}</p>
                  <p>{`Name: ${name}`}</p>
                  <p>{`Allegiance: ${type}`}</p>
                  <p>{`Overall rating: ${overallrating}`}</p>
                </div>
                <VictoryChart
                  scale='linear'
                  domainPadding={20}>
                   <VictoryBar
                        domain={{x: [0, 10], y: [0, 7]}}
                        width={400}
                        height={250}
                        horizontal={true}
                        data={[
                          {x: 1, y: strength, label: 'strength'},
                          {x: 2, y: intelligence, label: 'intelligence'},
                          {x: 3, y: speed, label: 'speed'},
                          {x: 4, y: endurance, label: 'endurance'},
                          {x: 5, y: courage, label: 'courage'},
                          {x: 6, y: firepower, label: 'firepower'},
                          {x: 7, y: skill, label: 'skill'}
                        ]}
                        labelComponent={
                          <VictoryLabel />
                        }
                      />
              </VictoryChart>
            </div>
        );
    }
}

export default Chart;
