export class Appointment {
    _id: string;
    lawyerId:string;
    lawyerName:string;
    clientId : string;
    clientName:string;
    subject : string;
    description: string;
    startDateTime : Date;
    finishDateTime : Date;
    status:string;
    isAlert: Boolean;

    constructor() { }
}
