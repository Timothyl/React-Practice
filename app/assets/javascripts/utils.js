// @amountFormat = (amount) ->
//   '$ ' + Number(amount).toLocaleString()

var amountFormat = function(amount) {
  return "$ " + Number(amount).toLocaleString();
}
