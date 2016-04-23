import React from 'react';
import {Link} from 'react-router';
import {Table, TableHeaderColumn, TableRow, TableHeader, TableRowColumn, TableBody} from 'material-ui';

export default class Home extends React.Component {
  static propTypes = {
    catches: React.PropTypes.array
  };
  state = {};
  render() {
    if (!this.props.catches || !this.props.catches.length) {
      return <div></div>
    }

    var headerColumns = Object.keys(this.props.catches[0]).map(key => {
      return <TableHeaderColumn key={key}>{key}</TableHeaderColumn>
    });

    var bodyRows = this.props.catches.map(c => {
      var columns = Object.keys(c).map(key => {
        return <TableRowColumn>{c[key]}</TableRowColumn>
      });

      return (
        <TableRow>{columns}</TableRow>
      );
    })

    return (
      <div>
        <Table>
          <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
            <TableRow>
              {headerColumns}
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {bodyRows}
          </TableBody>
        </Table>
      </div>
    );
  }
}
