public class $CONCRETE_SUBJECT_CLASS_NAME$ extends $SUBJECT_CLASS_NAME${

    private $STATE_CLASS_NAME$ subjectState;

    public $CONCRETE_SUBJECT_CLASS_NAME$(){
        this.subjectState = $STATE_CLASS_NAME$.DEFAULT_STATE;
    }

    public $STATE_CLASS_NAME$ getSubjectState() {
        return subjectState;
    }

    public void setSubjectState($STATE_CLASS_NAME$ subjectState) {
        this.subjectState = subjectState;
    }
}
