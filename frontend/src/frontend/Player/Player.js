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

  renderStatsBar(statistic, statisticLabel, statisticAllTimeSeasonHigh){

    return <div className="stats-container">
      <p className="stats-text stats-text-label">{statisticLabel}</p>
      <Line className="statsBar" percent={this.calculateStatPercentage(statisticAllTimeSeasonHigh,statistic)} strokeWidth="1" strokeColor="darkblue" trailColor="white" label={statistic}/>
      <p className="stats-text stats-text-label">{statistic}</p>
    </div>
  }

  render() {
    return (

    <div className="container">
      {this.state.playerStatistics === null && <p>Loading stats...</p>}
      {
        this.state.playerStatistics && this.state.playerStatistics.map(player => (
          
          <div key={player.player_id} className="jumbotron col-12 card-container">
            <h3 className="card-headings">{this.props.location.state.playerName}</h3>

            {
              this.renderStatsBar(player.pts, 'PTS ', 50)
            }

            {
              this.renderStatsBar(player.reb, 'REB ', 23)
            }

            {
              this.renderStatsBar(player.ast, 'AST ', 15)
            }

            {
              this.renderStatsBar(player.blk, 'BLK ',5.5)
            }

            {
              this.renderStatsBar(player.stl, 'STL ',3.6)
            }

           
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
          {
            this.renderStatsBar(player.fg_pct*1, 'FG% ',1)
          }

          {
            this.renderStatsBar(player.fg3_pct, '3P% ',1)
          }

          {
            this.renderStatsBar(player.ft_pct, 'FT% ',1)
          }

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