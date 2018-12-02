var fso = new ActiveXObject('Scripting.FileSystemObject');
var file = fso.OpenTextFile('input.txt');
var string = '';
var data = [];
var error = 0;
var expression = file.ReadLine();
WSH.echo('Input expression: ' + expression);
if (expression.charAt(expression.length - 1).toLowerCase() == expression.charAt(expression.length - 1).toUpperCase())
{
	WSH.echo('Invalid expression entry');
	error = 1;
}
	
while (!file.AtEndOfStream)
{
	string = file.ReadLine();
	data[string.split('=')[0]] = string.split('=')[1]
}
file.Close();

var braceFound = 0;
var stack = [];
var revers = '';
var priority = [];
priority['+'] = 2;
priority['-'] = 2;
priority['*'] = 3;
priority['/'] = 3;

for(var i = 0; i <= expression.length; i++)
{
	if (i == expression.length)
	{
		if (braceFound == 1)
		{
			WSH.echo('Invalid expression entry');
			error = 1;
			break;
		}
		while (stack.length != 0)
			revers += stack.pop();
	}

	else if (expression.charAt(i).toLowerCase() != expression.charAt(i).toUpperCase())
	{
		revers += expression.charAt(i);
	}

	else if (stack.length == 0)
	{
		stack.push(expression.charAt(i));
	}

	else if (expression.charAt(i) == '(')
	{
		stack.push(expression.charAt(i));
		braceFound = 1;
	}

	else if (expression.charAt(i) == ')')
	{
		if (braceFound == 0)
		{
			WSH.echo('Invalid expression entry');
			error = 1
			break;
		}
		while (stack[stack.length - 1] != '(')
			revers += stack.pop();
		stack.pop();
		braceFound = 0;
	}

	else
	{
		while (priority[stack[stack.length - 1]] >= priority[expression.charAt(i)])
			revers += stack.pop();
		stack.push(expression.charAt(i));
	}
}

if (error != 1) 
{
	WSH.echo('Revers poland notatoin: ' + revers);

	var stack = [];

	for (var i = 0; i < revers.length; i++)
	{
		if (revers.charAt(i).toLowerCase() != revers.charAt(i).toUpperCase())
			stack.push(parseFloat(data[revers.charAt(i)]));
		else 
		{
			switch (revers.charAt(i))
			{
				case '+':
					stack.push(stack.pop() + stack.pop());
					break;
				case '-':
					stack.push(- stack.pop() + stack.pop());
					break;
				case '*':
					stack.push(stack.pop() * stack.pop());
					break;
				case '/':
					if (stack[stack.length - 1] == 0)
					{
						WSH.echo('Invalid expression entry');
						error = 1
						break;
					}
					stack.push(1 / stack.pop() * stack.pop());
					break;
				default:
					WSH.echo('Error:(');
			}
		}
	}
}

if (error != 1)
	WSH.echo('Expression value: ' + stack.pop());
