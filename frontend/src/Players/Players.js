import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import './Players.css';
import { Line  } from 'rc-progress';


class players extends Component {
  constructor(props) {
    super(props);

    this.state = {
      players: null,
      percent: this.calculateStatPercentage,
    };
    this.increase = this.increase.bind(this);
    this.calculateStatPercentage = this.calculateStatPercentage.bind(this);
  }

  async componentDidMount() {
    const players = (await axios.get('https://api.jsonbin.io/b/5dff6d6cec09451045d73908/3')).data;
    this.setState({
      players,
    });
    this.increase();
    this.calculateStatPercentage();
  }


  
  calculateStatPercentage(max, playerAverage) {
    console.log((playerAverage / max));
    return ((playerAverage / max)*100);
  }

  increase() {
    const { percent } = this.state;
    const newPercent = percent + 1;
    // console.log(percent);
    //Value from new method will be passed here
    if (newPercent >= percent) {
      clearTimeout(this.tm);
      return;
    }
    this.setState({ percent: newPercent });
    this.tm = setTimeout(this.increase, 50);
  }


  /** Two API calls, one to my own bespoke API, which will include,
   * 
   * Player name
   * teamname
   * picture url
   * mixtape url
   * 
   * 
   * The other to balldontlie.io stats page
   */

  render() {
    // const { percent } = this.state;
    return (
      <div className="container">
        <div className="row">
          {this.state.players === null && <p>Loading players...</p>}
          {
            this.state.players && this.state.players.map(player => (
              <div key={player.id} className="jumbotron col-12 card-container">
                <Link to={`/player/${player.id}`}>
                  <h4 className="card-headings">{player.name}</h4>
                  <p className="card-headings">{player.team}</p>
                    <div className="player-card-container">
                      <div className="image-container">
                      <img 
                        className="head-shot" 
                        src={player.image}
                        alt={player.name}>
                      </img>
                        
                      </div>
                    <div className="player-stats-container">

                      <div className="stats-container">
                        <p className="stats-text stats-text-label">{"PPG "}</p>
                        {/* Make method to calculate percentage somehting like ppg / max ppg */}
                        <Line className="statsBar" percent={this.calculateStatPercentage(50,player.stats.ppg)} strokeWidth="1" strokeColor="darkblue" trailColor="white" label={player.stats.ppg}/>
                        {/* <Line percent="10" strokeWidth="4" strokeColor="#D3D3D3" /> */}
                        <p className="stats-text stats-text-label">{player.stats.ppg}</p>
                      </div>

                      <div className="stats-container">
                        <p className="stats-text stats-text-label">{"RPG "}</p>
                        {/* <Line className="statsBar" percent={50} strokeWidth="1" strokeColor="darkblue" trailColor="white" label={player.stats.ppg}/> */}
                        <Line className="statsBar" percent={this.calculateStatPercentage(23,player.stats.rpg)} strokeWidth="1" strokeColor="darkblue" trailColor="white" label={player.stats.rpg}/>
                        <p className="stats-text">{player.stats.rpg}</p>
                      </div>

                      <div className="stats-container">
                        <p className="stats-text stats-text-label">{"APG "}</p>
                        {/* <Line className="statsBar" percent={50} strokeWidth="1" strokeColor="darkblue" trailColor="white" label={player.stats.ppg}/> */}
                        <Line className="statsBar" percent={this.calculateStatPercentage(15,player.stats.apg)} strokeWidth="1" strokeColor="darkblue" trailColor="white" label={player.stats.apg}/>
                        <p className="stats-text">{player.stats.apg}</p>
                      </div>
                      </div>
                    </div>
                </Link>
              </div>
            ))
          }
        </div>
      </div>
    )
  }
}

export default players;