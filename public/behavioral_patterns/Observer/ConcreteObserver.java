public class $CONCRETE_OBSERVER_CLASS_NAME$ implements $OBSERVER_CLASS_NAME${

    private $STATE_CLASS_NAME$ observerState;
    private $CONCRETE_SUBJECT_CLASS_NAME$ subject;

    public $CONCRETE_OBSERVER_CLASS_NAME$($CONCRETE_SUBJECT_CLASS_NAME$ subject){
        observerState = $STATE_CLASS_NAME$.DEFAULT_STATE;
        this.subject = subject;
    }
    @Override
    public void $UPDATE_METHOD_NAME$() {
        observerState = subject.getSubjectState();
    }
}
