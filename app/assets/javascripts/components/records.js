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
  render: function() {
    return React.DOM.div({
      className: 'records'
    }, React.DOM.h2({
      className: 'title'
    }, 'Records'),
      React.DOM.table({
        className: 'table table-bordered'
      }, React.DOM.thead(null, React.DOM.tr(null, React.DOM.th(null, 'Date'), React.DOM.th(null, 'Title'), React.DOM.th(null, 'Amount'))), React.DOM.tbody(null, (function() {
        var i, len, ref, results;
        ref = this.state.records;
        len = ref.length;
        results = [];

        for(i = 0; i < len; i++) {
          record = ref[i];
          results.push(React.createElement(Record, {
            key: record.id,
            record: record
          }))
        }
        return results;
      }).call(this))));
  }
});