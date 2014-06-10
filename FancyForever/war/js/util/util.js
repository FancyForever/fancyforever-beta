function updateId(element, counter)
{
    if(element.childNodes && element.childNodes.length > 0)
    {
        for (var j = 0; j < element.childNodes.length; j++) {
            updateId(element.childNodes[j], counter)
        }
    }    
    var theId   = element.id;
    if(theId) {
        element.id = theId + '' + counter;
        element.name = theId + '' + counter;
    }
}

function insertRow(eleToClone)
{
    var counter = $('#' + eleToClone + 'Counter').val();
    counter++;
    $('#' + eleToClone + 'Counter').val(counter);
    var newFields = document.getElementById(eleToClone).cloneNode(true);
    newFields.id = $('#' + eleToClone).attr('id') + '' + counter;
    var newField = newFields.childNodes;
    for (var i = 0; i < newField.length; i++) {
        updateId(newField[i], counter);
    }
    var insertHere = document.getElementById(eleToClone);
    insertHere.parentNode.insertBefore(newFields,insertHere);
    newFields.style.display = 'block';
    return;
}

function deleteRow(event, eleToDelete, mandatory)
{
    // Check if this is a mandatory attr. If yes, atleast one row has to be present
    if(mandatory)
    {
        var elements = document.getElementsByName(eleToDelete + 'Counter');
        if(elements.length <= 2)
        {
            alert("Atleast one row is required.");
            return;
        }
    }

    // Remove the row in which 'Delete' button was clicked
    // IE does not support the target property
    var target = event.target || event.srcElement;
    var rowToDelete = target.parentNode;
    rowToDelete.parentNode.removeChild(rowToDelete);
    return;
}
