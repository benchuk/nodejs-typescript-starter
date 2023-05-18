import loggerService from "./loggerService"

class MailService {
    async sendMail(to: [string], subject: string, body: string) {
        loggerService.debug(`Sending email to: ${to}, subject:${subject}, body:${body}`)
    }
}
export default new MailService()