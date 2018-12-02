fileAccess = new ActiveXObject("Scripting.FileSystemObject");
fileOpen = fileAccess.OpenTextFile("codeJump.txt");
string = fileOpen.ReadAll();
fileOpen.Close();
fileAccess = new ActiveXObject("Scripting.FileSystemObject");
fileOpen = fileAccess.OpenTextFile("decodeJump.txt", 2, true);

var i = 0;
var len = string.length;
while (i < len)
{
	if (string.charCodeAt(i) <= 64)
	{
		var count = string.charCodeAt(i);
		for (var j = 0; j < count; j++)
		{
			fileOpen.Write(string.charAt(i + 1));
		}

		i += 2;
	}

	else
	{
		var count = string.charCodeAt(i) - 64;
		for (var j = 0; j < count; j++)
		{
			fileOpen.Write(string.charAt(i + 1 + j));
		}
		
		i += count + 1;
	}
}
fileOpen.Close();
