WSH.echo('Do you want enter message yourself?')
var answer = WSH.StdIn.ReadLine();
var realText = '';
if (answer == 'Yes' || answer == 'yes')
{
	WSH.echo('Enter your message');
	realText = WSH.StdIn.ReadLine();
}

else if (answer == 'No' || answer == 'no')
{
	var fileAccess = new ActiveXObject ('Scripting.FileSystemObject');
	var inputFile = fileAccess.OpenTextFile ('text.txt');
	realText = inputFile.ReadAll();
	inputFile.Close();
}

else
{
	WSH.echo('Sorry, I don\'t undersatnd you. Please, run script again and tell \'Yes\' or \'No\'');
	WSH.Quit();
}

WSH.Echo('What shift you want?');
var shift = parseInt(WSH.StdIn.ReadLine());
if (isNaN(shift))
{
	WSH.echo('Oops, your shift incorrect:(');
	WSH.Quit();
}

shift %= 94;
if (shift < 0)
	shift += 94;
var code = "";
for (var i = 0; i < realText.length; i++)
{
	if (realText.charCodeAt(i) >= 32 && realText.charCodeAt(i) <= 126)
	{
		if (realText.charCodeAt(i) + shift > 126)
			code += String.fromCharCode(realText.charCodeAt(i) + shift - 94);
		else
			code += String.fromCharCode(realText.charCodeAt(i) + shift);
	}
}
var fileAccess = new ActiveXObject('Scripting.FileSystemObject');
var outputFile = fileAccess.CreateTextFile('codedText.txt');
outputFile.writeline(code);
outputFile.Close();
WSH.echo('Encode text: ');
WSH.echo(code);

//Create table of frequency from independent text
var fileAccess = new ActiveXObject('Scripting.FileSystemObject');
var inputFile = fileAccess.OpenTextFile('textForFrequency.txt');
var text = inputFile.ReadAll();
inputFile.Close();
var independentFrequency = [];
var charCount = 0;
for (var i = 0; i < 10000; i++)
	independentFrequency[i] = 0;
for (var i = 0; i < text.length; i++)
{
	if (text.charCodeAt(i) >= 32 && text.charCodeAt(i) <= 126)
	{
		independentFrequency[text.charCodeAt(i)]++;
		charCount++;
	}
}
for (var i = 0; i < independentFrequency.length; i++)
	independentFrequency[i] = independentFrequency[i] / charCount;

//Create table of frequency from coded text
var fileAccess = new ActiveXObject('Scripting.FileSystemObject');
var inputFile = fileAccess.OpenTextFile('codedText.txt');
var text = inputFile.ReadAll();
inputFile.Close();
var codedFrequency = [];
var charCount = 0;
for (var i = 0; i < 10000; i++)
	codedFrequency[i] = 0;
for (var i = 0; i < text.length; i++)
{
	if (text.charCodeAt(i) >= 32 && text.charCodeAt(i) <= 126)
	{
		codedFrequency[text.charCodeAt(i)]++;
		charCount++;
	}
}
for (var i = 0; i < independentFrequency.length; i++)
	codedFrequency[i] = codedFrequency[i] / charCount;

//Decode
var finalShift = 0; 
var minMagicSum = Number.MAX_VALUE;
var magicSum = 0;
for (var possibleShift = 0; possibleShift < 94; possibleShift++)
{
	magicSum = 0;
	for (var i = 0; i < text.length; i++)
	{
		if (text.charCodeAt(i) >= 32 && text.charCodeAt(i) <= 126)
		{
			if (text.charCodeAt(i) - possibleShift < 32)	
			{
				magicSum += Math.pow((independentFrequency[text.charCodeAt(i)] - 
							codedFrequency[text.charCodeAt(i) - possibleShift + 94]), 2);
			}

			else
			{
				magicSum += Math.pow((independentFrequency[text.charCodeAt(i)] - 
							codedFrequency[text.charCodeAt(i) - possibleShift]), 2);
			}
		}
	}

	if (magicSum < minMagicSum)
	{
		finalShift = possibleShift;
		minMagicSum = magicSum;
	}
}

finalShift = 94 - finalShift;
var decode = "";
for (var i = 0; i < text.length; i++)
{
	if (text.charCodeAt(i) >= 32 && text.charCodeAt(i) <= 126)
	{
		if (text.charCodeAt(i) - finalShift < 32)
			decode += String.fromCharCode(text.charCodeAt(i) - finalShift + 94);
		else
			decode += String.fromCharCode(text.charCodeAt(i) - finalShift);
	}
}

var fileAccess = new ActiveXObject('Scripting.FileSystemObject');
var outputFile = fileAccess.CreateTextFile('decodedText.txt');
outputFile.writeLine("I think that shift has been " + finalShift);
outputFile.writeLine('Decoded text: ');
outputFile.writeLine(decode);
outputFile.Close();
WSH.echo ("I think that shift has been " + finalShift);
WSH.echo('Decoded text: ');
WSH.echo(decode);
