var selectedIndex = null;
var array1 = new Array();

function onFormSubmit() {
    if (validate()) {
        var formData = readFormData();
        if (selectedIndex == null) {
            insertNewRecord(formData);
        } else {
            updateRecord(formData);
        }
        resetForm();
    }
}

function readFormData() {
    var formData = {};
    formData["Manufacturer"] = document.getElementById("Manufacturer").value;
    formData["Type"] = document.getElementById("Type").value;
    formData["Display"] = document.getElementById("Display").value;
    formData["Memory"] = document.getElementById("Memory").value;
    formData["Harddisk"] = document.getElementById("Harddisk").value;
    formData["VideoController"] = document.getElementById("VideoController").value;
    formData["Price"] = document.getElementById("Price").value;
    formData["ProcessorID"] = document.getElementById("ProcessorID").value;
    formData["OSID"] = document.getElementById("OSID").value;
    formData["Pieces"] = document.getElementById("Pieces").value;
    return formData;
}

function insertNewRecord(data) {
    array1[array1.length] = {
        "Manufacturer": data.Manufacturer,
        "Type": data.Type,
        "Display": data.Display,
        "Memory": data.Memory,
        "Harddisk": data.Harddisk,
        "VideoController": data.VideoController,
        "Price": data.Price,
        "ProcessorID": data.ProcessorID,
        "OSID": data.OSID,
        "Pieces": data.Pieces
    };
    printArray();
}

function printArray() {
    var table = document.getElementById("notebookList").getElementsByTagName("tbody")[0];
    table.innerHTML = "";

    for (var i = 0; i < array1.length; i++) {
        var newRow = table.insertRow(table.length);

        newRow.insertCell(0).innerHTML = array1[i].Manufacturer;
        newRow.insertCell(1).innerHTML = array1[i].Type;
        newRow.insertCell(2).innerHTML = array1[i].Display;
        newRow.insertCell(3).innerHTML = array1[i].Memory;
        newRow.insertCell(4).innerHTML = array1[i].Harddisk;
        newRow.insertCell(5).innerHTML = array1[i].VideoController;
        newRow.insertCell(6).innerHTML = array1[i].Price;
        newRow.insertCell(7).innerHTML = array1[i].ProcessorID;
        newRow.insertCell(8).innerHTML = array1[i].OSID;
        newRow.insertCell(9).innerHTML = array1[i].Pieces;

        var cell11 = newRow.insertCell(10);
        cell11.innerHTML =
            '<a onClick="onEdit(' + i + ')">Edit</a>' +
            '<a onClick="onDelete(' + i + ')">Delete</a>';
    }
}

function resetForm() {
    document.getElementById("Manufacturer").value = "";
    document.getElementById("Type").value = "";
    document.getElementById("Display").value = "";
    document.getElementById("Memory").value = "";
    document.getElementById("Harddisk").value = "";
    document.getElementById("VideoController").value = "";
    document.getElementById("Price").value = "";
    document.getElementById("ProcessorID").value = "";
    document.getElementById("OSID").value = "";
    document.getElementById("Pieces").value = "";
    selectedIndex = null;
}

function onEdit(index) {
    document.getElementById("Manufacturer").value = array1[index].Manufacturer;
    document.getElementById("Type").value = array1[index].Type;
    document.getElementById("Display").value = array1[index].Display;
    document.getElementById("Memory").value = array1[index].Memory;
    document.getElementById("Harddisk").value = array1[index].Harddisk;
    document.getElementById("VideoController").value = array1[index].VideoController;
    document.getElementById("Price").value = array1[index].Price;
    document.getElementById("ProcessorID").value = array1[index].ProcessorID;
    document.getElementById("OSID").value = array1[index].OSID;
    document.getElementById("Pieces").value = array1[index].Pieces;
    selectedIndex = index;
}

function updateRecord(formData) {
    array1[selectedIndex].Manufacturer = formData.Manufacturer;
    array1[selectedIndex].Type = formData.Type;
    array1[selectedIndex].Display = formData.Display;
    array1[selectedIndex].Memory = formData.Memory;
    array1[selectedIndex].Harddisk = formData.Harddisk;
    array1[selectedIndex].VideoController = formData.VideoController;
    array1[selectedIndex].Price = formData.Price;
    array1[selectedIndex].ProcessorID = formData.ProcessorID;
    array1[selectedIndex].OSID = formData.OSID;
    array1[selectedIndex].Pieces = formData.Pieces;
    printArray();
}

function onDelete(index) {
    if (confirm("Are you sure to delete this record?")) {
        array1.splice(index, 1);
        resetForm();
        printArray();
    }
}

function validate() {
    var isValid = true;

    if (document.getElementById("Manufacturer").value == "") {
        isValid = false;
        document.getElementById("ManufacturerValidationError").classList.remove("hide");
    } else {
        if (!document.getElementById("ManufacturerValidationError").classList.contains("hide")) {
            document.getElementById("ManufacturerValidationError").classList.add("hide");
        }
    }

    return isValid;
}