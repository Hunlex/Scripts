fileAccess = new ActiveXObject("Scripting.FileSystemObject");
fileOpen = fileAccess.OpenTextFile("codeEscape.txt");
string = fileOpen.ReadAll();
fileOpen.Close();
fileAccess = new ActiveXObject("Scripting.FileSystemObject");
fileOpen = fileAccess.OpenTextFile("decodeEscape.txt", 2, true);

var escapeSymbol = "#";
var i = 0;
var len = string.length;
while (i < len)
{
	if (string.charAt(i) == escapeSymbol)
	{
		var number = string.charAt(i + 1);
		var nCount = number.charCodeAt();
		if (string.charAt(i + 2) !=  string.charAt(i))
			nCount += 4;
		var j = 0;
		while (j < nCount)
		{
			fileOpen.Write(string.charAt(i + 2));
			j++;				
		}

		i+=2;
	}

	else 
	{
		fileOpen.Write(string.charAt(i));
	}

	i++;
}

fileOpen.Close();
