var fso = new ActiveXObject('Scripting.FileSystemObject');
var file = fso.OpenTextFile('string.txt');
var string = file.ReadAll();
file.Close();

var substring = WSH.StdIn.ReadLine();

function calculateHashRC(string) 
{
    var hash = 0;
    for (var i = 0; i < string.length; i++)
        hash += (1 << string.charCodeAt(i));
    return hash;
}

var fso = new ActiveXObject('Scripting.FileSystemObject');
var file = fso.OpenTextFile('string.txt');
var string = file.ReadAll();
file.Close();

var fso = new ActiveXObject('Scripting.FileSystemObject');
var file = fso.OpenTextFile('substring.txt');
var substring = file.ReadAll();
file.Close();

var result = [];
var substringHash = calculateHash(substring);
var stringHash = calculateHash(string.substr(0, substring.length));
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

    stringHash = stringHash - (1 << string.charCodeAt(i))
                            + (1 << string.charCodeAt(i + substring.length));
}

collisionCount = result.length - collisionCount;
var end = (new Date()).getTime();
if (result.length == 0)
    WSH.stdOut.WriteLine('Substring not found');
else WSH.stdOut.WriteLine(result);
WSH.stdOut.WriteLine('Collisions: ' + collisionCount);
