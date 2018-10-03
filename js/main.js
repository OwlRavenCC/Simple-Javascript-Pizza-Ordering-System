//Model

var order = {
  customer : {
    first_name : "",
    last_name : ""
  },
  pizzas : []
};

//Controller
function render_view(order) {
  document.getElementById("confirmation").innerHTML = "Customer name " +
    order.customer.first_name + " " + order.customer.last_name;

  ordersTable = document.getElementById("ordersTable");
  tableBody = ordersTable.getElementsByTagName("tbody")[0];

  tableBody.innerHTML = ""

  var pizza_num = order.pizzas.length;

  for(var i = 0; i < pizza_num; i++ ){
    var row = tableBody.insertRow(i);

    var cell1 = row.insertCell(0);
    cell1.innerHTML = order.pizzas[i].pizza_type;

    var cell2 = row.insertCell(1);
    cell2.innerHTML = order.pizzas[i].pizza_size;

    //This just creates a button to delete the pizza
    var cell3 = row.insertCell(2);
    cell3.innerHTML = '<button onclick="remove_pizza(this)" id="pizza_' + i + '">Remove this pizza</test>';

  }



  document.getElementById("rawJson").innerHTML = "<pre>" + JSON.stringify(order, null, " ") + "</pre>"
}

render_view(order)

function createOrder() {
    var firstName =
        document.getElementById("firstNameInput").value;

    var lastName =
        document.getElementById("lastNameInput").value;

    var pizzaType = document.querySelector('input[name="pizzaType"]:checked').value;

    var pizzaSize = document.querySelector('input[name="pizzaSize"]:checked').value;

    order.customer.first_name = firstName;
    order.customer.last_name = lastName;


    var pizza_num = order.pizzas.length;

    var newpizza = new Object();

      newpizza = {
        pizza_id : pizza_num + 1 + '-' +  (Math.floor(Math.random()*10) + 1),
        pizza_type : pizzaType,
        pizza_size : pizzaSize
      };
      order.pizzas.push(newpizza);


    render_view(order);

  }

  function remove_pizza(pizzaindex){
    var str = pizzaindex.id;
    var id = str.replace('pizza_',' ');

    order.pizzas.splice(id,1);
    render_view(order);
  };

//Validation script
function validate_form(){
  var form = document.getElementById('customerInformationForm');
  var isValidForm = form.checkValidity();
  if(isValidForm){
    createOrder();
  }else{
    alert("Please fill all the empty fields.\nAnd DON'T forget to choose the size and type of your pizza!");
  };
};



    document.querySelector("#submitButton").addEventListener("click", validate_form);
