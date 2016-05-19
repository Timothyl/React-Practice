var Records = React.createClass({
  getInitialState: function() {
    return { records: this.props.data };
  },
  getDefaultProps: function() {
    return { records: [] };
  },
  addRecord: function(record) {
    var records = React.addons.update(this.state.records, { $push: [record] })
    this.setState({ records: records});
  },
  deleteRecord: function(record) {
    var index = this.state.records.indexOf(record);
    var records = React.addons.update(this.state.records, { $splice: [[index, 1]]});
    this.replaceState({ records: records })
  },
  credits: function() {
    var credits = this.state.records.filter(function(record) {
      return record.amount >= 0;
    });
    return credits.reduce(function(prev, credit) {
      return prev + parseFloat(credit.amount);
    }, 0)
  },
  debits: function() {
    var debits = this.state.records.filter(function(record) {
      return record.amount <= 0;
    });
    return debits.reduce(function(prev, debit) {
      return prev + parseFloat(debit.amount);
    }, 0);
  },
  balance: function() {
    return this.debits() + this.credits();
  },
  render: function() {
    return (
      <div className='records'>
        <h2 className='title'>Records</h2>
        <div className='row'>
          <AmountBox type='success' amount={this.credits()} text='Credit'/>
          <AmountBox type='danger' amount={this.debits()} text='Debit'/>
          <AmountBox type='info' amount={this.balance()} text='Balance'/>
        </div>
        <RecordForm handleNewRecord={this.addRecord}/>
        <table className='table table-bordered'>
          <thead>
            <tr>
              <th>Date</th>
              <th>Title</th>
              <th>Amount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.state.records.map(function(record) {
              return <Record key={record.id} record={record}
                      handleDeleteRecord={this.deleteRecord} />
            }.bind(this))}
          </tbody>
        </table>
      </div>
    );
  }
});

// @Records = React.createClass
//   getInitialState: ->
//     records: @props.data
//   getDefaultProps: ->
//     records:[]
//   addRecord: (record) ->
//     records = React.addons.update(@state.records, { $push: [record] })
//     @setState records: records
//   deleteRecord: (record) ->
//     index = @state.records.indexOf record
//     records = React.addons.update(@state.records, { $splice: [[index, 1]] })
//     @replaceState records: records
//   credits: ->
//     credits = @state.records.filter (val) -> val.amount >= 0
//     credits.reduce ((prev, curr) ->
//       prev + parseFloat(curr.amount)
//     ), 0
//   debits: ->
//     debits = @state.records.filter (val) -> val.amount < 0
//     debits.reduce ((prev, curr) ->
//       prev + parseFloat(curr.amount)
//     ), 0
//   balance: ->
//     @debits() + @credits()
//   render: ->
//     React.DOM.div
//       className: "records"
//       React.DOM.h2
//         className: "title"
//         "Records"
//       React.DOM.div
//         className: "row"
//         React.createElement AmountBox, type: "success", amount: @credits(), text: "Credit"
//         React.createElement AmountBox, type: "danger", amount: @debits(), text: "Debit"
//         React.createElement AmountBox, type: "info", amount: @balance(), text: "Balance"
//       React.createElement RecordForm, handleNewRecord: @addRecord
//       React.DOM.hr null
//       React.DOM.table
//         className: "table table-bordered"
//         React.DOM.thead null,
//           React.DOM.tr null,
//             React.DOM.th null, "Date"
//             React.DOM.th null, "Title"
//             React.DOM.th null, "Amount"
//             React.DOM.th null, "Actions"
//         React.DOM.tbody null,
//           for record in @state.records
//             React.createElement Record, key: record.id, record: record, handleDeleteRecord: @deleteRecord
