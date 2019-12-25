import React, {Component} from 'react';
import axios from 'axios';

class Player extends Component {
  constructor(props) {
    super(props);
    this.state = {
      statistics: null,
    };
  }

  async componentDidMount() {
    const { match: { params } } = this.props;
    const statistics = (await axios.get(`http://localhost:8081/${params.questionId}`)).data;
    this.setState({
      statistics,
    });
  }

  render() {
    const {statistics} = this.state;
    if (statistics === null) return <p>Loading ...</p>;
    return (
      <div className="container">
        <div className="row">
          <div className="jumbotron col-12">
            {/* Image here? */}
            <h1 className="display-3">{statistics.name}</h1>
            
            <hr className="my-4" />
            <p>Statistics:</p>
            {
              statistics.answers.map((answer, idx) => (
                <p className="lead" key={idx}>PPG:{answer.ppg}</p>
              ))
            }
          </div>
        </div>
      </div>
    )
  }
}

export default Player;