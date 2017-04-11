function RefreshMenu()
{
    document.getElementById("menu").selectedIndex = "0";
    MenuChoice("None");
}

function MenuChoice(selection)
{
    document.getElementById("customerlist").style.visibility = "hidden";
    document.getElementById("orderhistory").style.visibility = "hidden";
    document.getElementById("currentorders").style.visibility = "hidden";
    document.getElementById("orderupdate").style.visibility = "hidden";
    document.getElementById("about").style.visibility = "hidden";
    switch (selection)
    {
        case "customerlist":
        document.getElementById("customerlist").style.visibility = "visible";//Makes the Store List HTML section visible
        
        ListCustomers(); //Calls the function that creates the store list
        break;
    
        case "orderhistory":
            document.getElementById("orderhistory").style.visibility = "visible";
            break;
        
        case "currentorders":
            document.getElementById("currentorders").style.visibility = "visible";
            break;
        
        case "orderupdate":
            document.getElementById("orderupdate").style.visibility = "visible";
            break;
        
        case "about":
            document.getElementById("about").style.visibility = "visible";
            break;
        
        case "None"://No menu item selected, so no section should be displayed
            break;
        default:
            alert("Please select a different menu option");
        }
}


function ListCustomers() //This sends a request to the GetAllStores service and creates a table with the data returned
{
    var xmlhttp = new XMLHttpRequest();//Creates the XMLHttpRequest object
    var url = "https://student.business.uab.edu/jsonwebservice/service1.svc/getAllCustomers"; //URL for the service
    
    xmlhttp.onreadystatechange = function(){ //Creates the event handler for service request
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
            var output = JSON.parse(xmlhttp.responseText); //Captures the data returned form the service and puts in an object
            GenerateOutput(output); //Calls the function that creates the output table and passes the data object to it
            }
        }
        xmlhttp.open("GET", url, true); //Sets the options for requesting the service
        xmlhttp.send();  //Calls the service

            

    function GenerateOutput(result) //This function receives the data form the service and creates a table to display it
    {
        var display = "<table><tr><th></th><th>Customer ID</th><th>Customer Name</th><th>City</th></tr>"; //Table Headings
        var count = 0; //Count variable to loop
        var customerid = ""; //Variable to store the Store ID
        var customername = ""; //Variable to store the Store Name
        var customercity = ""; //Variable to store the Store City
        for(count = 0; count < result.GetAllCustomersResult.length; count ++) //Loop for creating table rows
    {
        //Anchor link:        <a href="javascript:function("parameter");>
        customerid = result.GetAllCustomersResult[count].CustomerID; //Assigns the Store ID to a variable
        customername = '<a href="javascript:Orders(' + "'" + customerid + "');" + '">';                                     //Assign hyperlink and store name
        customername += result.GetAllCustomersResult[count].CompanyName; //supply name of store
        customername += '</a>';
        customercity = result.GetAllCustomersResult[count].City; //Assigns the Store City to a variable
        display += '<tr><td><button onclick="OrderList(' + "'" + customerid + "')" + '">Display Orders</button></td><td>' + customerid + "</td><td>" + customername + "</td><td>" + customercity + "</td></tr>"; //Creates a table row
    }
    display += "</table>";//Closes the table HTML after table rows are added
    document.getElementById("listcustomers").innerHTML = display; //Displays the table in the HTML page        }
        }
}

function OrderList(customerid)
{
    var xmlhttp = new XMLHttpRequest();
    var url = "https://student.business.uab.edu/jsonwebservice/service1.svc/getOrdersForCustomer/";//Service URL
    url += customerid; //Store ID to complete Service URL
    
    xmlhttp.onreadystatechange = function(){
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
            var output = JSON.parse(xmlhttp.responseText);
            GenerateOutput(output);
        }
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
    
    function GenerateOutput(result) //Function that displays results
    {
    var display = "<table><tr><th></th><th>Order ID</th><th>Ship Address</th><th>Ship City</th><th>Ship Name</th><th>Ship Post Code</th></tr>";
    var count = 0; //Count variable to loop
    var orderid = ""; //Variable to store the Store ID
    var shipaddress = ""; //Variable to store the Store Name
    var shipcity = ""; //Variable to store the Store City
    var shipname = "";
    var shippostcode = "";
    for(count = 0; count < result.GetOrdersForCustomerResult.length; count ++)
    {
        orderid = result.GetOrdersForCustomerResult[count].OrderID;
        shipaddress = result.GetOrdersForCustomerResult[count].ShipAddress;
        shipcity = result.GetOrdersForCustomerResult[count].ShipCity;
        shipname = result.GetOrdersForCustomerResult[count].ShipName;
        shippostcode = result.GetOrdersForCustomerResult[count].ShipPostcode;
            
        display += '<tr><td><button onclick="OrderInfo(' + "'" + orderid + "')" + '">Update Order Info</button></td><td>' + orderid + "</td><td>" + shipaddress + "</td><td>" + shipcity + "</td><td>" + shipname + "</td><td>" + shippostcode + "</td></tr>";
        }
        display += "</table>";
        document.getElementById("listcurrentorders").innerHTML = display;
        MenuChoice("currentorders");
        }
}

