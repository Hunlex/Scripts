fileAccess = new ActiveXObject("Scripting.FileSystemObject");
fileOpen = fileAccess.OpenTextFile("input.txt");
string = fileOpen.ReadAll();
fileOpen.Close();
fileAccess = new ActiveXObject("Scripting.FileSystemObject");
fileOpen = fileAccess.OpenTextFile("codeEscape.txt", 2, true);

var n = 1;
var escapeSymbol = "#";
var len = string.length;
var nEsc = 1;
for (var i = 0; i <= len; i++)//лучше переделайте в while
{
	if (string.charAt(i) == escapeSymbol)
	{
		while (string.charAt(i) == string.charAt(i + 1))//попробуйте не проверять на то эскеп ли это символ
		{												//а все запихнуть в один счетчик
			nEsc++;
			i++;
		}

		while (nEsc > 255)
		{
			fileOpen.Write(escapeSymbol + String.fromCharCode(255) + escapeSymbol);
			nEsc -= 255;
		}

		if (nEsc > 0)
			fileOpen.Write(escapeSymbol + String.fromCharCode(nEsc) + escapeSymbol);
	}

	else
	{
		if (string.charAt(i) == string.charAt(i + 1))
			n++;
		else 
		{
			while (n > 259)
			{
				fileOpen.Write(escapeSymbol + String.fromCharCode(259) + string.charAt(i));
				n -= 259;
			}

			if (n > 3)
			{
				fileOpen.Write(escapeSymbol + String.fromCharCode(n - 4) + string.charAt(i));
			}

			else
				for (var j = 0; j < n; j++) 
					fileOpen.Write(string.charAt(i));
			n = 1;
		}
	}
}

fileOpen.Close();
