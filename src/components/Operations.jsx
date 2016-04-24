import React from 'react';
import {Link} from 'react-router';
import moment from 'moment';
import {
  Table,
  TableHeaderColumn,
  TableRow,
  TableHeader,
  TableRowColumn,
  TableBody
} from 'material-ui';

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

    var identity = (v, key) => v[key];

    var headerColumns = columns.map(column => {
      return <TableHeaderColumn key={column.key}>{column.name}</TableHeaderColumn>
    });

    var bodyRows = this.props.operations.map(c => {
      var rowColumns = columns.map(column => {
        var formatter = column.formatter || identity;
        return <TableRowColumn>{formatter(c, column.key)}</TableRowColumn>
      });

      return (
        <TableRow>{rowColumns}</TableRow>
      );
    });

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
