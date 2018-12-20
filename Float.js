var plusZero = '0 00000000 000000000000000000000000';
var NotNumber = '0 11111111 10000000000000000000000';
var minusZero = '1 00000000 000000000000000000000000';
var plusInfinity = '0 11111111 000000000000000000000000';
var minusInfinity = '1 11111111 000000000000000000000000';

function GetInteralNumber(number)
{
	var sign = '';
	if (number >= 0)
		sign = '+';
	else
		sign = '-';
	number = Math.abs(number);
	var binaryNumber = parseFloat(number).toString(2); //Переводим в двоичную систему
	var dotPosition = binaryNumber.indexOf('.');
	if (dotPosition == -1)
		dotPosition = binaryNumber.length;
	var onePosition = binaryNumber.indexOf('1');
	var exponent = 0;
	var mantissa = '';
	if (dotPosition > onePosition)
	{
		exponent = dotPosition - 1 + 127;
		mantissa = binaryNumber.substring(1, dotPosition) + 
				   binaryNumber.substring(dotPosition + 1)
	}

	else
	{
		exponent = dotPosition - onePosition + 127;
		mantissa = binaryNumber.substring(onePosition + 1);
	}
	
	if (sign == '+')
	{
		WSH.echo('Binary number: ' + binaryNumber)
		WSH.echo('Normalized number: ' + '1.' + mantissa + ' * 2^' + (exponent - 127));
	}

	else
	{
		WSH.echo('Binary number: -' + binaryNumber)
		WSH.echo('Normalized number: ' + '-1.' + mantissa + ' * 2^' + (exponent - 127));
	}

	var binaryExponent = parseFloat(exponent).toString(2);
	var realBinaryExponent = [];
	for (var i = 0; i < 8; i++)
	{
		if (binaryExponent.charAt(binaryExponent.length - i - 1) == '')
			realBinaryExponent[7 - i] = 0;
		else 
			realBinaryExponent[7 - i] = binaryExponent.charAt(binaryExponent.length - i - 1);
	}

	realBinaryExponent  = realBinaryExponent.join('');
	return GetInteralNumberFromNormalized(mantissa, sign, realBinaryExponent);
}

function GetInteralNumberFromNormalized(mantissa, sign, realBinaryExponent)
{
	var interalNumber = [];
	for (var i = 0; i < 34; i++)//Заполняем массив будущего числа нулями
		interalNumber[i] = 0;
	if (sign == '+') //Первый бит - знак
		interalNumber[0] = 0;
	else 
		interalNumber[0] = 1;
	interalNumber[1] = ' '; //Пробел для читаемости
	for (var i = 9; i > 1; i--)//Заполняем экспоненту
	{
		if (realBinaryExponent.charAt(i - 2) == '')
			interalNumber[i] = 0;
		else
			interalNumber[i] = realBinaryExponent.charAt(i - 2);
	}

	interalNumber[10] = ' ';//Пробел для читаемости
	for (var i = 11; i < 34 && i < mantissa.length + 11; i++)//Заполняем мантису
		interalNumber[i] = mantissa.charAt(i - 11);
	return interalNumber.join('');
}

function Convert(number)
{
	switch (number) //Проверяем особые случаи
	{
		case '0':
			WSH.echo('Input: 0');
			return plusZero;
			break;

		case '-0':
			WSH.echo('Input: 0');
			return minusZero;
			break;

		case '1,#INF':
			WSH.echo('Input +Infinity');
			return plusInfinity;
			break;

		case '-1,#INF':
			WSH.echo('Input -Infinity');
			return minusInfinity;
			break;

		default: 
			if (isNaN(parseFloat(number)))
			{
				WSH.echo('Input not a number');
				return NotNumber;
			}
			break;
	}

	return GetInteralNumber(number); //Хотим получить число в нормализованном виде
}

function Addition(number1, number2)
{
	var interalNumber1 = Convert(number1);
	WSH.echo(interalNumber1);
	var interalNumber2 = Convert(number2);
	WSH.echo(interalNumber2);
	if (interalNumber1 == plusInfinity || interalNumber2 == plusInfinity)
		return plusInfinity;
	if (interalNumber1 == minusInfinity || interalNumber2 == minusInfinity)
		return minusInfinity;
	if (interalNumber1 == NotNumber || interalNumber2 == NotNumber)
		return NotNumber;
	return GetSum(interalNumber1, interalNumber2)
}

function GetSum(interalNumber1, interalNumber2)
{
	var sign1 = interalNumber1.split(' ')[0];
	var sign2 = interalNumber2.split(' ')[0];
	var exponent1 = interalNumber1.split(' ')[1];
	var exponent2 = interalNumber2.split(' ')[1];
	var mantissa1 = '1' + interalNumber1.split(' ')[2];
	var mantissa2 = '1' + interalNumber2.split(' ')[2];
	var exponentSum = '';
	if (exponent2 != exponent1)
	{
		var difference = Math.abs(parseInt(exponent1, 2) - parseInt(exponent2, 2));
		if (exponent1 > exponent2)
		{
			mantissa2 = AddZeroAndCut(mantissa2, difference);
			exponentSum = exponent1;
		}

		else
		{
			mantissa1 = AddZeroAndCut(mantissa1, difference);
			exponentSum = exponent2;
		}
	}

	else 
		exponentSum = Add(exponent1, '00000001');
	if (exponentSum.length > 8)
		return plusInfinity;
	var mantissaSum = Add(mantissa1, mantissa2);
	if (mantissaSum.charAt(0)=='1')
		mantissaSum = mantissaSum.substr(1);
	mantissaSum = mantissaSum.substr(0, 23);
	return sign1 + ' ' + exponentSum + ' ' + mantissaSum;
}

