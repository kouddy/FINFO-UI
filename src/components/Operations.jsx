import React from 'react';
import {Link} from 'react-router';
import moment from 'moment';
import {Card, CardTitle, CardText, CardActions, FlatButton} from 'material-ui';

export default class Operations extends React.Component {
  static propTypes = {
    operations: React.PropTypes.array
  };
  state = {};
  render() {
    if (!this.props.operations || !this.props.operations.length) {
      return <div></div>
    }

    var columns = [
      {
        key: "operation_id",
        name: "Operation ID"
      }, {
        key: "operation_name",
        name: "Name"
      }, {
        key: "date",
        name: "Date",
        formatter: (value) => {
          return moment(value.date).format("MMM DD, YYYY");
        }
      }, {
        key: "latLong",
        name: "Latitude and Longitute",
        formatter: (value) => {
          return value.latitude && value.longitude
            ? JSON.stringify([
              Number.parseFloat(Number.parseFloat(value.latitude).toFixed(3)),
              Number.parseFloat(Number.parseFloat(value.longitude).toFixed(3))
            ])
            : null;
        }
      }, {
        key: "performance_result",
        name: "Performance"
      }, {
        key: "vessel",
        name: "Vessel Name"
      }
    ];

    var formatDate = (value) => {
      return moment(value.date).format("MMM DD, YYYY");
    };
    var formatLatLng = (value) => {
      return JSON.stringify([
        Number.parseFloat(Number.parseFloat(value.latitude).toFixed(3)),
        Number.parseFloat(Number.parseFloat(value.longitude).toFixed(3))
      ]);
    };

    var rows = this.props.operations.map(c => {
      return (
        <Card actAsExpander={true} style={{
          display: "block",
          width: "100%",
          margin: "10px auto",
          padding: 5,
          border: "1px solid #ccc"
        }}>
          <CardTitle title={c.vessel + " performed " + c.operation_name}/>
          <CardText>
            <div>
              <div>
                {"Operation ID: "}{c.operation_id}</div>
              <div>
                {"Performance: "}{c.performance_result}</div>
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
