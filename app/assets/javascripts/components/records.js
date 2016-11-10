Records = React.createClass({

  getInitialState: function() {
    return {
      records: this.props.data
    }
  },

  getDefaultProps: function() {
    return {
      records: []
    }
  },

  addRecord: function(record) {
    var records;

    records = React.addons.update(this.state.records, {
      $push: [record]
    });

    return this.setState({
      records: records
    });
  },

  deleteRecord: function(record) {
    var index, records;

    index = this.state.records.indexOf(record);
    records = React.addons.update(this.state.records, {
      $splice: [[index, 1]]
    });

    return this.replaceState({
      records: records
    });
  },

  updateRecord: function(record, data) {
    var index, records;

    index = this.state.records.indexOf(record);
    records = React.addons.update(this.state.records, {
      $splice: [[index, 1, data]]
    });

    return this.replaceState({
      records: records
    });
  },

  credits: function() {
    var credits;
    credits = this.state.records.filter(function(record) {
      return record.amount >= 0;
    });

    return credits.reduce(function(sum, currentElement) {
      return sum + parseFloat(currentElement.amount);
    }, 0);
  },

  debits: function() {
    debits = this.state.records.filter(function(record) {
      return record.amount < 0;
    });

    return debits.reduce(function(sum, currentElement) {
      return sum + parseFloat(currentElement.amount);
    }, 0);
  },

  balance: function() {
    return this.debits() + this.credits();
  },

  render: function() {

    return React.DOM.div({
      className: 'records col-md-12'
    },
      React.DOM.h2({
      className: 'title'
    }, 'Monthly Expenses'),
      React.DOM.div({
        className: 'row amount-boxes'
      },
        React.createElement(AmountBox, {
          type: 'income',
          amount: this.credits(),
          text: 'Income'
        }),
        React.createElement(AmountBox, {
          type: 'expense',
          amount: this.debits(),
          text: 'Expense'
        }),
        React.createElement(AmountBox, {
          type: 'balance',
          amount: this.balance(),
          text: 'Balance'
        })
      ),
      React.createElement(RecordForm, {
        handleNewRecord: this.addRecord
      }),
      React.DOM.hr(null),
      React.DOM.div({
        className: 'col-md-8 col-md-offset-2'
      },
        React.DOM.table({
            className: 'table table-hover table-condensed'
          },
          React.DOM.thead(null,
            React.DOM.tr(null,
              React.DOM.th(null, 'Date'),
              React.DOM.th(null, 'Title'),
              React.DOM.th(null, 'Amount'),
              React.DOM.th(null, 'Actions'))),
          React.DOM.tbody(null, (function() {
              var i, len, ref, results;
              ref = this.state.records;
              len = ref.length;
              results = [];

              for(i = 0; i < len; i++) {
                var record = ref[i];
                results.push(React.createElement(Record, {
                  key: record.id,
                  record: record,
                  handleDeleteRecord: this.deleteRecord,
                  handleEditRecord: this.updateRecord
                }))
              }
              return results;
            }).call(this)
          )
        )
      )
    );
  }
});