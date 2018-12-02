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
