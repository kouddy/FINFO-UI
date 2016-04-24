import React from 'react';
import {Link} from 'react-router';
import moment from 'moment';
import {Card, CardTitle, CardText, CardActions, FlatButton} from 'material-ui';

export default class Catches extends React.Component {
  static propTypes = {
    catches: React.PropTypes.array
  };
  state = {};
  render() {
    if (!this.props.catches || !this.props.catches.length) {
      return <div></div>
    }

    var formatDate = (value) => {
      return moment(value.date).format("MMM DD, YYYY");
    };
    var formatLatLng = (value) => {
      return JSON.stringify([
        Number.parseFloat(Number.parseFloat(value.latitude).toFixed(3)),
        Number.parseFloat(Number.parseFloat(value.longitude).toFixed(3))
      ]);
    };

    var rows = this.props.catches.map(c => {
      return (
        <Card actAsExpander={true} style={{
          display: "block",
          width: "100%",
          margin: "10px auto",
          padding: 5,
          border: "1px solid #ccc"
        }}>
          <CardTitle title={c.vessel + " caught " + c.species}/>
          <CardText>
            <div>
              <div>
                {"Number Caught: "}{c.total_catch_number}</div>
              <div>
                {"Total Weight (Kg): "}{c.total_catch_weight_kg}</div>
            </div>
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "0.5em",
              color: "#aaa"
            }}>
              <div>
                {"Date: "}{formatDate(c)}</div>
              <div>
                {"Co-ordinate: "}{formatLatLng(c)}</div>
            </div>
          </CardText>
          <CardActions>
            <FlatButton label="Show Details" secondary={true}/>
          </CardActions>
        </Card>
      );
    });

    return (
      <div>{rows}</div>
    );
  }
}
