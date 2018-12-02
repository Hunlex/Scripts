function node(name, frequency, used, code, link)
{
    this.name = name;
    this.frequency = frequency;
    this.used = used;
    this.code = code;
    this.link = link;
}

var fso = new ActiveXObject('Scripting.FileSystemObject');
var file = fso.OpenTextFile('input.txt');
var string = file.ReadAll();
file.Close();
WSH.echo('String: ' + string);

var fso = new ActiveXObject("Scripting.FileSystemObject");
var file = fso.OpenTextFile("output.txt", 2, true);

var alphabet = new Array();

for (var i = 0; i < string.length; i++)
    alphabet[string.charAt(i)] = 0;
for (var i = 0; i < string.length; i++)
    alphabet[string.charAt(i)]++;

var tree = new Array();

file.WriteLine('Alphabet:')
for (var char in alphabet) 
{
    file.WriteLine(char + ' ' + alphabet[char]);
    n = new node(char, alphabet[char], false, '', null);
    tree.push(n);
}

var originalTreeLength = tree.length;

for (var k = 1; k < originalTreeLength; k++)
{
    var frequency1 = string.length;
    var num1 = 0;
    for (var i = 0; i < tree.length; i++)
        if ((tree[i].frequency < frequency1) && (tree[i].used == false))
        {
            frequency1 = tree[i].frequency;
            num1 = i;
        }

    tree[num1].used = true;
    tree[num1].code = 0;
    tree[num1].link = tree.length;

    var frequency2 = string.length;
    var num2 = 0;
    for (var i = 0; i < tree.length; i++)
        if ((tree[i].frequency < frequency2) && (tree[i].used == false))
        {
            frequency2 = tree[i].frequency;
            num2 = i;
        }

    tree[num2].used = true;
    tree[num2].code = 1;
    tree[num2].link = tree.length;
    n = new node(tree[num1].name + tree[num2].name, tree[num1].frequency + tree[num2].frequency, false, '', null);
    tree.push(n);
}

var codeTable = new Array();
for (var i = 0; i < originalTreeLength; i++){
    var j = i;
    codeTable[tree[j].name] = '';
    while (tree[j].link)
    {
        codeTable[tree[i].name] = tree[j].code + codeTable[tree[i].name];
        j = tree[j].link;
    }
}

var code = '';
file.WriteLine('Code char: ')
for (var i in codeTable)
    file.WriteLine(i + ' ' + codeTable[i]);

for (var i = 0; i < string.length; i++)
    code += codeTable[string.substr(i, 1)];
WSH.echo('Code: ' + code);
file.WriteLine('Code: ' + code);

var codeSymbol = '';
var decode = '';
   
for (var i = 0; i < code.length; i++)
{
    codeSymbol += code.charAt(i);
    for (var j in codeTable)
    {
        if (codeTable[j] == codeSymbol)
        {
            decode += j;
            codeSymbol = '';
        }
    }
}

WSH.echo('Decode: ' + decode);
file.Write('Decode: ' + decode);
