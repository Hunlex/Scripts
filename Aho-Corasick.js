var fso = new ActiveXObject('Scripting.FileSystemObject');
var file = fso.OpenTextFile('string.txt');
var string = file.ReadAll();
file.Close();

var substring = WSH.StdIn.ReadLine();

var alphabet = new Array();
for (var i = 0; i < substring.length; i++)
    alphabet[substring.charAt(i)] = 0;

var transitionTable = new Array(substring.length + 1);
for (var j = 0; j <= substring.length; j++)
    transitionTable[j] = new Array();

for(var i in alphabet)
    transitionTable[0][i] = 0;

for (var j = 0; j < substring.length; j++)
{
    prev = transitionTable[j][substring.charAt(j)];
    transitionTable[j][substring.charAt(j)] = j + 1;
    for (var i in alphabet)
        transitionTable[j+1][i] = transitionTable[prev][i];
}

for (var j = 0; j <= substring.length; j++)
{
    var out = '';
    for (var i in alphabet)
        out += transitionTable[j][i] + ' ';
    WSH.stdOut.WriteLine(out);
}

var result = [];
var status = 0;

for (var i = 0; i < string.length; i++)
{
    if (!transitionTable[status][string.charAt(i)])
        transitionTable[status][string.charAt(i)] = 0;
    status = transitionTable[status][string.charAt(i)];
    if (status == substring.length)
        result.push(i - substring.length + 1);
}

if (result.length == 0)
    WSH.stdOut.WriteLine('Substring not found');
else WSH.stdOut.WriteLine(result);
