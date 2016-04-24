import React from 'react';
import {Link} from 'react-router';
import moment from 'moment';
import {Card, CardTitle, CardText, CardActions, FlatButton} from 'material-ui';

export default class Catches extends React.Component {
  render() {
    var catchPage = (
      <div>
        <Card style={{
          display: "block",
          width: "100%",
          margin: "10px auto",
          padding: 5,
          border: "1px solid #ccc"
        }}>
          <CardTitle title={"Explore Catches"}/>
          <CardText>See what vessels catched what specimen</CardText>
          <CardActions>
            <Link to="/catches" style={{
              textDecoration: "none"
            }}>
              <FlatButton label="See Catches" secondary={true}/>
            </Link>
          </CardActions>
        </Card>
      </div>
    );

    var operationPage = (
      <div>
        <Card style={{
          display: "block",
          width: "100%",
          margin: "10px auto",
          padding: 5,
          border: "1px solid #ccc"
        }}>
          <CardTitle title={"Explore Operations"}/>
          <CardText>See when vessels performed operations</CardText>
          <CardActions>
            <Link to="/operations" style={{
              textDecoration: "none"
            }}>
              <FlatButton label="See Operations" secondary={true}/>
            </Link>
          </CardActions>
        </Card>
      </div>
    );

    return (
      <div>{[catchPage, operationPage]}</div>
    );
  }
}
