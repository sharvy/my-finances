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
    records = this.state.records.slice();
    records.push(record);
    this.setState({records: records})
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

  deleteRecord: function(record) {
    records = this.state.records.slice();
    index = records.indexOf(record);

    records.splice(index, 1);

    this.replaceState({
      records: records
    });
  },

  render: function() {

    return React.DOM.div({
      className: 'records'
    },
      React.DOM.h2({
      className: 'title'
    }, 'Records'),
      React.DOM.div({
        className: 'row'
      },
        React.createElement(AmountBox, {
          type: 'success',
          amount: this.credits(),
          text: 'Credit'
        }),
        React.createElement(AmountBox, {
          type: 'danger',
          amount: this.debits(),
          text: 'Debit'
        }),
        React.createElement(AmountBox, {
          type: 'info',
          amount: this.balance(),
          text: 'Balance'
        })
      ),
      React.createElement(RecordForm, {
        handleNewRecord: this.addRecord
      }),
      React.DOM.hr(null),
      React.DOM.table({
        className: 'table table-bordered'
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
              handleDeleteRecord: this.deleteRecord
            }))
          }
          return results;
        }).call(this)
        )
      )
    );
  }
});