function AddZeroAndCut(mantissa, difference)
{
	var startString = '';
	for (var i = 0; i < difference; i++) 
		startString += '0';
	var newMantissa = startString + mantissa;
	return newMantissa.substr(0, 25);
}

function Add(binaryNumber1, binaryNumber2)
{
	var sum = [];
	var memory = '0';
	for (var i = binaryNumber1.length - 1; i > -1; i--)
	{
		sum.unshift((parseInt(binaryNumber1.charAt(i)) + parseInt(binaryNumber2.charAt(i)) + 
					 parseInt(memory)) % 2);
		if (parseInt(binaryNumber1.charAt(i)) + parseInt(binaryNumber2.charAt(i)) + parseInt(memory) > 1)
			memory = '1';
		else memory = '0';
	}

	if (memory != '0')
		sum.unshift(memory);
	return sum.join('');
}

function ConvertToDecimal(number)
{
	var binary = GetNormalizedFromInteral(number);
	return GetDecimalNumberFromBinary(binary); 
}

function GetNormalizedFromInteral(number)
{
	var sign = '';
	var exponent = number.split(' ')[1];
	var decimalExponent = parseInt(exponent, 2) - 127;
	var mantissa = number.split(' ')[2];
	if (number.split(' ')[0] == 1)
		sign = '-';
	var lastPositionOfOne = mantissa.lastIndexOf('1');
	mantissa = mantissa.substr(0, lastPositionOfOne + 1);
	WSH.echo('Normalized number: ' + sign + '1.' + mantissa + '*2^' + decimalExponent);
	return ConvertToBinary(mantissa, decimalExponent);
}

function ConvertToBinary(mantissa, decimalExponent)
{
	var binaryNumber = '';
	mantissa = '1' + mantissa;
	if (decimalExponent >= 0)
	{
		decimalExponent += 1;
		while (mantissa.length <= decimalExponent)
			mantissa += '0';
	}

	else
	{
		decimalExponent = Math.abs(decimalExponent);
		while (mantissa.length < mantissa.length + decimalExponent)
			mantissa = '0' + mantissa;
	}

	binaryNumber = mantissa.substr(0,decimalExponent) + '.' + mantissa.substr(decimalExponent);
	if (binaryNumber.indexOf('.') == binaryNumber.length - 2 && binaryNumber.charAt(binaryNumber.length - 1) == '0')
		binaryNumber = binaryNumber.substr(0, binaryNumber.length - 2);
	WSH.echo('Binary number: ' + binaryNumber);
	return binaryNumber;
}

function GetDecimalNumberFromBinary(binary)
{
	var dotPosition = binary.indexOf('.');
	if (dotPosition == -1)
		return parseInt(binary, 2);
	var decimalIntegerPart = parseInt(binary.substr(0, dotPosition + 1), 2);
	binaryFractionalPart = binary.substr(dotPosition + 1)
	var decimalFractionalPart = 0;
	for (var i = 0; i < binaryFractionalPart.length; i++)
		decimalFractionalPart += parseInt(binaryFractionalPart.charAt(i)) * Math.pow(2, -(i + 1));
	return decimalIntegerPart + decimalFractionalPart;
}

var result = '';
WSH.echo('Addition or convert?');
var mode = WSH.StdIn.ReadLine();
if (mode == 'convert')
{
	WSH.echo('Enter number');
	var number = WSH.StdIn.ReadLine();
	result = Convert(number);
	WSH.echo('Interal: ' + result)
}

else if (mode == 'addition')
{
	WSH.echo('Enter first number to Addition');
	var number1 = WSH.StdIn.ReadLine();
	WSH.echo('Enter second number to Addition');
	var number2 = WSH.StdIn.ReadLine();
	if (number1 < 0 || number2 < 0)
	{
		WSH.echo('Sorry, i cant work with negative number');
		WSH.Quit();
	}
	sum = Addition(number1, number2);
	WSH.echo('Sum: ' + sum);
	switch (sum)
	{
		case NotNumber:
			WSH.echo('NaN');
			WSH.Quit();
			break;

		case plusInfinity:
			WSH.echo('+Infinity');
			WSH.Quit();
			break;

		case minusInfinity:
			WSH.echo('-Infinity');
			WSH.Quit();
			break;
			
		default:
			decimalSum = ConvertToDecimal(sum);
			WSH.echo('Decimal sum: ' + decimalSum);
			break;
	}
}

else 
{
	WSH.echo('Incorrect mode for this programm');
	WSH.Quit();
}
