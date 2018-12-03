function calculateHashRC(string) 
{
    var hash = 0;
    for (var i = 0; i < string.length; i++)
        hash += string.charCodeAt(i) * (1 << (string.length - i));
    return hash;
}

var result = [];
var substringHash = calculateHashRC(substring);
var stringHash = calculateHashRC(string.substr(0, substring.length));
var start = (new Date()).getTime();
var collisionCount = 0;
var fl = 0;

for (var i = 0; i <= string.length - substring.length; i++) 
{
    if (substringHash == stringHash) 
    {
        for (var j = 0; string.charAt(i + j) == substring.charAt(j); j++) 
        {
            if (j == substring.length - 1) 
            {
                result.push(i);
                fl = 1;
                break;
            }
        }
        

        if (fl == 1)
        {
            collisionCount++;
            fl = 0;
        }
    }

    stringHash = 2 * (stringHash - string.charCodeAt(i) * (1 << substring.length)
                            + string.charCodeAt(i + substring.length));
}

collisionCount -= result.length; 
var end = (new Date()).getTime();
if (result.length == 0)
    WSH.echo('Substring not found');
else WSH.echo('Position: ' + result);
WSH.echo('Collisions: ' + collisionCount);
