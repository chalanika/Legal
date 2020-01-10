export class Appointment {
    _id: string;
    lawyerId:string;
    clientId : string;
    subject : string;
    description: string;
    startDateTime : Date;
    finishDateTime : Date;
    isSeen : Boolean;

    constructor() { }
}
