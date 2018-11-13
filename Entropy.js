fileAccess = new ActiveXObject("Scripting.FileSystemObject");
fileOpen = fileAccess.OpenTextFile("input.txt");
string = fileOpen.ReadAll();
fileOpen.Close();
fileAccess = new ActiveXObject("Scripting.FileSystemObject");
fileOpen = fileAccess.OpenTextFile("entropy.txt", 2, true);

var alphabet = [];
var len = string.length;
var n = 0;
for (var i = 0; i < len; i++)
	alphabet[string.charAt(i)] = 0;
for (var i = 0; i < len; i++)
	alphabet[string.charAt(i)]++;//количество
for (var i in alphabet)
{
 	if (alphabet[i] != 0)
 	{
 		alphabet[i] = alphabet[i]/len; //частоты
 		n++;
 	}
}

var entropy = 0;
if (n === 1)
{
	entropy = 0;
}

else
{
	for (var i in alphabet) 
	{
		if (alphabet[i] != 0)
 		{
 			entropy -= alphabet[i] * Math.log(alphabet[i])/Math.log(n);
 		}	
	}
}

fileOpen.Write(entropy);
fileOpen.Close();
