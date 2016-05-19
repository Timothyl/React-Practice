var RecordForm = React.createClass({
  getInitialState: function() {
    return {
      title: '',
      date: '',
      amount: ''
    }
  },
  handleChange: function(e) {
    var name = e.target.name;
    var obj = {};
    obj[name] = e.target.value;
    this.setState(obj);
  },
  valid: function() {
    return (this.state.title && this.state.date && this.state.amount);
  },
  handleSubmit: function(e) {
    e.preventDefault();
    $.post(
      "",
      { record: this.state },
      function(data) {
        this.props.handleNewRecord(data);
        this.setState(this.getInitialState());
      }.bind(this),
      "JSON"
    );
  },
  render: function() {
    return(
      <form className='form-inline' onSubmit={this.handleSubmit}>
        <div className='form-group'>
          <input type='text' className='form-control'
                 placeholder='Date' name='date'
                 value={this.state.date} onChange={this.handleChange}>
          </input>
        </div>
        <div className='form-group'>
          <input type='text' className='form-control'
                 placeholder='Title' name='title'
                 value={this.state.title} onChange={this.handleChange}>
          </input>
        </div>
        <div className='form-group'>
          <input type='number' className='form-control'
                 placeholder='Amount' name='amount'
                 value={this.state.amount} onChange={this.handleChange}>
          </input>
        </div>
        <div className='form-group'>
          <input type='submit' className='btn btn-primary'
                 disabled={!this.valid()}>
          </input>
        </div>
      </form>
    );
  }
});

// # @RecordForm = React.createClass
// #   getInitialState: ->
// #     title: ""
// #     date: ""
// #     amount: ""
// #   handleChange: (e) ->
// #     name = e.target.name
// #     @setState "#{name}": e.target.value
// #   valid: ->
// #     @state.title && @state.date && @state.amount
// #   handleSubmit: (e) ->
// #     e.preventDefault()
// #     $.post "", { record: @state }, (data) =>
// #       @props.handleNewRecord data
// #       @setState @getInitialState()
// #     , "JSON"
// #   handleEdit: (e) ->
// #     e.preventDefault()
// #     data =
// #       title: React.findDOMNode(@refs.title).value
// #       date: React.findDOMNode(@refs.date).value
// #       amount: React.findDOMNode(@refs.amount).value
// #     $.ajax
// #       method: 'PUT'
// #       url: "/records/#{ @props.record.id }"
// #       dataType: "JSON"
// #       data:
// #         record: data
// #       success: (data) =>
// #         @setState edit: false
// #         @props.handleEditRecord @props.record, data
// #   render: ->
// #     React.DOM.form
// #       className: "form-inline"
// #       onSubmit: @handleSubmit
// #       React.DOM.div
// #         className: "form-group"
// #         React.DOM.input
// #           type: "text"
// #           className: "form-control"
// #           placeholder: "Date"
// #           name: "date"
// #           value: @state.date
// #           onChange: @handleChange
// #       React.DOM.div
// #         className: "form-group"
// #         React.DOM.input
// #           type: "text"
// #           className: "form-control"
// #           placeholder: "Title"
// #           name: "title"
// #           value: @state.title
// #           onChange: @handleChange
// #       React.DOM.div
// #         className: "form-group"
// #         React.DOM.input
// #           type: "number"
// #           className: "form-control"
// #           placeholder: "Amount"
// #           name: "amount"
// #           value: @state.amount
// #           onChange: @handleChange
// #       React.DOM.button
// #         type: "submit"
// #         className: "btn btn-primary"
// #         disabled: !@valid()
// #         "Create record"
