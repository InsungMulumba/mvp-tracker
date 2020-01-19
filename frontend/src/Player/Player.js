import React, {Component} from 'react';
import axios from 'axios';
import { Line  } from 'rc-progress';

class Player extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playerStatistics: [],
      playerID: '',
      playerName: '',
      expanded: false
    };
  }

  async componentDidMount() {
    const playerID  = this.props.location.state.playerID;
    const playerName = this.props.location.state.playerName;

    const playerStatistics = (await axios.get('https://www.balldontlie.io/api/v1/season_averages?player_ids[]='+playerID)).data;
    this.setState({
      playerStatistics: playerStatistics.data,
      playerID: playerID,
      playerName: playerName
    });
  }

  calculateStatPercentage(max, playerAverage) {
    
    return ((playerAverage / max)*100);
  }

  render() {
    return (

    <div className="container">
      {this.state.playerStatistics === null && <p>Loading stats...</p>}
      {
        this.state.playerStatistics && this.state.playerStatistics.map(player => (
          
          <div key={player.player_id} className="jumbotron col-12 card-container">
            <h3 className="card-headings">{this.props.location.state.playerName}</h3>

            <div className="stats-container">
              <p className="stats-text stats-text-label">{"PTS "}</p>
              <Line className="statsBar" percent={this.calculateStatPercentage(50,player.pts)} strokeWidth="1" strokeColor="darkblue" trailColor="white" label={player.pts}/>
              <p className="stats-text stats-text-label">{player.pts}</p>
            </div>
    
            <div className="stats-container">
            <p className="stats-text stats-text-label">{"REB "}</p>
            <Line className="statsBar" percent={this.calculateStatPercentage(23,player.reb)} strokeWidth="1" strokeColor="darkblue" trailColor="white" label={player.reb}/>
            <p className="stats-text">{player.reb}</p>
          </div>
    
            <div className="stats-container">
              <p className="stats-text stats-text-label">{"AST "}</p>
              <Line className="statsBar" percent={this.calculateStatPercentage(15,player.ast)} strokeWidth="1" strokeColor="darkblue" trailColor="white" label={player.ast}/>
              <p className="stats-text">{player.ast}</p>
            </div>
          <div>          

        <button className="btn btn-primary" onClick={() => this.setState({ expanded: !this.state.expanded })}>
        {this.state.expanded ? 
                ( <span>Show less</span>) 
                : 
                ( <span>Show more</span>)
        }
        </button>

      </div>
      {this.state.expanded ?
      (
        <div>
            <div className="stats-container">
              <p className="stats-text stats-text-label">{"BLK "}</p>
              <Line className="statsBar" percent={this.calculateStatPercentage(5.5,player.blk)} strokeWidth="1" strokeColor="darkblue" trailColor="white" label={player.blk}/>
              <p className="stats-text">{player.blk}</p>
            </div>

            <div className="stats-container">
              <p className="stats-text stats-text-label">{"STL "}</p>
              <Line className="statsBar" percent={this.calculateStatPercentage(3.6,player.stl)} strokeWidth="1" strokeColor="darkblue" trailColor="white" label={player.stl}/>
              <p className="stats-text">{player.stl}</p>
            </div>
         </div>
      ) :(null)
      }
    </div> 
        ))}
  </div>  
    )
  }
}

export default Player;