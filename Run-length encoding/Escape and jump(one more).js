fso = new 
ActiveXObject ("Scripting.FileSystemObject");
fh = fso.OpenTextFile("input.txt");
s = fh.ReadAll();
fh.Close();
fso = new
ActiveXObject("Scripting.FileSystemObject");
fh = fso.OpenTextFile("code.txt", 2, true);

var len = s.length ;
var a = 0;
var count = 1;
var coun = 1;
var i;
var j;
var q = 255;
var e = '#';
for (i = 0; i<=len; i++) 
{   
	if (s.charAt(i) == e)
	{
		if ( s.charAt(i) == s.charAt(i+1))
		{
			coun++;
		}
		
		else
		{
			var n = String.fromCharCode (coun);
			fh.Write('#' + n + s.charAt(i) );
			coun = 1;
		}
	}
	
	else
	{   
		if (s.charAt(i) == s.charAt(i+1))
		{
			count++;
		}
		
		else
		{
			if ( count < 4 )
			{
				for (j = 0; j < count; j++)
				{
				fh.Write(s.charAt(i));
				}
				count = 1;
			}
			
			else
			{ 
				if (count < 127)
				{
					var fet = String.fromCharCode (count);
					fh.Write('#' + fet + s.charAt(i) );
					count = 1;
				}
				
				else 
				{
					while (count >= 127)
					{
						var rut = String.fromCharCode (127);
						fh.Write('#' + rut + s.charAt(i) );
						count = count - 127;
					}
					var re = String.fromCharCode (count);
					fh.Write('#' + re + s.charAt(i) );
				}	
			}
		}
	}

}

fh.Close();
fso = new 
ActiveXObject ("Scripting.FileSystemObject");
fh = fso.OpenTextFile("code.txt");
st = fh.ReadAll();
fh.Close();
fso = new
ActiveXObject("Scripting.FileSystemObject");
fh = fso.OpenTextFile("decode.txt", 2, true);

var lenr = st.length ;
var y = 0;
while (y < lenr)
{   
		if (st.charAt(y) == e)
		{
			var p = st.charAt(y+1).charCodeAt();
			var b = 0;
			while (b < p)
			{
				fh.Write(st.charAt(y+2));
				b++;
			}
			y = y + 3;
			
		}
		else 
		{
			fh.Write(st.charAt(y));
			y++;
		}
}

fh.Close();

fso = new 
ActiveXObject ("Scripting.FileSystemObject");
fh = fso.OpenTextFile("input.txt");
string = fh.ReadAll();
fh.Close();
fso = new
ActiveXObject("Scripting.FileSystemObject");
fh = fso.OpenTextFile("codeJump.txt", 2, true);

var i = 0;
var len = string.length;
while (i < len)
{
	var count = 1;
	if (string.charAt(i) == string.charAt(i + 1))
	{
		while (string.charAt(i) == string.charAt(i + count)
			&& count < 63)
		{
			count++;
		}
	
	fh.Write(String.fromCharCode(count) + string.charAt(i));
	}

	else 
	{
		while (string.charAt(i + count - 1) != string.charAt(i + count)
			&& string.charAt(i + count) != string.charAt(i + count + 1)
			&& count < (63))
		{
			count++;
		}

		fh.Write(String.fromCharCode(count + 64))
		for (var j = 0; j < count; j++)
		{
			fh.Write(string.charAt(i + j));
		}
	}

	i += count;
}

fh.Close();


fh.Close();
fso = new 
ActiveXObject ("Scripting.FileSystemObject");
fh = fso.OpenTextFile("codeJump.txt");
st = fh.ReadAll();
fh.Close();
fso = new
ActiveXObject("Scripting.FileSystemObject");
fh = fso.OpenTextFile("decodeJump.txt", 2, true);

var lenr = st.length ;
var y = 0;
var lern2;
while (y < lenr)
{   
		if (st.charAt(y).charCodeAt() < 64)
		{
			lern2 = st.charAt(y).charCodeAt();
			for (var n = 0; n < lern2; n++)
			{
				fh.Write(st.charAt(y+1));
			}
			y++;
		}
		else 
		{
			var p = st.charAt(y);
			var ler = p.charCodeAt() - 64;
			for (var n = 0; n < ler; n++)
			{
			fh.Write(st.charAt(y+1));
			y++;
			}
		}	
y++		
}

fh.Close();
