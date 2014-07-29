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
        if(element.type != "radio")
        	element.name = theId + '' + counter;
        else
        	element.value = theId + '' + counter;
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
        var elements = document.getElementsByName(eleToDelete);
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


function getValueForMultipleRows(counterId, elementId, msg)
{
    var counter = $('#' + counterId).val();
    var error = 0;
    for(var i = 1; i <= counter; i++)
    {
    	var data = new String($('#' + elementId + i).val());
        data = $.trim(data);
        if(data == '' || data <= 0 || data == '-')
        {
            error = 1;
            $('#' + elementId + i).css({'border' : '1px solid red'});
            $('#' + elementId + i).css({'float' : 'left'});
        }
    }
    return error;
}
	
function isWhitespace(charToCheck) {
    var whitespaceChars = " \t\n\r\f";
    return (whitespaceChars.indexOf(charToCheck) != -1);
}

function ltrim(str) {
    for(var k = 0; k < str.length && isWhitespace(str.charAt(k)); k++);
    return str.substring(k, str.length);
}

function rtrim(str) {
    for(var j=str.length-1; j>=0 && isWhitespace(str.charAt(j)) ; j--);
    return str.substring(0,j+1);
}

function trim(str) {
    return ltrim(rtrim(str));
}
