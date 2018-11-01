//ESCAPE-кодирование
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
		{												                        //а все запихнуть в один счетчик
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


//ESCAPE-декодирование
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

//JUMP-кодирование
fileAccess = new ActiveXObject("Scripting.FileSystemObject");
fileOpen = fileAccess.OpenTextFile("input.txt");
string = fileOpen.ReadAll();
fileOpen.Close();
fileAccess = new ActiveXObject("Scripting.FileSystemObject");
fileOpen = fileAccess.OpenTextFile("codeJump.txt", 2, true);

var i = 0;
var len = string.length;
while (i < len)
{
	var count = 1;
	if (string.charAt(i) == string.charAt(i + 1))//попробуйте его убрать
	{
		while (string.charAt(i) == string.charAt(i + count)//напишите проверку на выход за пределы строки
			&& count < 64)
		{
			count++;
		}

	fileOpen.Write(String.fromCharCode(count) + string.charAt(i));
	}

	else 
	{
		while (string.charAt(i + count - 1) != string.charAt(i + count)//и тут нужна проверка на выход за пределы
			&& string.charAt(i + count) != string.charAt(i + count + 1)
			&& count < (64 - 1))
		{
			count++;
		}

		fileOpen.Write(String.fromCharCode(count + 64))
		for (var j = 0; j < count; j++)
		{
			fileOpen.Write(string.charAt(i + j));
		}
	}

	i += count;
}

fileOpen.Close();

//JUMP-декодирование
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
