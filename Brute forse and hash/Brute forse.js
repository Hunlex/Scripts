var fso = new ActiveXObject('Scripting.FileSystemObject');
var file = fso.OpenTextFile('string.txt');
var string = file.ReadAll();
file.Close();

WSH.StdOut.Write('Enter substring: ')
var substring = WSH.StdIn.ReadLine();

WSH.echo('Brute forse');
var result = [];
var start = (new Date()).getTime();

for (var i = 0; i <= string.length - substring.length; i++) 
{
    for (var j = 0; string.charAt(i + j) == substring.charAt(j); j++) 
    {
        if (j == substring.length - 1) 
        {
            result.push(i);
            break;
        }
    }
}

var end = (new Date()).getTime();
if (result.length == 0)
    WSH.echo('Substring not found');
else WSH.echo('Position: ' + result);
