function MenuChoice(selection)
{
    document.getElementById("section1").style.visibility = "hidden";
    document.getElementById("section2").style.visibility = "hidden";
    
    switch (selection)
    {
        case "Section 1":
            document.getElementById("section1").style.visibility = "visible";
            break;
        case "Section 2":
            document.getElementById("section2").style.visibility = "visible";
            break;
        case "None":
            //No menu item selected, so no section should be displayed
            break;
        default:
        alert("Please select a different menu option");
    }
        
}

function RefreshMenu()
{
    document.getElementById("menu").selectedIndex = "0";
    MenuChoice("None");
}
