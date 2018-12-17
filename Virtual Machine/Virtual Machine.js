WSH.echo('Input name of file with program');
var file = new ActiveXObject('Scripting.FileSystemObject');
var fileName = WSH.StdIn.ReadLine();
if (fileName != 'factorial.txt' && fileName != 'gcd.txt')
{
	WSH.echo('Unknow program');
	WSH.Quit();
}

var program = '';
var programFile = file.OpenTextFile(fileName);
while (!programFile.AtEndOfStream)
	program += programFile.ReadLine() + ' ';
programFile.close();
var memory = program.split(' ');
var id = 0;

while (memory[id] != 'End')
{
	switch (memory[id])
	{
		case 'Read':
			memory[memory[id + 1]] = WSH.StdIn.ReadLine();
			if (parseInt(memory[memory[id + 1]]) != memory[memory[id + 1]])
			{
				WSH.echo('Wrong input');
				WSH.Quit();
			}
			id += 2;
			break;

		case 'Write':
			WSH.echo(Math.abs(memory[memory[id + 1]]));
			id += 2;
			break;

		case 'If':
			id += 2;
			break;

		case 'Put':
			if (memory[id + 2] < 200)
				memory[memory[id + 1]] = memory[id + 2];
			else 
				memory[memory[id + 1]] = memory[memory[id + 2]];
			id += 3;
			break;

		case '<':
			if (memory[memory[id - 1]] < memory[memory[id + 1]])
				id += 2;
			else id += 4;
			break;

		case '>':
			if (memory[id - 1] < 200)
				if (parseInt(memory[id - 1]) > parseInt(memory[memory[id + 1]]))
					id += 2;
				else id += 3;
			else 
				if (memory[memory[id - 1]] > parseInt(memory[id + 1]))
					id += 2;
				else id += 3;
			break;

		case '==':
			if (memory[id + 1] < 200)	
				if (memory[memory[id - 1]] == memory[id + 1])
					id += 2;
				else id += 3;
			else
				if (memory[memory[id - 1]] == memory[memory[id + 1]])
					id += 2;
				else id += 4;
			break;

		case '!=':
			if (memory[id + 1] < 200)	
				if (memory[memory[id - 1]] != memory[id + 1])
					id += 2;
				else id += 4;
			else
				if (memory[memory[id - 1]] == memory[memory[id + 1]])
					id += 2;
				else id += 4;
			break;

		case 'Jmp':
			id += parseInt(memory[id + 1]);
			break;

		case 'Mul':
			memory[memory[id + 1]] = parseInt(memory[memory[id + 2]]) * parseInt(memory[memory[id + 3]]);
			id += 4;
			break;

		case 'Add':
			if (memory[id + 2] < 200)
				memory[memory[id + 1]] = parseInt(memory[id + 2]) + parseInt(memory[memory[id + 3]]);
			else if (memory[id + 3] < 200)
				memory[memory[id + 1]] = parseInt(memory[memory[id + 2]]) + parseInt(memory[id + 3]);
			else memory[memory[id + 1]] = parseInt(memory[memory[id + 2]]) + parseInt(memory[memory[id + 3]]);
			id += 4;
			break;

		case 'Mod':
			memory[memory[id + 1]] = memory[memory[id + 2]] % memory[memory[id + 3]];
			id += 4;
			break;

		default: 
			WSH.echo('Unknow command: ' + memory[id]);
			WSH.Quit();		
	}
}
