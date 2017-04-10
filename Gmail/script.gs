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

var deletionMap = [new DeletionMapping(GmailApp.getUserLabelByName("Twitch"), "", 1),
  new DeletionMapping(GmailApp.getUserLabelByName("Twitter"), "", 3)];

function LabelMapping(from, subjectKeyWords, labels) {
    this.from = from;
    this.subjectKeyWords = subjectKeyWords;
    this.labels = labels;
}

function DeletionMapping(label, operation, keepDays) {
    // todo: change operation to an array of k-v-pairs. key describes the operation and value is a string representing the operation-parameters
    // e.g. {"keepdays","3"} -> operation keepDays , parameter = 3 -> keep messages for 3 days before deleting
    // or json-like String Array: {"keepDays": "3", "subjectContains": "blabla"} etc. ~> may require a somewhat more sophisticated lexer to process the json-string accordingly
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
    var threads = null,
        messages = null;
    for (i in deletionMap) {
        threads = deletionMap[i].label.getThreads();

        for (j in threads) {
            messages = threads[j].getMessages();

            for (k in messages) {
                if (checkMessageDeletionOptions(deletionMap[i], messages[k])) {
                    messages[k].moveToTrash();
                }
            }
        }
    }
}

function checkMessageDeletionOptions(deletionMap, message) {
    var retVal = false;
    // implement logic for various operation-strings (from deletionMapping-object)
    // for now: only the "keep max of n days before deletion"-option
    Logger.log("message.getDate(): " + message.getDate());
    Logger.log("Date(Date.now()): " + new Date(Date.getDate()));

    retVal = message.getDate().getTime() + deletionMap.keepDays * 24 * 60 * 60 * 1000 < Date.now() ? true : false;

    Logger.log(retVal);
    return retVal;
}

function checkMessagesForDeletion_test() {
    gThreads = GmailApp.getInboxThreads();

    for (i in gThreads) {
        Logger.log(gThreads[i].getId());
        gMess = gThreads[i].getMessages();

        for (m in gMess) {
            Logger.log(gMess[m].getSubject());
        }

    }
}
