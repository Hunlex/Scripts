var fso = new ActiveXObject('Scripting.FileSystemObject');
var file = fso.OpenTextFile('string.txt');
var string = file.ReadAll();
file.Close();

var substring = WSH.StdIn.ReadLine();

var result  = [];
var entry = [];
for(var k = 0; k < substring.length; k++) 
{
    entry[substring.charAt(k)] = k + 1;
}

for (var i = substring.length - 1; i < string.length; i++) 
{
    for (var j = 0; string.charAt(i - j) == substring.charAt((substring.length - 1) - j); j++) 
    {
        if (j == substring.length - 1) 
        {
            result.push(i - (substring.length - 1));
            break;
        }
    }

    if (j != substring.length - 1) 
    {
        if (!entry[string.charAt(i - j)])
        {
            i += substring.length - 1;
        }

        else 
        {
            i += Math.max(1, substring.length - 1 - entry[string.charAt(i - j)] - j);
        }
    }
}

if (result.length == 0)
    WSH.stdOut.WriteLine('Substring not found');
else WSH.stdOut.WriteLine(result);
