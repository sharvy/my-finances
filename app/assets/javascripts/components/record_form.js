RecordForm = React.createClass({

  getInitialState: function() {
    return {
      title: '',
      date: '',
      amount: ''
    };
  },

  render: function() {
    return React.DOM.form({
      className: 'form-inline',
      onSubmit: this.handleSubmit
    },
      React.DOM.div({
        className: 'form-group'
      },
        React.DOM.input({
          type: 'text',
          className: 'form-control',
          placeholder: 'Date',
          name: 'date',
          value: this.state.date,
          onChange: this.handleChange
        })
      ),
      React.DOM.div({
        className: 'form-group'
      },
        React.DOM.input({
          type: 'text',
          className: 'form-control',
          placeholder: 'Purpose',
          name: 'title',
          value: this.state.title,
          onChange: this.handleChange
        })
      ),
      React.DOM.div({
        className: 'form-group'
      },
        React.DOM.input({
          type: 'number',
          className: 'form-control',
          placeholder: 'Amount',
          name: 'amount',
          value: this.state.amount,
          onChange: this.handleChange
        })
      ),
      React.DOM.button({
        type: 'submit',
        className: 'btn btn-primary'
      }, 'Create Record')
    )
  },

  handleChange: function(e) {
    var name = e.target.name;
    var obj = {};
    obj[name] = e.target.value;

    return this.setState(obj);
  },

  handleSubmit: function(e) {
    e.preventDefault();
    return $.post('', {
      record: this.state
    }, (function(_this) {
      return function(data) {
        _this.props.handleNewRecord(data);
        return _this.setState(_this.getInitialState);
      }
    })(this), 'JSON');
  },

  valid: function() {
    return this.state.title && this.state.date && this.state.amount;
  }
});