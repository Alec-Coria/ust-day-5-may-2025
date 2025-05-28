import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from "class-validator";

//Validador de espacios en blanco al inicio y al final de una cadena de texto
//Decorador de la clase para usarlo como validaror, define el validador personalizado 'NoWhitespace'
@ValidatorConstraint({ name: 'NoWhitespace', async: false })
//Intefaz que implementa ValidatorConstraintInterface
export class NoWhitespaceConstraint implements ValidatorConstraintInterface {
    //Valida que sea una cadena de texto y le aplica trim() para eliminar espacios en blanco,
    //devolviendo false cuando no es cadena de texto y cuando contiene espacios
    validate(text: string) {
        if (typeof text !== 'string') return false;
        return text.trim() === text;
    }

    //Mensaje por defecto que arroja cuando validate devuelve false
    //args recupera el nombre del argumento que se valido
    defaultMessage(args: ValidationArguments) {
        return `${args.property} cannot have leading or trailing spaces`;
    }
}