function Orders(customerid) //Retrieves a list of books ordered by a particular store using the store ID for the search
{
    var xmlhttp = new XMLHttpRequest();
    var url = "https://student.business.uab.edu/jsonwebservice/service1.svc/getCustomerOrderHistory/";//Service URL
    url += customerid; //Store ID to complete Service URL
    
    xmlhttp.onreadystatechange = function(){
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
            var output = JSON.parse(xmlhttp.responseText);
            GenerateOutput(output);
        }
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
    
    function GenerateOutput(result) //Function that displays results
    {
    var display = "<table><tr><th>Product Name</th><th>Quantity</th></tr>";
    var count = 0;
    for(count = 0; count < result.length; count ++)
    {
        display += "<tr><td>" + result[count].ProductName + "</td><td>" + result[count].Total + "</td></tr>";
        }
        display += "</table>";
        document.getElementById("customerorders").innerHTML = display;
        MenuChoice("orderhistory");
        }
}
     
     
   function GetOrders(customerid) //Retrieves a list of books ordered by a particular store using the store ID for the search
{
    var xmlhttp = new XMLHttpRequest();
    var url = "https://student.business.uab.edu/jsonwebservice/service1.svc/getCustomerOrderHistory/";//Service URL
    url += document.getElementById("customerid").value; //Store ID to complete Service URL
    
    xmlhttp.onreadystatechange = function(){
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
            var output = JSON.parse(xmlhttp.responseText);
            GenerateOutput(output);
        }
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
    
    function GenerateOutput(result) //Function that displays results
    {
    var display = "<table><tr><th>Product Name</th><th>Quantity</th></tr>";
    var count = 0;
    for(count = 0; count < result.length; count ++)
    {
        display += "<tr><td>" + result[count].ProductName + "</td><td>" + result[count].Total + "</td></tr>";
        }
        display += "</table>";
        document.getElementById("customerorders").innerHTML = display;
        MenuChoice("orderhistory");
        }
}


function GetCurrentOrders(customerid) //Retrieves a list of books ordered by a particular store using the store ID for the search
{
    var xmlhttp = new XMLHttpRequest();
    var url = "https://student.business.uab.edu/jsonwebservice/service1.svc/getOrdersForCustomer/";//Service URL
    url += document.getElementById("customerid2").value; //Store ID to complete Service URL
    
    xmlhttp.onreadystatechange = function(){
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
            var output = JSON.parse(xmlhttp.responseText);
            GenerateOutput(output);
        }
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
    
    function GenerateOutput(result) //Function that displays results
    {
    var display = "<table><tr><th></th><th>Order ID</th><th>Ship Address</th><th>Ship City</th><th>Ship Name</th><th>Ship Post Code</th></tr>";
    var count = 0; //Count variable to loop
    var orderid = ""; //Variable to store the Store ID
    var shipaddress = ""; //Variable to store the Store Name
    var shipcity = ""; //Variable to store the Store City
    var shipname = "";
    var shippostcode = "";
    for(count = 0; count < result.GetOrdersForCustomerResult.length; count ++)
    {
        orderid = result.GetOrdersForCustomerResult[count].OrderID;
        shipaddress = result.GetOrdersForCustomerResult[count].ShipAddress;
        shipcity = result.GetOrdersForCustomerResult[count].ShipCity;
        shipname = result.GetOrdersForCustomerResult[count].ShipName;
        shippostcode = result.GetOrdersForCustomerResult[count].ShipPostcode;
            
        display += '<tr><td><button onclick="OrderInfo(' + "'" + orderid + "')" + '">Update Order Info</button></td><td>' + orderid + "</td><td>" + shipaddress + "</td><td>" + shipcity + "</td><td>" + shipname + "</td><td>" + shippostcode + "</td></tr>";
        }
        display += "</table>";
        document.getElementById("listcurrentorders").innerHTML = display;
        MenuChoice("currentorders");
        }
}

function OrderInfo(orderid)
{
var xmlhttp = new XMLHttpRequest();
var url = "https://student.business.uab.edu/jsonwebservice/service1.svc/getCustomerOrderInfo/";
url += orderid;
xmlhttp.onreadystatechange = function() {
if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
var output = JSON.parse(xmlhttp.responseText);
document.getElementById("orderID").value = output[0].OrderID;
document.getElementById("shipaddress").value = output[0].ShipAddress;
document.getElementById("shipcity").value = output[0].ShipCity;
document.getElementById("shipname").value = output[0].ShipName;
document.getElementById("shippostcode").value = output[0].ShipPostcode;
MenuChoice("orderupdate")
}
}
xmlhttp.open("GET", url, true);
xmlhttp.send();
}
//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
//This function executes an update operation on the Store Name and Store City
function UpdateOrder()
{
var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
var result = JSON.parse(xmlhttp.responseText);
console.log(result);
OperationResult(result); //Calls the funciton that displays the result in an alert message
MenuChoice("customerlist"); //Calls the menu choice function to display the store list
}
}
var url = "https://student.business.uab.edu/jsonwebservice/service1.svc/updateOrderAddress";
var orderid = Number(document.getElementById("orderID").value);
var shipaddress = document.getElementById("shipaddress").value;
var shipcity = document.getElementById("shipcity").value;
var shipname = document.getElementById("shipname").value;
var shippostcode = document.getElementById("shippostcode").value;

var parameters = '{"OrderID":' + orderid + ',"ShipAddress":"' + shipaddress + '","ShipCity":"' + shipcity + '","ShipName":"' + shipname + '","ShipPostcode":"' + shippostcode + '"}'; //Creates the JSON string to be sent for the update operation

xmlhttp.open("POST", url, true);
xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
xmlhttp.send(parameters);
}


//Function that displays the result of an operation that adds, deletes, or updates data
//The function is invoked from other functions
function OperationResult(success, exception)
{
switch (success)
{
case 1:
alert("The operation was successful");
break;
case 0:
alert("The operation was not successful:\ "+ exception);
break;
case -2:
alert("The operation was not successful because the data string supplied could not be deserialized into the service object.");
break;
case -3:
alert("The operation was not successful because a record with the supplied Order ID could not be found");
break;
default:
alert("The operation code returned is not identifiable.");
}
}