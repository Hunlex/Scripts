function calculateHashRC(string) 
{
    var hash = 0;
    for (var i = 0; i < string.length; i++)
        hash += string.charCodeAt(i) * (1 << (string.length - i));
    return hash;
}

var fso = new ActiveXObject('Scripting.FileSystemObject');
var file = fso.OpenTextFile('string.txt');
var string = file.ReadAll();
file.Close();

WSH.StdOut.Write('Enter substring: ')
var substring = WSH.StdIn.ReadLine();

WSH.echo('Rabin-Carp');
var result = [];
var substringHash = calculateHashRC(substring);
var stringHash = calculateHashRC(string.substr(0, substring.length));
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

    stringHash = 2 * (stringHash - string.charCodeAt(i) * (1 << substring.length)
                                 + string.charCodeAt(i + substring.length));
}

var end = (new Date()).getTime();
if (result.length == 0)
    WSH.echo('Substring not found');
else WSH.echo('Position: ' + result);
WSH.echo('Collisions: ' + collisionCount);
