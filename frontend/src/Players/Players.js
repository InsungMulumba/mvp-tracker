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
      percent: 0,
    };
    this.increase = this.increase.bind(this);
  }

  async componentDidMount() {
    const players = (await axios.get('https://api.jsonbin.io/b/5dff6d6cec09451045d73908')).data;
    this.setState({
      players,
    });
    this.increase();
  }

  increase(level) {
    const { percent } = this.state;
    const newPercent = percent + 1;
    if (newPercent >= 70) {
      clearTimeout(this.tm);
      return;
    }
    this.setState({ percent: newPercent });
    this.tm = setTimeout(this.increase, 60);
  }


  render() {
    const { percent } = this.state;
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
                        src="https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/3032977.png&w=350&h=254"
                        alt={player.name}>
                      </img>
                        
                      </div>
                    <div className="player-stats-container">

                      <div className="stats-container">
                        <p className="stats-text stats-text-label">{"PPG "}</p>
                        <Line className="statsBar" percent={50} strokeWidth="1" strokeColor="darkblue" trailColor="white" label={player.stats.ppg}/>
                        <p className="stats-text stats-text-label">{player.stats.ppg}</p>
                      </div>

                      <div className="stats-container">
                        <p className="stats-text stats-text-label">{"RPG "}</p>
                        <Line className="statsBar" percent={50} strokeWidth="1" strokeColor="darkblue" trailColor="white" label={player.stats.ppg}/>
                        <p className="stats-text">{player.stats.rpg}</p>
                      </div>

                      <div className="stats-container">
                        <p className="stats-text stats-text-label">{"APG "}</p>
                        <Line className="statsBar" percent={50} strokeWidth="1" strokeColor="darkblue" trailColor="white" label={player.stats.ppg}/>
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