
export default class Email {

    /**
     * Constructs a new Email object.
     * @param {number} id The email ID.
     * @param {string} to The recepient's address.
     * @param {string} from The sender's address.
     * @param {string} cc Addresses to receive a carbon copy.
     * @param {string} bcc Addresses to receive a blind carbon copy.
     * @param {string} subject The subject of the email.
     * @param {string} body The body of the email.
     * @param {number} timestampUTC The UTC timestamp of when the email was sent.
     * @param {bool} isReply Indicates if this email is replied to another email.
     * @param {bool} isDraft Indicates if the email has been drafted, but not sent.
     * @param {bool} isSent Indicates if the email was sent, as opposed to received.
     * @param {bool} isRead Indicates if the email has been read or not.
     * @param {bool} isImportant Indicates if the email is important or not.
     * @param {bool} isSpam Indicates if the email has been marked as spam or not.
     * @param {number} deletionTimestampUTC The UTC timestamp of when the email was deleted.
     */
    constructor(
        id,
        to,
        from,
        cc,
        bcc,
        subject,
        body,
        timestampUTC,
        isReply,
        isDraft = false,
        isSent = false,
        isRead = false,
        isImportant = false,
        isSpam = false,
        deletionTimestampUTC = null) {

        var _id = id;
        var _to = to;
        var _from = from;
        var _cc = cc;
        var _bcc = bcc;
        var _subject = subject;
        var _body = body;
        var _timestampUTC = timestampUTC;
        var _isReply = isReply;
        var _isDraft = isDraft;
        var _isSent = isSent;
        var _isRead = isRead;
        var _isImportant = isImportant;
        var _isSpam = isSpam;
        var _deletionTimestampUTC = deletionTimestampUTC;

        this.getId = () => _id;
        this.getTo = () => _to;
        this.getFrom = () => _from;
        this.getCC = () => _cc;
        this.getBCC = () => _bcc;
        this.getSubject = () => _subject;
        this.getBody = () => _body;
        this.getTimestampUTC = () => _timestampUTC;
        this.getIsReply = () => _isReply;

        this.getIsSent = () => _isSent;
        this.setIsSent = (isSent) => {
            _isSent = isSent;
        };

        this.getIsDraft = () => _isDraft;
        this.setIsDraft = (isDraft) => {
            _isDraft = isDraft;
        };

        this.getIsRead = () => _isRead;
        this.setIsRead = (isRead) => {
            _isRead = isRead;
        };

        this.getIsImportant = () => _isImportant;
        this.setIsImportant = (isImportant) => {
            _isImportant = isImportant;
        };

        this.getIsSpam = () => _isSpam;
        this.setIsSpam = (isSpam) => {
            _isSpam = isSpam;
        };

        this.getDeletionTimestampUTC = () => _deletionTimestampUTC;
        this.setDeletionTimestampUTC = (deletionTimeStampUTC) => {
            _deletionTimestampUTC = deletionTimestampUTC;
        };

        this.isInInbox = () => {
            console.log('isInInbox called');
            return !_isDraft
                && !_isSpam
                && !_deletionTimestampUTC
                && !_isSent;
        };

    }
    
}