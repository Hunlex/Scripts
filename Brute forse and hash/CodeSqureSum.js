var fso = new ActiveXObject('Scripting.FileSystemObject');
var file = fso.OpenTextFile('string.txt');
var string = file.ReadAll();
file.Close();

var substring = WSH.StdIn.ReadLine();

function calculateHashSum(string) 
{
    var hash = 0;
    for (var i = 0; i < string.length; i++)
        hash += string.charCodeAt(i);
    return hash;
}

var result = [];
var substringHash = calculateHashSum(substring);
var stringHash = calculateHashSum(string.substr(0, substring.length));
var start = (new Date()).getTime();
var collisionCount = 0;

for (var i = 0; i <= string.length - substring.length; i++) 
{
    if (substringHash == stringHash) 
    {
        result.push(i);
        for (var j = 0; string.charAt(i + j) == substring.charAt(j); j++) 
        {
            if (j == substring.length - 1) 
            {
                collisionCount++;
                break;
            }
        }
    }

    stringHash = stringHash - string.charCodeAt(i) 
                            + string.charCodeAt(i + substring.length);
}

collisionCount = result.length - collisionCount;
var end = (new Date()).getTime();
if (result.length == 0)
    WSH.stdOut.WriteLine('Substring not found');
else WSH.stdOut.WriteLine('Sum of code. Position: ' + result);
WSH.stdOut.WriteLine('Collisions: ' + collisionCount);
