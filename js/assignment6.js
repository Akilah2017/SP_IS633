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
    document.getElementById("createcustomer").style.visibility = "hidden";
    document.getElementById("geolocation").style.visibility = "hidden";
    document.getElementById("picture").style.visibility = "hidden";
    document.getElementById("contacts").style.visibility = "hidden";
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
        
        case "createcustomer":
            document.getElementById("createcustomer").style.visibility = "visible";
            break;
        
        case "geolocation":
            document.getElementById("geolocation").style.visibility = "visible";
            break;
        
        case "camera":
            document.getElementById("picture").style.visibility = "visible";
            break;

        case "contacts":
            document.getElementById("contacts").style.visibility = "visible";
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
        var display = "<table><tr><th></th><th>Customer ID</th><th>Customer Name</th><th>City</th><th>Delete</th></tr>"; //Table Headings
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
        display += '<tr><td><button onclick="OrderList(' + "'" + customerid + "')" + '">Display Orders</button></td><td>' + customerid + "</td><td>" + customername + "</td><td>" + customercity + '</td><td><button onclick="DeleteCustomer(' + "'" + customerid + "')" + '">Delete Customer</button></td></tr>'; //Creates a table row
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
alert("The operation was not successful:" + exception);
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

function CreateCustomer()
{
    var objRequest = new XMLHttpRequest ();
    var url = "https://student.business.uab.edu/jsonwebservice/service1.svc/CreateCustomer";
    
    var customerid = document.getElementById("customeridinput").value;
    var customername = document.getElementById("customernameinput").value;
    var customercity = document.getElementById("customercityinput").value;
    
    var newcustomer = '{"CustomerID":"' + customerid + '", "CompanyName":"' + customername + '", "City":"' + customercity + '"}'
    
    objRequest.onreadystatechange = function() {
    if (objRequest.readyState == 4 && objRequest.status == 200) {
    var result = JSON.parse(objRequest.responseText);
    var outcome = result.WasSuccessful;
    var error = result.Exception;
OperationResult(outcome, error) //Calls the funciton that displays the result in an alert message
    MenuChoice("customerlist"); //Calls the menu choice function to display the store list
}
}
    objRequest.open("POST", url, true);
    objRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    objRequest.send(newcustomer);
}

function DeleteCustomer(customerid)
{
 var objRequest = new XMLHttpRequest();
  var confirmdelete=confirm("Are you sure you want to delete Customer ID: "+ customerid +"?")
 

    
 if (confirmdelete == true)
 {
 
 var url = "https://student.business.uab.edu/jsonwebservice/service1.svc/DeleteCustomer/";
    url += customerid;


 objRequest.onreadystatechange = function()
 {
 if (objRequest.readyState == 4 && objRequest.status == 200)
 {
 var result = JSON.parse(objRequest.responseText);
 var outcome = result.DeleteCustomerResult.WasSuccessful;
var error = result.DeleteCustomerResult.Exception;
OperationResult(outcome, error);
 MenuChoice("customerlist");
 }
 } //Start AJAX request
 objRequest.open("GET", url, true);
 objRequest.send();
 }

}


function Location() //Calls the Geolocation function built in to the web browser
{
    var geo = navigator.geolocation; //References the Web Browser (navigator) geolocation service
    
    if (geo) //Tests to see if geolocation service is available
    {
    geo.getCurrentPosition(showPosition); //If the geolocation service is available it gets the position and calls a function to display it
    }
    else
    {
    alert("Geolocation is not supported"); //If the Geolocation service is not available it displays a message
    }
}

function showPosition(position) //Function receives the geolocation data and displays it
{
    var latitude = position.coords.latitude; //Retrieves latitude data
    var longitude = position.coords.longitude; //Retrieves longitude data
    var latlong=  new google.maps.LatLng (latitude, longitude);
    document.getElementById("latitude").innerHTML = latitude;
    document.getElementById("longitude").innerHTML = longitude;
    
    showMap(latlong);
    
}   
  
function showMap(latlong) {
    
    var map = new google.maps.Map(document.getElementById('map'), {
        center: latlong,
        zoom: 18,
        mapTypeId: google.maps.MapTypeId.ROADMAP
        });
    var marker = new google.maps.Marker({
          position: latlong,
          map: map
    });

    
}
   
function initMap() {
        var uab = {lat: 33.502, lng:  -86.806};
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 8,
          center: uab
        });
      }
      
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////      
//Function that invokes device camera app and captures output from the camera app
function CapturePhoto()
{
        navigator.camera.getPicture(onSuccess, onFail, { quality: 20, destinationtype: destinationtype.FILE_URI, saveToPhotoAlbum: true });
 //The onSuccess parameter is the function that is called when the camera app operates successfully
 //The onFail parameter is the function that is called when no picture is returned
 //The other parameters indicate how the picture is to be handled
}


//This function handles the picture returned from the CapturePhoto function and displays it on the web page
function onSuccess(imageURI)
{
        var picdisplay = document.getElementById("snapshot");
        picdisplay.style.display = 'block';
        picdisplay.src = imageURI; //Assigns the picture to the image source property of the image on the web page 
}


//This function displays an error message if a picture is not returned
function onFail(message)
{
         alert("Failed because: " + message);
}

//This function displays the contact list on the device and collects the data for the contact selected
function PickContact()
{
 //The pickcontact method has two parameters. The first parameter is the function that handles a successful contact
 //selection, and the data is returned. The second parameter is optional, and is called if no contact is returned.
 //The contact information is returned as a JSON object, with arrays for certain items like phone numbers.

    navigator.contacts.pickContact(function(contact) //Function that operates when a contact is successfully returned
         {
            var contactinfo = "";
            contactinfo += contact.name.givenName + " " + contact.name.familyName + "<br>";
            var count = 0;
           
            if (contact.phoneNumbers !== null) //Checks for the presence of phone numbers
            {
                     for (count=0; count < contact.phoneNumbers.length; count++) //Retrieves all the phone numbers
                     {
                        contactinfo += contact.phoneNumbers[count].type + ": " + contact.phoneNumbers[count].value + "<br>";
                     }
            }
            
            if (contact.emails !== null) //Checks for the presence of email addresses
            {
                    for(count=0; count < contact.emails.length; count++) //Retrieves all email addresses
                    {
                       contactinfo += contact.emails[count].type + ": " + contact.emails[count].value + "<br>";
                    }
            }
            
            document.getElementById("contactname").innerHTML = contactinfo;
         }, function(err) //Function that operates when nothing is returned
        {
             alert("Error: " + err);

         }
            
            );
}


///////////////////////////////////////////////////
function findContacts() {
   var options = new ContactFindOptions();
   options.filter = "";
   options.multiple = true;

   fields = ["familyName"];
   navigator.contacts.find(fields, contactfindSuccess, contactfindError, options);
    
   function contactfindSuccess(contacts) {
      for (var i = 0; i < contacts.length; i++) {
         alert("Last Name = " + contacts[i].familyName);
      }
   }
	
   function contactfindError(message) {
      alert('Failed because: ' + message);
   }
	
}