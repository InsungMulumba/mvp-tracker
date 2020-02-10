import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import './Players.css';

class players extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playerInfo: null,
      percent: this.calculateStatPercentage,
    };
    this.increase = this.increase.bind(this);
    this.calculateStatPercentage = this.calculateStatPercentage.bind(this);
  }

  async componentDidMount() {
    const playerInfo = (
      await axios.get('https://api.jsonbin.io/b/5dff6d6cec09451045d73908/6')).data;
      
    this.setState({
      playerInfo,
    });
    this.increase();
    this.calculateStatPercentage();
  }

  calculateStatPercentage(max, playerAverage) {
    return ((playerAverage / max)*100);
  }

  increase() {
    const { percent } = this.state;
    const newPercent = percent + 1;
    if (newPercent >= percent) {
      clearTimeout(this.tm);
      return;
    }
    this.setState({ percent: newPercent });
    this.tm = setTimeout(this.increase, 50);
  }

  render() {
    return (
      <div className="container">
        <div className="row-structure">

          {this.state.playerInfo === null && <p>Loading players...</p>}
          <div className="page-label">
          Choose a player to see their updated date stats for the 2019-20 season

          </div>
          {
            
            this.state.playerInfo && this.state.playerInfo.map(player => (
              <div key={player.id} className="card-container">
                <Link className="player-card-container" to={{
                  pathname:`/player/${player.id}`,
                  state: {
                    playerID: `${player.id}`,
                    playerName: `${player.name}`,
                    playerPicture: `${player.image}`
                  }
                }}>
                <div className="player-details-container">
                  <h3 className="card-headings card-headings--title">{player.name}</h3>
                  <h4 className="card-headings">{player.team}</h4>
                  <h4 className="card-headings">{player.height}</h4>
                  <h4 className="card-headings">{player.weight}</h4>
                  </div>
                  <div className="player-image-container">
                      <img 
                        className="head-shot" 
                        src={player.image}
                        alt={player.name}>
                      </img>  
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