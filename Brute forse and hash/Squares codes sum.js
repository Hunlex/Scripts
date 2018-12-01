function calculateHashSQR(string) 
{
    var hash = 0;
    for (var i = 0; i < string.length; i++)
        hash += (string.charCodeAt(i) << 1);
    return hash;
}

var fso = new ActiveXObject('Scripting.FileSystemObject');
var file = fso.OpenTextFile('string.txt');
var string = file.ReadAll();
file.Close();

WSH.StdOut.Write('Enter substring: ')
var substring = WSH.StdIn.ReadLine();

WSH.echo('Sum of code square');
var result = [];
var substringHash = calculateHashSQR(substring);
var stringHash = calculateHashSQR(string.substr(0, substring.length));
var start = (new Date()).getTime();
var collisionCount = 0;

for (var i = 0; i <= string.length - substring.length; i++) 
{
    if (substringHash == stringHash) 
    {
        for (var j = 0; string.charAt(i + j) == substring.charAt(j); j++) 
        {
            if (j == substring.length - 1) 
            {
                result.push(i);
                break;
            }
            
            else 
            {
                collisionCount++;
                break;
            }
        }
    }

    stringHash = stringHash - (string.charCodeAt(i) << 1)
                            + (string.charCodeAt(i + substring.length) << 1);
}

var end = (new Date()).getTime();
if (result.length == 0)
    WSH.echo('Substring not found');
else WSH.echo('Position: ' + result);
WSH.echo('Collisions: ' + collisionCount);
