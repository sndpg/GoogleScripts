var labelMap = [
    new LabelMapping("futurism", [
        ""
    ], [GmailApp.getUserLabelByName("Information/futurism"), GmailApp.getUserLabelByName("Information")]),

    new LabelMapping("medium", [
        ""
    ], [GmailApp.getUserLabelByName("Information/Medium"), GmailApp.getUserLabelByName("Information")]),

    new LabelMapping("quora", [
        "digest"
    ], [GmailApp.getUserLabelByName("Information/Quora"), GmailApp.getUserLabelByName("Information")]),

    new LabelMapping("twitch", [
        ""
    ], [GmailApp.getUserLabelByName("Twitch")]),

    new LabelMapping("twitter", [
        ""
    ], [GmailApp.getUserLabelByName("Twitter")])
];

var deletionMap = [new DeletionMapping(GmailApp.getUserLabelByName("Twitch"), "", 1)];

function LabelMapping(from, subjectKeyWords, labels) {
    this.from = from;
    this.subjectKeyWords = subjectKeyWords;
    this.labels = labels;
}

function DeletionMapping(label, operation, keepDays){
    this.label = label;
    this.operation = operation;
    this.keepDays = keepDays;
}

function myFunction() {
    var x = GmailApp.getUserLabels();

    for (i = 1; i < x.length; i++) {

        Logger.log(x[i].getName());

    }
    x = 5;

    Logger.log(GmailApp.getUserLabels());

    Logger.log(x);

}

function checkInbox() {
    var inboxThreads = GmailApp.getInboxThreads();
    var mess;
    var labels = null;

    for (i in inboxThreads) {
        mess = inboxThreads[i].getMessages();

        for (j in mess) {
            labels = getLabels(mess[j].getFrom(), mess[j].getSubject());
            if (labels != null) {
                for (k in lables) {
                    t[i].addLabel(labels[k]);
                }
            }
        }
    }
}

function getLabels(from, subject) {
    var labels = null;

    for (i in labelMap) {
        if (from.indexOf(labelMap[i].from) >= 0) {
            for (j in labelMap[i].subjectKeyWords) {
                if (subject.indexOf(labelMap[i].subjectKeyWords[j]) >= 0) {
                    labels = labelMap[i].labels;
                }
            }
        }
    }

    return labels;
}

function checkMessagesForDeletion() {
    gThreads = GmailApp.getInboxThreads();

    for (i in gThreads) {
        Logger.log(gThreads[i].getId());
        gMess = gThreads[i].getMessages();

        for (m in gMess) {
            Logger.log(gMess[m].getSubject());
        }

    }
}
